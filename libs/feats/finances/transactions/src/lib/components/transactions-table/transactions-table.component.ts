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
import { TransactionFacadeService } from '@kps/data/finances';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { SearchFieldComponent } from '@kps/forms/fields';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'kps-transactions-tbl',
  imports: [
    DataTableComponent,
    SearchFieldComponent,
    MatIcon,
    MatChip,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss',
})
export class TransactionsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(TransactionFacadeService);
  private routerService = inject(RouterService);
  private matDialog = inject(MatDialog);

  // data sources
  financialTransactions = this.facadeService.transactions;
  transactionsLoading = this.facadeService.loading;
  totalTransactions = this.facadeService.totalTransactions;
  transactionsCount = this.facadeService.transactionsCount;

  // custom templates
  createdTmpl = viewChild.required<TemplateRef<unknown>>('createdTmpl');
  transTypeTmpl = viewChild.required<TemplateRef<unknown>>('transTypeTmpl');
  transStatusTmpl = viewChild.required<TemplateRef<unknown>>('transStatusTmpl');
  amtTmpl = viewChild.required<TemplateRef<unknown>>('amtTmpl');
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'createdOn',
    'transactionRef',
    'transactionStatus',
    'transactionType',
    'transactionNature',
    'amount',
    'source',
    'transactionChannel',
    'actions',
  ];
  filters: TableFilter[] = [];
  searchTerm = signal<string>('');

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      { key: 'source', label: 'Source' },
      { key: 'transactionChannel', label: 'Channel' },
      { key: 'transactionRef', label: 'Reference' },
      { key: 'transactionNature', label: 'Nature' },
      { key: 'timeRange', label: 'Time Range' },
      {
        key: 'createdOn',
        label: 'Created',
        template: this.createdTmpl(),
      },
      {
        key: 'transactionStatus',
        label: 'Status',
        template: this.transStatusTmpl(),
      },
      {
        key: 'transactionType',
        label: 'Type',
        template: this.transTypeTmpl(),
      },
      {
        key: 'amount',
        label: 'Amount',
        template: this.amtTmpl(),
        sortable: true,
      },

      {
        key: 'actions',
        label: 'Actions',
        template: this.actionsTmpl(),
        sortable: true,
      },
    ];

    // fetch cps
    this.facadeService.fetchAll();
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
        this.facadeService.fetchAll(this.routerService.getAsHttpParams())
      );
  }

  onDelete(items: unknown[]) {
    // Implement delete logic
    console.log('items to delete are');
    console.table(items);
  }
}
