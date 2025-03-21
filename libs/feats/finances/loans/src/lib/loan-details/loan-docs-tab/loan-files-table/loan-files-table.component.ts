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
import { RouterService } from '@kps/core/router';
import { LoanFileFacadeService } from '@kps/data/finances';
import {
  DataTableComponent,
  TableColumn,
  TableFilter,
} from '@kps/material/table';
import { LoanFileDialogComponent } from '../loan-file-dialog/loan-file-dialog.component';
import { ButtonComponent } from '@kps/material/button';
import { AnimatedSearchFieldComponent } from '@kps/forms/fields';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kps-loan-files-table',
  imports: [
    DataTableComponent,
    ButtonComponent,
    AnimatedSearchFieldComponent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './loan-files-table.component.html',
  styles: ``,
})
export class LoanFilesTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData(); // refresh when searchTerm changes
    });
  }
  // injections
  private facadeService = inject(LoanFileFacadeService);
  private routerService = inject(RouterService);
  private matDialog = inject(MatDialog);
  private curRoute = inject(ActivatedRoute);

  // data sources
  loanId = this.curRoute.snapshot?.parent?.parent?.paramMap.get('loanId');
  loanFiles = this.facadeService.allLoanFiles;
  loanFilesLoading = this.facadeService.loading;
  loanFilesTotal = this.facadeService.total;

  // custom templates
  uploadTmpl = viewChild.required<TemplateRef<unknown>>('uploadTmpl');
  verificationDateTmpl = viewChild.required<TemplateRef<unknown>>(
    'verificationDateTmpl'
  );
  actionsTmpl = viewChild.required<TemplateRef<unknown>>('actionsTmpl');

  columns: TableColumn[] = [];
  visibleColumns = [
    'title',
    'documentType',
    'verificationStatus',
    'verificationDate',
    'uploadDate',
    'actions',
  ];
  filters: TableFilter[] = [];
  searchTerm = signal<string>('');

  openAddLoanFileDialog() {
    this.matDialog.open(LoanFileDialogComponent, { minWidth: '768px' });
  }

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      { key: 'title', label: 'Title' },
      { key: 'documentType', label: 'Document Type' },
      { key: 'verificationStatus', label: 'Status' },
      {
        key: 'verificationDate',
        label: 'Verification Date',
        sortable: true,
        template: this.verificationDateTmpl(),
      },
      {
        key: 'uploadDate',
        label: 'Upload Date',
        sortable: true,
        template: this.uploadTmpl(),
      },

      { key: 'actions', label: 'Actions', template: this.actionsTmpl() },
    ];
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
    const _loanId = this.loanId;
    if (_loanId) {
      this.routerService
        .updateRouterState({ q: this.searchTerm() })
        .then(() =>
          this.facadeService.dispatchLoadLoanFiles(
            _loanId,
            this.routerService.getAsHttpParams()
          )
        );
    }
  }
}
