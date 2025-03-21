/**
 * @description
 * An abstract class with common `Storage` features
 * 
 * @usageNOtes
 * Use to set and access data of type `T`
 * @see {@link Storage}
 */
export abstract class KpsStorage  {
  abstract getItem<T>(key: string): T | null;
  abstract setItem<T>(key: string, value: T): void;
  abstract removeItem(key: string): void;
  abstract clear(): void;
}
