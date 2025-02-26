import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  MatStepper,
  MatStep,
  MatStepperNext,
  MatStepperPrevious,
} from '@angular/material/stepper';
import { BaseFormComponent } from '@kps/forms';
import { ContributionFg } from '../../services';
import {
  ContributionPurpose,
  PaymentMethodFacadeService,
} from '@kps/data/finances';
import {
  InputFieldComponent,
  SearchFieldComponent,
  TextareaComponent,
} from '@kps/forms/fields';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import {
  ActivatedAssociationService,
  Membership,
  MembershipFacadeService,
} from '@kps/data/associations';
import { MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { HttpParams } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'kps-contribution-form',
  imports: [
    MatStepper,
    MatStep,
    MatStepperNext,
    MatStepperPrevious,
    MatListModule,
    MatIcon,
    InputFieldComponent,
    MatHint,
    TextareaComponent,
    LoadingIndicatorComponent,
    SearchFieldComponent,
    MatChipsModule,
    ReactiveFormsModule,
    MatButton,
    MatRadioModule,
  ],
  templateUrl: './contribution-form.component.html',
  styleUrls: ['./contribution-form.component.scss'],
})
export class ContributionFormComponent
  extends BaseFormComponent
  implements OnInit
{
  constructor() {
    super();
    effect(() => {
      if (this.isForSomeoneElse()) {
        // When contributing for someone else and there's a search query
        this.membershipFacade.dispatchFetchAll(
          new HttpParams({ fromObject: { q: this.searchQuery() } })
        );
      } else {
        const membership = this.memberships().find(
          (m) => m.association.id === this.curAssoc.getId()
        );
        this.myCurMembership.set(membership);
        if (membership) {
          this.getFormGroup().controls.member.setValue(membership.user.id);
        }
      }
    });
  }

  private curAssoc = inject(ActivatedAssociationService);
  private membershipFacade = inject(MembershipFacadeService);
  private payMethodFacade = inject(PaymentMethodFacadeService);

  // data
  memberships = this.membershipFacade.memberships;
  membershipsLoading = this.membershipFacade.loading;
  payMethods = this.payMethodFacade.allPaymentMethods;
  payMethodsLoading = this.payMethodFacade.loading;
  // inputs & outputs
  formGroup = input.required<ContributionFg>();
  contributionPurpose = input.required<ContributionPurpose>();
  /**Specifies the kind of contribution, defaults to self-contribution */
  isForSomeoneElse = input<boolean>(false);

  // props
  myCurMembership = signal<Membership | undefined>(undefined);
  searchQuery = signal('');

  getFormGroup = () => this.formGroup();

  ngOnInit(): void {
    // patch form with existing values & value-based validation
    this.getFormGroup().controls.purpose.setValue(
      this.contributionPurpose().id
    );
    this.getFormGroup().controls.amount.setValidators([
      Validators.min(this.contributionPurpose().minAmount),
    ]);

    // Only fetch payment methods initially
    this.payMethodFacade.dispatchFetchAll();

    if (!this.isForSomeoneElse()) {
      // Create a one-time effect for self-contribution scenario
      const assocId = this.curAssoc.getId();
      if (assocId) {
        const membership = this.memberships().find(
          (m) => m.association.id === assocId
        );

        if (!membership) {
          this.membershipFacade.fetchMyMemberships(
            new HttpParams({ fromObject: { association: assocId } })
          );
        }
      }
    }
  }

  setSelectedMember($event: MatSelectionListChange) {
    const selectedVal = $event.source._value;
    if (selectedVal !== null) {
      // set the selected value to form
      // since it is a radio based selection, only one will be selected
      this.getFormGroup().controls.member.setValue(selectedVal[0]);
    }
  }

  // Add to component class
  isStepValid = (step: number) => {
    switch (step) {
      case 0:
        return this.getController('member').valid;
      case 1:
        return (
          this.getController('amount').valid &&
          this.getController('paymentMethod').valid
        );
      case 2:
        return this.getController('paymentMethod').valid;
      default:
        return false;
    }
  };
}
