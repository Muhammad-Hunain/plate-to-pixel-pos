
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  FileDown,
  User,
  ShoppingBag,
  DollarSign,
  Calendar,
  Search,
  Filter,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Color constants
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Mock data for revenue
const revenueData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

// Sales by category data
const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

// Demographics data
const radialBarData = [
  {
    name: "18-24",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "25-29",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "30-34",
    uv: 15.69,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "35-39",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "40+",
    uv: 6.35,
    pv: 4300,
    fill: "#a4de6c",
  },
];

// Customer analytics data
const customerFrequencyData = [
  { name: "1 visit", value: 42 },
  { name: "2-3 visits", value: 28 },
  { name: "4-6 visits", value: 16 },
  { name: "7+ visits", value: 14 },
];

const trafficByHourData = [
  { hour: "6-8", customers: 45 },
  { hour: "8-10", customers: 92 },
  { hour: "10-12", customers: 136 },
  { hour: "12-14", customers: 185 },
  { hour: "14-16", customers: 121 },
  { hour: "16-18", customers: 95 },
  { hour: "18-20", customers: 158 },
  { hour: "20-22", customers: 112 },
  { hour: "22-24", customers: 48 },
];

const customerTrendsData = [
  { month: "Jan", new: 120, returning: 80 },
  { month: "Feb", new: 140, returning: 110 },
  { month: "Mar", new: 130, returning: 120 },
  { month: "Apr", new: 170, returning: 130 },
  { month: "May", new: 160, returning: 170 },
  { month: "Jun", new: 190, returning: 190 },
  { month: "Jul", new: 210, returning: 210 },
];

const customerSatisfactionData = [
  { month: "Jan", satisfaction: 92 },
  { month: "Feb", satisfaction: 93 },
  { month: "Mar", satisfaction: 91 },
  { month: "Apr", satisfaction: 95 },
  { month: "May", satisfaction: 94 },
  { month: "Jun", satisfaction: 97 },
  { month: "Jul", satisfaction: 96 },
];

const popularItemsData = [
  { name: "Classic Burger", value: 420 },
  { name: "Cheese Pizza", value: 380 },
  { name: "Caesar Salad", value: 210 },
  { name: "Chicken Wings", value: 190 },
  { name: "Fries", value: 360 },
];

const averageOrderValueData = [
  { day: "Mon", value: 25.4 },
  { day: "Tue", value: 28.6 },
  { day: "Wed", value: 27.2 },
  { day: "Thu", value: 30.1 },
  { day: "Fri", value: 35.8 },
  { day: "Sat", value: 38.2 },
  { day: "Sun", value: 32.5 },
];

// Mock transactions data
const transactionsData = [
  {
    id: "TX001",
    customer: "John Smith",
    date: "2025-04-10",
    time: "14:30",
    amount: 42.50,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emma Wilson",
  },
  {
    id: "TX002",
    customer: "Sarah Johnson",
    date: "2025-04-10",
    time: "15:45",
    amount: 28.75,
    status: "completed",
    type: "takeaway",
    branch: "Uptown",
    staff: "James Davis",
  },
  {
    id: "TX003",
    customer: "Michael Brown",
    date: "2025-04-10",
    time: "16:20",
    amount: 67.30,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emma Wilson",
  },
  {
    id: "TX004",
    customer: "Emma Wilson",
    date: "2025-04-10",
    time: "17:05",
    amount: 22.95,
    status: "completed",
    type: "delivery",
    branch: "Westside",
    staff: "Thomas Lee",
  },
  {
    id: "TX005",
    customer: "David Lee",
    date: "2025-04-10",
    time: "18:15",
    amount: 54.80,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emily Taylor",
  },
  {
    id: "TX006",
    customer: "Lisa Chen",
    date: "2025-04-10",
    time: "19:00",
    amount: 36.25,
    status: "completed",
    type: "takeaway",
    branch: "Uptown",
    staff: "James Davis",
  },
  {
    id: "TX007",
    customer: "Robert Wilson",
    date: "2025-04-10",
    time: "19:45",
    amount: 48.75,
    status: "completed",
    type: "dine-in",
    branch: "Westside",
    staff: "Thomas Lee",
  },
  {
    id: "TX008",
    customer: "Jennifer Lopez",
    date: "2025-04-10",
    time: "20:30",
    amount: 31.50,
    status: "completed",
    type: "delivery",
    branch: "Downtown",
    staff: "Emily Taylor",
  },
  {
    id: "TX009",
    customer: "Daniel Smith",
    date: "2025-04-10",
    time: "21:15",
    amount: 72.40,
    status: "completed",
    type: "dine-in",
    branch: "Uptown",
    staff: "James Davis",
  },
  {
    id: "TX010",
    customer: "Michelle Wang",
    date: "2025-04-10",
    time: "21:45",
    amount: 26.95,
    status: "completed",
    type: "takeaway",
    branch: "Westside",
    staff: "Thomas Lee",
  },
  {
    id: "TX011",
    customer: "Kevin Johnson",
    date: "2025-04-10",
    time: "22:00",
    amount: 45.60,
    status: "completed",
    type: "dine-in",
    branch: "Downtown",
    staff: "Emma Wilson",
  },
  {
    id: "TX012",
    customer: "Amanda Taylor",
    date: "2025-04-10",
    time: "22:30",
    amount: 33.85,
    status: "completed",
    type: "delivery",
    branch: "Uptown",
    staff: "James Davis",
  },
];

