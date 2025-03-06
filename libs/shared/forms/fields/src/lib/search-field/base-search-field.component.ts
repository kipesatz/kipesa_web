import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  model,
  output,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Validators } from 'ngx-editor';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'kps-base-search-field',
  imports: [],
  template: ``,
  styles: ``,
})
export class BaseSearchFieldComponent {
  constructor() {
    effect(() => {
      if (this._searchString()) {
        this.searchTerm.set(this.searchController.value);
      }
    });
  }

  protected curRoute = inject(ActivatedRoute);

  // signals
  searchPlaceholder: InputSignal<string> = input<string>('Search here...');
  /**Duration in milliseconds to delay before detecting changes in the search input */
  searchDelay: InputSignal<number> = input<number>(500);
  showFilterMenu = input<boolean>(true)
  filterChange = output<void>()

  /**Release the latest search value from search input after each milliseconds specified in `searchDelay` */
  searchTerm = model<string>(
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
}
