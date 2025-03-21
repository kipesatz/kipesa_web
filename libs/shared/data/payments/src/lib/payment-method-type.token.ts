import { InjectionToken } from '@angular/core';

export interface PaymentMethodType {
  name: string;
  value: string;
  icon: string;
}

export const PAYMENT_METHOD_TYPES = new InjectionToken<PaymentMethodType[]>(
  'PAYMENT_METHOD_TYPES',
  {
    factory: () => [
      {
        name: 'Mobile Money',
        value: 'MOBILE',
        icon: 'smartphone',
      },
      {
        name: 'Credit Card',
        value: 'CREDIT_CARD',
        icon: 'credit_card',
      },
      {
        name: 'Debit Card',
        value: 'DEBIT_CARD',
        icon: 'credit_card',
      },
    ],
  }
);
