import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PinfoEditFormComponent, PinfoFormService } from '../forms';
import { AuthUserFacadeService, AuthUserPayload } from '@kps/data/accounts';
import {
  BaseDialogComponent,
  DialogHeaderComponent,
} from '@kps/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { BaseFormComponent } from '@kps/forms';
import { ButtonComponent } from '@kps/material/button';

@Component({
  selector: 'kps-pinfo-edit-dialog',
  imports: [
    ReactiveFormsModule,
    PinfoEditFormComponent,
    BaseDialogComponent,
    DialogHeaderComponent,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ButtonComponent,
  ],
  templateUrl: './pinfo-edit-dialog.component.html',
  styleUrl: './pinfo-edit-dialog.component.scss',
})
export class PinfoEditDialogComponent
  extends BaseFormComponent
  implements OnInit
{
  private formService = inject(PinfoFormService);
  private authUserFacade = inject(AuthUserFacadeService);

  // data
  authUser$ = this.authUserFacade.authUser$;
  userDataLoading$ = this.authUserFacade.loading$;

  getFormGroup = () => this.formService.pinfoForm();

  ngOnInit(): void {
    // if user data does not exist
    const _user = this.authUser$();
    if (!_user) {
      this.authUserFacade.dispatchLoadAuthUser();
    } else {
      this.getFormGroup().patchValue(_user);
    }
  }

  changePassword(): void {
    if (this.getFormGroup().valid) {
      // submit update pinfo
      this.authUserFacade.dispatchUpdateAuthUser(
        this.getFormGroup().value as AuthUserPayload
      );
    }
  }
}
