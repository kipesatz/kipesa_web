import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { Association } from '@kps/data/associations';
import { ButtonComponent } from '@kps/material/button';
import { map, take, timer } from 'rxjs';

@Component({
  selector: 'kps-assoc-switch-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDivider,
    MatDialogActions,
    ButtonComponent,
  ],
  templateUrl: './assoc-switch-dialog.component.html',
  styles: ``,
})
export class AssocSwitchDialogComponent {
  private dialogRef = inject(MatDialogRef<AssocSwitchDialogComponent>);
  private dialogData: { association: Association } = inject(MAT_DIALOG_DATA);
  private timerThreshold = 30;

  constructor() {
    effect(() => {
      if (this.timerVal() === 1) {
        this.dialogRef.close(true);
      }
    });
  }

  // a decreasing interval from 30s, 29s
  timerVal = toSignal(
    timer(0, 1000).pipe(
      take(this.timerThreshold),
      map((val) => this.timerThreshold - val)
    )
  );

  getAssociation() {
    try {
      return this.dialogData.association;
    } catch (_: unknown) {
      // close the dialog and throw an error
      this.dialogRef.close(false);
      throw Error('AssocSwitchDialog must have `association` as data');
    }
  }

  switchAssociation(dialogResult: boolean): void {
    this.dialogRef.close(dialogResult);
  }
}
