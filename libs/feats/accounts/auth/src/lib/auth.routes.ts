import { Routes } from '@angular/router';
import { LoginPageComponent, RegistrationPageComponent } from './pages';
import { AuthContainerComponent } from './components';
import { importProvidersFrom } from '@angular/core';
import { UserRegistrationDataModule } from '@kps/data/auth';

export const accountsAuthRoutes: Routes = [
  {
    path: '',
    component: AuthContainerComponent,
    children: [
      { path: 'login', title: 'Login', component: LoginPageComponent },
      {
        path: 'register',
        title: 'Register',
        component: RegistrationPageComponent,
        providers: [importProvidersFrom(UserRegistrationDataModule)],
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: '**', pathMatch: 'full', redirectTo: 'login' },
    ],
  },
];
