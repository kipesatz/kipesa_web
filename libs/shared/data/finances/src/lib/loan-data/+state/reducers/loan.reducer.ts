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
import { Loan } from '../models';
import { loanActions } from '../actions';

export const loansFeatureKey = 'loans';

export const adapter = createEntityAdapter<Loan>();

const initialState: KipesaEntityState<Loan> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(loanActions.loadLoans, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(loanActions.loadLoansSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(loanActions.loadLoansFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(loanActions.createLoan, (state) => mutateAddOne('dispatch', state, adapter)),
  on(loanActions.createLoanSuccess, (state, { loan }) =>
    mutateAddOne('success', state, adapter, loan)
  ),
  on(loanActions.createLoanFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(loanActions.updateLoan, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(loanActions.updateLoanSuccess, (state, { updates }) =>
    mutateUpdateOne('success', state, adapter, updates)
  ),
  on(loanActions.updateLoanFailure, (state, { error }) =>
    mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(loanActions.loadLoan, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(loanActions.loadLoanSuccess, (state, { loan }) =>
    mutateLoadOne('success', state, adapter, loan)
  ),
  on(loanActions.loadLoanFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(loanActions.deleteLoan, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.id)
  ),
  on(loanActions.deleteLoanSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(loanActions.deleteLoanFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const loanFeature = createFeature({
  name: loansFeatureKey,
  reducer,
  extraSelectors: ({ selectLoansState, selectEntities, selectQueryset }) => ({
    ...adapter.getSelectors(selectLoansState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as Loan),
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
} = loanFeature;
