import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedAssociationService,
  Membership,
  MembershipStore,
} from '@kps/data/associations';
import { HttpParams } from '@angular/common/http';
import { MatCard, MatCardContent } from '@angular/material/card';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { ConfirmSwitchAssocDialogComponent } from '../confirm-switch-assoc-dialog/confirm-switch-assoc-dialog.component';
import {
  BaseDialogComponent,
  DialogHeaderComponent,
} from '@kps/material/dialog';

@Component({
  selector: 'kps-switch-association-dialog',
  imports: [
    // dialog
    MatDialogContent,
    BaseDialogComponent,
    DialogHeaderComponent,
    // mat card
    MatCard,
    MatCardContent,

    // other
    LoadingIndicatorComponent,
    MatButton,
    MatIcon,
  ],
  providers: [MembershipStore],
  templateUrl: './switch-association-dialog.component.html',
  styleUrl: './switch-association-dialog.component.scss',
})
export class SwitchAssociationDialogComponent implements OnInit {
  private membershipStore = inject(MembershipStore);
  private curAssocService = inject(ActivatedAssociationService);
  private matDialog = inject(MatDialog);
  private dialogRef = inject(DialogRef<SwitchAssociationDialogComponent>);

  membershipsLoading = this.membershipStore.loading;
  memberships = this.membershipStore.memberships;
  membershipsError = this.membershipStore.error;

  ngOnInit(): void {
    this.membershipStore.loadMyMemberships(
      new HttpParams({ fromObject: { status: 'APPROVED' } })
    );
  }

  switchAssociation(membership: Membership): void {
    if (membership.id === this.curAssocService.getId()) {
      return; // No need to switch if already on this tenant
    }

    const dialogRef = this.matDialog.open(ConfirmSwitchAssocDialogComponent, {
      minWidth: '420px',
      width: '50%',
      maxWidth: '600px',
      data: { association: membership.association },
    });

    dialogRef.afterClosed().subscribe((shouldSwitch: boolean) => {
      if (shouldSwitch) {
        this.curAssocService.switchCurAssoc(membership.association).then(() => {
          // close this dialog
          this.dialogRef.close();

          // to assoc dashboard
          this.curAssocService.navigateToAssocDashboard();
        });
      }
    });
  }

  isCurrent(membership: Membership): boolean {
    return membership.id === this.curAssocService.getId();
  }
}
