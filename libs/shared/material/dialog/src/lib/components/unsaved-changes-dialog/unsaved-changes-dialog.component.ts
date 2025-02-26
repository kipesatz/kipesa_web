import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ButtonComponent } from '@kps/material/button';

@Component({
  selector: 'kps-unsaved-changes-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './unsaved-changes-dialog.component.html',
  styles: ``,
})
export class UnsavedChangesDialogComponent {
  constructor(private dialogRef: MatDialogRef<UnsavedChangesDialogComponent>) {}

  stayEditing(): void {
    this.dialogRef.close(false);
  }

  confirmExit(): void {
    this.dialogRef.close(true);
  }
}
