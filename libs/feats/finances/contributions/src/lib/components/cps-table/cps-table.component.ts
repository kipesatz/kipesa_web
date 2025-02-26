import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CpFacadeService } from '@kps/data/finances';
import { ThemePalette } from '@angular/material/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { DataTableComponent, TableColumn } from '@kps/material/table';
import { CpCreationDialogComponent } from '../../pages';
import { BaseDialogService } from '@kps/material/dialog';
import { RouterLink } from '@angular/router';
import { RouterService } from '@kps/core/router';
import { SearchFieldComponent } from '@kps/forms/fields';
import { MatProgressBar } from '@angular/material/progress-bar';

/**
 * Responsible for rendering all contributions purposes (CPs) that belong to activated assoc
 */
@Component({
  selector: 'kps-cps-table',
  imports: [
    DataTableComponent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    CurrencyPipe,
    DatePipe,
    RouterLink,
    SearchFieldComponent,
    MatProgressBar,
  ],
  templateUrl: './cps-table.component.html',
  styles: ``,
})
export class CpsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) {
        this.refreshData();
      }
    });
  }
  // injections
  private cpFacade = inject(CpFacadeService);
  private baseDialog = inject(BaseDialogService);
  private routerService = inject(RouterService);

  // data sources
  allCps = this.cpFacade.allCps;
  cpsLoading = this.cpFacade.cpsLoading;
  totalCps = this.cpFacade.totalCps;
  cpsCount = this.cpFacade.cpsCount;

  // custom templates
  titleTemplate = viewChild.required<TemplateRef<unknown>>('titleTemplate');
  targetAmtTmpl = viewChild.required<TemplateRef<unknown>>('targetAmtTmpl');
  progressTmpl = viewChild.required<TemplateRef<unknown>>('progressTmpl');
  createdTmpl = viewChild.required<TemplateRef<unknown>>('createdTmpl');
  startDateTmpl = viewChild.required<TemplateRef<unknown>>('startDateTmpl');
  endDateTmpl = viewChild.required<TemplateRef<unknown>>('endDateTmpl');
  actionsTemplate = viewChild.required<TemplateRef<unknown>>('actionsTemplate');

  columns: TableColumn[] = [];
  visibleColumns = [
    'title',
    'targetAmount',
    'progressPercentage',
    'startDate',
    'endDate',
    'createdOn',
    'actions',
  ];

  searchTerm = signal('');

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      {
        key: 'title',
        label: 'Title',
        template: this.titleTemplate(),
      },
      {
        key: 'targetAmount',
        label: 'Target Amount',
        sortable: true,
        template: this.targetAmtTmpl(),
      },
      {
        key: 'progressPercentage',
        label: 'Progress',
        template: this.progressTmpl(),
      },
      {
        key: 'startDate',
        label: 'Start date',
        template: this.startDateTmpl(),
      },
      {
        key: 'endDate',
        label: 'End date',
        template: this.endDateTmpl(),
      },
      {
        key: 'createdOn',
        label: 'Created',
        template: this.createdTmpl(),
        sortable: true,
      },
      {
        key: 'actions',
        label: 'Actions',
        template: this.actionsTemplate(),
      },
    ];

    // fetch cps
    this.cpFacade.dispatchFetchAll();
  }

  // Template helper methods
  getStatusColor(isActive: boolean): ThemePalette {
    return isActive ? 'primary' : 'warn';
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
    this.routerService.updateRouterState({ q: this.searchTerm() }).then(() => {
      this.cpFacade.dispatchFetchAll(this.routerService.getAsHttpParams());
    });
  }

  onDelete(items: unknown[]) {
    // Implement delete logic
    console.log('items to delete are');
    console.table(items);
  }

  onAdd() {
    this.baseDialog.openDefault(CpCreationDialogComponent, {
      minWidth: '65vw',
    });
  }

  onExport() {
    console.log('onExport method called');
  }
}
