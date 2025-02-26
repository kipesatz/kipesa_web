import { NgModule } from '@angular/core';
import {
  AddLoanEffects,
  DeleteLoanEffects,
  fromLoan,
  LoadLoanEffects,
  UpdateLoanEffects,
} from './+state';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

@NgModule({
  providers: [
    provideState(fromLoan.loanFeature),
    provideEffects([
      LoadLoanEffects,
      AddLoanEffects,
      UpdateLoanEffects,
      DeleteLoanEffects,
    ]),
  ],
})
export class LoanDataModule {}
