import { Component, computed, input, output, Signal } from '@angular/core';
import { BaseChartComponent } from '@kps/charts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'kps-bar-chart',
  imports: [BaseChartComponent],
  template: `
    <kps-base-chart
      [options]="chartOptions()"
      [loading]="loading()"
      [theme]="theme()"
      (chartInitChange)="chartInit.emit($event)"
    />
  `,
  styles: ``,
})
export class BarChartComponent {
  xAxisData = input.required<string[]>();
  seriesData = input.required<number[]>();
  loading = input<boolean>(false);
  theme = input<string | object>('default');

  chartInit = output<unknown>();

  chartOptions: Signal<EChartsOption> = computed(() => ({
    xAxis: {
      type: 'category',
      data: this.xAxisData(),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: this.seriesData(),
        type: 'bar',
      },
    ],
  }));
}
