import { NgModule } from '@angular/core';
import {
  CreateContributionPurposeEffects,
  DeleteContributionPurposeEffects,
  fromCps,
  LoadContributionPurposeEffects,
  UpdateContributionPurposeEffects,
} from './+state';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

@NgModule({
  providers: [
    provideState(fromCps.cpsFeature),
    provideEffects([
      LoadContributionPurposeEffects,
      CreateContributionPurposeEffects,
      UpdateContributionPurposeEffects,
      DeleteContributionPurposeEffects,
    ]),
  ],
})
export class CpDataModule {}
