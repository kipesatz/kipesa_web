import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import { ContributionPurpose } from '@kps/data/finances';

@Component({
  selector: 'kps-cp-overview-details',
  imports: [
    // list
    MatList,
    MatListItem,
    MatListItemIcon,
    MatListItemLine,
    MatListItemTitle,

    // pipes
    MatIcon,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './cp-overview-details.component.html',
  styles: ``,
})
export class CpOverviewDetailsComponent {
  cpurpose = input.required<ContributionPurpose>();
}
