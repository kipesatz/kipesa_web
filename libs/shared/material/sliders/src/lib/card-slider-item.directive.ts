import { Directive, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kpsCardSliderItem]',
  standalone: true
})
export class CardSliderItemDirective {
  /** Optional context data that can be passed to the card slider item. */
  context = input<unknown>();

  constructor(public templateRef: TemplateRef<any>) {}
}
