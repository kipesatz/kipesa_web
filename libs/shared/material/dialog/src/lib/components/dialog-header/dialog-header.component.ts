import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { IconicButtonComponent } from '@kps/material/button';

@Component({
  selector: 'kps-dialog-header',
  imports: [MatToolbar, MatDialogTitle, IconicButtonComponent],
  templateUrl: './dialog-header.component.html',
  styleUrl: './dialog-header.component.scss',
})
export class DialogHeaderComponent {
  private dialogRef = inject(MatDialogRef);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
