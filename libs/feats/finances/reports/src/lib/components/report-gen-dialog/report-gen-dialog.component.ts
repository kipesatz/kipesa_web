import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import {
  TimeRangeChoice,
  TIME_RANGE_CHOICES,
  DateRangeFormComponent,
} from '@kps/core/datetime';
import { ReportGenFormService } from '../../forms';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { ButtonComponent } from '@kps/material/button';
import { ReportFacadeService, ReportGenPayload } from '@kps/data/finances';
import { SelectFieldComponent } from '@kps/forms/fields';

dayjs.extend(isSameOrAfter);

@Component({
  selector: 'kps-report-gen-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,

    MatFormField,
    MatLabel,
    MatError,

    MatOption,
    MatInput,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatSuffix,
    MatNativeDateModule,
    MatCheckbox,

    ButtonComponent,
    SelectFieldComponent,
  ],
  templateUrl: './report-gen-dialog.component.html',
  styleUrl: './report-gen-dialog.component.scss',
})
export class ReportGenDialogComponent
  extends DateRangeFormComponent
  implements OnInit, OnDestroy
{
  timeRanges: TimeRangeChoice[] = inject(TIME_RANGE_CHOICES);
  private dialogRef = inject(MatDialogRef<ReportGenDialogComponent>);
  private formService = inject(ReportGenFormService);
  private reportFacade = inject(ReportFacadeService);

  reportsLoading = this.reportFacade.loading;

  getFormGroup = () => this.formService.reportGenForm();

  ngOnInit(): void {
    this.setupDateRangeControls(this.getFormGroup());
  }

  onSubmit(): void {
    if (this.getFormGroup().valid) {
      const formattedFormVal =
        this.getFormattedDateRangeValues<ReportGenPayload>();
      if (formattedFormVal) this.reportFacade.generateReport(formattedFormVal);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
