import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { ProgressPieChartComponent } from '@kps/charts/pie';
import { LoanStatsPerStatus } from '@kps/data/finances';

@Component({
  selector: 'kps-loan-stats-by-status-card',
  imports: [
    ProgressPieChartComponent,
    MatCard,
    MatCardContent,
    TitleCasePipe,
    CurrencyPipe,
  ],
  templateUrl: './loan-stats-by-status-card.component.html',
  styleUrl: './loan-stats-by-status-card.component.scss',
})
export class LoanStatsByStatusCardComponent {
  loanStatsPerStatusItem = input.required<LoanStatsPerStatus>();
}
