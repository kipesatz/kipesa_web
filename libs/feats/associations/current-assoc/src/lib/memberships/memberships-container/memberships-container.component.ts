import { Component } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-memberships-container',
  imports: [
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatIcon,
  ],
  templateUrl: './memberships-container.component.html',
  styleUrl: './memberships-container.component.scss',
})
export class MembershipsContainerComponent {
  links = [
    { path: 'approved', label: 'Enrolled Members', icon: 'groups' },
    { path: 'requests', label: 'Membership Requests', icon: 'groups' },
  ];
}
