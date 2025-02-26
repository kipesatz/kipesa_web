import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
  mutateAddOne,
  mutateUpdateOne,
  mutateLoadOne,
  mutateDeleteOne,
} from '@kps/data/core';
import { Association } from '../models';
import { associationActions } from '../actions';

export const associationsFeatureKey = 'associations';

export const adapter = createEntityAdapter<Association>();

const initialState: KipesaEntityState<Association> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(associationActions.loadAssociations, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(associationActions.loadAssociationsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(associationActions.loadAssociationsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(associationActions.createAssociation, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(associationActions.createAssociationSuccess, (state, { association }) =>
    mutateAddOne('success', state, adapter, association)
  ),
  on(associationActions.createAssociationFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(associationActions.updateAssociation, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(associationActions.updateAssociationSuccess, (state, { updates }) =>
    mutateUpdateOne('success', state, adapter, updates)
  ),
  on(associationActions.updateAssociationFailure, (state, { error }) =>
    mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(associationActions.loadAssociation, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(associationActions.loadAssociationSuccess, (state, { association }) =>
    mutateLoadOne('success', state, adapter, association)
  ),
  on(associationActions.loadAssociationFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(associationActions.deleteAssociation, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.associationId)
  ),
  on(associationActions.deleteAssociationSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(associationActions.deleteAssociationFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const associationsFeature = createFeature({
  name: associationsFeatureKey,
  reducer,
  extraSelectors: ({ selectAssociationsState, selectEntities }) => ({
    ...adapter.getSelectors(selectAssociationsState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as Association),
  }),
});

export const { selectAll, selectError, selectOne, selectTotal, selectLoading } =
  associationsFeature;
