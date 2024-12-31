import { Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { MyMembershipFacadeService } from '@kps/data/associations';
import { ButtonComponent, IconicButtonComponent } from '@kps/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kps-user-dashboard',
  standalone: true,
  imports: [
    MatToolbar,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardHeader,
    MatCardContent,
    IconicButtonComponent,
    ButtonComponent,
    MatTooltip,
    MatCardActions,

    // list
    RouterLink,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent implements OnInit {
  myMembershipsFacade = inject(MyMembershipFacadeService);
  myMemberships = this.myMembershipsFacade.myMemberships;
  totalMemberships = this.myMembershipsFacade.totalMemberships;

  ngOnInit(): void {
    this.myMembershipsFacade.dispatchFetchMyMemberships();
  }

  refreshDashboard(): void {
    console.log('refresh dashboard');
  }
}
