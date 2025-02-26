import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  EmailFieldComponent,
  PasswordFieldComponent,
  PhoneFieldComponent,
} from '@kps/forms/fields';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { LoginFg, LoginFormService } from '../../services';
import { BaseFormComponent } from '@kps/forms';
import { ButtonComponent } from '@kps/material/button';
import { LoginFacadeService, LoginPayload } from '@kps/data/auth';
@Component({
  selector: 'kps-login-form',
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    ReactiveFormsModule,
    PhoneFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent extends BaseFormComponent implements OnInit {
  private loginFormService = inject(LoginFormService);
  private loginFacade = inject(LoginFacadeService)

  // outputs
  loginChange = output<LoginPayload>();

  loading$ = this.loginFacade.loading
  public hidePassword = true;
  public loginMethodControl = new FormControl<'email' | 'phone'>('phone');

  getFormGroup = (): LoginFg => this.loginFormService.loginForm();

  submitForm(): void {
    if (this.getFormGroup().valid) {
      this.loginChange.emit(this.getFormGroup().value as LoginPayload);
    }
  }

  ngOnInit(): void {
    // Reset form when login method changes
    this.loginMethodControl.valueChanges.subscribe(() => {
      this.getFormGroup().get('loginId')?.setValue('');
    });
  }
}
