import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  fromTransaction,
  LoadTransactionEffects,
  UpdateTransactionEffects,
} from './+state';

@NgModule({
  providers: [
    provideState(fromTransaction.transactionFeature),
    provideEffects([LoadTransactionEffects, UpdateTransactionEffects]),
  ],
})
export class TransactionDataModule {}
