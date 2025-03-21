import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterService } from '@kps/core/router';
import { CollateralFacadeService } from '@kps/data/finances';
import { AnimatedSearchFieldComponent } from '@kps/forms/fields';
import { ButtonComponent } from '@kps/material/button';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { CollateralDialogComponent } from '../collateral-dialog/collateral-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kps-collaterals-table',
  imports: [
    DataTableComponent,
    ButtonComponent,
    AnimatedSearchFieldComponent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './collaterals-table.component.html',
  styleUrl: './collaterals-table.component.scss',
})
export class CollateralsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(CollateralFacadeService);
  private routerService = inject(RouterService);
  private matDialog = inject(MatDialog);
  private curRoute = inject(ActivatedRoute);

  // data sources
  loanId = this.curRoute.snapshot?.parent?.parent?.paramMap.get('loanId');
  collaterals = this.facadeService.allCollaterals;
  collateralsLoading = this.facadeService.loading;

  // custom templates
  estimatedValueTmpl =
    viewChild.required<TemplateRef<unknown>>('estimatedValueTmpl');
  createdTmpl = viewChild.required<TemplateRef<unknown>>('createdTmpl');
  verificationDateTmpl = viewChild.required<TemplateRef<unknown>>(
    'verificationDateTmpl'
  );
  valuationDateTmpl =
    viewChild.required<TemplateRef<unknown>>('valuationDateTmpl');
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'title',
    'documentType',
    'verificationStatus',
    'verificationDate',
    'actions',
  ];
  filters: TableFilter[] = [];
  searchTerm = signal<string>('');

  openAddCollateralDialog() {
    this.matDialog.open(CollateralDialogComponent, { minWidth: '768px' });
  }

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status' },
      { key: 'documentType', label: 'Doc Type' },
      { key: 'verificationStatus', label: 'Verification Status' },
      {
        key: 'estimatedValue',
        label: 'Estimated Value',
        sortable: true,
        template: this.estimatedValueTmpl(),
      },
      {
        key: 'verificationDate',
        label: 'Verification Date',
        sortable: true,
        template: this.verificationDateTmpl(),
      },
      {
        key: 'valuationDateTmpl',
        label: 'Valuation Date',
        sortable: true,
        template: this.valuationDateTmpl(),
      },
      {
        key: 'createdOn',
        label: 'Created Date',
        sortable: true,
        template: this.createdTmpl(),
      },

      { key: 'actions', label: 'Actions', template: this.actionsTmpl() },
    ];
  }

  onEdit(row: unknown) {
    console.log('Edit:', row);
  }

  onSelectionChange(selected: unknown[]) {
    // console.log('Selected:', selected);
  }

  refreshData() {
    const _loanId = this.loanId;
    if (_loanId) {
      this.routerService
        .updateRouterState({ q: this.searchTerm() })
        .then(() =>
          this.facadeService.dispatchFetchLoanCollaterals(
            _loanId,
            this.routerService.getAsHttpParams()
          )
        );
    }
  }
}
