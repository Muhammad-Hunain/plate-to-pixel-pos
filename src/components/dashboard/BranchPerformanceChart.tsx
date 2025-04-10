
import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BranchPerformanceChartProps {
  data: any[];
  title: string;
  description?: string;
  metrics?: string[];
  branchNames?: string[];
  defaultMetric?: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const BranchPerformanceChart: React.FC<BranchPerformanceChartProps> = ({
  data,
  title,
  description = "Performance comparison across branches",
  metrics = ["sales", "orders", "customers"],
  branchNames = ["All Branches", "Downtown", "Uptown", "Westside", "Northside"],
  defaultMetric = "sales"
}) => {
  const [selectedBranch, setSelectedBranch] = useState<string>("All Branches");
  const [selectedMetric, setSelectedMetric] = useState<string>(defaultMetric);
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line");

  // Calculate overall trends
  const calculateTrend = () => {
    if (data.length < 2) return { value: 0, isPositive: true };
    
    const branch = selectedBranch.toLowerCase();
    const firstValue = data[0][branch] || 0;
    const lastValue = data[data.length - 1][branch] || 0;
    const change = lastValue - firstValue;
    const percentChange = firstValue === 0 ? 0 : (change / firstValue) * 100;
    
    return {
      value: Math.abs(percentChange).toFixed(1),
      isPositive: percentChange >= 0
    };
  };

  const formatChartData = () => {
    if (chartType === "pie" && selectedBranch === "All Branches") {
      // For pie chart, we want to show distribution across branches for the selected metric
      return branchNames
        .filter(branch => branch !== "All Branches")
        .map(branch => {
          const branchTotal = data.reduce((sum, entry) => {
            return sum + (entry[branch.toLowerCase()] || 0);
          }, 0);
          
          return {
            name: branch,
            value: branchTotal
          };
        });
    }
    
    return data;
  };

  const chartData = formatChartData();
  const trend = calculateTrend();

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          padding={{ left: 30, right: 30 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} />
        <Legend />
        {(selectedBranch === "All Branches" ? branchNames.filter(b => b !== "All Branches") : [selectedBranch]).map((branch, index) => (
          <Line
            key={branch}
            type="monotone"
            dataKey={branch.toLowerCase()}
            stroke={COLORS[index % COLORS.length]}
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          padding={{ left: 30, right: 30 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} />
        <Legend />
        {(selectedBranch === "All Branches" ? branchNames.filter(b => b !== "All Branches") : [selectedBranch]).map((branch, index) => (
          <Bar
            key={branch}
            dataKey={branch.toLowerCase()}
            fill={COLORS[index % COLORS.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
            {/* Show trend indicator */}
            <div className="flex items-center mt-1 text-sm">
              {trend.isPositive ? (
                <Badge variant="outline" className="flex items-center gap-1 text-green-600 bg-green-50 border-green-200">
                  <TrendingUp className="h-3 w-3" /> 
                  +{trend.value}% overall
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1 text-red-600 bg-red-50 border-red-200">
                  <TrendingDown className="h-3 w-3" /> 
                  -{trend.value}% overall
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                {metrics.map((metric) => (
                  <SelectItem key={metric} value={metric}>
                    {metric.charAt(0).toUpperCase() + metric.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branchNames.map((branch) => (
                  <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="line" onValueChange={(value) => setChartType(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
          </TabsList>
          <TabsContent value="line">{renderLineChart()}</TabsContent>
          <TabsContent value="bar">{renderBarChart()}</TabsContent>
          <TabsContent value="pie">{renderPieChart()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BranchPerformanceChart;
