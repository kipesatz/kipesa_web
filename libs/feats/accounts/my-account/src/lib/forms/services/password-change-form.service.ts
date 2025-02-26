import { inject, Injectable, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ChangePasswordPayload } from '@kps/data/accounts';
import { BaseFormService } from '@kps/forms';
import { matchValidator } from '@kps/forms/validators';

export type PasswordChangeFg = FormGroup<{
  [K in keyof ChangePasswordPayload]: FormControl<ChangePasswordPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class PasswordChangeFormService extends BaseFormService<ChangePasswordPayload> {
  private builder = inject(NonNullableFormBuilder);
  passwordForm = signal(this.buildForm());

  public override buildForm(): PasswordChangeFg {
    return this.builder.group(
      {
        oldPassword: ['', [Validators.required, Validators.maxLength(255)]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(255),
          ],
        ],
        confirmNewPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(255),
          ],
        ],
      },
      {
        validators: [
          matchValidator(
            'newPassword',
            'confirmPassword',
            'Confirm password should match the new password'
          ),
        ],
      }
    );
  }
}
