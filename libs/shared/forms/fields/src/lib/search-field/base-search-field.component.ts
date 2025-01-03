import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'kps-base-search-field',
  imports: [],
  template: ``,
  styles: ``,
})
export class BaseSearchFieldComponent implements OnInit {
  constructor() {
    effect(() => {
      this.searchTerm.set(this._searchTerm() ?? '');
    });
  }
  // deps
  protected currentRoute = inject(ActivatedRoute);
  private controllerBuilder = inject(NonNullableFormBuilder);
  // props
  protected searchController!: FormControl<string>;
  protected qStringValue = this.currentRoute.snapshot.queryParamMap.get('q');

  /**Release the latest search value from search input after each milliseconds specified in `searchDelay` */
  searchTerm: ModelSignal<string> = model<string>(
    this.currentRoute.snapshot.queryParamMap.get('q') ?? ''
  );

  // signals
  searchPlaceholder: InputSignal<string> = input<string>('Search here...');
  /**Duration in milliseconds to delay before detecting changes in the search input */
  searchDelay: InputSignal<number> = input<number>(500);

  private _searchTerm = toSignal(
    this.searchController.valueChanges.pipe(debounceTime(this.searchDelay()))
  );

  ngOnInit(): void {
    // init search controller
    this.searchController = this.controllerBuilder.control(this.searchTerm(), {
      validators: [Validators.maxLength(400)],
    });
  }
}
