import { Component, HostListener, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  assocSettingsDialogAnimation,
  assocSettingsFadeAnimation,
} from '../assoc-settings-dialog.animation';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { AssocSettingsRouterService } from '@kps/core/router';

@Component({
  selector: 'kps-assoc-settings-dialog',
  imports: [MatIcon, RouterOutlet, MatMiniFabButton, RouterLinkActive],
  templateUrl: './assoc-settings-dialog.component.html',
  styleUrl: './assoc-settings-dialog.component.scss',
  animations: [assocSettingsDialogAnimation, assocSettingsFadeAnimation],
})
export class AssocSettingsDialogComponent {
  private assocSettingsRouter = inject(AssocSettingsRouterService);
  private router = inject(Router);
  private curRoute = inject(ActivatedRoute);

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

  navigateTo(route: string[] | string) {
    this.router.navigate([route], {
      relativeTo: this.curRoute,
    });
  }
}
