import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { RegisterUserEffects,  } from './+state';
import { provideState } from '@ngrx/store';
import { fromUserRegistration } from './+state/reducers';

@NgModule({
  providers: [
    provideEffects([RegisterUserEffects]),
    provideState(fromUserRegistration.registerUserFeature),
  ],
})
export class UserRegistrationDataModule {}
