import { inject, Injectable } from '@angular/core';
import { fromPaymentProvider, paymentProviderActions } from '../+state';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class PaymentProviderFacadeService {
  private store = inject(Store);

  readonly allPaymentProviders = this.store.selectSignal(
    fromPaymentProvider.selectAll
  );
  readonly loading = this.store.selectSignal(fromPaymentProvider.selectLoading);
  readonly count = this.store.selectSignal(fromPaymentProvider.selectCount);
  readonly total = this.store.selectSignal(fromPaymentProvider.selectTotal);

  dispatchFetchAll(queryParams?: HttpParams) {
    this.store.dispatch(
      paymentProviderActions.loadPaymentProviders({ queryParams })
    );
  }

  dispatchCreateOne(payload: FormData) {
    this.store.dispatch(paymentProviderActions.addPaymentProvider({ payload }));
  }

  dispatchUpdateOne(id: string, updates: FormData) {
    this.store.dispatch(
      paymentProviderActions.updatePaymentProvider({ id, updates })
    );
  }
}
