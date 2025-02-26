import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import {
  ChangePasswordEffects,
  LoadAuthUserEffects,
  UpdateAuthUserEffects,
  fromAuthUser,
  fromPassword,
} from './+state';
import { provideEffects } from '@ngrx/effects';

@NgModule({
  providers: [
    provideState(fromAuthUser.authUsersFeature),
    provideState(fromPassword.passwordsFeature),
    provideEffects([
      LoadAuthUserEffects,
      UpdateAuthUserEffects,
      ChangePasswordEffects,
    ]),
  ],
})
export class AuthUserDataModule {}
