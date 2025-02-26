import { Component, inject, input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'kps-base-dialog',
  imports: [],
  templateUrl: './base-dialog.component.html',
  styles: ``,
})
export class BaseDialogComponent {
  protected dialogRef = inject(MatDialogRef);
  dialogTitle = input<string>();
}
