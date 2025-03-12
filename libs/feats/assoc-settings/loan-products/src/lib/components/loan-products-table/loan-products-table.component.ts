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
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterService } from '@kps/core/router';
import { LoanProductFacadeService } from '@kps/data/finances';
import { AnimatedSearchFieldComponent } from '@kps/forms/fields';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { ButtonComponent } from '@kps/material/button';
import { MatDialog } from '@angular/material/dialog';
import { LoanProductDialogComponent } from '../loan-product-dialog/loan-product-dialog.component';

@Component({
  selector: 'kps-loan-products-tbl',
  imports: [
    DataTableComponent,
    AnimatedSearchFieldComponent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    CurrencyPipe,
    ButtonComponent,
  ],
  templateUrl: './loan-products-table.component.html',
  styleUrl: './loan-products-table.component.scss',
})
export class LoanProductsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(LoanProductFacadeService);
  private routerService = inject(RouterService);
  private matDialog = inject(MatDialog);

  // data sources
  loanProducts = this.facadeService.allLoanProducts;
  loanProductsLoading = this.facadeService.loading;
  loanProductsTotal = this.facadeService.total;
  loanProductsCount = this.facadeService.count;

  // custom templates
  minAmtTmpl = viewChild.required<TemplateRef<unknown>>('minAmtTmpl');
  maxAmtTmpl = viewChild.required<TemplateRef<unknown>>('maxAmtTmpl');
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'name',
    'minAmount',
    'maxAmount',
    'interestRate',
    'minTermMonths',
    'maxTermMonths',
    'paymentFrequency',
    'actions',
  ];
  filters: TableFilter[] = [];
  searchTerm = signal<string>('');

  openAddLoanProductDialog() {
    this.matDialog.open(LoanProductDialogComponent, { minWidth: '768px' });
  }

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      { key: 'name', label: 'Name' },
      {
        key: 'minAmount',
        label: 'Min Amount',
        sortable: true,
        template: this.minAmtTmpl(),
      },
      {
        key: 'maxAmount',
        label: 'Max Amount',
        sortable: true,
        template: this.maxAmtTmpl(),
      },
      { key: 'interestRate', label: 'Interest Rate (%)', sortable: true },
      { key: 'minTermMonths', label: 'Min Term (Months)' },
      { key: 'maxTermMonths', label: 'Max Term (Months)' },
      { key: 'paymentFrequency', label: 'Max Term (Months)' },
      { key: 'actions', label: 'Actions', template: this.actionsTmpl() },
    ];

    // fetch cps
    this.facadeService.fetchAssocLoanProducts();
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
        this.facadeService.fetchAssocLoanProducts(
          this.routerService.getAsHttpParams()
        )
      );
  }
}
