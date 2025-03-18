import { inject, Injectable, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
} from '@angular/forms';
import { BaseFormService } from '@kps/forms';

export interface ConfInvitePayload {
  invitationCode: string;
}

export type ConfInvitationFg = FormGroup<{
  invitationCode: FormControl<string>;
}>;

@Injectable({
  providedIn: 'root',
})
export class ConfInvitationFormService extends BaseFormService<ConfInvitePayload> {
  private nfb = inject(NonNullableFormBuilder);

  formGroup = signal<ConfInvitationFg>(this.buildForm());

  buildForm(): ConfInvitationFg {
    return this.nfb.group({
      invitationCode: this.nfb.control('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
      ]),
    });
  }
}
