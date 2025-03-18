import { InjectionToken } from '@angular/core';

export interface PaymentChannelOption {
  name: string;
  icon: string;
}

export const PAYMENT_CHANNEL_OPTIONS = new InjectionToken<
  PaymentChannelOption[]
>('PAYMENT_CHANNEL_OPTIONS', {
  factory: () => [
    {
      name: 'Bank',
      icon: 'bank',
    },
    {
      name: 'Mobile',
      icon: 'smartphone',
    },
  ],
});
