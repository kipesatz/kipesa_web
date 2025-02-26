import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';

import { transactionActions } from '../actions';
import {
  KipesaEntityState,
  initEntityState,
  mutateLoadMany,
  mutateUpdateOne,
  mutateLoadOne,
  mutateDeleteOne,
} from '@kps/data/core';
import { Transaction } from '../models';

export const transactionsFeatureKey = 'transactions';

export const adapter = createEntityAdapter<Transaction>();

const initialState: KipesaEntityState<Transaction> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(transactionActions.loadTransactions, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(transactionActions.loadTransactionsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(transactionActions.loadTransactionsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(transactionActions.updateTransaction, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(transactionActions.updateTransactionSuccess, (state, { updates }) =>
    mutateUpdateOne('success', state, adapter, updates)
  ),
  on(transactionActions.updateTransactionFailure, (state, { error }) =>
    mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(transactionActions.loadTransaction, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(transactionActions.loadTransactionSuccess, (state, { transaction }) =>
    mutateLoadOne('success', state, adapter, transaction)
  ),
  on(transactionActions.loadTransactionFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(transactionActions.deleteTransaction, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.id)
  ),
  on(transactionActions.deleteTransactionSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(transactionActions.deleteTransactionFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const transactionFeature = createFeature({
  name: transactionsFeatureKey,
  reducer,
  extraSelectors: ({
    selectTransactionsState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectTransactionsState),
    selectOne: (id: string) =>
      createSelector(selectEntities, (entities) => entities[id] as Transaction),
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
} = transactionFeature;
