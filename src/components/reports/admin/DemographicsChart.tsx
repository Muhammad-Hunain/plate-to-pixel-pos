
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DemographicsChartProps {
  radialBarData: any[];
}

const DemographicsChart: React.FC<DemographicsChartProps> = ({ radialBarData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="80%"
            data={radialBarData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background={{ fill: "hsl(var(--muted))" }}
              dataKey="uv"
              animationDuration={1000}
              animationBegin={0}
            />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DemographicsChart;
