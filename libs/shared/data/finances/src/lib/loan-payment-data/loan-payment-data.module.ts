import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import {
  AddLoanPaymentEffects,
  fromLoanPayment,
  LoadLoanPaymentEffects,
} from './+state';
import { provideState } from '@ngrx/store';

@NgModule({
  providers: [
    provideState(fromLoanPayment.loanPaymentFeature),
    provideEffects([AddLoanPaymentEffects, LoadLoanPaymentEffects]),
  ],
})
export class LoanPaymentDataModule {}
