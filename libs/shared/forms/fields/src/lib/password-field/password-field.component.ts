import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { IconicButtonComponent } from '@kps/material/button';
import { MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

/**
 * The `PasswordFieldComponent` is a standalone component that provides a password input field with a toggle button to show/hide the password.
 */
@Component({
  selector: 'kps-password-field',
  standalone: true,
  imports: [InputFieldComponent, IconicButtonComponent, MatIcon, MatPrefix, MatSuffix],
  templateUrl: './password-field.component.html',
  styles: `
  :host {
    min-inline-size: 320px;
    max-inline-size: 100%
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent extends FormFieldComponent {
  /**Value between 0 to 5 */
  bottomSpacing = input<string | number>('0');

  /**A model signal that specifies whether a password is visible or not. */
  passwordVisible = model(false);


  passwordInputType = computed(() =>
    this.passwordVisible() ? 'text' : 'password'
  );
  suffixIcon = computed(() =>
    this.passwordVisible() ? 'visibility_off' : 'visibility'
  );

  showPassword() {
    this.passwordVisible.set(!this.passwordVisible());
  }
}
