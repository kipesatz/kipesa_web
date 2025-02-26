import { Component, inject, signal } from '@angular/core';
import { PayMethodFormComponent, PayMethodFormService } from '../../forms';
import { ButtonComponent } from '@kps/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  BaseDialogComponent,
  DialogFooterComponent,
} from '@kps/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '@kps/forms';
import {
  paymentMethodActions,
  PaymentMethodFacadeService,
} from '@kps/data/finances';
import { Actions, ofType } from '@ngrx/effects';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'kps-pay-method-creation-dialog',
  imports: [
    ButtonComponent,
    BaseDialogComponent,
    DialogFooterComponent,
    MatDialogContent,
    MatDialogClose,
    PayMethodFormComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './pay-method-creation-dialog.component.html',
  styles: ``,
})
export class PayMethodCreationDialogComponent extends BaseFormComponent {
  // injections
  private formService = inject(PayMethodFormService);
  private facadeService = inject(PaymentMethodFacadeService);
  private dialogRef = inject(MatDialogRef);
  private actions$ = inject(Actions);

  // data
  payMethodsLoading = signal(this.facadeService.loading);
  doneSaving = toSignal(
    this.actions$.pipe(ofType(paymentMethodActions.addPaymentMethodSuccess))
  );

  selectedLogo = signal<File | null>(null);

  getFormGroup = () => this.formService.paymentMethodForm();

  savePaymentMethod() {
    // Implement save logic
    if (this.getFormGroup().valid) {
      if (this.selectedLogo() !== null) {
        const _formD = super.getFormData();
        _formD.set('providerLogo', this.selectedLogo() as File);
        // save payMethod
        this.facadeService.dispatchCreateOne(_formD);

        // cleanup once saved
        const doneSaving = signal(
          this.actions$.pipe(
            ofType(paymentMethodActions.addPaymentMethodSuccess),
            map(() => true)
          )
        );
        if (doneSaving()) {
          this.getFormGroup().reset(); // reset
          this.dialogRef.close(); // close dialog
        }
      }
    }
  }
}
