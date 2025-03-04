import { Component, output } from '@angular/core';
import { BaseLineChartComponent } from './base-line-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';

import { XAXisComponentOption, graphic } from 'echarts';

@Component({
  selector: 'kps-line-chart',
  imports: [NgxEchartsModule],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent extends BaseLineChartComponent {
  chartInit = output<unknown>();
  protected updateChartOptions(): void {
    const xAxisData =
      this.config().series[0]?.data.map((point) => point.x) || [];

    this.chartOptions = {
      title: {
        text: this.config().title,
        textAlign: 'center',
        left: 'center',
        top: 0,
        subtext: this.config().subtitle,
        subtextStyle: {
          align: 'center',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: '18px',
        },
      },
      tooltip: {
        trigger: 'axis',
        ...this.config().tooltip,
      } as echarts.TooltipComponentOption,
      legend: {
        show: this.config().legend?.show ?? true,
        ...this.config().legend,
        orient: 'horizontal',
        right: '0px',
      } as echarts.LegendComponentOption,
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData,
        name: this.config().xAxis?.name,
        ...this.config().xAxis,
      } as XAXisComponentOption,
      yAxis: {
        type: 'value',
        name: this.config().yAxis?.name,
        ...this.config().yAxis,
      },
      series: this.config().series.map((series) => ({
        name: series.name,
        type: series.type || 'line',
        data: series.data.map((point) => point.y),
        color: series.color
          ? new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: series.color },
              { offset: 1, color: `${series.color}99` },
            ])
          : undefined,
        smooth: series.smooth,
        areaStyle: series.areaStyle,
        lineStyle: series.lineStyle,
      })) as echarts.SeriesOption[],
    };
  }
}
