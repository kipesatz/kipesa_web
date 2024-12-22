import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EmailFieldComponent, PasswordFieldComponent, PhoneFieldComponent } from '@kps/forms/fields';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { LoginFormGroup, LoginFormService } from '../../services';
import { BaseFormComponent } from '@kps/forms';
import { ButtonComponent } from '@kps/material/button';
@Component({
  selector: 'kps-login-form',
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    ReactiveFormsModule,
    PhoneFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    ButtonComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent extends BaseFormComponent implements OnInit {
  private loginFormService = inject(LoginFormService);
  public hidePassword = true;

  public loginMethodControl = new FormControl<'email' | 'phone'>('phone');

  public getFormGroup(): LoginFormGroup {
    return this.loginFormService.loginForm;
  }

  ngOnInit(): void {
    this.loginFormService.initForm();

    // Reset form when login method changes
    this.loginMethodControl.valueChanges.subscribe(() => {
      this.getFormGroup().get('loginId')?.setValue('');
    });
  }
}
