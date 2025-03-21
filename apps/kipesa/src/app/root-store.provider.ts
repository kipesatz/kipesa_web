import { isDevMode } from '@angular/core';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  AddPaymentProviderEffects,
  fromPaymentProvider,
  LoadPaymentProviderEffects,
  UpdatePaymentProviderEffects,
} from '@kps/data/finances';
import {
  AddPaymentMethodEffects,
  fromPaymentMethod,
  LoadPaymentMethodEffects,
} from '@kps/data/payments';
import {
  CreateAssociationEffects,
  fromAssociation,
  LoadAssociationEffects,
} from '@kps/data/associations';

export function provideRootStore() {
  return [
    provideStore({}),
    provideEffects(
      AddPaymentProviderEffects,
      LoadPaymentProviderEffects,
      UpdatePaymentProviderEffects,
      LoadPaymentMethodEffects,
      AddPaymentMethodEffects,
      CreateAssociationEffects,
      LoadAssociationEffects
    ),
    provideState(fromPaymentProvider.paymentProviderFeature),
    provideState(fromPaymentMethod.paymentMethodFeature),
    provideState(fromAssociation.associationsFeature),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ];
}
