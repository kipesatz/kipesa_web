import { EntityAdapter, EntityState } from '@ngrx/entity';
import { MutationType, KipesaEntityState } from '../types';
import { HttpErrorResponse } from '@angular/common/http';
import { initEntityState } from './init-entity-state';

/**
 * @usageNotes
 * Mutate the `add` state for a single entity type
 * @param mutation MutationType
 * @param entityState S
 * @param entityAdapter EntityAdapter
 * @param entity T
 * @param error HttpResponse
 * @returns KipesaEntityState | S
 */
export function mutateAddOne<T, S extends EntityState<T>>(
  mutation: MutationType,
  entityState: S,
  entityAdapter: EntityAdapter<T>,
  entity?: T,
  error?: HttpErrorResponse
): KipesaEntityState<T> | S {
  switch (mutation) {
    case 'dispatch':
      return {
        ...initEntityState(entityAdapter),
        loading: true,
      };
    case 'success':
      if (entity) {
        return {
          ...entityAdapter.addOne(entity, entityState),
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
