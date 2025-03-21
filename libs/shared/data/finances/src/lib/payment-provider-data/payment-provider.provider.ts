import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  AddPaymentProviderEffects,
  fromPaymentProvider,
  LoadPaymentProviderEffects,
} from './+state';

export function providePaymentProviderState() {
  return [
    provideState(fromPaymentProvider.paymentProviderFeature),
    provideEffects([LoadPaymentProviderEffects, AddPaymentProviderEffects]),
  ];
}
