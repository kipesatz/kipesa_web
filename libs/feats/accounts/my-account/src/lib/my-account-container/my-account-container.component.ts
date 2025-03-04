import { Component } from '@angular/core';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-my-account-container',
  imports: [
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
    RouterLinkActive,
    RouterLink,
    RouterOutlet,
    MatIcon,
  ],
  templateUrl: './my-account-container.component.html',
  styleUrl: './my-account-container.component.scss',
})
export class MyAccountContainerComponent {
  links = [
    { path: 'Dashboard', label: 'My Dashboard', icon: 'dashboard' },
    { path: 'personalInfo', label: 'Personal Info', icon: 'person' },
    { path: 'enrollments', label: 'Enrolled Associations', icon: 'groups' },
    {
      path: 'contributions',
      label: 'My Contributions',
      icon: 'volunteer_activism',
    },
    { path: 'depts', label: 'My Depts', icon: 'account_balance' },
  ];
}
