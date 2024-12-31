import { Injectable, inject } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components';
import { KPS_DEFAULT_SNACKBAR_CONFIG } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class KpsSnackBarService {
  private snackBarConfig = inject(KPS_DEFAULT_SNACKBAR_CONFIG);
  private matSnackBar = inject(MatSnackBar);

  openSnackBar(config?: MatSnackBarConfig, component?: ComponentType<unknown>) {
    this.matSnackBar.openFromComponent(
      component ? component : (SnackBarComponent as ComponentType<unknown>),
      {
        ...this.snackBarConfig,
        ...config,
      }
    );
  }
}
