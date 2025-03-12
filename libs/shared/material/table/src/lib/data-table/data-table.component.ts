import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  MatNoDataRow,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { NgTemplateOutlet } from '@angular/common';
import { LoadingIndicatorComponent } from '@kps/material/progress';

export interface TableColumn {
  key: string;
  label: string;
  template?: TemplateRef<unknown> | ((value: unknown) => string);
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableFilter {
  key: string;
  label: string;
  options: { value: unknown; label: string }[];
}

@Component({
  selector: 'kps-data-table',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatTableModule,
    MatCheckbox,
    LoadingIndicatorComponent,
    MatNoDataRow,
    NgTemplateOutlet,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T> {
  // Inputs
  defaultVisibleTools = input<string[]>(['refresh', 'add', 'delete']);
  columns = input<TableColumn[]>([]);
  data = input<T[]>([]);
  visibleColumns = input<string[]>([]);
  availableFilters = input<TableFilter[]>([]);
  tableTitle = input<string>();
  dataLoading = input<boolean>(false);

  // Outputs
  selectionChange = output<T[]>();
  refreshChange = output<void>();
  delete = output<T[]>();
  add = output<void>();
  filterChange = output<Record<string, unknown>>();

  // Local state
  dataSource = signal(new MatTableDataSource<T>([]));
  selection = new SelectionModel<T>(true, []);
  activeFilters = signal<Record<string, unknown>>({});

  // Computed values
  displayedColumns = computed(() => ['select', ...this.visibleColumns()]);

  constructor() {
    // Update datasource when data input changes
    effect(() => {
      this.dataSource.update((source) => {
        source.data = this.data();
        return source;
      });
    });
  }

  // Filter methods
  toggleFilter(filter: TableFilter, value: unknown) {
    this.activeFilters.update((filters) => {
      const newFilters = { ...filters };
      if (newFilters[filter.key] === value) {
        delete newFilters[filter.key];
      } else {
        newFilters[filter.key] = value;
      }
      return newFilters;
    });
    this.filterChange.emit(this.activeFilters());
  }

  isFilterActive(filter: TableFilter, value: unknown): boolean {
    return this.activeFilters()[filter.key] === value;
  }

  clearFilters() {
    this.activeFilters.set({});
    this.filterChange.emit({});
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.activeFilters()).length > 0;
  }

  selectAll(): void {
    const data = this.dataSource().data;
    data.forEach((item) => this.selection.select(item));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource().data.length;
    return numSelected === numRows && numRows > 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource().data.forEach((row) => this.selection.select(row));
    }
    this.selectionChange.emit(this.selection.selected);
  }

  isTemplateRef(value: unknown): value is TemplateRef<unknown> {
    return value instanceof TemplateRef;
  }
}
