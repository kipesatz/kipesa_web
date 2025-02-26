import { Injectable, inject } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UNSAVED_CHANGES_DIALOG_CONFIG } from '../../constants';
import { UnsavedChangesDialogComponent } from '../../components';

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesDialogService<CT> {
  public matDialog: MatDialog = inject(MatDialog);
  public dialogRef: MatDialogRef<CT> = inject(MatDialogRef<CT>);

  checkForUnsavedChanges(controller: AbstractControl): void {
    // form is touched and has unsaved changes
    if (controller.touched && controller.dirty) {
      const unsavedChangesDialogRef = this.matDialog.open(
        UnsavedChangesDialogComponent,
        UNSAVED_CHANGES_DIALOG_CONFIG
      );
      unsavedChangesDialogRef.afterClosed().subscribe((shouldClose) => {
        if (shouldClose) {
          this.dialogRef.close();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }
}
