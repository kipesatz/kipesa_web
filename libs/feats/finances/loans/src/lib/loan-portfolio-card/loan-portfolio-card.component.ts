import { Component, computed, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { PieChartComponent } from '@kps/charts/pie';
import { LoanStatsPerStatus } from '@kps/data/finances';

@Component({
  selector: 'kps-loan-portfolio-card',
  imports: [MatCard, PieChartComponent],
  templateUrl: './loan-portfolio-card.component.html',
  styleUrl: './loan-portfolio-card.component.scss',
})
export class LoanPortfolioCardComponent {
  loansStatsPerStatus = input.required<LoanStatsPerStatus[]>();

  loanStatsPerStatusChartData = computed(() =>
    this.loansStatsPerStatus().map((statsItem) => {
      return { name: statsItem.name, value: statsItem.relativePercent + 10 };
    })
  );
}
