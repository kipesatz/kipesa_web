import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { ProgressPieChartComponent } from '@kps/charts/pie';
import { LoansPerformance } from '@kps/data/finances';

@Component({
  selector: 'kps-loan-performance-card',
  imports: [ProgressPieChartComponent, MatCard, TitleCasePipe, CurrencyPipe],
  templateUrl: './loan-performance-card.component.html',
  styleUrl: './loan-performance-card.component.scss',
})
export class LoanPerformanceCardComponent {
  performanceStats = input.required<LoansPerformance>();
  category = input<'good' | 'bad'>('good');
}
