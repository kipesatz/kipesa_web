import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loanProductActions, LoanProductPayload } from '../+state';
import { fromLoanProduct } from '../+state/reducers';

@Injectable({
  providedIn: 'root',
})
export class LoanProductFacadeService {
  private store = inject(Store);

  readonly allLoanProducts = this.store.selectSignal(fromLoanProduct.selectAll);
  readonly loading = this.store.selectSignal(fromLoanProduct.selectLoading);
  readonly count = this.store.selectSignal(fromLoanProduct.selectCount);
  readonly total = this.store.selectSignal(fromLoanProduct.selectTotal);

  fetchAssocLoanProducts(queryParams?: HttpParams) {
    this.store.dispatch(loanProductActions.loadLoanProducts({ queryParams }));
  }

  dispatchAddOne(payload: LoanProductPayload) {
    this.store.dispatch(loanProductActions.createLoanProduct({ payload }));
  }

  dispatchDelete(id: string) {
    this.store.dispatch(loanProductActions.deleteLoanProduct({ id }));
  }
}
