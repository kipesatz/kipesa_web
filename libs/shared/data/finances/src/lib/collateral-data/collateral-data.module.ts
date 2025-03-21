import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  AddCollateralEffects,
  fromCollateral,
  LoadCollateralEffects,
  UpdateCollateralEffects,
} from './+state';

@NgModule({
  providers: [
    provideState(fromCollateral.collateralFeature),
    provideEffects([
      LoadCollateralEffects,
      AddCollateralEffects,
      UpdateCollateralEffects,
    ]),
  ],
})
export class CollateralDataModule {}
