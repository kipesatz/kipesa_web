import { InjectionToken } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const KPS_DEFAULT_SNACKBAR_CONFIG: InjectionToken<MatSnackBarConfig> =
  new InjectionToken<MatSnackBarConfig>('Sanaa Zetu default snackbar config', {
    factory: () => {
      return {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      };
    },
  });
