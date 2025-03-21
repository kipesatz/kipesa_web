import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from '@angular/core';
import {
  ASSOCIATION_TYPE_OPTIONS,
  AssociationPayload,
} from '@kps/data/associations';
import { BaseFormComponent } from '@kps/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAssocFg } from '../../services';
import { InputFieldComponent, TextareaComponent } from '@kps/forms/fields';
import { ButtonComponent, FantasyButtonComponent } from '@kps/material/button';
import { PaymentMethodFacadeService } from '@kps/data/payments';
import {
  StepContentDirective,
  StepFooterDirective,
  StepperComponent,
  StepperNextDirective,
  StepperPrevDirective,
  StepperStepComponent,
} from '@kps/material/stepper';
import { MatHint } from '@angular/material/form-field';
import {
  CardRadioGroupComponent,
  CardRadioItemComponent,
} from '@kps/material/radio';
import { MatIcon } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { AddPaymentMethodDialogComponent } from '@kps/payments/methods';
import { BaseDialogService } from '@kps/material/dialog';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import {
  CardSliderComponent,
  CardSliderItemComponent,
} from '@kps/material/sliders';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kps-create-association-form',
  imports: [
    InputFieldComponent,
    TextareaComponent,
    ReactiveFormsModule,

    StepperComponent,
    StepperStepComponent,
    StepperNextDirective,
    StepperPrevDirective,
    StepContentDirective,
    MatHint,
    FantasyButtonComponent,
    StepFooterDirective,
    CardRadioGroupComponent,
    CardRadioItemComponent,
    MatIcon,
    TitleCasePipe,
    FormsModule,
    ButtonComponent,
    LoadingIndicatorComponent,
    CardSliderComponent,
    CardSliderItemComponent,
  ],
  templateUrl: './create-association-form.component.html',
  styleUrl: './create-association-form.component.scss',
})
export class CreateAssociationFormComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  private diagService = inject(BaseDialogService);
  private paymentMethodsFacade = inject(PaymentMethodFacadeService);
  assocTypeOpts = inject(ASSOCIATION_TYPE_OPTIONS);
  private subscriptions = new Subscription();

  formGroup = input.required<CreateAssocFg>();
  createFormSubmitted = output<AssociationPayload>();

  override getFormGroup = () => this.formGroup();

  groupCapacityChoice: 'unlimited' | 'limited' = 'limited';
  groupCapacityChoices = ['limited', 'unlimited'];
  selectedPaymentChannel: 'mobile' | 'bank' = 'mobile';

  // side-effects data
  payMethodsLoading = this.paymentMethodsFacade.loading;
  paymentMethods = this.paymentMethodsFacade.paymentMethods;

  ngOnInit(): void {
    this.paymentMethodsFacade.dispatchFetchAll();

    // set 0 if unlimited
    if (this.groupCapacityChoice === 'unlimited') {
      this.getFormGroup().controls.groupCapacity.setValue(0);
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  displayGroupTypeFn(
    groupType: string | { name: string; value: string }
  ): string {
    if (typeof groupType === 'string') {
      return groupType;
    } else {
      return groupType.value;
    }
  }

  notifySubmit(): void {
    if (this.getFormGroup().valid) {
      this.createFormSubmitted.emit(this.getFormGroup().getRawValue());
    }
  }

  openAddPaymentMethodDialog(): void {
    const dialogRef = this.diagService.openDefault(
      AddPaymentMethodDialogComponent,
      {
        minWidth: '678px',
      }
    );
    this.subscriptions.add(
      dialogRef
        .afterClosed()
        .subscribe(() => this.paymentMethodsFacade.dispatchFetchAll())
    );
  }
}
