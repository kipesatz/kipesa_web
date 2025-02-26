import { Component, inject } from '@angular/core';
import { BaseFormComponent } from '@kps/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { PasswordChangeFormService, PasswordFormComponent } from '../forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@kps/material/button';
import {
  ChangePasswordPayload,
  PasswordFacadeService,
} from '@kps/data/accounts';
import { DialogHeaderComponent } from '@kps/material/dialog';

@Component({
  selector: 'kps-password-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    PasswordFormComponent,
    ReactiveFormsModule,
    ButtonComponent,
    MatDialogClose,
    DialogHeaderComponent,
  ],
  templateUrl: './password-dialog.component.html',
  styles: ``,
})
export class PasswordDialogComponent extends BaseFormComponent {
  private formService = inject(PasswordChangeFormService);
  private passwordFacade = inject(PasswordFacadeService);

  getFormGroup = () => this.formService.passwordForm();

  changePassword(): void {
    if (this.getFormGroup().valid) {
      // submit change password
      this.passwordFacade.dispatchChangePassword(
        this.getFormGroup().value as ChangePasswordPayload
      );
    }
  }
}
