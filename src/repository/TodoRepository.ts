import type { Todo, CreateTodoInput, UpdateTodoInput, RepositoryResult } from '../features/todos/types';

/**
 * Abstract contract for todo storage.
 * All storage adapters (in-memory, AsyncStorage, Supabase, etc.)
 * must implement this interface. The Context layer depends only on
 * this interface — screens never touch storage directly.
 */
export interface TodoRepository {
  /**
   * Returns all todos. Never throws — wraps errors in RepositoryResult.
   */
  getAll(): Promise<RepositoryResult<Todo[]>>;

  /**
   * Returns a single todo by id, or null if not found.
   */
  getById(id: string): Promise<RepositoryResult<Todo | null>>;

  /**
   * Creates a new todo with a generated id and timestamps.
   */
  create(input: CreateTodoInput): Promise<RepositoryResult<Todo>>;

  /**
   * Updates fields on an existing todo, stamps updatedAt.
   */
  update(id: string, input: UpdateTodoInput): Promise<RepositoryResult<Todo>>;

  /**
   * Deletes a todo by id.
   */
  delete(id: string): Promise<RepositoryResult<void>>;
}
