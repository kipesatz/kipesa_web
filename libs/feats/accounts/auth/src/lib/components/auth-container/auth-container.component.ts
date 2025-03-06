import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IconicButtonComponent } from '@kps/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'kps-auth-container',
  imports: [
    IconicButtonComponent,
    MatToolbar,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    MatTooltip,
    RouterOutlet,
  ],
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
})
export class AuthContainerComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  isScrolled = false;

  getCurrentPageTitle(): string {
    const path = this.router.url;
    if (path.includes('login')) return 'Sign In';
    if (path.includes('register')) return 'Create Account';
    if (path.includes('forgot-password')) return 'Reset Password';
    return 'Authentication';
  }

  getCurrentLanguage(): string {
    // Implement logic to get the current language
    // For example, return 'EN' for English, 'FR' for French, etc.
    return 'EN'; // Placeholder, replace with actual logic
  }

  openHelpDialog(): void {
    // Implement help dialog logic
  }

  changeLanguage(lang: string): void {
    // Implement language change logic
    // Update the current language after changing it
  }

  toggleTheme(): void {
    // TODO: this.themeService.toggleTheme();
  }

  // Add scroll listener to handle toolbar elevation
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.isScrolled = target.scrollTop > 0;
  }
}
