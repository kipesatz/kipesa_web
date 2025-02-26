import { Component, inject, OnInit } from '@angular/core';
import { MembershipsTableComponent } from '../../components';
import { MembershipFacadeService } from '@kps/data/associations';

@Component({
  selector: 'kps-memberships-page',
  imports: [MembershipsTableComponent],
  templateUrl: './memberships-page.component.html',
  styleUrl: './memberships-page.component.scss',
})
export class MembershipsPageComponent implements OnInit {
  private membershipsFacade = inject(MembershipFacadeService);

  ngOnInit(): void {
    this.membershipsFacade.dispatchFetchAll();
  }
}
