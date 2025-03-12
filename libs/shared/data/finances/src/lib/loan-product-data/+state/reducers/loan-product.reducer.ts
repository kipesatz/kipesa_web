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
import { LoanProduct } from '../models';
import { loanProductActions } from '../actions';

export const loanProductsFeatureKey = 'loanProducts';

export const adapter = createEntityAdapter<LoanProduct>();

const initialState: KipesaEntityState<LoanProduct> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(loanProductActions.loadLoanProducts, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(loanProductActions.loadLoanProductsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(loanProductActions.loadLoanProductsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(loanProductActions.createLoanProduct, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(loanProductActions.createLoanProductSuccess, (state, { loanProduct }) =>
    mutateAddOne('success', state, adapter, loanProduct)
  ),
  on(loanProductActions.createLoanProductFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(loanProductActions.loadLoanProduct, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(loanProductActions.loadLoanProductSuccess, (state, { loanProduct }) =>
    mutateLoadOne('success', state, adapter, loanProduct)
  ),
  on(loanProductActions.loadLoanProductFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(loanProductActions.deleteLoanProduct, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.id)
  ),
  on(loanProductActions.deleteLoanProductSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(loanProductActions.deleteLoanProductFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const loanProductFeature = createFeature({
  name: loanProductsFeatureKey,
  reducer,
  extraSelectors: ({
    selectLoanProductsState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectLoanProductsState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as LoanProduct),
    selectCount: () =>
      createSelector(selectQueryset, (qs) => qs?.count as number),
  }),
});

export const {
  selectAll,
  selectError,
  selectOne,
  selectTotal,
  selectLoading,
  selectCount,
} = loanProductFeature;
