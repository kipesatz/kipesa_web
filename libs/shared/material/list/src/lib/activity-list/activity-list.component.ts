import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import { LoadingIndicatorComponent } from '@kps/material/progress';

export interface Activity {
  type: string;
  description: string;
  timestamp: Date;
}

@Component({
  selector: 'kps-activity-list',
  imports: [
    MatList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatListItemLine,
    MatIcon,
    DatePipe,
    LoadingIndicatorComponent,
  ],
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent {
  activities = input<Activity[]>([]);
  loading = input<boolean>(false);

  getIconForType(type: string): string {
    switch (type.toLowerCase()) {
      case 'loan':
        return 'money';
      case 'member':
        return 'person';
      case 'payment':
        return 'payment';
      default:
        return 'info';
    }
  }
}
