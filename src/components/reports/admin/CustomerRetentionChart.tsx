
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CustomerRetentionChartProps {
  retentionData: Array<{
    month: string;
    retention: number;
  }>;
}

const CustomerRetentionChart: React.FC<CustomerRetentionChartProps> = ({ retentionData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Retention</CardTitle>
        <CardDescription>Monthly retention rate (%)</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={retentionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[70, 90]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="retention"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerRetentionChart;
