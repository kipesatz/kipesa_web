import { Component, signal } from '@angular/core';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatIconButton } from '@angular/material/button';

export interface KpsNotification {
  id: string;
  title: string;
  message: string;
  source: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  link?: string;
}

@Component({
  selector: 'kps-notifications-menu',
  imports: [
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuModule,
    MatIcon,
    MatBadge,
    MatIconButton,
  ],
  templateUrl: './notifications-menu.component.html',
  styleUrl: './notifications-menu.component.scss',
})
export class NotificationsMenuComponent {
  notificationsCount = signal(5);
}
