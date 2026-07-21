import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import type { TodoRepository } from '../repository/TodoRepository';
import type {
  Todo,
  TodoFilter,
  CreateTodoInput,
  UpdateTodoInput,
} from '../features/todos/types';

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------
interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  isLoading: true,
  error: null,
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: TodoFilter }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload, isLoading: false, error: null };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context value
// ---------------------------------------------------------------------------
interface TodoContextValue {
  // State
  todos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilter;
  isLoading: boolean;
  error: string | null;

  // Derived counts
  totalCount: number;
  activeCount: number;
  completedCount: number;

  // Actions — all return a user-facing error string on failure, or null on success
  addTodo(input: CreateTodoInput): Promise<string | null>;
  updateTodo(id: string, input: UpdateTodoInput): Promise<string | null>;
  deleteTodo(id: string): Promise<string | null>;
  toggleTodo(id: string): Promise<string | null>;
  setFilter(filter: TodoFilter): void;
  clearError(): void;
  getTodoById(id: string): Todo | undefined;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const TodoContext = createContext<TodoContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------
interface TodoProviderProps {
  children: ReactNode;
  repository: TodoRepository;
}

export function TodoProvider({ children, repository }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  // Keep a stable ref to repository so callbacks don't need it as a dependency
  const repoRef = useRef(repository);
  repoRef.current = repository;

  // Load all todos once on mount
  useEffect(() => {
    let cancelled = false;
    dispatch({ type: 'SET_LOADING', payload: true });

    repoRef.current.getAll().then((result) => {
      if (cancelled) return;
      if (result.success) {
        dispatch({ type: 'SET_TODOS', payload: result.data });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
        dispatch({ type: 'SET_ERROR', payload: result.error });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Derived: filtered todos
  const filteredTodos = React.useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter((t) => !t.completed);
      case 'completed':
        return state.todos.filter((t) => t.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  // Derived counts
  const activeCount = React.useMemo(
    () => state.todos.filter((t) => !t.completed).length,
    [state.todos]
  );
  const completedCount = React.useMemo(
    () => state.todos.filter((t) => t.completed).length,
    [state.todos]
  );

  // Actions
  const addTodo = useCallback(async (input: CreateTodoInput): Promise<string | null> => {
    const result = await repoRef.current.create(input);
    if (result.success) {
      dispatch({ type: 'ADD_TODO', payload: result.data });
      return null;
    }
    return result.error;
  }, []);

  const updateTodo = useCallback(
    async (id: string, input: UpdateTodoInput): Promise<string | null> => {
      const result = await repoRef.current.update(id, input);
      if (result.success) {
        dispatch({ type: 'UPDATE_TODO', payload: result.data });
        return null;
      }
      return result.error;
    },
    []
  );

  const deleteTodo = useCallback(async (id: string): Promise<string | null> => {
    const result = await repoRef.current.delete(id);
    if (result.success) {
      dispatch({ type: 'DELETE_TODO', payload: id });
      return null;
    }
    return result.error;
  }, []);

  const toggleTodo = useCallback(
    async (id: string): Promise<string | null> => {
      const todo = state.todos.find((t) => t.id === id);
      if (!todo) return 'Todo not found.';
      return updateTodo(id, { completed: !todo.completed });
    },
    [state.todos, updateTodo]
  );

  const setFilter = useCallback((filter: TodoFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const getTodoById = useCallback(
    (id: string): Todo | undefined => state.todos.find((t) => t.id === id),
    [state.todos]
  );

  const value: TodoContextValue = {
    todos: state.todos,
    filteredTodos,
    filter: state.filter,
    isLoading: state.isLoading,
    error: state.error,
    totalCount: state.todos.length,
    activeCount,
    completedCount,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    clearError,
    getTodoById,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// ---------------------------------------------------------------------------
// Hook — throws clearly if used outside provider
// ---------------------------------------------------------------------------
export function useTodoContext(): TodoContextValue {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used inside <TodoProvider>');
  }
  return context;
}
