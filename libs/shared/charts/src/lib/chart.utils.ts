import { ChartConfig, ChartSeries } from './types';

export interface ServerDataPoint {
  period: string;
  metrics: Record<string, number>;
}

export class ChartDataTransformer {
  static fromServerData(
    data: ServerDataPoint[],
    options: {
      metrics: string[];
      colors?: string[];
      xAxisName?: string;
      yAxisName?: string;
      smooth?: boolean;
      areaStyle?: boolean;
    }
  ): ChartConfig {
    const series: ChartSeries[] = options.metrics.map((metric, index) => ({
      name: metric.charAt(0).toUpperCase() + metric.slice(1),
      type: 'line',
      data: data.map((item) => ({
        x: item.period,
        y: item.metrics[metric],
      })),
      color: options.colors?.[index],
      smooth: options.smooth,
      areaStyle: options.areaStyle ? { opacity: 0.1 } : undefined,
    }));

    return {
      series,
      xAxis: {
        type: 'category',
        name: options.xAxisName,
      },
      yAxis: {
        type: 'value',
        name: options.yAxisName,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        show: true,
        position: 'bottom',
      },
    };
  }
}
