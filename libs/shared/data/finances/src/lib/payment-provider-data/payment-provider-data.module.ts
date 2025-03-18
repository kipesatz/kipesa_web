import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  fromPaymentProvider,
  LoadPaymentProviderEffects,
  AddPaymentProviderEffects,
  UpdatePaymentProviderEffects,
} from './+state';

@NgModule({
  providers: [
    provideState(fromPaymentProvider.paymentProviderFeature),
    provideEffects([
      LoadPaymentProviderEffects,
      AddPaymentProviderEffects,
      UpdatePaymentProviderEffects,
    ]),
  ],
})
export class PaymentProviderDataModule {}
