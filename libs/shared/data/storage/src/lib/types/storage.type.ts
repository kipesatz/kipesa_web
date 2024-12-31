/**
 * @description
 * An abstract class with common `Storage` features
 * 
 * @usageNOtes
 * Use to set and access data of type `T`
 * @see {@link Storage}
 */
export abstract class KpsStorage<T>  {
  abstract getItem(key: string): T | null;
  abstract setItem(key: string, value: T): void;
  abstract removeItem(key: string): void;
  abstract clear(): void;
}
