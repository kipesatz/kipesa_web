import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import {
  LoadContributionEffects,
  UpdateContributionEffects,
  DeleteContributionEffects,
  AddContributionEffects,
  fromContribution,
} from './+state';
import { provideState } from '@ngrx/store';

@NgModule({
  providers: [
    provideState(fromContribution.contributionFeature),
    provideEffects([
      LoadContributionEffects,
      AddContributionEffects,
      UpdateContributionEffects,
      DeleteContributionEffects,
    ]),
  ],
})
export class ContributionDataModule {}
