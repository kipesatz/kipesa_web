import { Component, inject, OnDestroy } from '@angular/core';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  Contribution,
  ContributionFacadeService,
  contributionActions,
} from '@kps/data/finances';
import { ButtonComponent } from '@kps/material/button';
import {
  BaseDialogComponent,
  DialogFooterComponent,
} from '@kps/material/dialog';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'kps-contribution-approve-dialog',
  imports: [
    ButtonComponent,
    BaseDialogComponent,
    DialogFooterComponent,
    MatDialogContent,
    MatDialogClose,
    ButtonComponent,
  ],
  template: `
    <kps-base-dialog dialogTitle="Approve Contribution">
      <mat-dialog-content>
        Are you sure you want to approve this contribution?
      </mat-dialog-content>

      <kps-dialog-footer>
        <kps-button
          color="primary"
          text="Approve"
          btnAriaLabel="Approve"
          (click)="approveContribution()"
        />
        <kps-button
          matDialogClose
          btnAriaLabel="close"
          color="warn"
          text="Cancel"
        />
      </kps-dialog-footer>
    </kps-base-dialog>
  `,
  styles: ``,
})
export class ContributionApproveDialogComponent implements OnDestroy {
  private dialogRef = inject(MatDialogRef);
  private facadeService = inject(ContributionFacadeService);
  private actions$ = inject(Actions);
  private dialogData: { contribution: Contribution } = inject(MAT_DIALOG_DATA);

  private subscriptions = new Subscription();
  loading = this.facadeService.loading;

  approveContribution(): void {
    // Dispatch approve action
    this.facadeService.dispatchApprove(this.dialogData.contribution.id);

    // Close dialog when done
    this.subscriptions.add(
      this.actions$
        .pipe(ofType(contributionActions.approveContributionSuccess))
        .subscribe(() => this.dialogRef.close(true))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
