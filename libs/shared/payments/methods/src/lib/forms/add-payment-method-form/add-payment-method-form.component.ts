import {
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { BaseFormComponent } from '@kps/forms';
import { PaymentMethodFg } from '../payment-method-form.service';
import { PAYMENT_METHOD_TYPES, PaymentProvider } from '@kps/data/payments';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PayBankFormComponent } from '@kps/payments/bank';
import {
  CardSliderComponent,
  CardSliderItemComponent,
} from '@kps/material/sliders';
import {
  CardRadioGroupComponent,
  CardRadioItemComponent,
} from '@kps/material/radio';
import { MatIcon } from '@angular/material/icon';
import {
  CheckboxRowComponent,
  InputFieldComponent,
  PhoneFieldComponent,
} from '@kps/forms/fields';
import { distinctUntilChanged, Subscription } from 'rxjs';
import {
  MatStep,
  MatStepContent,
  MatStepLabel,
  MatStepper,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { StepFooterDirective } from '@kps/material/stepper';
import { MatButton } from '@angular/material/button';
import { PaymentProviderFacadeService } from '@kps/data/finances';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

@Component({
  selector: 'kps-add-payment-method-form',
  imports: [
    PayBankFormComponent,
    MatIcon,
    InputFieldComponent,
    CardRadioItemComponent,
    CardRadioGroupComponent,
    FormsModule,
    PhoneFieldComponent,
    CheckboxRowComponent,
    ReactiveFormsModule,
    MatButton,
    LoadingIndicatorComponent,
    CardSliderComponent,
    CardSliderItemComponent,

    // stepper
    MatStepper,
    MatStep,
    MatStepContent,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
    StepFooterDirective,
  ],
  templateUrl: './add-payment-method-form.component.html',
  styleUrl: './add-payment-method-form.component.scss',
})
export class AddPaymentMethodFormComponent
  extends BaseFormComponent
  implements OnDestroy, OnInit
{
  constructor() {
    super();

    effect(() => {
      const form = this.getFormGroup();
      if (form) {
        const methodTypeControl = this.getFormGroup().controls.methodType;
        if (methodTypeControl) {
          this.subscriptions.add(
            methodTypeControl.valueChanges
              .pipe(distinctUntilChanged())
              .subscribe((methodType) => {
                if (methodType) {
                  this.applyValidationRules(methodType);

                  // load providers
                  this.loadProviders();
                }
              })
          );
        }
      }
    });
  }
  paymentMethodTypes = inject(PAYMENT_METHOD_TYPES);
  private payProvFacade = inject(PaymentProviderFacadeService);

  private subscriptions = new Subscription();
  formGroup = input.required<PaymentMethodFg>();
  getFormGroup = () => this.formGroup();
  selectedMethodType = this.paymentMethodTypes[0].value;

  // side-effect data
  paymentProviders = this.payProvFacade.allPaymentProviders;
  providersLoading = this.payProvFacade.loading;

  ngOnInit(): void {
    if (this.getFormGroup() !== undefined) {
      this.applyValidationRules(this.selectedMethodType);

      this.loadProviders();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onActiveSlideChange(data: unknown): void {
    const provider = data as PaymentProvider;
    if (provider && provider.id) {
      this.getFormGroup().controls.provider.setValue(provider.id);
    }
  }

  private applyValidationRules(methodType: string): void {
    const form = this.formGroup();

    // Reset all validations first
    this.resetValidations();

    if (methodType === 'CREDIT_CARD' || methodType === 'DEBIT_CARD') {
      // Apply card-related validations
      form.controls.cardNumber.setValidators([Validators.required]);
      form.controls.cardExpiryMonth.setValidators([Validators.required]);
      form.controls.cardExpiryYear.setValidators([Validators.required]);
      form.controls.cardCvv.setValidators([Validators.required]);
      form.controls.cardHoldersName.setValidators([Validators.required]);
    } else if (methodType === 'MOBILE') {
      // Apply mobile-related validations
      form.controls.phoneNumber.setValidators([Validators.required]);
    }

    // Update form controls with new validations
    this.formGroup().updateValueAndValidity();
  }

  private resetValidations(): void {
    this.getFormGroup().controls.cardNumber.clearValidators();
    this.getFormGroup().controls.cardExpiryMonth.clearValidators();
    this.getFormGroup().controls.cardExpiryYear.clearValidators();
    this.getFormGroup().controls.cardCvv.clearValidators();
    this.getFormGroup().controls.cardHoldersName.clearValidators();
    this.getFormGroup().controls.phoneNumber.clearValidators();
    this.getFormGroup().controls.cardNumber.reset();
    this.getFormGroup().controls.cardExpiryMonth.reset();
    this.getFormGroup().controls.cardExpiryYear.reset();
    this.getFormGroup().controls.cardCvv.reset();
    this.getFormGroup().controls.cardHoldersName.reset();
    this.getFormGroup().controls.phoneNumber.reset();
  }

  private loadProviders(): void {
    if (this.getFormGroup() !== undefined) {
      const activeMethodType = signal(
        this.getFormGroup().controls.methodType.value
      );
      const paramsObj: Params = {
        isActive: true,
        channel: activeMethodType(),
      };
      if (
        activeMethodType() === 'CREDIT_CARD' ||
        activeMethodType() === 'DEBIT_CARD'
      ) {
        paramsObj['channel'] = 'BANK'; // change to bank if not mobile
      }

      // fetch with appropriate params
      this.payProvFacade.dispatchFetchAll(
        new HttpParams({ fromObject: paramsObj })
      );
    }
  }
}
