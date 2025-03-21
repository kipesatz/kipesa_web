import { InjectionToken } from '@angular/core';

export const LOAN_FILE_STATUS_TOKEN = new InjectionToken<
  { name: string; value: string; icon: string }[]
>('Returns a list of loan statuses', {
  providedIn: 'root',
  factory: () => [
    { name: 'pending', value: 'Pending', icon: 'pending' },
    { name: 'verified', value: 'Verified', icon: 'verified' },
    { name: 'rejected', value: 'Rejected', icon: 'cancel' },
  ],
});
