import { DatePipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterService } from '@kps/core/router';
import { ReportFacadeService } from '@kps/data/finances';
import { SearchFieldComponent } from '@kps/forms/fields';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { ReportGenDialogComponent } from '../report-gen-dialog/report-gen-dialog.component';

@Component({
  selector: 'kps-reports-table',
  imports: [
    DataTableComponent,
    SearchFieldComponent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    DatePipe,
  ],
  templateUrl: './reports-table.component.html',
  styleUrl: './reports-table.component.scss',
})
export class ReportsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(ReportFacadeService);
  private routerService = inject(RouterService);
  private matDialog = inject(MatDialog);

  // data sources
  finacialReports = this.facadeService.reports;
  reportsLoading = this.facadeService.loading;
  contributionsLoading = this.facadeService.loading;
  totalReports = this.facadeService.totalReports;

  // custom templates
  createdTmpl = viewChild.required<TemplateRef<unknown>>('createdTmpl');
  filePathTmpl = viewChild.required<TemplateRef<unknown>>('filePathTmpl');
  startDateTmpl = viewChild.required<TemplateRef<unknown>>('startDateTmpl');
  endDateTmpl = viewChild.required<TemplateRef<unknown>>('endDateTmpl');
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'id',
    'title',
    'createdOn',
    'timeRange',
    'startDate',
    'endDate',
    'filePath',
    'actions',
  ];
  filters: TableFilter[] = [];
  searchTerm = signal<string>('');

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      {
        key: 'id',
        label: 'ID',
      },
      {
        key: 'title',
        label: 'Title',
        sortable: true,
      },
      {
        key: 'createdOn',
        label: 'Created',
        template: this.createdTmpl(),
      },
      {
        key: 'timeRange',
        label: 'Time Range',
      },
      {
        key: 'startDate',
        label: 'Start date',
        template: this.startDateTmpl(),
      },
      {
        key: 'endDate',
        label: 'End Date',
        template: this.endDateTmpl(),
        sortable: true,
      },
      {
        key: 'filePath',
        label: 'File path',
        template: this.filePathTmpl(),
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

  openGenReportDialog() {
    this.matDialog.open(ReportGenDialogComponent);
  }
}
