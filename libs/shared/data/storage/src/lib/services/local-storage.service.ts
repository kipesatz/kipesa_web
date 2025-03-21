import { Injectable } from '@angular/core';
import { KpsStorage } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends KpsStorage {
  /**
   * @description
   * Sets an item of a specific type `T` to `browserStorage`
   * @param key string
   * @param value T
   */
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value as string));
  }

  /**
   * Retrieves an item of a specific type `T` from `browserStorage`
   * @param key string
   * @returns T | null
   */
  getItem<T>(key: string): T | null {
    const storedItem: T | null = localStorage.getItem(key) as T | null;
    return storedItem ? (JSON.parse(storedItem as string) as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
