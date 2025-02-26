import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  signal,
} from '@angular/core';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    ReactiveFormsModule,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent extends BaseSearchFieldComponent {
  constructor() {
    super();

    effect(() => {
      if (this._searchString()) {
        this.searchTerm.set(this.searchController.value);
      }
    });
  }
  // deps
  protected curRoute = inject(ActivatedRoute);

  availableFilters: InputSignal<TableFilter[] | undefined> =
    input<TableFilter[]>();
  activeFilters = signal<Record<string, unknown>>({});
  filterChange = output<Record<string, unknown>>();
  /**Release the latest search value from search input after each milliseconds specified in `searchDelay` */
  searchTerm: ModelSignal<string> = model<string>(
    this.curRoute.snapshot.queryParamMap.get('q') ?? ''
  );

  // form controller
  searchController: FormControl<string> = new FormControl<string>(
    this.searchTerm(),
    {
      validators: [Validators.maxLength(400)],
      nonNullable: true,
    }
  );
  // mark as dirty after every `searchDelay() and value has changed compared to the prev one`
  private _searchString = toSignal(
    this.searchController.valueChanges.pipe(
      debounceTime(this.searchDelay()),
      distinctUntilChanged()
    )
  );

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
