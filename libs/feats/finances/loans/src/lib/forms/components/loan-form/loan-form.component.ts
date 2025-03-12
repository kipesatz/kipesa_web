import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { BaseFormComponent } from '@kps/forms';
import { LoanFg } from '../../services';
import {
  AutocompleteFieldComponent,
  InputFieldComponent,
  SelectFieldComponent,
} from '@kps/forms/fields';
import { EditorComponent } from '@kps/forms/editor';
import { MatOption } from '@angular/material/core';
import {
  StepContentDirective,
  StepFooterDirective,
  StepperComponent,
  StepperNextDirective,
  StepperPrevDirective,
  StepperStepComponent,
} from '@kps/material/stepper';
import { FantasyButtonComponent } from '@kps/material/button';
import {
  ALLOWED_COUNTRY_CURRENCIES,
  LoanProductFacadeService,
  PAYMENT_FREQ_CHOICES,
} from '@kps/data/finances';
import { MatHint } from '@angular/material/form-field';
import { Membership, MembershipFacadeService } from '@kps/data/associations';
import { HttpParams } from '@angular/common/http';
import { MemberPreviewCardComponent } from '@kps/associations/member';

@Component({
  selector: 'kps-loan-form',
  imports: [
    SelectFieldComponent,
    InputFieldComponent,
    EditorComponent,
    MatOption,
    MatHint,
    StepperComponent,
    StepperStepComponent,
    StepContentDirective,
    StepperNextDirective,
    StepperPrevDirective,
    StepFooterDirective,
    FantasyButtonComponent,
    AutocompleteFieldComponent,
    MemberPreviewCardComponent,
  ],
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss',
})
export class LoanFormComponent extends BaseFormComponent implements OnInit {
  public readonly allowedCountryCurrencies = inject(ALLOWED_COUNTRY_CURRENCIES);
  public readonly paymentFrequencies = inject(PAYMENT_FREQ_CHOICES);

  private loanProductFacade = inject(LoanProductFacadeService);
  private memberFacade = inject(MembershipFacadeService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    super();

    effect(
      () => {
        if (this.memberSearchTerm()) {
          this.memberFacade.dispatchFetchAll(
            new HttpParams({ fromObject: { q: this.memberSearchTerm() } })
          );
        }

        console.log("selected member in form", this.selectedMember())
      },
      // { injector: this.destroyRef }
    );
  }

  memberSearchTerm = signal('');
  selectedMember = model<Membership | null>();

  // form
  loanFg = input.required<LoanFg>();
  getFormGroup = () => this.loanFg();

  // data
  loanProducts = this.loanProductFacade.allLoanProducts;
  private membersCount = this.memberFacade.totalMemberships;
  memberships = this.memberFacade.memberships;
  private totalLoanProducts = this.loanProductFacade.total;

  ngOnInit(): void {
    if (this.membersCount() < 1) {
      this.memberFacade.dispatchFetchAll();
    }

    if (this.totalLoanProducts() < 1) {
      this.loanProductFacade.fetchAssocLoanProducts();
    }
  }

  displayMemberFn(member: Membership): string {
    if (member && !member.user) {
      return '';
    }
    return member ? `${member.user.fullName} (${member.user.email})` : '';
  }
}
