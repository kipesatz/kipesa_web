import { EntityAdapter } from '@ngrx/entity';
import { KipesaEntityState } from '../types';

/**
 * @usageNotes
 * @param adapter EntityAdapter NgRx `EntityAdapter`
 * @returns KipesaEntityState
 */
export function initEntityState<T>(
  adapter: EntityAdapter<T>
): KipesaEntityState<T> {
  return {
    ...adapter.getInitialState(),
    loading: false,
    error: null,
    queryset: null,
  };
}
