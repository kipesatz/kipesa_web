import { inject, Injectable, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthUserPayload } from '@kps/data/accounts';
import { BaseFormService } from '@kps/forms';

export type PinfoEditFg = FormGroup<{
  [K in keyof AuthUserPayload]: FormControl<AuthUserPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class PinfoFormService extends BaseFormService<AuthUserPayload> {
  private fb = inject(FormBuilder);

  pinfoForm = signal(this.buildForm());

  override buildForm(): PinfoEditFg {
    return this.fb.group({
      firstName: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(150)],
      }),
      lastName: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.maxLength(150)],
      }),
      middleName: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(150)],
      }),
      occupation: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(150)],
      }),
      nationalId: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(45)],
      }),
      dob: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(150)],
      }),
      address: this.fb.control<string | null>(null, {
        validators: [Validators.maxLength(255)],
      }),
    });
  }
}
