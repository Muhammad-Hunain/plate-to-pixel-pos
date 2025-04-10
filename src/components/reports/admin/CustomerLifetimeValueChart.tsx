
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CustomerLifetimeValueChartProps {
  lifetimeValueData: Array<{
    segment: string;
    value: number;
  }>;
  colors: string[];
}

const CustomerLifetimeValueChart: React.FC<CustomerLifetimeValueChartProps> = ({ lifetimeValueData, colors }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Lifetime Value</CardTitle>
        <CardDescription>Average value by segment ($)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={lifetimeValueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="segment" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
            <Bar dataKey="value" fill="#8884d8">
              {lifetimeValueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerLifetimeValueChart;
