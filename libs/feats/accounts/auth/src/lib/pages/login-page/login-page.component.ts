import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '@kps/accounts/auth-forms';
import {
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardMdImage,
} from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import {
  AuthCheckService,
  LoginFacadeService,
  LoginPayload,
} from '@kps/data/auth';

@Component({
  selector: 'kps-login-page',
  imports: [
    LoginFormComponent,
    MatCard,
    MatCardHeader,
    RouterLink,
    MatCardContent,
    MatCardMdImage,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  loginFacadeService = inject(LoginFacadeService);
  private router = inject(Router);
  private authCheckService = inject(AuthCheckService);

  dispatchLoginAttempt(loginPayload: LoginPayload): void {
    this.loginFacadeService.dispatchLogin(loginPayload);
  }

  ngOnInit(): void {
    // check if authenticated
    if (this.authCheckService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboards/myDashboard');
    }
  }
}
