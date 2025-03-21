import { Component, inject } from '@angular/core';
import { LoginFormComponent } from '@kps/accounts/auth-forms';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { LoginFacadeService, LoginPayload } from '@kps/data/auth';

@Component({
  selector: 'kps-login-page',
  imports: [
    LoginFormComponent,
    MatCard,
    MatCardHeader,
    RouterLink,
    MatCardContent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  loginFacadeService = inject(LoginFacadeService);

  dispatchLoginAttempt(loginPayload: LoginPayload): void {
    this.loginFacadeService.dispatchLogin(loginPayload);
  }
}
