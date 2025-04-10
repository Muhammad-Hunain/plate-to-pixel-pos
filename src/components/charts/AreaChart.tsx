
import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface AreaChartProps {
  data: Array<Record<string, any>>;
  dataKeys: string[];
  colors: string[];
  xAxisKey: string;
  margin?: { top: number; right: number; left: number; bottom: number };
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

const AreaChart = ({
  data,
  dataKeys,
  colors,
  xAxisKey,
  margin = { top: 10, right: 30, left: 0, bottom: 0 },
  height = 300,
  showGrid = true,
  showLegend = true
}: AreaChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={margin}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        {dataKeys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
            fillOpacity={0.3}
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
