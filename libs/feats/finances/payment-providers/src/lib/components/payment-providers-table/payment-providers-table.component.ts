import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { PaymentProviderFacadeService } from '@kps/data/finances';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentProviderDialogComponent } from '../../pages';
import { AnimatedSearchFieldComponent } from '@kps/forms/fields';
import { RouterService } from '@kps/core/router';

@Component({
  selector: 'kps-payment-methods-tbl',
  imports: [
    DataTableComponent,
    AnimatedSearchFieldComponent,
    MatChip,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    DatePipe,
  ],
  templateUrl: './payment-providers-table.component.html',
  styles: ``,
})
export class PaymentProvidersTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(PaymentProviderFacadeService);
  private routerService = inject(RouterService);
  private matDialog = inject(MatDialog);

  // data sources
  allPaymentProviders = this.facadeService.allPaymentProviders;
  providersLoading = this.facadeService.loading;
  contributionsLoading = this.facadeService.loading;
  totalPaymentProviders = this.facadeService.total;
  contributionsCount = this.facadeService.count;

  // custom templates
  logoTemplate = viewChild.required<TemplateRef<unknown>>('logoTemplate');
  createdTmpl = viewChild.required<TemplateRef<unknown>>('createdTmpl');
  modifiedTmpl = viewChild.required<TemplateRef<unknown>>('modifiedTmpl');
  channelTmpl = viewChild.required<TemplateRef<unknown>>('channelTmpl');
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'name',
    'internalName',
    'channel',
    'logo',
    'isActive',
    'createdOn',
    'lastEditedOn',
    'actions',
  ];
  filters: TableFilter[] = [];
  searchTerm = signal<string>('');

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      { key: 'name', label: 'name' },
      { key: 'isActive', label: 'Active' },
      { key: 'internalName', label: 'Internal Name', sortable: true },
      {
        key: 'channel',
        label: 'Channel',
        template: this.channelTmpl(),
      },
      {
        key: 'logo',
        label: 'Logo',
        template: this.logoTemplate(),
      },
      {
        key: 'createdOn',
        label: 'Created',
        template: this.createdTmpl(),
      },
      {
        key: 'lastEditedOn',
        label: 'Modified',
        template: this.modifiedTmpl(),
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
    this.facadeService.dispatchFetchAll();
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
        this.facadeService.dispatchFetchAll(
          this.routerService.getAsHttpParams()
        )
      );
  }

  onDelete(items: unknown[]) {
    // Implement delete logic
    console.log('items to delete are');
    console.table(items);
  }

  onAdd() {
    this.matDialog.open(AddPaymentProviderDialogComponent, {
      minWidth: '950px',
    });
  }

  onExport() {
    console.log('onExport method called');
  }
}
