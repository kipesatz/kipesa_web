import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE_TYPE, KpsStorage } from '../types';

@Injectable({
  providedIn: 'root',
})
export class StorageService<T> extends KpsStorage<T> {
  constructor(@Inject(BROWSER_STORAGE_TYPE) private browserStorage: Storage) {
    super();
  }

  /**
   * @description
   * Sets an item of a specific type `T` to `browserStorage`
   * @param key string
   * @param value T
   */
  setItem(key: string, value: T): void {
    this.browserStorage.setItem(key, JSON.stringify(value as string));
  }

  /**
   * Retrieves an item of a specific type `T` from `browserStorage`
   * @param key string
   * @returns T | null
   */
  getItem(key: string): T | null {
    const storedItem: T | null = this.browserStorage.getItem(key) as T | null;
    return storedItem ? (JSON.parse(storedItem as string) as T) : null;
  }

  removeItem(key: string): void {
    this.browserStorage.removeItem(key);
  }

  clear(): void {
    this.browserStorage.clear();
  }
}
