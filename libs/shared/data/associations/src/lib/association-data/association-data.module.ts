import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { LoadAssociationEffects, CreateAssociationEffects } from './+state';
import { provideState } from '@ngrx/store';
import { fromAssociation } from './+state/reducers';

@NgModule({
  providers: [
    provideState(fromAssociation.associationsFeature),
    provideEffects([LoadAssociationEffects, CreateAssociationEffects]),
  ],
})
export class AssociationDataModule {}
