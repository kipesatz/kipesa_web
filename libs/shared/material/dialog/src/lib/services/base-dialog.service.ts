import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class BaseDialogService {
  private dialog = inject(MatDialog);

  openSideDialog<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config: MatDialogConfig<D> = {}
  ): MatDialogRef<T, R> {
    const position = config.position || 'end';
    const width = config.width || '450px';
    const minWidth = config.minWidth || '65vw';

    const dialogConfig: MatDialogConfig = {
      ...config,
      position: { bottom: '0', top: '0' },
      height: '100vh',
      maxHeight: '100vh !important',
      width,
      minWidth,
      panelClass: ['side-dialog', `side-dialog-${position}`],
      hasBackdrop: true,
      autoFocus: true,
      enterAnimationDuration: '225ms',
      exitAnimationDuration: '225ms',
    };

    return this.dialog.open(component, dialogConfig);
  }

  openDefault<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config: MatDialogConfig<D> = {}
  ): MatDialogRef<T, R> {
    return this.dialog.open(component, {...config, maxHeight: '90vh'});
  }
}
