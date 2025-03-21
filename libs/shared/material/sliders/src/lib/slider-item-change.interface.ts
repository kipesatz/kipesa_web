import { CardSliderItemComponent } from './card-slider-item/card-slider-item.component';

/**
 * Represents a change event for a slider item with an associated context.
 * @template T The type of context associated with the slider item.
 */
export interface SliderItemChange {
  index: number;
  item: CardSliderItemComponent;
}
