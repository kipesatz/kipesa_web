import { Component, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  assocSettingsDialogAnimation,
  assocSettingsFadeAnimation,
} from '../assoc-settings-dialog.animation';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { AssocSettingsRouterService } from '@kps/core/router';

@Component({
  selector: 'kps-assoc-settings-dialog',
  imports: [
    MatIcon,
    RouterOutlet,
    MatMiniFabButton,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './assoc-settings-dialog.component.html',
  styleUrl: './assoc-settings-dialog.component.scss',
  animations: [assocSettingsDialogAnimation, assocSettingsFadeAnimation],
})
export class AssocSettingsDialogComponent {
  private assocSettingsRouter = inject(AssocSettingsRouterService);

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
