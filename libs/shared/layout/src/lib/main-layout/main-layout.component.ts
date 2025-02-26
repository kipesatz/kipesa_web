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
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemMeta,
  MatListItemTitle,
  MatNavList,
} from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ButtonComponent } from '@kps/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthCheckService, LogoutFacadeService } from '@kps/data/auth';
import { MatDivider } from '@angular/material/divider';
import {
  ActivatedAssociationService,
  Association,
  MembershipFacadeService,
} from '@kps/data/associations';
import { MatDialog } from '@angular/material/dialog';
import { AssocSwitchDialogComponent } from '../assoc-switch-dialog/assoc-switch-dialog.component';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kps-main-layout',
  imports: [
    CommonModule,
    // sidenav
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    // toolbar
    MatToolbar,
    // lists
    MatNavList,
    MatList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatListItemMeta,
    // menu
    MatMenu,
    MatMenuTrigger,
    // other
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatIcon,
    MatIconButton,
    ButtonComponent,
    MatTooltip,
    MatDivider,
    LoadingIndicatorComponent,
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

  authCheck = inject(AuthCheckService);
  activatedAssocService = inject(ActivatedAssociationService);
  private membershipsFacade = inject(MembershipFacadeService);
  private logoutFacade = inject(LogoutFacadeService);
  private matDialog = inject(MatDialog);
  private router = inject(Router);

  myMemberships = this.membershipsFacade.memberships;
  myMembershipsLoading = this.membershipsFacade.loading;

  menuItems: MenuItem[] = [
    {
      icon: 'dashboard',
      label: 'Dashboards',
      children: [
        {
          icon: 'account_circle',
          label: 'My Dashboard',
          route: '/dashboards/myDashboard',
        },
      ],
    },
    {
      icon: 'person',
      label: 'My Account',
      children: [
        {
          icon: 'person',
          label: 'Personal Info',
          route: '/myAccount/personalInfo',
        },
        {
          icon: 'groups',
          label: 'Enrolled Associations',
          route: '/myAccount/enrollments',
        },
        {
          icon: 'volunteer_activism',
          label: 'My Contributions',
          route: '/myAccount/contributions',
        },
        {
          icon: 'account_balance',
          label: 'My Depts',
          route: '/myAccount/depts',
        },
      ],
    },
    {
      icon: 'dashboard',
      label: 'IAM & Admin',
      children: [
        {
          icon: 'account_circle',
          label: 'Settings',
          children: [
            {
              icon: 'dashboard',
              label: 'Finances',
              children: [
                {
                  icon: 'dashboard',
                  label: 'Payment Methods',
                  route: '/admin/settings/finances/paymentMethods',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      icon: 'join_left',
      label: 'Association',
      children: [
        {
          label: 'Enroll',
          route: '/associations/enroll',
          icon: 'add',
        },
        {
          label: 'Dashboard',
          route: `/associations/${this.activatedAssocService.getId()}/dashboard`,
          icon: 'dashboard',
        },
        {
          label: 'Memberships',
          route: `/associations/${this.activatedAssocService.getId()}/memberships`,
          icon: 'card_membership',
        },
      ],
    },
    {
      icon: 'account_balance',
      label: 'Finances',
      children: [
        {
          label: 'Financial Stats',
          route: '/finances/stats',
          icon: 'dashboard',
        },
        {
          label: 'Financial Reports',
          route: '/finances/reports',
          icon: 'analytics',
        },
        {
          label: 'Contributions',
          route: '/finances/contributionPurposes/contributions',
          icon: 'groups',
        },
        {
          label: 'Contribution Purposes',
          route: '/finances/contributionPurposes',
          icon: 'groups',
        },
        {
          label: 'Financial Transactions',
          route: '/finances/transactions',
          icon: 'currency_exchange',
        },
        { label: 'Loans', route: '/finances/loans', icon: 'real_estate_agent' },
      ],
    },
  ];

  private breakpointObserver = inject(BreakpointObserver);
  isExpanded = signal(true);
  isMinimal = signal(false);
  isSmallScreen = signal(false);
  currentLevel = signal<MenuItem[]>(this.menuItems);
  navigationStack = signal<MenuItem[][]>([]);
  submenuLabel: string | null = null;

  ngOnInit() {
    // observe window breakpoints
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
      this.submenuLabel = item.label; // set submenuLabel
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

  expandMenu(): void {
    if (!this.isSmallScreen()) {
      this.isExpanded.set(true);
      this.isMinimal.set(false);
    }
  }

  triggerAssocSwitchDialog(association: Association): void {
    const dialogRef = this.matDialog.open(AssocSwitchDialogComponent, {
      data: { association },
    });

    dialogRef.afterClosed().subscribe((shouldSwitch: boolean) => {
      if (shouldSwitch) {
        // switch to selected
        this.activatedAssocService.switchCurAssoc(association);

        // navigate to assoc dashboard
        this.router.navigate(['/associations', association.id, 'dashboard']);
      }
    });
  }

  fetchMemberships(): void {
    // not loading & have less than one membership
    if (
      !this.myMembershipsLoading() &&
      this.membershipsFacade.totalMemberships() < 1
    ) {
      this.membershipsFacade.fetchMyMemberships();
    }
  }

  logoutUser(): void {
    this.logoutFacade.dispatchLogout();
  }
}
