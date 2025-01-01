import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  DEFAULT_CURRENCY_CODE,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './interceptors';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { KpsDialogDefaultConfig } from '@kps/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: KpsDialogDefaultConfig },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'TSH' },
  ],
};
