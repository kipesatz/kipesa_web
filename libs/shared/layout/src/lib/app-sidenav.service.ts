import { inject, Injectable } from '@angular/core';
import { ActivatedAssociationService } from '@kps/data/associations';
import { MenuItem } from '@kps/layout/core';

@Injectable({
  providedIn: 'root',
})
export class AppSidenavService {
  private currAssoc = inject(ActivatedAssociationService);

  getMenuItems(): MenuItem[] {
    return [
      {
        icon: 'person',
        label: 'My Account',
        children: [
          {
            icon: 'dashboard',
            label: 'My Dashboard',
            route: '/myAccount/dashboard',
          },
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
            route: `/associations/${this.currAssoc.getId()}/dashboard`,
            icon: 'dashboard',
          },
          {
            label: 'Memberships',
            route: `/associations/${this.currAssoc.getId()}/memberships`,
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
          {
            label: 'Loans',
            route: '/finances/loans',
            icon: 'real_estate_agent',
          },
        ],
      },
    ];
  }
}
