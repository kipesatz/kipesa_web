import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Contribution, ContributionPayload } from '@kps/data/finances';
import { BaseFormService } from '@kps/forms';

export type ContributionFg = FormGroup<{
  [K in keyof ContributionPayload]: FormControl<ContributionPayload[K]>;
}>;

@Injectable({
  providedIn: 'root',
})
export class ContributionFormService
  implements BaseFormService<ContributionPayload>
{
  private builder = inject(NonNullableFormBuilder);

  contributionForm = signal<ContributionFg>(this.buildForm());

  public buildForm(): ContributionFg {
    return this.builder.group({
      member: this.builder.control('', {
        validators: [Validators.required],
      }),
      purpose: this.builder.control('', {
        validators: [Validators.required],
      }),
      amount: this.builder.control(0.0, {
        validators: [Validators.required, Validators.min(0)],
      }),
      paymentMethod: this.builder.control('', {
        validators: [Validators.required],
      }),

      notes: this.builder.control<string | null>(null, {
        validators: [Validators.maxLength(15000)],
      }),
    });
  }

  public patchForm(contribution?: Contribution): void {
    if (contribution) {
      this.contributionForm().patchValue({
        ...contribution,
        member: contribution.member.id,
        purpose: contribution.purpose.id,
      });
    }
  }
}
