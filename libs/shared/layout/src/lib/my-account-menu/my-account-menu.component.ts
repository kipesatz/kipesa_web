import { Component, inject, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { LogoutFacadeService } from '@kps/data/auth';
import { IconicButtonComponent } from '@kps/material/button';

@Component({
  selector: 'kps-my-account-menu',
  imports: [
    IconicButtonComponent,
    MatMenu,
    MatMenuTrigger,
    MatDivider,
    RouterLink,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatIcon,
    MatListItemTitle,
  ],
  templateUrl: './my-account-menu.component.html',
  styleUrl: './my-account-menu.component.scss',
})
export class MyAccountMenuComponent {
  private logoutFacade = inject(LogoutFacadeService);
  shortName = signal('Alex');

  logoutUser(): void {
    this.logoutFacade.dispatchLogout();
  }
}
