import { Component, InputSignal, input, output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { BtnType, BtnVariant } from '../types';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'kps-base-button',
  template: ``,
  styles: ``,
  standalone: true,
})
export class BaseButtonComponent {
  icon = input<string | undefined>();
  /**
   * @deprecated
   * Use `rouerLink` directive instead
   */
  btnLink = input<string | string[] | null>(null);
  btnType = input<BtnType>('button');
  /**
   * @deprecated
   * Use `<div [attr.aria-label]=""></div>` instead
   */
  btnAriaLabel = input<string>();
  variant = input<BtnVariant>('plain');
  btnColor = input<ThemePalette>('primary');
  btnDisabled = input<boolean>(false);
  loading = input<boolean>(false);
  /**When provided, it set the disabled state using it's validity and dirty state */
  validationController: InputSignal<AbstractControl | undefined> =
    input<AbstractControl>();

  clicked = output<void>();

  /**Returns the disabled state of the button, if `validationFormGroup` is provided it uses the formGroup to
   * disable a button based on it's validity and whether it is not changed.
   * @see {@link btnDisabled}
   * @see {@link validationController}
   */
  getDisabledState(): boolean {
    // if invalid,, loading, or valid and not touched -> make the btn disabled
    const controller = this.validationController();
    if (controller) {
      return (
        controller.invalid ||
        this.loading() ||
        (controller.valid && !controller.touched)
      );
    }
    return this.btnDisabled();
  }
}
