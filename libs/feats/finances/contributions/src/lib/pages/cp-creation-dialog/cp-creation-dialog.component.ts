import { Component, inject } from '@angular/core';
import { CpFormComponent, CpFormGroup, CpFormService } from '../../forms';

import { ButtonComponent } from '@kps/material/button';
import {
  BaseDialogComponent,
  DialogFooterComponent,
} from '@kps/material/dialog';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { BaseFormComponent } from '@kps/forms';
import { ValidityProgressCheckerComponent } from '@kps/material/progress';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ContributionPurposeActions,
  CpFacadeService,
  CpPayload,
} from '@kps/data/finances';
import { Actions, ofType } from '@ngrx/effects';
import { DialogRef } from '@angular/cdk/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import dayjs from 'dayjs';

@Component({
  selector: 'kps-cp-creation-dialog',
  imports: [
    ButtonComponent,
    CpFormComponent,
    ValidityProgressCheckerComponent,

    // dialog
    MatDialogClose,
    MatDialogContent,
    BaseDialogComponent,
    DialogFooterComponent,

    // form
    ReactiveFormsModule,
  ],
  templateUrl: './cp-creation-dialog.component.html',
  styles: ``,
})
export class CpCreationDialogComponent extends BaseFormComponent {
  // injections
  private formService = inject(CpFormService);
  private cpFacade = inject(CpFacadeService);
  private actions$ = inject(Actions);
  private dialogRef = inject(DialogRef);

  private doneSaving = toSignal(
    this.actions$.pipe(
      ofType(ContributionPurposeActions.createContributionPurposeSuccess),
      map(() => true)
    )
  );

  // props
  getFormGroup = (): CpFormGroup => this.formService.cpForm();

  saveCp(): void {
    if (this.getFormGroup().valid) {
      const payload: CpPayload = this.getFormGroup().value as CpPayload;

      // format dates
      const startDt = payload.startDate;
      const endDt = payload.endDate;
      payload.startDate = dayjs(startDt).format('YYYY-MM-DD');
      payload.endDate = dayjs(endDt).format('YYYY-MM-DD');

      // dispatch create
      this.cpFacade.dispatchCreateOne(payload);

      // cleanup
      if (this.doneSaving()) {
        this.getFormGroup().reset();
        this.dialogRef.close();
      }
    }
  }
}
