import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
  mutateAddOne,
  mutateLoadOne,
} from '@kps/data/core';
import { LoanPayment } from '../models';
import { loanPaymentActions } from '../actions';

export const loanPaymentsFeatureKey = 'loanPayments';

export const adapter = createEntityAdapter<LoanPayment>();

const initialState: KipesaEntityState<LoanPayment> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(loanPaymentActions.loadLoanPayments, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(loanPaymentActions.loadLoanPaymentsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(loanPaymentActions.loadLoanPaymentsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(loanPaymentActions.addLoanPayment, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(loanPaymentActions.addLoanPaymentSuccess, (state, { loanPayment }) =>
    mutateAddOne('success', state, adapter, loanPayment)
  ),
  on(loanPaymentActions.addLoanPaymentFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(loanPaymentActions.loadLoanPayment, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(loanPaymentActions.loadLoanPaymentSuccess, (state, { loanPayment }) =>
    mutateLoadOne('success', state, adapter, loanPayment)
  ),
  on(loanPaymentActions.loadLoanPaymentFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  )
);

export const loanPaymentFeature = createFeature({
  name: loanPaymentsFeatureKey,
  reducer,
  extraSelectors: ({
    selectLoanPaymentsState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectLoanPaymentsState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as LoanPayment),
    selectCount: () =>
      createSelector(selectQueryset, (qs) => qs?.count as number),
  }),
});

export const { selectAll, selectError, selectOne, selectLoading, selectCount } =
  loanPaymentFeature;
