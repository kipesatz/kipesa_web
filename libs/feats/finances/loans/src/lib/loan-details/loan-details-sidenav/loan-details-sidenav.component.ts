import { Component, input } from '@angular/core';
import { UserAvatarComponent } from '@kps/accounts/user';
import { Loan } from '@kps/data/finances';
import { ObjectListerComponent } from '@kps/material/lists';

@Component({
  selector: 'kps-loan-details-sidenav',
  imports: [UserAvatarComponent, ObjectListerComponent],
  templateUrl: './loan-details-sidenav.component.html',
  styleUrls: ['./loan-details-sidenav.component.scss'],
})
export class LoanDetailsSidenavComponent {
  loanItem = input.required<Loan>();
}
