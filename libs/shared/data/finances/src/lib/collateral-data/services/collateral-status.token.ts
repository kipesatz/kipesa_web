import { InjectionToken } from '@angular/core';

export const COLLATERAL_STATUS_TOKEN = new InjectionToken<
  { name: string; value: string; icon: string }[]
>('Returns a list of collateral statuses', {
  providedIn: 'root',
  factory: () => [
    { name: 'pending', value: 'Pending', icon: 'pending' },
    { name: 'verified', value: 'Verified', icon: 'verified' },
    { name: 'released', value: 'Released', icon: 'new_releases' },
    { name: 'liquidated', value: 'Liquidated', icon: 'paid' },
  ],
});
