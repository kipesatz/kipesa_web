import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import * as fromLoanStatsPerStatus from './loan-stats-per-status.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoanStatsPerStatusEffects } from './loan-stats-per-status.effects';

@NgModule({
  providers: [
    provideState(fromLoanStatsPerStatus.loanStatsPerStatusFeature),
    provideEffects([LoanStatsPerStatusEffects]),
  ],
})
export class LoanStatsPerStatusDataModule {}
