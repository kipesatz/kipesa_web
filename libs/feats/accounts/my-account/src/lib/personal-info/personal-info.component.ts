import { DatePipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthUserFacadeService } from '@kps/data/accounts';
import { IconicButtonComponent } from '@kps/material/button';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { BaseDialogService } from '@kps/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PinfoEditDialogComponent } from '../pinfo-edit-dialog/pinfo-edit-dialog.component';

@Component({
  selector: 'kps-personal-info',
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButtonModule,
    MatToolbar,
    MatTooltip,
    IconicButtonComponent,
    DatePipe,
    CommonModule,
    MatDivider,
    LoadingIndicatorComponent,
    MatListModule,
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  private authUserFacade = inject(AuthUserFacadeService);
  private diagService = inject(BaseDialogService);

  authUser$ = this.authUserFacade.authUser$;
  loading$ = this.authUserFacade.loading$;

  actionButtons = [
    { icon: 'email', label: 'Email', link: '#' },
    { icon: 'calendar_today', label: 'Schedule', link: '#' },
    { icon: 'chat', label: 'Chat', link: '#' },
    { icon: 'videocam', label: 'Video', link: '#' },
  ];

  ngOnInit(): void {
    this.authUserFacade.dispatchLoadAuthUser();
  }

  openPasswordDialog(): void {
    this.diagService.openDefault(PasswordDialogComponent);
  }

  openEditProfileDialog(): void {
    this.diagService.openDefault(PinfoEditDialogComponent);
  }
}
