import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { ButtonComponent } from '@kps/material/button';

@Component({
  selector: 'kps-deletion-conf-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDivider,
    MatDialogActions,
    ButtonComponent,
  ],
  templateUrl: './deletion-conf-dialog.component.html',
  styles: ``,
})
export class DeletionConfDialogComponent {
  private dialogRef = inject(MatDialogRef<DeletionConfDialogComponent>);

  confirmationBtnText = 'I understand, proceed';
  cancellationnBtnText = 'No, cancel';

  closeDialog(dialogResult: boolean): void {
    this.dialogRef.close(dialogResult);
  }
}
