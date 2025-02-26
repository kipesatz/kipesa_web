import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import { fromLogin } from './+state';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './+state/effects';

@NgModule({
  providers: [
    provideState(fromLogin.loginFeature),
    provideEffects([LoginEffects]),
  ],
})
export class LoginDataModule {}
