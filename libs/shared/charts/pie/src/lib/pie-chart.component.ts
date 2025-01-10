import { Component, computed, input, output, Signal } from '@angular/core';
import { BaseChartComponent } from '@kps/charts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'kps-pie-chart',
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
export class PieChartComponent {
  data = input.required<Array<{ name: string; value: number }>>();
  loading = input<boolean>(false);
  theme = input<string | object>('default');
  colors = input<string[]>(['#4CAF50', '#2196F3', '#FFC107', '#E91E63']);

  chartInit = output<unknown>();

  chartOptions: Signal<EChartsOption> = computed(() => ({
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: this.data(),
        colors: this.colors(),
      },
    ],
  }));
}
