import { Component } from '@angular/core';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'kps-lang-menu',
  imports: [
    MatMenuTrigger,
    MatMenuItem,
    MatTooltip,
    MatIcon,
    MatMenu,
    MatButton,
  ],
  templateUrl: './language-menu.component.html',
  styleUrl: './language-menu.component.scss',
})
export class LanguageMenuComponent {
  getCurrentLanguage(): string {
    // Implement logic to get the current language
    // For example, return 'EN' for English, 'FR' for French, etc.
    return 'EN'; // Placeholder, replace with actual logic
  }

  changeLanguage(lang: string): void {
    // Implement language change logic
  }
}
