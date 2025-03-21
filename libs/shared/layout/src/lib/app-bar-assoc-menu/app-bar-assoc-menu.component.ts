import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@kps/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {
  MatList,
  MatListItem,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  MembershipFacadeService,
  Association,
  ActivatedAssociationService,
} from '@kps/data/associations';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { ConfirmSwitchAssocDialogComponent } from '@kps/layout/association';

@Component({
  selector: 'kps-app-bar-assoc-menu',
  imports: [
    ButtonComponent,
    MatMenu,
    MatMenuTrigger,
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemMeta,
    LoadingIndicatorComponent,
  ],
  templateUrl: './app-bar-assoc-menu.component.html',
  styleUrl: './app-bar-assoc-menu.component.scss',
})
export class AppBarAssocMenuComponent {
  // injections
  activatedAssocService = inject(ActivatedAssociationService);
  private membershipsFacade = inject(MembershipFacadeService);
  private matDialog = inject(MatDialog);
  private router = inject(Router);

  // data
  myMemberships = this.membershipsFacade.memberships;
  myMembershipsLoading = this.membershipsFacade.loading;

  triggerAssocSwitchDialog(association: Association): void {
    const dialogRef = this.matDialog.open(ConfirmSwitchAssocDialogComponent, {
      data: { association },
    });

    dialogRef.afterClosed().subscribe((shouldSwitch: boolean) => {
      if (shouldSwitch) {
        // switch to selected
        this.activatedAssocService.switchCurAssoc(association).then(() => {
          // navigate to assoc dashboard
          this.activatedAssocService.navigateToAssocDashboard();
        });
      }
    });
  }

  fetchMemberships(): void {
    // not loading & have less than one membership
    if (
      !this.myMembershipsLoading() &&
      this.membershipsFacade.totalMemberships() < 1
    ) {
      this.membershipsFacade.fetchMyMemberships();
    }
  }
}
