import { Component, input, output } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'kps-base-chart',
  imports: [NgxEchartsModule],
  template: `
    <div
      echarts
      [options]="options()"
      [loading]="loading()"
      [theme]="theme()"
      [initOpts]="initOpts()"
      (chartInit)="chartInitChange.emit($event)"
      class="chart"
    ></div>
  `,
  styles: `
    .chart {
      inline-size: 100%;
      block-size: 100%;
    }
  `,
})
export class BaseChartComponent {
  options = input.required<EChartsOption>();
  loading = input<boolean>(false);
  theme = input<string | object>('default');
  initOpts = input<{
    renderer?: 'canvas' | 'svg';
    width?: number | string;
    height?: number | string;
  }>({ renderer: 'canvas' });

  chartInitChange = output<unknown>();
}
