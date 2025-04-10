import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  FileText,
  Filter,
  MoreHorizontal,
  Printer,
  RefreshCw,
  Search,
  Share2,
  TrendingDown,
  TrendingUp,
  Utensils,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";
import AreaChart from '@/components/charts/AreaChart';
import PieChart from '@/components/charts/PieChart';

// Sample data for reports
const salesTrendData = [
  { date: "Jan", Downtown: 4000, Uptown: 2400, Westside: 1800 },
  { date: "Feb", Downtown: 3000, Uptown: 1398, Westside: 2000 },
  { date: "Mar", Downtown: 2000, Uptown: 9800, Westside: 2200 },
  { date: "Apr", Downtown: 2780, Uptown: 3908, Westside: 2500 },
  { date: "May", Downtown: 1890, Uptown: 4800, Westside: 2300 },
  { date: "Jun", Downtown: 2390, Uptown: 3800, Westside: 2100 },
  { date: "Jul", Downtown: 3490, Uptown: 4300, Westside: 2400 },
];

const menuItemsData = [
  { name: "Margherita Pizza", value: 25, fill: "#0088FE" },
  { name: "Chicken Burger", value: 18, fill: "#00C49F" },
  { name: "Caesar Salad", value: 15, fill: "#FFBB28" },
  { name: "Spaghetti", value: 12, fill: "#FF8042" },
  { name: "Garlic Bread", value: 8, fill: "#8884d8" },
];

const revenueByCategory = [
  { name: "Food", value: 68, unit: "%" },
  { name: "Beverages", value: 22, unit: "%" },
  { name: "Desserts", value: 10, unit: "%" },
];

const salesByTimeData = [
  { time: "8-10", sales: 1200 },
  { time: "10-12", sales: 1800 },
  { time: "12-14", sales: 2400 },
  { time: "14-16", sales: 1600 },
  { time: "16-18", sales: 1900 },
  { time: "18-20", sales: 2200 },
  { time: "20-22", sales: 1800 },
];

const recentTransactions = [
  {
    id: "TX123456",
    date: "2023-04-10",
    time: "12:30 PM",
    amount: 78.50,
    items: 4,
    customer: "John Smith",
    type: "dine-in",
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX123457",
    date: "2023-04-10",
    time: "1:15 PM",
    amount: 42.25,
    items: 2,
    customer: "Sarah Johnson",
    type: "takeaway",
    status: "completed",
    paymentMethod: "Cash",
  },
  {
    id: "TX123458",
    date: "2023-04-10",
    time: "2:05 PM",
    amount: 56.80,
    items: 3,
    customer: "Michael Brown",
    type: "delivery",
    status: "completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "TX123459",
    date: "2023-04-10",
    time: "3:30 PM",
    amount: 32.40,
    items: 2,
    customer: "Emily Wilson",
    type: "takeaway",
    status: "completed",
    paymentMethod: "Mobile Payment",
  },
  {
    id: "TX123460",
    date: "2023-04-10",
    time: "5:45 PM",
    amount: 92.15,
    items: 5,
    customer: "David Lee",
    type: "dine-in",
    status: "completed",
    paymentMethod: "Credit Card",
  },
];

const topSellingItems = [
  {
    name: "Margherita Pizza",
    category: "Pizza",
    quantity: 145,
    revenue: 2175.0,
    growth: 12.5,
  },
  {
    name: "Chicken Burger",
    category: "Burgers",
    quantity: 132,
    revenue: 1584.0,
    growth: 8.2,
  },
  {
    name: "Caesar Salad",
    category: "Salads",
    quantity: 98,
    revenue: 980.0,
    growth: -2.3,
  },
  {
    name: "Spaghetti Carbonara",
    category: "Pasta",
    quantity: 87,
    revenue: 1131.0,
    growth: 5.7,
  },
  {
    name: "Garlic Bread",
    category: "Sides",
    quantity: 78,
    revenue: 390.0,
    growth: 15.2,
  },
];

