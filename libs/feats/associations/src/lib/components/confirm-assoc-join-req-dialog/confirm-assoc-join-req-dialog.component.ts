import { Component, effect, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  Association,
  MembershipActions,
  MembershipFacadeService,
  ReqMembershipPayload,
} from '@kps/data/associations';
import { MatDivider } from '@angular/material/divider';
import { ButtonComponent } from '@kps/material/button';
import { Actions, ofType } from '@ngrx/effects';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'kps-confirm-assoc-join-req-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDivider,
    ButtonComponent,
  ],
  templateUrl: './confirm-assoc-join-req-dialog.component.html',
  styles: ``,
})
export class ConfirmAssocJoinReqDialogComponent {
  constructor() {
    effect(() => {
      // close dialog if membership request is success
      if (this.requestSent()) {
        this.dialogRef.close();
      }
    });
  }

  dialogRef = inject(MatDialogRef<ConfirmAssocJoinReqDialogComponent>);
  private actions$ = inject(Actions);
  dialogData: { association: Association } = inject(MAT_DIALOG_DATA);
  private membershipFacade = inject(MembershipFacadeService);

  requestSent = toSignal(
    this.actions$.pipe(
      ofType(MembershipActions.requestMembershipSuccess),
      map(() => true)
    )
  );

  confirmJoinRequest() {
    const payload: ReqMembershipPayload = {
      association: this.dialogData.association.id,
    };
    this.membershipFacade.reqMembership(payload);
  }
}
