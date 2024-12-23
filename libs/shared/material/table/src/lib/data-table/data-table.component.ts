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
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatInput } from '@angular/material/input';
import { NgTemplateOutlet } from '@angular/common';

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
    NgTemplateOutlet,
    MatToolbar,
    MatFormField,
    MatInput,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatIconButton,
    MatTableModule,
    MatCheckbox,

    // expansion
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T> {
  // Inputs
  columns = input<TableColumn[]>([]);
  data = input<T[]>([]);
  visibleColumns = input<string[]>([]);
  availableFilters = input<TableFilter[]>([]);

  // Outputs
  selectionChange = output<T[]>();
  search = output<string>();
  refresh = output<void>();
  delete = output<T[]>();
  add = output<void>();
  filterChange = output<Record<string, unknown>>();

  // Local state
  dataSource = signal(new MatTableDataSource<T>([]));
  selection = new SelectionModel<T>(true, []);
  searchSubject = new Subject<string>();
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

    // Handle search debouncing
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => this.search.emit(value));
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

  handleSearchKeyup($event: KeyboardEvent): void {
    const inputEl = $event.target as HTMLInputElement | null;
    if (inputEl) {
      this.searchSubject.next(inputEl.value);
    } else {
      console.log('Unexpected event target', $event.target);
    }
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

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource().data.length;
    return numSelected === numRows && numRows > 0;
  }

  selectAll(): void {
    const data = this.dataSource().data;
    data.forEach((item) => this.selection.select(item));
  }

  isTemplateRef(value: unknown): value is TemplateRef<unknown> {
    return value instanceof TemplateRef;
  }
}
