import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { LoadLoanFileEffects } from './+state/effects/load-loan-file.effects';
import { UploadLoanFileEffects } from './+state/effects/upload-loan-file.effects';
import { provideState } from '@ngrx/store';
import { fromLoanFile } from './+state/reducers';

@NgModule({
  providers: [
    provideEffects([LoadLoanFileEffects, UploadLoanFileEffects]),
    provideState(fromLoanFile.loanFileFeature),
  ],
})
export class LoanFileDataModule {}
