import { Component, inject, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { BaseFormComponent } from '@kps/forms';
import { ButtonComponent } from '@kps/material/button';
import {
  BaseDialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
} from '@kps/material/dialog';
import { CreateAssociationFormService } from '../../services';
import { CreateAssociationFormComponent } from '../create-association-form/create-association-form.component';
import {
  associationActions,
  AssociationFacadeService,
} from '@kps/data/associations';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kps-create-assoc-dialog',
  imports: [
    BaseDialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    MatDialogContent,
    ButtonComponent,
    CreateAssociationFormComponent,
    ReactiveFormsModule,
    MatDialogClose,
  ],
  templateUrl: './create-assoc-dialog.component.html',
  styleUrl: './create-assoc-dialog.component.scss',
})
export class CreateAssocDialogComponent
  extends BaseFormComponent
  implements OnDestroy
{
  formService = inject(CreateAssociationFormService);
  private assocFacade = inject(AssociationFacadeService);
  private actions$ = inject(Actions);
  private dialogRef = inject(MatDialogRef<CreateAssocDialogComponent>);
  private subscriptions = new Subscription();

  getFormGroup = () => this.formService.associationForm();

  createAssoc(): void {
    this.assocFacade.dispatchCreateOne(this.getFormGroup().getRawValue());

    this.subscriptions.add(
      this.actions$
        .pipe(ofType(associationActions.createAssociationSuccess))
        .subscribe(() => {
          this.getFormGroup().reset(); // reset
          this.dialogRef.close();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
