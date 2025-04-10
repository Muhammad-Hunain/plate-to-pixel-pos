
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const dailyData = [
  { date: 'Mon', revenue: 2400, orders: 24, costs: 1800 },
  { date: 'Tue', revenue: 1398, orders: 13, costs: 1000 },
  { date: 'Wed', revenue: 9800, orders: 98, costs: 7000 },
  { date: 'Thu', revenue: 3908, orders: 39, costs: 2500 },
  { date: 'Fri', revenue: 4800, orders: 48, costs: 3200 },
  { date: 'Sat', revenue: 3800, orders: 38, costs: 2600 },
  { date: 'Sun', revenue: 4300, orders: 43, costs: 3100 }
];

const weeklyData = [
  { date: 'Week 1', revenue: 12000, orders: 120, costs: 9000 },
  { date: 'Week 2', revenue: 19000, orders: 190, costs: 14000 },
  { date: 'Week 3', revenue: 10000, orders: 100, costs: 7500 },
  { date: 'Week 4', revenue: 22000, orders: 220, costs: 16000 }
];

const monthlyData = [
  { date: 'Jan', revenue: 45000, orders: 450, costs: 32000 },
  { date: 'Feb', revenue: 52000, orders: 520, costs: 40000 },
  { date: 'Mar', revenue: 49000, orders: 490, costs: 36000 },
  { date: 'Apr', revenue: 58000, orders: 580, costs: 42000 },
  { date: 'May', revenue: 61000, orders: 610, costs: 46000 },
  { date: 'Jun', revenue: 63000, orders: 630, costs: 47000 },
  { date: 'Jul', revenue: 72000, orders: 720, costs: 54000 }
];

export default function SalesPerformanceChart() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [dataType, setDataType] = useState('revenue');
  
  const dataMap = {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData
  };

  return (
    <Card className="col-span-12 lg:col-span-8 chart-container animate-slide-in">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <CardTitle className="text-lg font-semibold">Sales Performance</CardTitle>
          <CardDescription>
            Revenue, orders, and costs over time
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dataType} onValueChange={setDataType}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Data type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
              <SelectItem value="costs">Costs</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataMap[timeframe]}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Legend />
              {(dataType === 'revenue' || dataType === 'all') && (
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              )}
              {(dataType === 'orders' || dataType === 'all') && (
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                  strokeWidth={2}
                />
              )}
              {(dataType === 'costs' || dataType === 'all') && (
                <Area
                  type="monotone"
                  dataKey="costs"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorCosts)"
                  strokeWidth={2}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
