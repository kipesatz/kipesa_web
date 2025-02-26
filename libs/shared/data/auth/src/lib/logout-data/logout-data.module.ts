import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import { fromLogout, LogoutEffects } from './+state';
import { provideEffects } from '@ngrx/effects';

@NgModule({
  providers: [
    provideState(fromLogout.logoutFeature),
    provideEffects([LogoutEffects]),
  ],
})
export class LogoutDataModule {}
