import { Injectable } from '@angular/core';
import { KpsStorage } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService extends KpsStorage {
  /**
   * @description
   * Sets an item of a specific type `T` to `browserStorage`
   * @param key string
   * @param value T
   */
  setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value as string));
  }

  /**
   * Retrieves an item of a specific type `T` from `browserStorage`
   * @param key string
   * @returns T | null
   */
  getItem<T>(key: string): T | null {
    const storedItem: T | null = sessionStorage.getItem(key) as T | null;
    return storedItem ? (JSON.parse(storedItem as string) as T) : null;
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
