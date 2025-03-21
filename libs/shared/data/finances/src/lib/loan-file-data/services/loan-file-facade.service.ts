import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loanFileActions } from '../+state';
import { fromLoanFile } from '../+state/reducers';

@Injectable({
  providedIn: 'root',
})
export class LoanFileFacadeService {
  private store = inject(Store);

  readonly allLoanFiles = this.store.selectSignal(fromLoanFile.selectAll);
  readonly loading = this.store.selectSignal(fromLoanFile.selectLoading);
  readonly count = this.store.selectSignal(fromLoanFile.selectCount);
  readonly total = this.store.selectSignal(fromLoanFile.selectTotal);

  dispatchLoadLoanFiles(loanId: string, queryParams?: HttpParams) {
    this.store.dispatch(loanFileActions.loadLoanFiles({ loanId, queryParams }));
  }

  dispatchUploadOne(loanId: string, payload: FormData) {
    this.store.dispatch(loanFileActions.uploadLoanFile({ loanId, payload }));
  }

  dispatchDelete(fileId: string) {
    this.store.dispatch(loanFileActions.deleteLoanFile({ fileId }));
  }
}
