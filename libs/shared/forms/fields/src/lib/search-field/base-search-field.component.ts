import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'kps-base-search-field',
  imports: [],
  template: ``,
  styles: ``,
})
export class BaseSearchFieldComponent {
  // signals
  searchPlaceholder: InputSignal<string> = input<string>('Search here...');
  /**Duration in milliseconds to delay before detecting changes in the search input */
  searchDelay: InputSignal<number> = input<number>(500);
}
