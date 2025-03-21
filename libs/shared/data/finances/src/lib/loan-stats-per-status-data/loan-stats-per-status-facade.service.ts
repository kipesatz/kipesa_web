import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromLoanStatsPerStatus from './loan-stats-per-status.reducer';
import { loanStatsPerStatusActions } from './loan-stats-per-status.actions';

@Injectable({
  providedIn: 'root',
})
export class LoanStatsPerStatusFacadeService {
  private store = inject(Store);

  allStatsPerStatus = this.store.selectSignal(fromLoanStatsPerStatus.selectAll);
  loading = this.store.selectSignal(fromLoanStatsPerStatus.selectLoading);
  error = this.store.selectSignal(fromLoanStatsPerStatus.selectError);

  dispatchFetchStats(): void {
    this.store.dispatch(loanStatsPerStatusActions.loadLoanStatsPerStatus());
  }
}
