import { InjectionToken } from '@angular/core';
import { KpsStorage } from './storage.type';

export const BROWSER_STORAGE_TYPE =
  new InjectionToken<KpsStorage | null>(
    'Configure browser storage to use.',
    {
      providedIn: 'root',
      factory: () => localStorage as KpsStorage,
    }
  );

export const JWT_AUTH_TOKEN_KEY = new InjectionToken<string>(
  'Provides a lookup key for getting JWT token response after authentication',
  { providedIn: 'root', factory: () => 'JWT_AUTH_TOKEN' }
);
