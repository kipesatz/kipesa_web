import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { IconicButtonComponent } from '@kps/material/button';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { Loan, LoanFacadeService } from '@kps/data/finances';
import { LoanDetailsSidenavComponent } from '../loan-details-sidenav/loan-details-sidenav.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-loan-details-cpanel',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MatIcon,
    IconicButtonComponent,
    MatButton,
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    LoadingIndicatorComponent,
    LoanDetailsSidenavComponent,
  ],
  templateUrl: './loan-details-cpanel.component.html',
  styleUrl: './loan-details-cpanel.component.scss',
})
export class LoanDetailsCpanelComponent implements OnInit {
  private loanFacade = inject(LoanFacadeService);
  private curRoute = inject(ActivatedRoute);

  loanId = this.curRoute.snapshot.parent?.paramMap.get('loanId');
  loanDetails: Signal<Loan | undefined> = signal(undefined);
  loanLoading = this.loanFacade.loading;

  tabLinks: Array<{ label: string; link: string[] | string; icon: string }> = [
    { label: 'Loan Tracking', link: ['tracking'], icon: 'monitor_heart' },
    { label: 'Performance', link: ['performance'], icon: 'monitoring' },
    { label: 'Documents', link: ['docs'], icon: 'folder_open' },
    { label: 'Collaterals', link: ['collaterals'], icon: 'real_estate_agent' },
    { label: 'Repayments', link: ['repayments'], icon: 'payments' },
  ];

  ngOnInit(): void {
    // fetch and select loan instance if loanId is present
    if (this.loanId) {
      this.loanFacade.dispatchFetchOne(this.loanId);
      this.loanDetails = this.loanFacade.selectOne(this.loanId);
    }
  }
}
