import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { RegistrationFormComponent } from '@kps/accounts/auth-forms';
import { RegisterUserFacadeService, RegistrationPayload } from '@kps/data/auth';

@Component({
  selector: 'kps-registration-page',
  imports: [RouterLink, RegistrationFormComponent, MatCard, MatCardContent],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  private userRegFacade = inject(RegisterUserFacadeService);

  registerUser(payload: RegistrationPayload): void {
    this.userRegFacade.dispatchRegister(payload);
  }
}
