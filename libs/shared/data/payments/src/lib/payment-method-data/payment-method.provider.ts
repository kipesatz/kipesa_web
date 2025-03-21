import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  AddPaymentMethodEffects,
  fromPaymentMethod,
  LoadPaymentMethodEffects,
} from './+state';

export function providePaymentMethodState() {
  return [
    provideState(fromPaymentMethod.paymentMethodFeature),
    provideEffects([LoadPaymentMethodEffects, AddPaymentMethodEffects]),
  ];
}
