import { EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { MutationType, KipesaEntityState } from '../types';
import { HttpErrorResponse } from '@angular/common/http';
import { initEntityState } from './init-entity-state';

/**
 * @usageNotes
 * Mutate the `update` state for a single entity type
 * @param mutation MutationType
 * @param entityState S
 * @param entityAdapter EntityAdapter
 * @param updates Update<T>
 * @param error HttpResponse
 * @returns KipesaEntityState | S
 */
export function mutateUpdateOne<T, S extends EntityState<T>>(
  mutation: MutationType,
  entityState: S,
  entityAdapter: EntityAdapter<T>,
  updates?: Update<T>,
  error?: HttpErrorResponse
): KipesaEntityState<T> | S {
  switch (mutation) {
    case 'dispatch':
      return {
        ...initEntityState(entityAdapter),
        loading: true,
      };
    case 'success':
      if (updates) {
        return {
          ...entityState,
          ...entityAdapter.updateOne(updates, entityState),
          loading: false,
        };
      }
      throw Error('entity param must be passed for success mutation');

    case 'failure':
      return {
        ...entityState,
        loading: false,
        error: error ? error : null,
      };
  }
}
