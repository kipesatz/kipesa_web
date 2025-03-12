import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromLoan, loanActions, LoanPayload } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class LoanFacadeService {
  private store = inject(Store);

  readonly loans = this.store.selectSignal(fromLoan.selectAll);
  readonly loading = this.store.selectSignal(fromLoan.selectLoading);
  readonly loansCount = this.store.selectSignal(fromLoan.selectCount);
  readonly totalLoans = this.store.selectSignal(fromLoan.selectTotal);

  fetchAssocMembersLoans(queryParams?: HttpParams) {
    this.store.dispatch(loanActions.loadLoans({ queryParams }));
  }

  dispatchAddOne(payload: LoanPayload) {
    this.store.dispatch(loanActions.createLoan({ payload }));
  }

  deleteLoan(id: string) {
    this.store.dispatch(loanActions.deleteLoan({ id }));
  }
}
