import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginPayload } from '@kps/data/auth';
import { BaseFormService } from '@kps/forms';

export type LoginFormGroup = FormGroup<{
  [K in keyof LoginPayload]: FormControl<LoginPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class LoginFormService extends BaseFormService<LoginPayload> {
  protected formBuilder: NonNullableFormBuilder = inject(
    NonNullableFormBuilder
  );
  loginForm!: LoginFormGroup;

  public initForm(): void {
    this.loginForm = this.buildForm();
  }

  protected override buildForm(): FormGroup {
    return this.formBuilder.group({
      loginId: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(255)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255),
        ],
      ],
    });
  }
}
