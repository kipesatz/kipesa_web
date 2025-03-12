import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import { fromLoanProduct } from './+state/reducers';
import { provideEffects } from '@ngrx/effects';
import { AddLoanProductEffects, LoadLoanProductEffects } from './+state';

@NgModule({
  providers: [
    provideState(fromLoanProduct.loanProductFeature),
    provideEffects([AddLoanProductEffects, LoadLoanProductEffects]),
  ],
})
export class LoanProductDataModule {}
