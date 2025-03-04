export interface ChartDataPoint {
  x: string | number;
  y: number;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area';
  color?: string;
  areaStyle?: {
    opacity?: number;
  };
  smooth?: boolean;
  lineStyle?: {
    type?: 'solid' | 'dashed' | 'dotted';
    width?: number;
  };
}

export interface ChartConfig {
  series: ChartSeries[];
  title?: string;
  subtitle?: string;
  xAxis?: {
    name?: string;
    type: 'category' | 'time' | 'value';
    data?: (string | number)[];
  };
  yAxis?: {
    name?: string;
    type: 'value';
    format?: string;
  };
  tooltip?: {
    trigger?: 'axis' | 'item';
    formatter?: string | ((...args: unknown[]) => unknown);
  };
  legend?: {
    show?: boolean;
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
}
