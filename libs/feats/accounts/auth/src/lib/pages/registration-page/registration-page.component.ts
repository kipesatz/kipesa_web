import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardMdImage,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { RegistrationFormComponent } from '@kps/accounts/auth-forms';

@Component({
  selector: 'kps-registration-page',
  imports: [
    RouterLink,
    RegistrationFormComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardMdImage,
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {}
