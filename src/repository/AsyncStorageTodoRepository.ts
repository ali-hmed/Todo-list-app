import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import type { TodoRepository } from './TodoRepository';
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  RepositoryResult,
} from '../features/todos/types';

const STORAGE_KEY = '@todo_app_todos_v1';

/**
 * Persistent AsyncStorage implementation of TodoRepository.
 * Stores and loads todos locally on device across app launches.
 */
export class AsyncStorageTodoRepository implements TodoRepository {
  private cache: Todo[] | null = null;

  /**
   * Reads todos from local AsyncStorage or returns cached array.
   */
  private async loadFromStorage(): Promise<Todo[]> {
    if (this.cache !== null) {
      return this.cache;
    }
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const parsed = JSON.parse(json);
        if (Array.isArray(parsed)) {
          this.cache = parsed;
          return this.cache;
        }
      }
    } catch (err) {
      console.error('AsyncStorage load error:', err);
    }
    this.cache = [];
    return this.cache;
  }

  /**
   * Persists current cached array to local AsyncStorage.
   */
  private async saveToStorage(todos: Todo[]): Promise<boolean> {
    try {
      this.cache = todos;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      return true;
    } catch (err) {
      console.error('AsyncStorage save error:', err);
      return false;
    }
  }

  async getAll(): Promise<RepositoryResult<Todo[]>> {
    try {
      const todos = await this.loadFromStorage();
      return { success: true, data: [...todos] };
    } catch (err) {
      return { success: false, error: 'Failed to load stored todos.' };
    }
  }

  async getById(id: string): Promise<RepositoryResult<Todo | null>> {
    try {
      const todos = await this.loadFromStorage();
      const todo = todos.find((t) => t.id === id) ?? null;
      return { success: true, data: todo };
    } catch (err) {
      return { success: false, error: 'Failed to retrieve todo from local storage.' };
    }
  }

  async create(input: CreateTodoInput): Promise<RepositoryResult<Todo>> {
    try {
      const todos = await this.loadFromStorage();
      const now = new Date().toISOString();
      const todo: Todo = {
        ...input,
        id: Crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      const updatedTodos = [...todos, todo];
      const saved = await this.saveToStorage(updatedTodos);
      if (!saved) {
        return { success: false, error: 'Failed to save todo to device storage.' };
      }
      return { success: true, data: todo };
    } catch (err) {
      return { success: false, error: 'Failed to create todo locally.' };
    }
  }

  async update(id: string, input: UpdateTodoInput): Promise<RepositoryResult<Todo>> {
    try {
      const todos = await this.loadFromStorage();
      const index = todos.findIndex((t) => t.id === id);
      if (index === -1) {
        return { success: false, error: 'Todo not found in storage.' };
      }
      const updated: Todo = {
        ...todos[index],
        ...input,
        id, // id is immutable
        createdAt: todos[index].createdAt, // createdAt is immutable
        updatedAt: new Date().toISOString(),
      };
      const updatedTodos = [
        ...todos.slice(0, index),
        updated,
        ...todos.slice(index + 1),
      ];
      const saved = await this.saveToStorage(updatedTodos);
      if (!saved) {
        return { success: false, error: 'Failed to save changes to device storage.' };
      }
      return { success: true, data: updated };
    } catch (err) {
      return { success: false, error: 'Failed to update todo in storage.' };
    }
  }

  async delete(id: string): Promise<RepositoryResult<void>> {
    try {
      const todos = await this.loadFromStorage();
      const exists = todos.some((t) => t.id === id);
      if (!exists) {
        return { success: false, error: 'Todo not found.' };
      }
      const updatedTodos = todos.filter((t) => t.id !== id);
      const saved = await this.saveToStorage(updatedTodos);
      if (!saved) {
        return { success: false, error: 'Failed to remove todo from device storage.' };
      }
      return { success: true, data: undefined };
    } catch (err) {
      return { success: false, error: 'Failed to delete todo from local storage.' };
    }
  }
}
