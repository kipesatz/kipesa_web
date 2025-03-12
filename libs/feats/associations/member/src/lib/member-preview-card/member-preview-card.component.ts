import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Membership } from '@kps/data/associations';

@Component({
  selector: 'kps-member-preview-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatIcon,
    TitleCasePipe,
    DatePipe,
    MatCardAvatar,
  ],
  templateUrl: './member-preview-card.component.html',
  styleUrl: './member-preview-card.component.scss',
})
export class MemberPreviewCardComponent {
  member = input.required<Membership>();

  getStatusColor(): string {
    switch (this.member().status) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'orange';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  }
}
