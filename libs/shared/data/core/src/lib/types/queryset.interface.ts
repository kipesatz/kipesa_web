/**
 * @usageNotes
 * The prototype of the queryset response returned from the server.
 */
export interface Queryset<T> {
  count: number;
  previous: string;
  next: string;
  results: T[];
}
