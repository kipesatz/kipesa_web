import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import {
  fromMembership,
  LoadMembershipEffects,
  RequestMembershipEffects,
  UpdateMembershipEffects,
} from './+state';
import { provideEffects } from '@ngrx/effects';

@NgModule({
  providers: [
    provideState(fromMembership.membershipsFeature),
    provideEffects([
      LoadMembershipEffects,
      RequestMembershipEffects,
      UpdateMembershipEffects,
    ]),
  ],
})
export class MembershipDataModule {}
