import { Component, inject, OnInit } from '@angular/core';
import { RegistrationFormGroup, RegistrationFormService } from '../../services';
import { BaseFormComponent } from '@kps/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox'
import {
  EmailFieldComponent,
  InputFieldComponent,
  PasswordFieldComponent,
  PhoneFieldComponent,
} from '@kps/forms/fields';
import { ButtonComponent } from '@kps/material/button';

@Component({
  selector: 'kps-registration-form',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    EmailFieldComponent,
    PhoneFieldComponent,
    PasswordFieldComponent,
    ButtonComponent,
    MatCheckbox
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent
  extends BaseFormComponent
  implements OnInit
{
  private registrationFormService = inject(RegistrationFormService);
  public hidePassword = true;

  public getFormGroup(): RegistrationFormGroup {
    return this.registrationFormService.registrationForm;
  }

  ngOnInit(): void {
    this.registrationFormService.initForm();
  }
}
