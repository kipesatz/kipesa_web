import { Component } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'kps-loans-container',
  imports: [
    MatTabNav,
    MatTabNavPanel,
    MatIcon,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatTabLink
  ],
  templateUrl: './loans-container.component.html',
  styleUrl: './loans-container.component.scss',
})
export class LoansContainerComponent {
  tabLinks: Array<{ label: string; link: string[] | string; icon?: string }> = [
    { label: 'Loans Stats Dashboard', link: ['dashboard'], icon: 'dashboard' },
    { label: 'All Loans', link: ['all'] },
  ];
}
