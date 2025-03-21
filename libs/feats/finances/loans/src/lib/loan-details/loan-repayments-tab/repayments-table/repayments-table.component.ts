import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '@kps/core/router';
import { LoanPaymentFacadeService } from '@kps/data/finances';
import { AnimatedSearchFieldComponent } from '@kps/forms/fields';
import { ButtonComponent } from '@kps/material/button';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { RepaymentAddDialogComponent } from '../repayment-add-dialog/repayment-add-dialog.component';

@Component({
  selector: 'kps-repayments-table',
  imports: [
    DataTableComponent,
    ButtonComponent,
    AnimatedSearchFieldComponent,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './repayments-table.component.html',
  styleUrl: './repayments-table.component.scss',
})
export class RepaymentsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(LoanPaymentFacadeService);
  private routerService = inject(RouterService);
  private matDialog = inject(MatDialog);

  // data sources
  loanPayments = this.facadeService.allLoanPayments;
  loanPaymentsLoading = this.facadeService.loading;

  // custom templates
  paidAmtTmpl = viewChild.required<TemplateRef<unknown>>('paidAmtTmpl');
  interestAmtTmpl = viewChild.required<TemplateRef<unknown>>('interestAmtTmpl');
  principalAmtTmpl =
    viewChild.required<TemplateRef<unknown>>('principalAmtTmpl');
  beginningBcTmpl = viewChild.required<TemplateRef<unknown>>('beginningBcTmpl');
  endingBcTmpl = viewChild.required<TemplateRef<unknown>>('endingBcTmpl');
  paymentDateTmpl = viewChild.required<TemplateRef<unknown>>('paymentDateTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'paymentToken',
    'paymentProvider',
    'status',
    'paidAmount',
    'interestAmount',
    'principalAmount',
    'beginningBalance',
    'endingBalance',
    'paymentDate',
  ];
  filters: TableFilter[] = [];
  searchTerm = signal<string>('');

  openAddLoanPaymentDialog() {
    this.matDialog.open(RepaymentAddDialogComponent, { minWidth: '768px' });
  }

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      { key: 'paymentToken', label: 'Token' },
      { key: 'paymentProvider', label: 'Channel' },
      { key: 'status', label: 'Status' },
      {
        key: 'paidAmount',
        label: 'Paid Amount',
        sortable: true,
        template: this.paidAmtTmpl(),
      },
      {
        key: 'interestAmount',
        label: 'Interest',
        sortable: true,
        template: this.interestAmtTmpl(),
      },
      {
        key: 'principalAmount',
        label: 'Principal',
        sortable: true,
        template: this.principalAmtTmpl(),
      },
      {
        key: 'beginningBalance',
        label: 'Beginning Balance',
        sortable: true,
        template: this.beginningBcTmpl(),
      },
      {
        key: 'endingBalance',
        label: 'Ending Balance',
        sortable: true,
        template: this.endingBcTmpl(),
      },
      {
        key: 'paymentDate',
        label: 'Payment Date',
        sortable: true,
        template: this.paymentDateTmpl(),
      },
    ];

    // fetch cps
    this.facadeService.dispatchFetchLoanRepayments();
  }

  onEdit(row: unknown) {
    console.log('Edit:', row);
  }

  onFilterChange(filters: Record<string, unknown>) {
    console.log('Active filters:', filters);
    // Implement filter logic
  }

  onSelectionChange(selected: unknown[]) {
    console.log('Selected:', selected);
  }

  refreshData() {
    this.routerService
      .updateRouterState({ q: this.searchTerm() })
      .then(() =>
        this.facadeService.dispatchFetchLoanRepayments(
          this.routerService.getAsHttpParams()
        )
      );
  }
}
