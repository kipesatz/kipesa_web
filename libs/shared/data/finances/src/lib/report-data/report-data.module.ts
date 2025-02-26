import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  fromReport,
  LoadReportEffects,
  GenerateReportEffects,
  DeleteReportEffects,
} from './+state';

@NgModule({
  providers: [
    provideState(fromReport.reportFeature),
    provideEffects([
      LoadReportEffects,
      GenerateReportEffects,
      DeleteReportEffects,
    ]),
  ],
})
export class ReportDataModule {}
