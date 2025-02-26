import { NgModule } from '@angular/core';
import { provideState } from '@ngrx/store';
import { FincStatsEffects, fromFincStats } from './+state';
import { provideEffects } from '@ngrx/effects';

@NgModule({
  providers: [
    provideState(fromFincStats.fincStatsFeature),
    provideEffects([FincStatsEffects]),
  ],
})
export class FincStatsDataModule {}
