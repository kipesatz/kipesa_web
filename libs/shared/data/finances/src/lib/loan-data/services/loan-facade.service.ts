import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromLoan, loanActions } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class LoanFacadeService {
  private store = inject(Store);

  readonly loans = this.store.selectSignal(fromLoan.selectAll);
  readonly loading = this.store.selectSignal(fromLoan.selectLoading);
  readonly loansCount = this.store.selectSignal(fromLoan.selectCount);
  readonly totalLoans = this.store.selectSignal(fromLoan.selectTotal);

  fetchAll(queryParams?: HttpParams) {
    this.store.dispatch(loanActions.loadLoans({ queryParams }));
  }

  deleteLoan(id: string) {
    this.store.dispatch(loanActions.deleteLoan({ id }));
  }
}
