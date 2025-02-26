import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  fromPaymentMethod,
  LoadPaymentMethodEffects,
  AddPaymentMethodEffects,
  UpdatePaymentMethodEffects,
  DeletePaymentMethodEffects,
} from './+state';

@NgModule({
  providers: [
    provideState(fromPaymentMethod.paymentMethodFeature),
    provideEffects([
      LoadPaymentMethodEffects,
      AddPaymentMethodEffects,
      UpdatePaymentMethodEffects,
      DeletePaymentMethodEffects,
    ]),
  ],
})
export class PaymentMethodDataModule {}
