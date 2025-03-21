import {
  Component,
  contentChild,
  input,
  model,
  TemplateRef,
} from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'kps-card-slider-item',
  imports: [MatCard, MatCardContent],
  templateUrl: './card-slider-item.component.html',
  styleUrl: './card-slider-item.component.scss',
})
export class CardSliderItemComponent {
  /** Optional context data that can be passed to the card slider item. */
  data = input<unknown>();
  active = model<boolean>(false);

  contentTemplate = contentChild<TemplateRef<unknown>>(TemplateRef);
}
