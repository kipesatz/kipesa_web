import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fromPaymentMethod,
  paymentMethodActions,
  PaymentMethodPayload,
} from '../+state';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodFacadeService {
  private store = inject(Store);

  readonly paymentMethods = this.store.selectSignal(
    fromPaymentMethod.selectAll
  );
  readonly loading = this.store.selectSignal(fromPaymentMethod.selectLoading);
  readonly total = this.store.selectSignal(fromPaymentMethod.selectTotal);

  dispatchFetchAll(queryParams?: HttpParams) {
    this.store.dispatch(
      paymentMethodActions.loadPaymentMethods({ queryParams })
    );
  }

  dispatchAddOne(payload: PaymentMethodPayload) {
    this.store.dispatch(paymentMethodActions.addPaymentMethod({ payload }));
  }

  dispatchUpdateOne(id: string, updates: PaymentMethodPayload) {
    this.store.dispatch(
      paymentMethodActions.updatePaymentMethod({ id, updates })
    );
  }
}
