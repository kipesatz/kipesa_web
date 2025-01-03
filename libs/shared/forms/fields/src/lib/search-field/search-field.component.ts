import { Component, input, InputSignal, output, signal } from '@angular/core';
import {
  MatFormField,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { BaseSearchFieldComponent } from './base-search-field.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TableFilter } from '@kps/material/table';

@Component({
  selector: 'kps-search-field',
  imports: [
    MatFormField,
    MatIcon,
    MatPrefix,
    MatSuffix,
    MatInput,
    MatMenu,
    MatMenuTrigger,

    MatSelectionList,
    MatListOption,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent extends BaseSearchFieldComponent {
  availableFilters: InputSignal<TableFilter[] | undefined> =
    input<TableFilter[]>();
  activeFilters = signal<Record<string, unknown>>({});
  filterChange = output<Record<string, unknown>>();

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
}
