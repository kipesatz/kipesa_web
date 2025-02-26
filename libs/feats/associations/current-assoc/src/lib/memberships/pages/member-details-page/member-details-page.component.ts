import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent, IconicButtonComponent } from '@kps/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { MembershipFacadeService } from '@kps/data/associations';
import { BaseDialogService } from '@kps/material/dialog';
import { MembershipApprovalDialogComponent } from '../../components';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'kps-member-details-page',
  imports: [
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatCardHeader,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButtonModule,
    ButtonComponent,
    MatToolbar,
    MatTooltip,
    IconicButtonComponent,
    DatePipe,
  ],
  templateUrl: './member-details-page.component.html',
  styleUrl: './member-details-page.component.scss',
})
export class MemberDetailsPageComponent implements OnInit {
  private curRoute = inject(ActivatedRoute);
  private membershipFacade = inject(MembershipFacadeService);
  private dialogService = inject(BaseDialogService);

  memberId = signal(this.curRoute.snapshot.paramMap.get('memberId') as string);
  membership = this.membershipFacade.selectOne(this.memberId());

  actionButtons = [
    { icon: 'email', label: 'Email', link: '#' },
    { icon: 'calendar_today', label: 'Schedule', link: '#' },
    { icon: 'chat', label: 'Chat', link: '#' },
    { icon: 'videocam', label: 'Video', link: '#' },
  ];

  openMemberApprovalDialog(): void {
    if (this.membership()) {
      this.dialogService.openDefault(MembershipApprovalDialogComponent, {
        data: { membership: this.membership() },
      });
    }
  }

  ngOnInit(): void {
    if (
      !this.membership() &&
      (this.memberId() !== '' || this.memberId() !== null)
    ) {
      this.membershipFacade.dispatchFetchOne(this.memberId());
    }
  }
}
