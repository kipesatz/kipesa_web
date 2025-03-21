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
import { PaymentMethod } from '../models';
import { paymentMethodActions } from '../actions';

export const paymentMethodsFeatureKey = 'paymentMethods';

export const adapter = createEntityAdapter<PaymentMethod>();

const initialState: KipesaEntityState<PaymentMethod> = initEntityState(adapter);

export const reducer = createReducer(
  initialState,
  on(paymentMethodActions.loadPaymentMethods, (state) =>
    mutateLoadMany('dispatch', state, adapter)
  ),
  on(paymentMethodActions.loadPaymentMethodsSuccess, (state, { queryset }) =>
    mutateLoadMany('success', state, adapter, queryset)
  ),
  on(paymentMethodActions.loadPaymentMethodsFailure, (state, { error }) =>
    mutateLoadMany('failure', state, adapter, undefined, error)
  ),
  on(paymentMethodActions.addPaymentMethod, (state) =>
    mutateAddOne('dispatch', state, adapter)
  ),
  on(paymentMethodActions.addPaymentMethodSuccess, (state, { paymentMethod }) =>
    mutateAddOne('success', state, adapter, paymentMethod)
  ),
  on(paymentMethodActions.addPaymentMethodFailure, (state, { error }) =>
    mutateAddOne('failure', state, adapter, undefined, error)
  ),
  on(paymentMethodActions.updatePaymentMethod, (state) =>
    mutateUpdateOne('dispatch', state, adapter)
  ),
  on(paymentMethodActions.updatePaymentMethodSuccess, (state, { updates }) =>
    mutateUpdateOne('success', state, adapter, updates)
  ),
  on(paymentMethodActions.updatePaymentMethodFailure, (state, { error }) =>
    mutateUpdateOne('failure', state, adapter, undefined, error)
  ),
  on(paymentMethodActions.loadPaymentMethod, (state) =>
    mutateLoadOne('dispatch', state, adapter)
  ),
  on(
    paymentMethodActions.loadPaymentMethodSuccess,
    (state, { paymentMethod }) =>
      mutateLoadOne('success', state, adapter, paymentMethod)
  ),
  on(paymentMethodActions.loadPaymentMethodFailure, (state, { error }) =>
    mutateLoadOne('failure', state, adapter, undefined, error)
  ),
  on(paymentMethodActions.deletePaymentMethod, (state, action) =>
    mutateDeleteOne('dispatch', state, adapter, action.id)
  ),
  on(paymentMethodActions.deletePaymentMethodSuccess, (state) =>
    mutateDeleteOne('success', state, adapter)
  ),
  on(paymentMethodActions.deletePaymentMethodFailure, (state, { error }) =>
    mutateDeleteOne('success', state, adapter, undefined, error)
  )
);

export const paymentMethodFeature = createFeature({
  name: paymentMethodsFeatureKey,
  reducer,
  extraSelectors: ({
    selectPaymentMethodsState,
    selectEntities,
    selectQueryset,
  }) => ({
    ...adapter.getSelectors(selectPaymentMethodsState),
    selectOne: (id: string) =>
      createSelector(
        selectEntities,
        (entities) => entities[id] as PaymentMethod
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
} = paymentMethodFeature;
