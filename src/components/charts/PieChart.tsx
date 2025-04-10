
import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PieChartProps {
  data: Array<{ name: string; value: number; fill?: string }>;
  colors?: string[];
  dataKey?: string;
  nameKey?: string;
  margin?: { top: number; right: number; left: number; bottom: number };
  height?: number;
  showLegend?: boolean;
}

const PieChart = ({
  data,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'],
  dataKey = 'value',
  nameKey = 'name',
  margin = { top: 0, right: 0, left: 0, bottom: 0 },
  height = 300,
  showLegend = true
}: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart margin={margin}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}`, '']} />
        {showLegend && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
