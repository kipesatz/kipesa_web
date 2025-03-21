import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromLoanPerformance from './loan-performance-stats.reducer';
import { loanPerformanceStatsActions } from './loan-performance-stats.actions';

@Injectable({
  providedIn: 'root',
})
export class LoanPerformanceStatsFacadeService {
  private store = inject(Store);

  stats = this.store.selectSignal(fromLoanPerformance.selectStats);
  loading = this.store.selectSignal(fromLoanPerformance.selectLoading);
  error = this.store.selectSignal(fromLoanPerformance.selectError);

  dispatchFetchPerformanceStats(): void {
    this.store.dispatch(loanPerformanceStatsActions.loadLoanPerformanceStats());
  }
}
