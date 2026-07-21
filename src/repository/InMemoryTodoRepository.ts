import * as Crypto from 'expo-crypto';
import type { TodoRepository } from './TodoRepository';
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  RepositoryResult,
} from '../features/todos/types';

/**
 * Phase 1 in-memory implementation of TodoRepository.
 *
 * All methods return Promises (even though resolution is synchronous)
 * to match the interface signature that AsyncStorage / remote adapters
 * will use in future phases. Swapping this class for a persistent
 * adapter requires changing only the TodoProvider injection — no screens
 * need to change.
 *
 * IMPORTANT: This adapter does NOT persist across app restarts.
 * Phase 2 will replace this with an AsyncStorage adapter.
 */
export class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  async getAll(): Promise<RepositoryResult<Todo[]>> {
    try {
      // Return a shallow copy so callers cannot mutate internal state
      return { success: true, data: [...this.todos] };
    } catch (err) {
      return { success: false, error: 'Failed to load todos.' };
    }
  }

  async getById(id: string): Promise<RepositoryResult<Todo | null>> {
    try {
      const todo = this.todos.find((t) => t.id === id) ?? null;
      return { success: true, data: todo };
    } catch (err) {
      return { success: false, error: 'Failed to find todo.' };
    }
  }

  async create(input: CreateTodoInput): Promise<RepositoryResult<Todo>> {
    try {
      const now = new Date().toISOString();
      const todo: Todo = {
        ...input,
        id: Crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      this.todos = [...this.todos, todo];
      return { success: true, data: todo };
    } catch (err) {
      return { success: false, error: 'Failed to create todo. Please try again.' };
    }
  }

  async update(id: string, input: UpdateTodoInput): Promise<RepositoryResult<Todo>> {
    try {
      const index = this.todos.findIndex((t) => t.id === id);
      if (index === -1) {
        return { success: false, error: 'Todo not found.' };
      }
      const updated: Todo = {
        ...this.todos[index],
        ...input,
        id, // id is immutable
        createdAt: this.todos[index].createdAt, // createdAt is immutable
        updatedAt: new Date().toISOString(),
      };
      this.todos = [
        ...this.todos.slice(0, index),
        updated,
        ...this.todos.slice(index + 1),
      ];
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: 'Failed to update todo. Please try again.' };
    }
  }

  async delete(id: string): Promise<RepositoryResult<void>> {
    try {
      const exists = this.todos.some((t) => t.id === id);
      if (!exists) {
        return { success: false, error: 'Todo not found.' };
      }
      this.todos = this.todos.filter((t) => t.id !== id);
      return { success: true, data: undefined };
    } catch (err) {
      return { success: false, error: 'Failed to delete todo. Please try again.' };
    }
  }
}
