import { trigger, transition, style, animate } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from '@kps/layout/core';
import { map } from 'rxjs';

import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'kps-main-layout',
  imports: [
    // sidenav
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,

    // toolbar
    MatToolbar,

    // lists
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,

    // menu
    MatMenu,
    MatMenuTrigger,

    // other
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard',
    },
    {
      icon: 'account_balance',
      label: 'Finances',
      children: [
        { label: 'Reports', route: '/finances/reports', icon: 'analytics' },
        {
          label: 'Contributions',
          route: '/finances/contributions',
          icon: 'groups',
        },
        {
          label: 'Transactions',
          route: '/finances/transactions',
          icon: 'currency_exchange',
        },
        { label: 'Loans', route: '/finances/loans', icon: 'real_estate_agent' },
      ],
    },
  ];

  private breakpointObserver = inject(BreakpointObserver);
  isExpanded = signal(true);
  isSmallScreen = signal(false);
  currentLevel = signal<MenuItem[]>(this.menuItems);
  navigationStack = signal<MenuItem[][]>([]);

  ngOnInit() {
    this.breakpointObserver
      .observe([`(max-width: 768px)`])
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        this.isSmallScreen.set(matches);
        this.isExpanded.set(!matches);
      });
  }

  navigateToSubMenu(item: MenuItem) {
    if (item.children) {
      this.navigationStack.update((stack) => [...stack, this.currentLevel()]);
      this.currentLevel.set(item.children);
    }
  }

  navigateBack() {
    const stack = this.navigationStack();
    if (stack.length) {
      const previousLevel = stack[stack.length - 1];
      this.currentLevel.set(previousLevel);
      this.navigationStack.update((stack) => stack.slice(0, -1));
    }
  }

  onMouseEnter() {
    if (!this.isSmallScreen()) {
      this.isExpanded.set(true);
    }
  }

  onMouseLeave() {
    if (!this.isSmallScreen()) {
      this.isExpanded.set(false);
    }
  }
}
