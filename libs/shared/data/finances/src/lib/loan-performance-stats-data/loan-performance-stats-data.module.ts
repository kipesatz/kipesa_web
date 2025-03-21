import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import * as fromLoanPerformance from './loan-performance-stats.reducer';
import { LoadLoanPerformanceStatsEffects } from './load-loan-performance-stats.effects';
import { provideEffects } from '@ngrx/effects';

@NgModule({
  providers: [
    provideState(fromLoanPerformance.loansPerformanceStatsFeature),
    provideEffects([LoadLoanPerformanceStatsEffects]),
  ],
})
export class LoanPerformanceStatsDataModule {}