const ReportsPage = () => {
  // State variables for filtering
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 1),
    to: new Date(2025, 3, 10)
  });
  const [branchFilter, setBranchFilter] = useState("all");
  const [currentTab, setCurrentTab] = useState("revenue");
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [transactionSearchQuery, setTransactionSearchQuery] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  // Filter transactions based on filters
  const filteredTransactions = transactionsData.filter(transaction => {
    // Filter by search query
    const matchesSearch = 
      transaction.customer.toLowerCase().includes(transactionSearchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(transactionSearchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = 
      transactionTypeFilter === "all" || 
      transaction.type === transactionTypeFilter;
    
    // Filter by branch
    const matchesBranch =
      branchFilter === "all" ||
      transaction.branch === branchFilter;
    
    // Filter by staff
    const matchesStaff =
      staffFilter === "all" ||
      transaction.staff === staffFilter;
    
    return matchesSearch && matchesType && matchesBranch && matchesStaff;
  });

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Detailed insights and analytics for your platform
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DateRangePicker 
              className="w-[260px]"
              initialDateFrom={dateRange?.from}
              initialDateTo={dateRange?.to}
              onUpdate={handleDateRangeChange}
            />
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Downtown">Downtown</SelectItem>
                <SelectItem value="Uptown">Uptown</SelectItem>
                <SelectItem value="Westside">Westside</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,524</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,356</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$59,245</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Conversion Rate
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.2%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs 
          value={currentTab} 
          onValueChange={setCurrentTab} 
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          {/* Revenue Tab Content */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pv" fill="#8884d8" />
                      <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Recent Transactions</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-blue-600"
                  onClick={() => setShowAllTransactions(true)}
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionsData.slice(0, 5).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell>
                            {transaction.date} {transaction.time}
                          </TableCell>
                          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              {transaction.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab Content */}
          <TabsContent value="sales" className="space-y-6">
            {/* Sales content */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab Content */}
          <TabsContent value="customers" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Customer Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={customerTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="new"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name="New Customers"
                      />
                      <Area
                        type="monotone"
                        dataKey="returning"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                        name="Returning Customers"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Frequency</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={customerFrequencyData}
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
                        {customerFrequencyData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Traffic by Hour</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={trafficByHourData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="customers" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={customerSatisfactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[85, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                      data={popularItemsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={averageOrderValueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 40]} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, "Average Order"]}
                      />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Demographics Tab Content */}
          <TabsContent value="demographics">
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
          </TabsContent>
        </Tabs>

        {/* Full Transactions View */}
        {showAllTransactions && (
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>All Transactions</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllTransactions(false)}
              >
                Close View
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="pl-9 w-full"
                      value={transactionSearchQuery}
                      onChange={(e) => setTransactionSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={branchFilter} onValueChange={setBranchFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      <SelectItem value="Downtown">Downtown</SelectItem>
                      <SelectItem value="Uptown">Uptown</SelectItem>
                      <SelectItem value="Westside">Westside</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="dine-in">Dine-In</SelectItem>
                      <SelectItem value="takeaway">Takeaway</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={staffFilter} onValueChange={setStaffFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Staff" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Staff</SelectItem>
                      <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
                      <SelectItem value="James Davis">James Davis</SelectItem>
                      <SelectItem value="Thomas Lee">Thomas Lee</SelectItem>
                      <SelectItem value="Emily Taylor">Emily Taylor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Staff</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center">
                          No transactions found for the selected filters
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell>
                            {transaction.date} {transaction.time}
                          </TableCell>
                          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              transaction.type === 'dine-in' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              transaction.type === 'takeaway' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                              'bg-green-100 text-green-800 border-green-200'
                            }>
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.branch}</TableCell>
                          <TableCell>{transaction.staff}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredTransactions.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{indexOfFirstTransaction + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastTransaction, filteredTransactions.length)}
                    </span>{" "}
                    of <span className="font-medium">{filteredTransactions.length}</span> transactions
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = currentPage <= 3
                          ? i + 1
                          : currentPage >= totalPages - 2
                            ? totalPages - 4 + i
                            : currentPage - 2 + i;
                        
                        if (pageNumber <= totalPages && pageNumber > 0) {
                          return (
                            <Button
                              key={pageNumber}
                              variant={currentPage === pageNumber ? "default" : "outline"}
                              size="sm"
                              className="mx-1 w-9"
                              onClick={() => setCurrentPage(pageNumber)}
                            >
                              {pageNumber}
                            </Button>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
