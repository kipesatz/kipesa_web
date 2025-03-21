import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { RouterService } from '@kps/core/router';
import { LoanFacadeService } from '@kps/data/finances';
import { AnimatedSearchFieldComponent } from '@kps/forms/fields';
import { DataTableComponent, TableColumn } from '@kps/material/table';
import { BaseDialogService } from '@kps/material/dialog';
import { LoanDialogComponent } from '../loan-dialog/loan-dialog.component';
import { ButtonComponent } from '@kps/material/button';

import { UserAvatarComponent } from '@kps/accounts/user';
import { LoanStatusBadgeComponent } from '../loan-status-badge/loan-status-badge.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kps-loans-tbl',
  imports: [
    DataTableComponent,
    AnimatedSearchFieldComponent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuTrigger,
    CurrencyPipe,
    ButtonComponent,
    UserAvatarComponent,
    LoanStatusBadgeComponent,
    RouterLink
  ],
  templateUrl: './loans-table.component.html',
  styles: ``,
})
export class LoansTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(LoanFacadeService);
  private routerService = inject(RouterService);
  private dialogService = inject(BaseDialogService);

  // data sources
  loans = this.facadeService.loans;
  loansLoading = this.facadeService.loading;
  totalLoans = this.facadeService.totalLoans;
  transactionsCount = this.facadeService.loansCount;

  // custom templates
  memberTmpl = viewChild.required<TemplateRef<unknown>>('memberTmpl');
  loanStatusTmpl = viewChild.required<TemplateRef<unknown>>('loanStatusTmpl');
  loanTermTmpl = viewChild.required<TemplateRef<unknown>>('loanTermTmpl');
  loanAmtTmpl = viewChild.required<TemplateRef<unknown>>('loanAmtTmpl');
  paidAmtTmpl = viewChild.required<TemplateRef<unknown>>('paidAmtTmpl');
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'member',
    'loanNumber',
    'loanProduct',
    'loanAmount',
    'paidAmount',
    'loanTerm',
    'loanStatus',
    'paymentFrequency',
    'actions',
  ];
  searchTerm = signal<string>('');

  openAddLoanWindow() {
    this.dialogService.openDefault(LoanDialogComponent, { minWidth: '850px' });
  }

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      { key: 'loanNumber', label: 'Loan Number' },
      {
        key: 'loanProduct',
        label: 'Loan Product',
        template: (value: any) => value.loanProduct.name,
      },
      { key: 'member', label: 'Member', template: this.memberTmpl() },
      { key: 'paymentFrequency', label: 'Payment Frequency' },
      {
        key: 'loanAmount',
        label: 'Amount',
        template: this.loanAmtTmpl(),
        sortable: true,
      },
      {
        key: 'paidAmount',
        label: 'Amount',
        template: this.paidAmtTmpl(),
        sortable: true,
      },
      { key: 'loanTerm', label: 'Loan Term', template: this.loanTermTmpl() },
      {
        key: 'loanStatus',
        label: 'Status',
        template: this.loanStatusTmpl(),
      },
      {
        key: 'actions',
        label: 'Actions',
        template: this.actionsTmpl(),
      },
    ];

    // fetch cps
    this.facadeService.fetchAssocMembersLoans();
  }

  onSelectionChange(selected: unknown[]) {
    console.log('Selected:', selected);
  }

  refreshData() {
    this.routerService
      .updateRouterState({ q: this.searchTerm() })
      .then(() =>
        this.facadeService.fetchAssocMembersLoans(
          this.routerService.getAsHttpParams()
        )
      );
  }
}
