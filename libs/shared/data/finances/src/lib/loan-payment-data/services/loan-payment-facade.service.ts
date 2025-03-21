import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  fromLoanPayment,
  loanPaymentActions,
  LoanPaymentPayload,
} from '../+state';

@Injectable({
  providedIn: 'root',
})
export class LoanPaymentFacadeService {
  private store = inject(Store);

  readonly allLoanPayments = this.store.selectSignal(fromLoanPayment.selectAll);
  readonly loading = this.store.selectSignal(fromLoanPayment.selectLoading);
  readonly count = this.store.selectSignal(fromLoanPayment.selectCount);

  // TODO: Must specify the loanId
  dispatchFetchLoanRepayments(queryParams?: HttpParams) {
    this.store.dispatch(loanPaymentActions.loadLoanPayments({ queryParams }));
  }

  dispatchAddOne(payload: LoanPaymentPayload) {
    this.store.dispatch(loanPaymentActions.addLoanPayment({ payload }));
  }
}
