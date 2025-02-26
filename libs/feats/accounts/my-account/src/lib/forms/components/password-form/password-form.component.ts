import { Component, input } from '@angular/core';
import { BaseFormComponent } from '@kps/forms';
import { PasswordChangeFg } from '../../services';
import { PasswordFieldComponent } from '@kps/forms/fields';
import { MatHint } from '@angular/material/form-field';

@Component({
  selector: 'kps-password-form',
  imports: [PasswordFieldComponent, MatHint],
  templateUrl: './password-form.component.html',
  styles: ``,
})
export class PasswordFormComponent extends BaseFormComponent {
  formGroup = input.required<PasswordChangeFg>();

  getFormGroup = () => this.formGroup();
  passwordVisible = false;
}
