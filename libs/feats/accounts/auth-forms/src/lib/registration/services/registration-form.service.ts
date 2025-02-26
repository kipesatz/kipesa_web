import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { RegistrationPayload } from '@kps/data/auth';
import { BaseFormService } from '@kps/forms';
import { matchValidator } from '@kps/forms/validators';

interface RegFormMap extends RegistrationPayload {
  confirmPassword: string;
  agreeToTerms: boolean;
}

export type RegFormGroup = FormGroup<{
  [K in keyof RegFormMap]: FormControl<RegFormMap[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class RegistrationFormService extends BaseFormService<RegFormMap> {
  private builder = inject(NonNullableFormBuilder);
  public registrationForm = signal<RegFormGroup>(this.buildForm());

  public override buildForm(): RegFormGroup {
    return this.builder.group(
      {
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(255)],
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern(/^\+\d{1,3}(\d{9,10})/),
          ],
        ],
        firstName: ['', [Validators.required, Validators.maxLength(60)]],
        lastName: ['', [Validators.required, Validators.maxLength(60)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(255),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(255),
          ],
        ],
        agreeToTerms: this.builder.control<boolean>(false, [
          Validators.requiredTrue,
        ]),
      },
      // { validators: matchValidator('password', 'confirmPassword') }
    );
  }
}
