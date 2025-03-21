import {
  AfterContentInit,
  Component,
  contentChildren,
  effect,
  forwardRef,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CardRadioItemComponent } from '../card-radio-item/card-radio-item.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'kps-card-radio-group',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardRadioGroupComponent),
      multi: true,
    },
  ],
  templateUrl: './card-radio-group.component.html',
  styleUrl: './card-radio-group.component.scss',
})
export class CardRadioGroupComponent
  implements ControlValueAccessor, AfterContentInit
{
  constructor() {
    effect(() => {
      if (this.cardItems()) {
        // handle items added automatically
        this.updateItemSelections();
      }

      if (this.widthPerItem() && this.cardItems().length > 0) {
        this.cardItems().forEach((item) =>
          item.itemWidth.set(this.widthPerItem())
        );
      }
    });
  }
  cardItems = contentChildren(CardRadioItemComponent);
  widthPerItem = input<string>('200px');
  name = input('card-radio-group');
  value = signal<unknown>('');
  disabled = signal<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  ngAfterContentInit() {
    // Register listeners for each radio item
    this.cardItems().forEach((item) => {
      item.registerOnChange((value: any) => {
        this.updateValue(value);
        this.writeValue(value);
        this.onChange(value);
        this.onTouched();

        // Update selection state of all items
        this.updateItemSelections();
      });
    });

    // Set initial selections
    setTimeout(() => this.updateItemSelections());
  }

  writeValue(value: unknown): void {
    this.value.set(value);
    this.updateItemSelections();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);

    if (this.cardItems()) {
      this.cardItems().forEach((item) => {
        item.setDisabled(isDisabled);
      });
    }
  }

  private updateValue(value: unknown): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  private updateItemSelections(): void {
    if (!this.cardItems()) return;

    this.cardItems().forEach((item) => {
      item.selected.set(item.value() === this.value());
      item.disabled.set(this.disabled());
    });
  }
}
