import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule,
} from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Loan, LoanFacadeService } from '@kps/data/finances';
import { LoanComment, LoanCommentCardComponent } from '@kps/messaging/comments';

@Component({
  selector: 'kps-loan-tracking-tab',
  imports: [
    LoanCommentCardComponent,
    MatTab,
    MatTabGroup,
    MatTabLabel,
    MatTabsModule,
    MatIcon,
  ],
  templateUrl: './loan-tracking-tab.component.html',
  styleUrl: './loan-tracking-tab.component.scss',
})
export class LoanTrackingTabComponent implements OnInit {
  private loanFacade = inject(LoanFacadeService);
  private curRoute = inject(ActivatedRoute);

  loanDetails: Signal<Loan | undefined> = signal<Loan | undefined>(undefined);
  loanComments = signal<Array<LoanComment>>([
    {
      id: 'comment-123',
      loan: 'loan-456',
      content:
        "This loan application looks promising, especially considering the applicant's stable employment history.",
      timestamp: '2023-10-27T10:30:00Z',
      member: {
        user: {
          id: 'ff72772e72a540b5',
          createdOn: '',
          lastEditedOn: '',
          middleName: '',
          firstName: 'Alice',
          lastName: 'Johnson',
          fullName: 'Johnson',
          profilePhoto: null,
          email: 'alice.johnson@example.com',
          phoneNumber: '+15551234567',
          initials: 'AJ',
          occupation: 'Loan Officer',
        },
      },
    },
    {
      id: 'comment-456',
      loan: 'loan-789',
      content:
        'Need to verify the collateral details before proceeding. The documents provided are slightly unclear.',
      timestamp: '2023-10-27T14:45:00Z',
      member: {
        user: {
          id: 'ff72772e72a540b5',
          createdOn: '',
          lastEditedOn: '',
          middleName: '',
          firstName: 'Bob',
          lastName: 'Smith',
          fullName: 'Smith',
          profilePhoto: null,
          email: 'bob.smith@example.com',
          phoneNumber: '+15559876543',
          initials: 'BS',
          occupation: 'Underwriter',
        },
      },
    },
    {
      id: 'comment-789',
      loan: 'loan-456',
      content:
        'Applicant has addressed the prior concerns. Loan is ready for final approval',
      timestamp: '2023-10-28T09:15:00Z',
      member: {
        user: {
          id: 'ff72772e72a540b5',
          createdOn: '',
          lastEditedOn: '',
          middleName: '',
          firstName: 'Carol',
          lastName: 'Williams',
          fullName: 'Williams',
          profilePhoto: null,
          email: 'carol.williams@example.com',
          phoneNumber: '+15551112222',
          initials: 'CW',
          occupation: 'Loan Manager',
        },
      },
    },
  ]);

  ngOnInit(): void {
    const loanId =
      this.curRoute.snapshot?.parent?.parent?.paramMap.get('loanId');
    if (loanId) {
      // we don't need to dispatch the fetch loan action -- already dispatched by the parent cmp
      this.loanDetails = this.loanFacade.selectOne(loanId);
    }
  }
}
