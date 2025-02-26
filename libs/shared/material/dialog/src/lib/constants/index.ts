import { MatDialogConfig } from '@angular/material/dialog';

export const UNSAVED_CHANGES_DIALOG_CONFIG: MatDialogConfig = {
  width: '350px',
  height: 'auto',
  position: {},
  ariaLabel: 'Unsaved changes dialog',
  role: 'alertdialog',
};

export const KpsDialogDefaultConfig: MatDialogConfig = {
  enterAnimationDuration: 300,
  exitAnimationDuration: 300,
  disableClose: true,
  role: 'dialog',
  maxHeight: '100vh',
};
