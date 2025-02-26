import { inject, Injectable } from '@angular/core';
import { fromPaymentMethod, paymentMethodActions } from '../+state';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodFacadeService {
  private store = inject(Store);

  readonly allPaymentMethods = this.store.selectSignal(
    fromPaymentMethod.selectAll
  );
  readonly loading = this.store.selectSignal(fromPaymentMethod.selectLoading);
  readonly count = this.store.selectSignal(fromPaymentMethod.selectCount);
  readonly total = this.store.selectSignal(fromPaymentMethod.selectTotal);

  dispatchFetchAll(queryParams?: HttpParams) {
    this.store.dispatch(
      paymentMethodActions.loadPaymentMethods({ queryParams })
    );
  }

  dispatchCreateOne(payload: FormData) {
    this.store.dispatch(paymentMethodActions.addPaymentMethod({ payload }));
  }

  dispatchUpdateOne(id: string, updates: FormData) {
    this.store.dispatch(
      paymentMethodActions.updatePaymentMethod({ id, updates })
    );
  }

  dispatchDelete(id: string) {
    this.store.dispatch(paymentMethodActions.deletePaymentMethod({ id }));
  }
}
