import { Component, computed, input, Signal } from '@angular/core';
import { BaseChartComponent } from '@kps/charts';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'kps-progress-pie-chart',
  imports: [NgxEchartsModule, BaseChartComponent],
  templateUrl: './progress-pie-chart.component.html',
  styleUrl: './progress-pie-chart.component.scss',
})
export class ProgressPieChartComponent {
  progress = input<number>(0);
  chartTitle = input<string>();
  initOpts = input<{
    renderer?: 'canvas' | 'svg';
    width?: number | string;
    height?: number | string;
  }>({ renderer: 'canvas', height: '400px', width: '400px' });

  chartOptions: Signal<EChartsOption> = computed(() => ({
    series: [
      {
        type: 'pie',
        radius: ['75%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: () => {
            return `${this.progress()}%\n${this.chartTitle() || ''}`;
          },
          fontSize: 16,
          lineHeight: 20,
          fontWeight: 'bold',
        },
        data: [
          {
            value: this.progress() + 10,
            name: 'Progress',
            // itemStyle: { color: '#FFD700' },
          },
          {
            value: 100 - this.progress(),
            name: 'Remaining',
            // itemStyle: { color: '#0A2647' },
          },
        ],
      },
    ],
  }));
}
