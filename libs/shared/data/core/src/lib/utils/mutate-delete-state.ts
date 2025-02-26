import { EntityAdapter, EntityState } from '@ngrx/entity';
import { MutationType, KipesaEntityState } from '../types';
import { HttpErrorResponse } from '@angular/common/http';
import { initEntityState } from './init-entity-state';

/**
 * @usageNotes
 * Mutate the `delete` state for a single entity type. `key` should be passed during dispatch mutation
 * @param mutation MutationType
 * @param entityState S
 * @param entityAdapter EntityAdapter
 * @param key string | number
 * @param error HttpResponse
 * @returns KipesaEntityState | S
 */
export function mutateDeleteOne<T, S extends EntityState<T>>(
  mutation: MutationType,
  entityState: S,
  entityAdapter: EntityAdapter<T>,
  key?: string | number,
  error?: HttpErrorResponse
): KipesaEntityState<T> | S {
  switch (mutation) {
    case 'dispatch':
      if (key) {
        return {
          ...entityAdapter.removeOne(key as string, entityState),
          loading: true,
        };
      }
      return {
        ...initEntityState(entityAdapter),
        loading: true,
      };
    case 'success':
      return {
        ...entityState,
        loading: false,
      };

    case 'failure':
      return {
        ...entityState,
        loading: false,
        error: error ? error : null,
      };
  }
}
