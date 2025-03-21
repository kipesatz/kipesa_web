import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from '@kps/forms';
import { ButtonComponent } from '@kps/material/button';
import {
  BaseDialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
} from '@kps/material/dialog';
import { InputFieldComponent } from '@kps/forms/fields';
import { ConfInvitationFormService, ConfInvitationFg } from '../../forms';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'kps-confirm-invitation-dialog',
  imports: [
    BaseDialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    MatDialogContent,
    ButtonComponent,
    InputFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './confirm-invitation-dialog.component.html',
  styleUrl: './confirm-invitation-dialog.component.scss',
})
export class ConfirmInvitationDialogComponent extends BaseFormComponent {
  private formService = inject(ConfInvitationFormService);

  getFormGroup = (): ConfInvitationFg => this.formService.formGroup();

  confirmInvitation(): void {
    // const payload = this.getFormGroup().value;
  }
}
