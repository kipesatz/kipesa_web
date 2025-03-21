import { InjectionToken } from '@angular/core';

export interface PaymentChannelOption {
  name: string;
  value: string;
  icon: string;
}

export const PAYMENT_CHANNEL_OPTIONS = new InjectionToken<
  PaymentChannelOption[]
>('PAYMENT_CHANNEL_OPTIONS', {
  factory: () => [
    {
      name: 'Bank',
      value: 'BANK',
      icon: 'assured_workload',
    },
    {
      name: 'Mobile',
      value: 'MOBILE',
      icon: 'smartphone',
    },
  ],
});
