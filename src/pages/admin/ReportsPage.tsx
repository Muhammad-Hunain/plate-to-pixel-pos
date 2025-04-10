
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, Cell 
} from "recharts";
import { 
  Calendar, Download, FileText, Filter, Printer, 
  TrendingUp, BarChart2, PieChart as PieChartIcon, 
  LineChart as LineChartIcon, ArrowUpRight, FileBarChart2,
  Clock, DollarSign, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Monthly revenue data
const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 14800 },
  { month: "Mar", revenue: 18600 },
  { month: "Apr", revenue: 17200 },
  { month: "May", revenue: 21500 },
  { month: "Jun", revenue: 25800 },
  { month: "Jul", revenue: 28400 },
  { month: "Aug", revenue: 29700 },
  { month: "Sep", revenue: 31200 },
  { month: "Oct", revenue: 32800 },
  { month: "Nov", revenue: 36500 },
  { month: "Dec", revenue: 40200 },
];

// Restaurant growth data
const growthData = [
  { month: "Jan", restaurants: 18 },
  { month: "Feb", restaurants: 20 },
  { month: "Mar", restaurants: 22 },
  { month: "Apr", restaurants: 22 },
  { month: "May", restaurants: 23 },
  { month: "Jun", restaurants: 25 },
  { month: "Jul", restaurants: 25 },
  { month: "Aug", restaurants: 28 },
  { month: "Sep", restaurants: 28 },
  { month: "Oct", restaurants: 30 },
  { month: "Nov", restaurants: 32 },
  { month: "Dec", restaurants: 35 },
];

// User growth data
const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 145 },
  { month: "Mar", users: 162 },
  { month: "Apr", users: 197 },
  { month: "May", users: 215 },
  { month: "Jun", users: 250 },
  { month: "Jul", users: 265 },
  { month: "Aug", users: 290 },
  { month: "Sep", users: 305 },
  { month: "Oct", users: 315 },
  { month: "Nov", users: 330 },
  { month: "Dec", users: 350 },
];

// Revenue by plan type
const revenuePlanData = [
  { name: "Basic", value: 120000 },
  { name: "Standard", value: 280000 },
  { name: "Premium", value: 400000 },
];

// Restaurant distribution by cuisine
const cuisineDistribution = [
  { name: "Italian", value: 8 },
  { name: "American", value: 6 },
  { name: "Asian", value: 5 },
  { name: "Mexican", value: 4 },
  { name: "Indian", value: 3 },
  { name: "Other", value: 9 },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Top performing restaurants
const topRestaurants = [
  { name: "Burger Zone", revenue: 152400, orders: 12580 },
  { name: "Pizza Paradise", revenue: 142800, orders: 11450 },
  { name: "The Great Kitchen", revenue: 138500, orders: 10920 },
  { name: "Sushi Express", revenue: 125200, orders: 9870 },
  { name: "Thai Delight", revenue: 118400, orders: 9240 },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("year");
  const [reportType, setReportType] = useState("revenue");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Platform analytics and performance data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              2023
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">$800,000</div>
                  <div className="flex items-center text-xs text-success mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+12.5% from last year</span>
                  </div>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">350</div>
                  <div className="flex items-center text-xs text-success mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+22.4% from last year</span>
                  </div>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Growth Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">18.2%</div>
                  <div className="flex items-center text-xs text-success mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+3.5% from last year</span>
                  </div>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Performance Analytics</h2>
            <p className="text-muted-foreground text-sm">View and analyze key metrics</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="restaurants">Restaurants</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="charts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <FileBarChart2 className="h-4 w-4" />
              Summary
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
                    <p className="text-sm text-muted-foreground">Revenue over the last 12 months</p>
                  </div>
                  <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ChartContainer config={{
                    revenue: { label: "Revenue" }
                  }} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2} 
                          dot={{ fill: "hsl(var(--primary))" }} 
                          name="Revenue" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Restaurant Growth</CardTitle>
                    <p className="text-sm text-muted-foreground">New restaurants over time</p>
                  </div>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="restaurants" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]} 
                        name="Restaurants" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Revenue by Plan</CardTitle>
                    <p className="text-sm text-muted-foreground">Distribution across subscription plans</p>
                  </div>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenuePlanData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {revenuePlanData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="chart-container">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
                    <p className="text-sm text-muted-foreground">Platform user growth over time</p>
                  </div>
                  <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={{ fill: "#82ca9d" }} 
                        name="Users" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Available Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    { icon: BarChart2, title: "Monthly Revenue Report", description: "Detailed breakdown of platform revenue", date: "Last updated: Today" },
                    { icon: Users, title: "User Growth Analysis", description: "User acquisition and retention metrics", date: "Last updated: Yesterday" },
                    { icon: FileText, title: "Restaurant Performance", description: "Compare restaurant performance and metrics", date: "Last updated: 3 days ago" },
                    { icon: Clock, title: "Monthly Activity Report", description: "Platform usage and engagement statistics", date: "Last updated: 1 week ago" },
                  ].map((report, index) => (
                    <div key={index} className="flex gap-4 items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <report.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Platform Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">$800,000</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold">350</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Restaurants</p>
                        <p className="text-2xl font-bold">35</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">Average Rating</p>
                        <p className="text-2xl font-bold">4.7</p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-medium mb-2">Performance Highlights</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <ArrowUpRight className="h-4 w-4 text-success" />
                          <span>Revenue increased by 18.2% compared to last year</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <ArrowUpRight className="h-4 w-4 text-success" />
                          <span>User base grew by 22.4% in the last 12 months</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <ArrowUpRight className="h-4 w-4 text-success" />
                          <span>Added 17 new restaurants to the platform</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <ArrowUpRight className="h-4 w-4 text-success" />
                          <span>Premium plan subscriptions increased by 24%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Top Performing Restaurants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topRestaurants.map((restaurant, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{restaurant.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground gap-4">
                            <span>${restaurant.revenue.toLocaleString()} revenue</span>
                            <span>{restaurant.orders.toLocaleString()} orders</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
