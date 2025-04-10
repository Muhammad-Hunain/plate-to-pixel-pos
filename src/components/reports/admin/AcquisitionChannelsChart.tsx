
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AcquisitionChannelsChartProps {
  acquisitionData: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

const AcquisitionChannelsChart: React.FC<AcquisitionChannelsChartProps> = ({ acquisitionData, colors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acquisition Channels</CardTitle>
        <CardDescription>How customers find your business</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={acquisitionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {acquisitionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AcquisitionChannelsChart;
