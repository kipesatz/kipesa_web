import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Membership } from '@kps/data/associations';

/**
 * @usageNotes
 * A component that is opened after invitation is successfully verified.
 * Therefore this dialog is opened for the user to pay the membership fee. It can be opened anytime,
 * as long as the user has not yet paid the membership fee `member.status === 'AWAITING_PAYMENT'`
 */
@Component({
  selector: 'kps-membership-payment-dialog',
  imports: [CommonModule],
  templateUrl: './membership-payment-dialog.component.html',
  styleUrl: './membership-payment-dialog.component.scss',
})
export class MembershipPaymentDialogComponent {
  readonly membership: Membership = inject(MAT_DIALOG_DATA).membership;
}
