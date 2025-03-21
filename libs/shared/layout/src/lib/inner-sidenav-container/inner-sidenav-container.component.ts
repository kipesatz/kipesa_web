import { Component, inject, model, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { AssocSidenavButtonComponent } from '@kps/layout/association';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { MembershipStore } from '@kps/data/associations';
import { BaseDialogService } from '@kps/material/dialog';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'kps-inner-sidenav-container',
  imports: [
    LoadingIndicatorComponent,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    AssocSidenavButtonComponent,
    MatIcon,
    MatMiniFabButton,
    RouterOutlet,
    MatTooltip,
    AppFooterComponent,
    NgStyle,
  ],
  templateUrl: './inner-sidenav-container.component.html',
  styleUrl: './inner-sidenav-container.component.scss',
  providers: [MembershipStore],
})
export class InnerSidenavContainerComponent implements OnInit {
  private diagService = inject(BaseDialogService);
  private membershipStore = inject(MembershipStore);

  sidenavExpanded = model(true);

  // data
  membershipsLoading = this.membershipStore.loading;
  memberships = this.membershipStore.memberships;

  async openInvitationConfDialog(): Promise<void> {
    await import('@kps/associations/invitations').then((mod) => {
      this.diagService.openDefault(mod.ConfirmInvitationDialogComponent);
    });
  }

  async openAddAssocDialog(): Promise<void> {
    await import('@kps/associations/creation').then((mod) => {
      this.diagService.openDefault(mod.CreateAssocDialogComponent, {
        minWidth: '950px',
      });
    });
  }

  async openSwitchAssocDialog(): Promise<void> {
    await import('@kps/layout/association').then((mod) => {
      this.diagService.openDefault(mod.SwitchAssociationDialogComponent, {
        minWidth: '600px',
      });
    });
  }

  ngOnInit(): void {
    this.membershipStore.loadMyMemberships(
      new HttpParams({ fromObject: { status: 'APPROVED' } })
    );
  }
}
