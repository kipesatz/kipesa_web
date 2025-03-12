import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoanProductFormComponent } from '../../forms/components';
import { BaseFormComponent } from '@kps/forms';
import { LoanProductFormService } from '../../forms/services';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@kps/material/button';
import {
  BaseDialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
} from '@kps/material/dialog';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import {
  loanProductActions,
  LoanProductFacadeService,
  LoanProductPayload,
} from '@kps/data/finances';
import { Subscription } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'kps-loan-product-dialog',
  imports: [
    LoanProductFormComponent,
    ReactiveFormsModule,
    ButtonComponent,
    BaseDialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    MatDialogClose,
  ],
  templateUrl: './loan-product-dialog.component.html',
  styles: ``,
})
export class LoanProductDialogComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  private formService = inject(LoanProductFormService);
  private loanProductFacade = inject(LoanProductFacadeService);
  private actions$ = inject(Actions);
  private dialogRef = inject(MatDialogRef);

  loanProductsLoading = this.loanProductFacade.loading;

  private subscriptions = new Subscription();

  getFormGroup = () => this.formService.loanProductFg();

  saveLoanProduct(): void {
    if (this.getFormGroup().valid) {
      // save
      this.loanProductFacade.dispatchAddOne(
        this.getFormGroup().value as LoanProductPayload
      );
    }
  }

  ngOnInit(): void {
    // close dialog whenever the item is saved & clear the form
    this.subscriptions.add(
      this.actions$
        .pipe(ofType(loanProductActions.createLoanProduct))
        .subscribe(() => {
          this.dialogRef.close();
          this.getFormGroup().reset();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
