import { Component, inject, OnInit } from '@angular/core';
import { MembershipsTableComponent } from '../../components';
import { MembershipFacadeService } from '@kps/data/associations';

@Component({
  selector: 'kps-membership-requests',
  imports: [MembershipsTableComponent],
  templateUrl: './membership-requests.component.html',
  styleUrl: './membership-requests.component.scss',
})
export class MembershipRequestsComponent implements OnInit {
  private membershipsFacade = inject(MembershipFacadeService);

  ngOnInit(): void {
    this.membershipsFacade.dispatchFetchRequests();
  }
}
