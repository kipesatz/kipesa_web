import { Component, input, OnChanges, OnInit } from '@angular/core';
import { ChartConfig } from '@kps/charts';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'kps-base-line-chart',
  imports: [],
  template: ``,
  styles: ``,
})
export abstract class BaseLineChartComponent implements OnInit, OnChanges {
  config = input.required<ChartConfig>();
  height = input(300);
  loading = input<boolean>(false);
  theme = input<string | undefined>(undefined);

  protected chartOptions: EChartsOption = {};

  protected abstract updateChartOptions(): void;

  ngOnInit() {
    this.updateChartOptions();
  }

  ngOnChanges() {
    this.updateChartOptions();
  }
}
