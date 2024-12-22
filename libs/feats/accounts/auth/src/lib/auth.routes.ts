import { Routes } from '@angular/router';
import { LoginPageComponent, RegistrationPageComponent } from './pages';

export const accountsAuthRoutes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegistrationPageComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
