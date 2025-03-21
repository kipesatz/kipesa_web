import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
  mutateAddOne,
  mutateLoadOne,
  mutateDeleteOne,
} from '@kps/data/core';
import { Collateral } from '../models';
import { collateralActions } from '../actions';

export const collateralsFeatureKey = 'collaterals';

export const adapter = createEntityAdapter<Collateral>();

const initialState: KipesaEntityState<Collateral> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(collateralActions.loadCollaterals, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(collateralActions.loadCollateralsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(collateralActions.loadCollateralsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(collateralActions.addCollateral, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(collateralActions.addCollateralSuccess, (state, { collateral }) =>
    mutateAddOne('success', state, adapter, collateral)
  ),
  on(collateralActions.addCollateralFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(collateralActions.loadCollateral, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(collateralActions.loadCollateralSuccess, (state, { collateral }) =>
    mutateLoadOne('success', state, adapter, collateral)
  ),
  on(collateralActions.loadCollateralFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(collateralActions.deleteCollateral, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.id)
  ),
  on(collateralActions.deleteCollateralSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(collateralActions.deleteCollateralFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const collateralFeature = createFeature({
  name: collateralsFeatureKey,
  reducer,
  extraSelectors: ({
    selectCollateralsState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectCollateralsState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as Collateral),
    selectCount: () =>
      createSelector(selectQueryset, (qs) => qs?.count as number),
  }),
});

export const { selectAll, selectError, selectOne, selectLoading, selectCount } =
  collateralFeature;
