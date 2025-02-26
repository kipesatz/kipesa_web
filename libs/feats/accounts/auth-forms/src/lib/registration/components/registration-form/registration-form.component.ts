import { Component, inject, output } from '@angular/core';
import { RegistrationFormService } from '../../services';
import { BaseFormComponent } from '@kps/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  EmailFieldComponent,
  InputFieldComponent,
  PasswordFieldComponent,
  PhoneFieldComponent,
} from '@kps/forms/fields';
import { ButtonComponent } from '@kps/material/button';
import { RegistrationPayload } from '@kps/data/auth';

@Component({
  selector: 'kps-registration-form',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    EmailFieldComponent,
    PhoneFieldComponent,
    PasswordFieldComponent,
    ButtonComponent,
    MatCheckbox,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent extends BaseFormComponent {
  // injections
  private regFormService = inject(RegistrationFormService);
  public hidePassword = true;

  // output
  formSubmitted = output<RegistrationPayload>();

  getFormGroup = () => this.regFormService.registrationForm();

  public onSubmit(): void {
    // console.log("onsubmit is called", this.getFormGroup().value)
    // if (this.getFormGroup().valid) {
      const formValue = this.getFormGroup().value;

      const { agreeToTerms, confirmPassword, ...registrationData } = formValue;
      if (registrationData) {
        this.formSubmitted.emit(registrationData as RegistrationPayload);
      }

    //   console.log("form is valid")
    // }
  }
}
