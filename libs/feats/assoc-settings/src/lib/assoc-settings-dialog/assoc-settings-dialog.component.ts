import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  assocSettingsDialogAnimation,
  assocSettingsFadeAnimation,
} from '../assoc-settings-dialog.animation';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { AssocSettingsRouterService } from '@kps/core/router';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'kps-assoc-settings-dialog',
  imports: [
    MatIcon,
    RouterOutlet,
    MatMiniFabButton,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet
  ],
  templateUrl: './assoc-settings-dialog.component.html',
  styleUrl: './assoc-settings-dialog.component.scss',
  animations: [assocSettingsDialogAnimation, assocSettingsFadeAnimation],
})
export class AssocSettingsDialogComponent {
  private assocSettingsRouter = inject(AssocSettingsRouterService);

  membershipItems = [
    { name: 'Join/Create Association', route: 'enroll', icon: 'join_left' },
  ]

  settingsCategories = [
    { name: 'Loan Products', route: 'loanProducts', icon: 'real_estate_agent' },
    {
      name: 'Repayment Reminders',
      route: 'repaymentReminders',
      icon: 'notifications_active',
    },
  ];

  @HostListener('document:keydown.escape')
  closeDialog() {
    // Navigate to main app route
    this.assocSettingsRouter.getStoredRouteAndNavigate();
  }
}
