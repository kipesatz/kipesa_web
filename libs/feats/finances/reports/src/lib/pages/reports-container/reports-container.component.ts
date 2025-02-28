import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTabNav, MatTabNavPanel, MatTabLink } from '@angular/material/tabs';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'kps-reports-container',
  imports: [
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    MatIcon,
  ],
  templateUrl: './reports-container.component.html',
  styleUrl: './reports-container.component.scss',
})
export class ReportsContainerComponent {
  links = [
    { path: 'overview', label: 'Overview', icon: 'person' },
    { path: 'saved', label: 'Saved Reports', icon: 'groups' },
  ];
}
