import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Membership, MembershipFacadeService } from '@kps/data/associations';
import { ButtonComponent } from '@kps/material/button';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'kps-membership-approval-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDivider,
    ButtonComponent,
  ],
  template: `
    <h2 mat-dialog-title>
      <strong>Approve: </strong> {{ membership.user.fullName }}
    </h2>
    <mat-divider></mat-divider>

    <mat-dialog-content>
      <p>
        You are about to switch to approve {{ membership.user.fullName }} as a
        member of your association {{ membership.association.name }}
      </p>
    </mat-dialog-content>

    <mat-dialog-actions class="d-inline-flex flex-nowrap gap-3">
      <kps-button
        btnAriaLabel="cancel"
        text="CANCEL"
        (clicked)="approveMember(false)"
        btnColor="warn"
      />
      <kps-button
        btnAriaLabel="OK"
        text="OK"
        variant="flat"
        (clicked)="approveMember(true)"
      ></kps-button>
    </mat-dialog-actions>
  `,
  styles: ``,
})
export class MembershipApprovalDialogComponent {
  private dialogData: { membership: Membership } = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<MembershipApprovalDialogComponent>);
  private membershipFacade = inject(MembershipFacadeService);

  get membership() {
    return this.dialogData.membership;
  }

  approveMember(approve: boolean): void {
    if (approve) {
      this.membershipFacade.dispatchApproveRequest(this.membership.id, {
        status: 'APPROVED',
      });
      this.dialogRef.close();
    } else {
      this.dialogRef.close(false);
    }
  }
}