const branchPerformance = [
  {
    name: "Downtown",
    orders: 542,
    revenue: 12450.75,
    growth: 8.5,
    avgOrder: 22.97,
  },
  {
    name: "Uptown",
    orders: 423,
    revenue: 9876.50,
    growth: 12.3,
    avgOrder: 23.35,
  },
  {
    name: "Westside",
    orders: 387,
    revenue: 8654.25,
    growth: -2.1,
    avgOrder: 22.36,
  },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("today");
  const [reportType, setReportType] = useState("sales");

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              View detailed reports and insights about your restaurant
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedDashboardCard delay={1}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold">$12,450.75</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>8.5%</span>
              </div>
              <span className="text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </AnimatedDashboardCard>

          <AnimatedDashboardCard delay={2}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">542</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Utensils className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>12.3%</span>
              </div>
              <span className="text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </AnimatedDashboardCard>

          <AnimatedDashboardCard delay={3}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Order Value</p>
                <h3 className="text-2xl font-bold">$22.97</h3>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-full">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>3.2%</span>
              </div>
              <span className="text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </AnimatedDashboardCard>

          <AnimatedDashboardCard delay={4}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <h3 className="text-2xl font-bold">387</h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <Users className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center text-red-500">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>2.1%</span>
              </div>
              <span className="text-muted-foreground ml-2">vs. previous period</span>
            </div>
          </AnimatedDashboardCard>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="items">Menu Items</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>Revenue by branch over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={salesTrendData}
                    dataKeys={["Downtown", "Uptown", "Westside"]}
                    colors={["#0088FE", "#00C49F", "#FF8042"]}
                    xAxisKey="date"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Top Selling Items</CardTitle>
                  <CardDescription>By quantity sold</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={menuItemsData}
                    height={250}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Time of Day</CardTitle>
                  <CardDescription>Hourly distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={salesByTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest orders and payments</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.slice(0, 4).map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.id}</TableCell>
                          <TableCell>{tx.time}</TableCell>
                          <TableCell>{tx.customer}</TableCell>
                          <TableCell>${tx.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {tx.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Sales Report</CardTitle>
                    <CardDescription>Detailed sales analysis by branch and time period</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Revenue by Branch</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {branchPerformance.map((branch) => (
                      <div key={branch.name} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{branch.name}</h4>
                          <div className={`flex items-center ${branch.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {branch.growth >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                            <span>{Math.abs(branch.growth)}%</span>
                          </div>
                        </div>
                        <p className="text-2xl font-bold">${branch.revenue.toFixed(2)}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                          <span>{branch.orders} orders</span>
                          <span>Avg: ${branch.avgOrder.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Sales Trend</h3>
                  <AreaChart
                    data={salesTrendData}
                    dataKeys={["Downtown", "Uptown", "Westside"]}
                    colors={["#0088FE", "#00C49F", "#FF8042"]}
                    xAxisKey="date"
                    height={350}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Revenue by Category</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <PieChart
                        data={revenueByCategory}
                        height={250}
                      />
                    </div>
                    <div className="space-y-4">
                      {revenueByCategory.map((category, index) => (
                        <div key={category.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{category.name}</span>
                            <span>{category.value}{category.unit}</span>
                          </div>
                          <Progress value={category.value} className="h-2" />
                        </div>
                      ))}
                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground">
                          Food items continue to be the primary revenue driver, with beverages showing a 5% increase compared to the previous period.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Transaction Details</h3>
                    <div className="relative w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search transactions..."
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Payment Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentTransactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell className="font-medium">{tx.id}</TableCell>
                            <TableCell>{tx.date} {tx.time}</TableCell>
                            <TableCell>{tx.customer}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{tx.type}</Badge>
                            </TableCell>
                            <TableCell>{tx.items}</TableCell>
                            <TableCell>{tx.paymentMethod}</TableCell>
                            <TableCell className="text-right">${tx.amount.toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Menu Item Performance</CardTitle>
                    <CardDescription>Analysis of menu item sales and popularity</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="quantity">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quantity">By Quantity</SelectItem>
                        <SelectItem value="revenue">By Revenue</SelectItem>
                        <SelectItem value="growth">By Growth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Selling Items</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Growth</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topSellingItems.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>${item.revenue.toFixed(2)}</TableCell>
                              <TableCell>
                                <div className={`flex items-center ${item.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {item.growth >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                                  <span>{Math.abs(item.growth)}%</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Sales Distribution</h3>
                    <PieChart
                      data={menuItemsData}
                      height={300}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Item Performance Metrics</h3>
                  <div className="space-y-4">
                    {topSellingItems.map((item) => (
                      <div key={item.name} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <div className={`flex items-center ${item.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {item.growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            <span>{Math.abs(item.growth)}%</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Quantity Sold</p>
                            <p className="text-xl font-bold">{item.quantity}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                            <p className="text-xl font-bold">${item.revenue.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Performance</span>
                            <span className="text-sm">{50 + item.growth}%</span>
                          </div>
                          <Progress value={50 + item.growth} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Customer behavior and spending patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Customer analytics data is being processed.</p>
                  <p className="text-muted-foreground">This section will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}
