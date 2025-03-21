import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import {
  AddPaymentMethodEffects,
  fromPaymentMethod,
  LoadPaymentMethodEffects,
} from './+state';
import { provideState } from '@ngrx/store';

@NgModule({
  providers: [
    provideState(fromPaymentMethod.paymentMethodFeature),
    provideEffects([LoadPaymentMethodEffects, AddPaymentMethodEffects]),
  ],
})
export class PaymentMethodDataModule {}
