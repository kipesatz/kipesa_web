import { EntityAdapter, EntityState } from '@ngrx/entity';
import { MutationType, Queryset, KipesaEntityState } from '../types';
import { initEntityState } from './init-entity-state';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @usageNotes
 * Mutate load state for many entities returned from `queryset`
 * @param mutation MutationType
 * @param entityState S
 * @param stateAdapter EntityAdapter
 * @param queryset Queryset
 * @param error HttpErrorResponse
 * @returns KipesaEntityState | S
 */
export function mutateLoadMany<T, S extends EntityState<T>>(
  mutation: MutationType,
  entityState: S,
  stateAdapter: EntityAdapter<T>,
  queryset?: Queryset<T>,
  error?: HttpErrorResponse
): KipesaEntityState<T> | S {
  switch (mutation) {
    case 'dispatch':
      return {
        ...initEntityState(stateAdapter),
        loading: true,
      };

    case 'success':
      if (queryset) {
        return {
          ...stateAdapter.setAll(queryset.results, entityState),
          loading: false,
          error: null,
          queryset,
        };
      }
      throw Error('`success` mutation must have `queryset` param');

    case 'failure':
      return {
        ...stateAdapter.removeAll(entityState),
        error: error ? error : null,
        loading: false,
      };
  }
}


/**
 * @usageNotes
 * Mutate state for retrieving a single entity from the server
 * @param mutation MutationType
 * @param entityState S
 * @param entityAdapter EntityAdapter
 * @param entity T
 * @param error HttpResponse
 * @returns KipesaEntityState | S
 */
export function mutateLoadOne<T, S extends EntityState<T>>(
  mutation: MutationType,
  entityState: KipesaEntityState<T> | S,
  stateAdapter: EntityAdapter<T>,
  entity?: T,
  error?: HttpErrorResponse
): KipesaEntityState<T> | S {
  switch (mutation) {
    case 'dispatch':
      return { ...initEntityState(stateAdapter), loading: true };

    case 'success':
      if (entity) {
        return {
          ...initEntityState(stateAdapter),
          ...stateAdapter.setOne(entity, entityState),
          loading: false
        };
      }
      throw Error('A `success` mutation should have a `entity` param');

    case 'failure':
      if (error) {
        return {
          ...stateAdapter.removeAll(entityState),
          error: error,
          loading: false,
        };
      }

      throw Error('An `error` mutation should have an `error` param.');
  }
}
