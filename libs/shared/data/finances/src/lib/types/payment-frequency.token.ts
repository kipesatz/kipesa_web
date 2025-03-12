import { InjectionToken } from '@angular/core';

export const PAYMENT_FREQ_CHOICES = new InjectionToken<
  { name: string; value: string }[]
>('Returns payment frequency choices', {
  providedIn: 'root',
  factory: () => {
    return [
      { name: 'weekly', value: 'Weekly' },
      { name: 'biweekly', value: 'Bi-weekly' },
      { name: 'monthly', value: 'Monthly' },
      { name: 'quarterly', value: 'Quarterly' },
      { name: 'annually', value: 'Annually' },
    ];
  },
});

export interface Country {
  currencyCode: string;
  name: string;
}

export const ALLOWED_COUNTRY_CURRENCIES = new InjectionToken<Country[]>(
  'Provides a list of acceptable currencies',
  {
    factory: () => [
      { name: 'Tanzania', currencyCode: 'TZS' },
      { name: 'Kenya', currencyCode: 'KES' },
      { name: 'Uganda', currencyCode: 'UGX' },
      { name: 'Zambia', currencyCode: 'ZMW' },
      { name: 'Malawi', currencyCode: 'MWK' },
      { name: 'South Africa', currencyCode: 'ZAR' },
      { name: 'Japan', currencyCode: 'JPY' },
      { name: 'United Kingdom', currencyCode: 'GBP' },
      { name: 'China', currencyCode: 'CNY' },
    ],
  }
);
