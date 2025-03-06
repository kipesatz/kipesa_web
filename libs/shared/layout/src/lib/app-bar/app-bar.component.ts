import { Component, inject, output } from '@angular/core';
import { AppBarAssocMenuComponent } from '../app-bar-assoc-menu/app-bar-assoc-menu.component';
import { LanguageMenuComponent } from '../language-menu/language-menu.component';
import { ButtonComponent, IconicButtonComponent } from '@kps/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { MyAccountMenuComponent } from '../my-account-menu/my-account-menu.component';
import { ActivatedAssociationService } from '@kps/data/associations';
import { AuthCheckService } from '@kps/data/auth';
import { NotificationsMenuComponent } from "../notification-menu/notifications-menu.component";

@Component({
  selector: 'kps-app-bar',
  imports: [
    ButtonComponent,
    IconicButtonComponent,
    AppBarAssocMenuComponent,
    LanguageMenuComponent,
    MyAccountMenuComponent,
    MatToolbar,
    MatTooltip,
    NotificationsMenuComponent
],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  authCheck = inject(AuthCheckService);
  activatedAssocService = inject(ActivatedAssociationService);

  toggleSidenavChange = output<void>();

  toggleTheme(): void {
    // TODO: Implement theme toggle
  }

  openHelpDialog(): void {
    // Implement help dialog logic
  }
}
