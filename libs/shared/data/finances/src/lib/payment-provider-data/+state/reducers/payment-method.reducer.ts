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
import { PaymentProvider } from '../models';
import { paymentProviderActions } from '../actions';

export const paymentProvidersFeatureKey = 'paymentProviders';

export const adapter = createEntityAdapter<PaymentProvider>();

const initialState: KipesaEntityState<PaymentProvider> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(paymentProviderActions.loadPaymentProviders, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(paymentProviderActions.loadPaymentProvidersSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(paymentProviderActions.loadPaymentProvidersFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(paymentProviderActions.addPaymentProvider, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(
    paymentProviderActions.addPaymentProviderSuccess,
    (state, { paymentProvider }) =>
      mutateAddOne('success', state, adapter, paymentProvider)
  ),
  on(paymentProviderActions.addPaymentProviderFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(paymentProviderActions.updatePaymentProvider, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(paymentProviderActions.updatePaymentProviderSuccess, (state, { updates }) =>
    mutateUpdateOne('success', state, adapter, updates)
  ),
  on(paymentProviderActions.updatePaymentProviderFailure, (state, { error }) =>
    mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(paymentProviderActions.loadPaymentProvider, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(
    paymentProviderActions.loadPaymentProviderSuccess,
    (state, { paymentProvider }) =>
      mutateLoadOne('success', state, adapter, paymentProvider)
  ),
  on(paymentProviderActions.loadPaymentProviderFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(paymentProviderActions.deletePaymentProvider, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.id)
  ),
  on(paymentProviderActions.deletePaymentProviderSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(paymentProviderActions.deletePaymentProviderFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const paymentProviderFeature = createFeature({
  name: paymentProvidersFeatureKey,
  reducer,
  extraSelectors: ({
    selectPaymentProvidersState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectPaymentProvidersState),
    selectOne: (id: string) =>
      createSelector(
        selectEntities,
        (entities) => entities[id] as PaymentProvider
      ),
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
} = paymentProviderFeature;
