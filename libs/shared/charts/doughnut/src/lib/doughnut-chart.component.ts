import { Component, computed, input, output, Signal } from '@angular/core';
import { BaseChartComponent } from '@kps/charts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'kps-doughnut-chart',
  imports: [BaseChartComponent],
  template: `
    <kps-base-chart
      [options]="chartOptions()"
      [loading]="loading()"
      [theme]="theme()"
      (chartInitChange)="chartInit.emit($event)"
    />
  `,
  styles: `
  `,
})
export class DoughnutChartComponent {
  data = input.required<Array<{ name: string; value: number }>>();
  colors = input<string[]>(['#4CAF50', '#2196F3', '#FFC107', '#E91E63']);
  loading = input<boolean>(false);
  theme = input<string | object>('default');
  chartInit = output<unknown>();

  chartOptions: Signal<EChartsOption> = computed(() => ({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '10%',
      left: 'center',
    },
    series: [
      {
        name: 'Doughnut Chart',
        type: 'pie',
        radius: ['40%', '70%'], // Doughnut effect
        avoidLabelOverlap: false,
        colors: this.colors(),
        label: {
          show: true,
          position: 'inside',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
          },
        },
        data: this.data,
        itemStyle: {
          color: (params: any) => {
            // Use custom colors
            return this.colors()[params.dataIndex % this.colors.length];
          },
        },
      },
    ],
  }));
}
