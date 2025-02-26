import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import {
  Contribution,
  ContributionFacadeService,
  ContributionPurpose,
} from '@kps/data/finances';
import { BaseDialogService } from '@kps/material/dialog';
import { ContributionDialogComponent } from '../contribution-dialog/contribution-dialog.component';
import { RouterService } from '@kps/core/router';
import { SearchFieldComponent } from '@kps/forms/fields';
import { Params } from '@angular/router';
import { ContributionApproveDialogComponent } from '../contribution-approve-dialog.component';

@Component({
  selector: 'kps-contributions-tbl',
  imports: [
    DataTableComponent,
    MatChip,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    DatePipe,
    CurrencyPipe,
    SearchFieldComponent,
  ],
  templateUrl: './contributions-table.component.html',
  styleUrl: './contributions-table.component.scss',
})
export class ContributionsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) {
        this.refreshData();
      }
    });
  }
  // injections
  private contributionFacade = inject(ContributionFacadeService);
  private diagService = inject(BaseDialogService);
  private routerService = inject(RouterService);
  private dialogService = inject(BaseDialogService);

  // data sources
  tableTitle = input<string>('Contributions');
  contributionPurpose = input<ContributionPurpose>();
  allContributions = this.contributionFacade.allContributions;
  contributionsLoading = this.contributionFacade.loading;
  collectedAmount = this.contributionFacade.total;
  contributionsCount = this.contributionFacade.count;

  // custom templates
  memberTmpl = viewChild.required<TemplateRef<unknown>>('memberTmpl');
  amtTmpl = viewChild.required<TemplateRef<unknown>>('amtTmpl');
  statusTmpl = viewChild.required<TemplateRef<unknown>>('statusTmpl');
  purposeTmpl = viewChild.required<TemplateRef<unknown>>('purposeTmpl');
  payMethodTmpl = viewChild.required<TemplateRef<unknown>>('payMethodTmpl');
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');
  createdTmpl = viewChild.required<TemplateRef<unknown>>('createdTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'member',
    'purpose',
    'status',
    'amount',
    'paymentMethod',
    'createdOn',
    'actions',
  ];
  filters: TableFilter[] = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
      ],
    },
  ];

  contributionType = signal<'self' | 'other'>('self');
  contributionTypeOptions: { label: string; value: 'self' | 'other' }[] = [
    { label: 'Add Your Contribution', value: 'self' },
    { label: 'Add for Someone Else', value: 'other' },
  ];

  searchTerm = signal('');

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      {
        key: 'member',
        label: 'Member',
        sortable: true,
        template: this.memberTmpl(),
      },
      {
        key: 'purpose',
        label: 'Purpose',
        template: this.purposeTmpl(),
      },
      {
        key: 'status',
        label: 'Status',
        template: this.statusTmpl(),
      },
      {
        key: 'amount',
        label: 'Amount',
        template: this.amtTmpl(),
      },
      {
        key: 'paymentMethod',
        label: 'Payment Method',
        template: this.payMethodTmpl(),
      },
      {
        key: 'createdOn',
        label: 'Created',
        template: this.createdTmpl(),
      },
      {
        key: 'actions',
        label: 'Actions',
        template: this.actionsTmpl(),
      },
    ];
  }

  openApprovalDialog(contribution: Contribution) {
    this.dialogService.openDefault(ContributionApproveDialogComponent, {
      data: { contribution },
    });
  }

  onFilterChange(filters: Record<string, unknown>) {
    console.log('Active filters:', filters);
    // Implement filter logic
  }

  onSelectionChange(selected: unknown[]) {
    console.log('Selected:', selected);
  }

  refreshData() {
    const queryParams: Params = { q: this.searchTerm() };
    const _cp = this.contributionPurpose();
    if (_cp) queryParams['purpose'] = _cp.id;

    this.routerService
      .updateRouterState(queryParams)
      .then(() =>
        this.contributionFacade.fetchAll(
          this.routerService.getAsHttpParams()
        )
      );
  }

  onDelete(items: unknown[]) {
    // Implement delete logic
    console.log('items to delete are');
    console.table(items);
  }

  onAdd(contributeForOther: boolean) {
    // open add dialog if cp
    const cpurpose = this.contributionPurpose();
    if (cpurpose !== undefined) {
      this.diagService.openDefault(ContributionDialogComponent, {
        data: { cpurpose, contributeForOther },
        maxWidth: '85vw',
        minWidth: '65vw',
      });
    }
  }

  onExport() {
    console.log('onExport method called');
  }

  getStatusColor(contribution: Contribution): string {
    if (contribution.status === 'COMPLETED') {
      return 'success';
    } else if (contribution.status === 'PENDING') {
      return 'info';
    } else if (contribution.status === 'FAILED') {
      return 'warn';
    } else {
      return 'danger';
    }
  }
}
