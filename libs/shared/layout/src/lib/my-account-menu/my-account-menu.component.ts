import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
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
    MatListItemTitle,
  ],
  templateUrl: './my-account-menu.component.html',
  styleUrl: './my-account-menu.component.scss',
})
export class MyAccountMenuComponent {
  private logoutFacade = inject(LogoutFacadeService);

  logoutUser(): void {
    this.logoutFacade.dispatchLogout();
  }
}
