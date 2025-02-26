import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { fromMembershipStats, MembershipStatsEffects } from './+state';

@NgModule({
  providers: [
    provideState(fromMembershipStats.membershipStatsFeature),
    provideEffects([MembershipStatsEffects]),
  ],
})
export class MembershipStatsDataModule {}
