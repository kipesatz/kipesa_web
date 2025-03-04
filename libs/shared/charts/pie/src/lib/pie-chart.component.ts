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
  seriesName = input.required<string>();
  chartTitle = input.required<string>();
  loading = input<boolean>(false);
  theme = input<string | object>('default');
  colors = input<string[]>(['#4CAF50', '#2196F3', '#FFC107', '#E91E63']);

  chartInit = output<unknown>();

  chartOptions: Signal<EChartsOption> = computed(() => ({
    title: {
      text: this.chartTitle(),
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      top: '10%',
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: this.seriesName(),
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: this.data(),
      },
    ],
  }));
}
