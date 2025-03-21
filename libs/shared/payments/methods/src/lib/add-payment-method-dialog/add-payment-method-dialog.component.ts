import { Component, inject, OnDestroy } from '@angular/core';
import {
  AddPaymentMethodFormComponent,
  PaymentMethodFg,
  PaymentMethodFormService,
} from '../forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '@kps/forms';
import { ButtonComponent } from '@kps/material/button';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  BaseDialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
} from '@kps/material/dialog';
import { PaymentProviderDataModule } from '@kps/data/finances';
import {
  paymentMethodActions,
  PaymentMethodFacadeService,
  PaymentMethodPayload,
} from '@kps/data/payments';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kps-add-payment-method-dialog',
  imports: [
    // dialog
    BaseDialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    MatDialogContent,
    MatDialogClose,

    // other
    PaymentProviderDataModule,
    ButtonComponent,
    ReactiveFormsModule,
    AddPaymentMethodFormComponent,
  ],
  templateUrl: './add-payment-method-dialog.component.html',
  styleUrl: './add-payment-method-dialog.component.scss',
})
export class AddPaymentMethodDialogComponent
  extends BaseFormComponent
  implements OnDestroy
{
  private formService = inject(PaymentMethodFormService);
  private paymentMethodFacade = inject(PaymentMethodFacadeService);
  private dialogRef = inject(MatDialogRef<AddPaymentMethodDialogComponent>);
  private actions$ = inject(Actions);

  subscriptions = new Subscription();

  getFormGroup = (): PaymentMethodFg => this.formService.formGroup();

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  addPaymentMethod(): void {
    const payload = this.getFormGroup().getRawValue() as PaymentMethodPayload;
    this.paymentMethodFacade.dispatchAddOne(payload);

    this.subscriptions.add(
      this.actions$
        .pipe(ofType(paymentMethodActions.addPaymentMethodSuccess))
        .subscribe(() => {
          // clean and close
          this.getFormGroup().reset();
          this.dialogRef.close();
        })
    );
  }
}
