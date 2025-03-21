import { NgStyle } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'kps-card-radio-item',
  imports: [MatRadioButton, NgStyle],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardRadioItemComponent),
      multi: true,
    },
  ],
  templateUrl: './card-radio-item.component.html',
  styleUrl: './card-radio-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CardRadioItemComponent implements ControlValueAccessor {
  value = input<unknown>();
  itemWidth = model<string>('200px');

  selected = signal<boolean>(false);
  disabled = signal<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: (value: unknown) => void = () => {};

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  setSelected(isSelected: boolean): void {
    this.selected.set(isSelected);
  }

  setDisabled(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onSelect(): void {
    if (this.disabled()) return;

    this.selected.set(!this.selected());
    this.onChange(this.value());
    // this.onTouched();
  }

  writeValue(obj: unknown): void {
    // This method is called when the form control value is updated from the model
    const isSelected = obj === this.value();
    this.selected.set(isSelected);
  }
  registerOnTouched(fn: unknown): void {
    this.onTouched(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
