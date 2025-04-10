
import { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, RadarChart, Radar,
  Tooltip, Legend, Cell, RadialBarChart, RadialBar, ScatterChart, Scatter,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Funnel, FunnelChart,
  LabelList, Treemap
} from "recharts";
import { 
  Calendar, Download, FileText, Filter, Printer, 
  TrendingUp, BarChart2, PieChart as PieChartIcon, 
  LineChart as LineChartIcon, ArrowUpRight, FileBarChart2,
  Clock, DollarSign, Users, Save, FileUp, Share, RefreshCw,
  Calendar as CalendarIcon, Table as TableIcon, GripHorizontal,
  Sheet, Percent, Award, Repeat, PackageOpen, Activity,
  Plus, Edit, Trash2, Building2
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Badge } from "@/components/ui/badge";

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

// Daily active users data
const dailyActiveUsersData = [
  { day: "Mon", users: 120, sessions: 145 },
  { day: "Tue", users: 132, sessions: 165 },
  { day: "Wed", users: 141, sessions: 180 },
  { day: "Thu", users: 145, sessions: 190 },
  { day: "Fri", users: 150, sessions: 210 },
  { day: "Sat", users: 170, sessions: 220 },
  { day: "Sun", users: 160, sessions: 200 },
];

// Customer satisfaction by feature
const satisfactionData = [
  { subject: 'Ease of Use', A: 85, fullMark: 100 },
  { subject: 'Features', A: 78, fullMark: 100 },
  { subject: 'Support', A: 90, fullMark: 100 },
  { subject: 'Performance', A: 82, fullMark: 100 },
  { subject: 'Value', A: 75, fullMark: 100 },
  { subject: 'Reliability', A: 88, fullMark: 100 },
];

// Average order value by restaurant
const avgOrderValueData = [
  { restaurant: "Pizza Paradise", value: 28.5, orders: 1250 },
  { restaurant: "Burger Zone", value: 22.3, orders: 1450 },
  { restaurant: "Sushi Express", value: 35.2, orders: 980 },
  { restaurant: "Thai Delight", value: 26.8, orders: 1120 },
  { restaurant: "Mexican Fiesta", value: 24.5, orders: 1350 },
];

// User retention funnel data
const retentionData = [
  { name: 'Initial Signup', value: 5000 },
  { name: 'Completed Profile', value: 4200 },
  { name: 'First Order', value: 3600 },
  { name: 'Second Order', value: 2800 },
  { name: 'Regular User', value: 2200 },
];

// Platform feature usage data
const featureUsageData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// User satisfaction data
const userSatisfactionData = [
  { name: '18-24', uv: 31.47, pv: 2400, fill: '#8884d8' },
  { name: '25-29', uv: 26.69, pv: 4567, fill: '#83a6ed' },
  { name: '30-34', uv: 15.69, pv: 1398, fill: '#8dd1e1' },
  { name: '35-39', uv: 8.22, pv: 9800, fill: '#82ca9d' },
  { name: '40-49', uv: 8.63, pv: 3908, fill: '#a4de6c' },
  { name: '50+', uv: 2.63, pv: 4800, fill: '#d0ed57' },
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

// Sample restaurant data for filter
const restaurants = [
  { id: 1, name: "Burger Zone" },
  { id: 2, name: "Pizza Paradise" },
  { id: 3, name: "The Great Kitchen" },
  { id: 4, name: "Sushi Express" },
  { id: 5, name: "Thai Delight" },
  { id: 6, name: "Mexican Fiesta" },
  { id: 7, name: "Italian Bistro" },
  { id: 8, name: "Indian Spice" }
];

// User acquisition by channel
const acquisitionData = [
  { name: 'Organic Search', value: 35 },
  { name: 'Direct', value: 25 },
  { name: 'Social Media', value: 20 },
  { name: 'Referral', value: 15 },
  { name: 'Other', value: 5 },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });
  const [reportType, setReportType] = useState("revenue");
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [filterData, setFilterData] = useState({
    restaurants: [] as string[],
    metrics: ["revenue", "users", "orders"],
    compareWithPrevious: true,
    showAverages: true,
  });

  // Apply filters handler
  const applyFilters = () => {
    toast.success("Filters applied successfully!");
    setIsFilterDrawerOpen(false);
  };

  // Reset filters handler
  const resetFilters = () => {
    setFilterData({
      restaurants: [],
      metrics: ["revenue", "users", "orders"],
      compareWithPrevious: true,
      showAverages: true,
    });
    toast.success("Filters have been reset");
    setIsFilterDrawerOpen(false);
  };

  // Export data handler
  const handleExport = () => {
    toast.success(`Report exported as ${exportFormat.toUpperCase()}`);
    setIsExportDialogOpen(false);
  };

  // Print handler
  const handlePrint = () => {
    toast.success("Preparing document for print");
    setTimeout(() => {
      toast.success("Print dialog opened");
    }, 1000);
    setIsPrintDialogOpen(false);
  };

  // Animation classes
  const getAnimationClass = (index: number) => {
    return `animate-fade-in [animation-delay:${index * 100}ms]`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Platform analytics and performance data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="hover-scale">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <DateRangePicker
                  initialDateFrom={dateRange?.from}
                  initialDateTo={dateRange?.to}
                  onUpdate={(range) => setDateRange(range)}
                />
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="hover-scale"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsPrintDialogOpen(true)}
              className="hover-scale"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            
            <Button 
              size="sm" 
              onClick={() => setIsExportDialogOpen(true)}
              className="hover-scale"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="stat-card animate-fade-in [animation-delay:100ms]">
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
          
          <Card className="stat-card animate-fade-in [animation-delay:200ms]">
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
          
          <Card className="stat-card animate-fade-in [animation-delay:300ms]">
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

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between animate-fade-in [animation-delay:400ms]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Performance Analytics</h2>
            <p className="text-muted-foreground text-sm">View and analyze key metrics</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Select defaultValue={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[140px] hover-scale">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="users">Users</SelectItem>
                <SelectItem value="restaurants">Restaurants</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="retention">Retention</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="year">
              <SelectTrigger className="w-[140px] hover-scale">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="charts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="charts" className="flex items-center gap-2 hover-scale">
              <BarChart2 className="h-4 w-4" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 hover-scale">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2 hover-scale">
              <FileBarChart2 className="h-4 w-4" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2 hover-scale">
              <Activity className="h-4 w-4" />
              Advanced Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className={`chart-container ${getAnimationClass(0)}`}>
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
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className={`chart-container ${getAnimationClass(1)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Restaurant Growth</CardTitle>
                    <p className="text-sm text-muted-foreground">New restaurants over time</p>
                  </div>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
                      <Legend />
                      <Bar 
                        dataKey="restaurants" 
                        fill="hsl(var(--primary))" 
                        radius={[4, 4, 0, 0]} 
                        name="Restaurants" 
                        animationDuration={1000}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className={`chart-container ${getAnimationClass(2)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Revenue by Plan</CardTitle>
                    <p className="text-sm text-muted-foreground">Distribution across subscription plans</p>
                  </div>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
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
                        animationDuration={1000}
                        animationBegin={200}
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

              <Card className={`chart-container ${getAnimationClass(3)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
                    <p className="text-sm text-muted-foreground">Platform user growth over time</p>
                  </div>
                  <LineChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        fill="#82ca9d" 
                        stroke="#82ca9d"
                        fillOpacity={0.3}
                        strokeWidth={2}
                        name="Users" 
                        activeDot={{ r: 6 }}
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className={`chart-container ${getAnimationClass(4)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Daily Active Users</CardTitle>
                    <p className="text-sm text-muted-foreground">Users and sessions per day</p>
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={dailyActiveUsersData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="users" 
                        fill="#8884d8" 
                        name="Users"
                        barSize={20}
                        radius={[4, 4, 0, 0]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sessions" 
                        stroke="#FF8042" 
                        strokeWidth={2}
                        name="Sessions" 
                        activeDot={{ r: 6 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={`chart-container ${getAnimationClass(5)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">User Acquisition</CardTitle>
                    <p className="text-sm text-muted-foreground">User acquisition by channel</p>
                  </div>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={acquisitionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        animationDuration={1000}
                        animationBegin={300}
                      >
                        {acquisitionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <LabelList dataKey="name" position="outside" />
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="space-y-6">
            <Card className={`bg-card ${getAnimationClass(0)}`}>
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
                    { icon: Percent, title: "Conversion Rate Analysis", description: "Visitor to customer conversion metrics", date: "Last updated: 2 weeks ago" },
                    { icon: Award, title: "Top Performing Restaurants", description: "Ranking of best performing restaurants", date: "Last updated: 1 month ago" },
                  ].map((report, index) => (
                    <div 
                      key={index} 
                      className={`flex gap-4 items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors hover-scale ${getAnimationClass(index)}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <report.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="hover-scale">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.success(`${report.title} exported as CSV`)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`${report.title} exported as PDF`)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`${report.title} exported as Document`)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Export as Document
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-card ${getAnimationClass(6)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Scheduled Reports</CardTitle>
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Schedule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Weekly Revenue Summary", frequency: "Every Monday at 8:00 AM", recipients: "Admin Team", format: "PDF" },
                    { title: "Monthly User Growth", frequency: "1st of each month at 7:00 AM", recipients: "Management Team", format: "Excel" },
                    { title: "Quarterly Performance Review", frequency: "Last day of quarter at 12:00 PM", recipients: "Stakeholders", format: "PDF & Excel" },
                  ].map((schedule, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <h4 className="font-medium">{schedule.title}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Repeat className="h-3.5 w-3.5" />
                            <span>{schedule.frequency}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            <span>{schedule.recipients}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" />
                            <span>{schedule.format}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="hover-scale">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover-scale">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className={`bg-card ${getAnimationClass(0)}`}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Platform Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg hover-scale">
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">$800,000</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg hover-scale">
                        <p className="text-sm text-muted-foreground">Total Users</p>
                        <p className="text-2xl font-bold">350</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg hover-scale">
                        <p className="text-sm text-muted-foreground">Total Restaurants</p>
                        <p className="text-2xl font-bold">35</p>
                      </div>
                      <div className="bg-muted/50 p-4 rounded-lg hover-scale">
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
              
              <Card className={`bg-card ${getAnimationClass(1)}`}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Top Performing Restaurants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topRestaurants.map((restaurant, index) => (
                      <div key={index} className="flex items-center gap-3 hover-scale">
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

            <Card className={`bg-card ${getAnimationClass(2)}`}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/50 hover-scale">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">Growth Opportunities</h3>
                    </div>
                    <ul className="space-y-2 pl-10">
                      <li className="text-sm list-disc">Expansion potential in the southern region with 45% market growth</li>
                      <li className="text-sm list-disc">Mobile app engagement increased by 37% after recent updates</li>
                      <li className="text-sm list-disc">High demand for delivery services in suburban areas (62% increase YoY)</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/50 hover-scale">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <h3 className="font-semibold">Revenue Drivers</h3>
                    </div>
                    <ul className="space-y-2 pl-10">
                      <li className="text-sm list-disc">Premium subscription tier saw highest conversion rate at 28%</li>
                      <li className="text-sm list-disc">Add-on services contribute 18% to total revenue</li>
                      <li className="text-sm list-disc">Average order value increased by $4.75 across all restaurants</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/50 hover-scale">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold">Customer Behavior</h3>
                    </div>
                    <ul className="space-y-2 pl-10">
                      <li className="text-sm list-disc">Highest user engagement occurs during 11:30 AM - 1:30 PM and 6-8 PM</li>
                      <li className="text-sm list-disc">75% of users place orders at least twice a month</li>
                      <li className="text-sm list-disc">Referral program responsible for 22% of new customer acquisition</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className={`chart-container ${getAnimationClass(0)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Customer Satisfaction</CardTitle>
                    <p className="text-sm text-muted-foreground">Rating across different metrics</p>
                  </div>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={satisfactionData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar 
                        name="Satisfaction" 
                        dataKey="A" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.6} 
                        animationDuration={1000}
                      />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={`chart-container ${getAnimationClass(1)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Average Order Value</CardTitle>
                    <p className="text-sm text-muted-foreground">By restaurant (size = order volume)</p>
                  </div>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="restaurant" 
                        type="category" 
                        name="Restaurant" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={10} 
                        tickLine={false} 
                        axisLine={false}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        dataKey="value" 
                        name="Avg Order Value" 
                        unit="$" 
                        stroke="hsl(var(--muted-foreground))" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        domain={[0, 'dataMax + 5']}
                      />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [`$${value}`, name]} />
                      <Legend />
                      <Scatter 
                        name="Average Order Value" 
                        data={avgOrderValueData} 
                        fill="#8884d8" 
                        animationDuration={1000}
                      >
                        {avgOrderValueData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className={`chart-container ${getAnimationClass(2)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">User Retention Funnel</CardTitle>
                    <p className="text-sm text-muted-foreground">User journey and retention stages</p>
                  </div>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <FunnelChart>
                      <Tooltip />
                      <Funnel
                        dataKey="value"
                        data={retentionData}
                        isAnimationActive
                        animationDuration={1000}
                      >
                        {retentionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                        <LabelList position="right" fill="#000" stroke="none" dataKey="value" />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className={`chart-container ${getAnimationClass(3)}`}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg font-semibold">Feature Usage</CardTitle>
                    <p className="text-sm text-muted-foreground">Most used platform features</p>
                  </div>
                  <PackageOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <Treemap
                      data={featureUsageData}
                      dataKey="value"
                      stroke="#fff"
                      fill="#8884d8"
                      animationDuration={1000}
                    >
                      {featureUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                      <Tooltip formatter={(value) => [`${value} users`, 'Usage']} />
                    </Treemap>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card className={`chart-container ${getAnimationClass(4)}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold">User Satisfaction by Age Group</CardTitle>
                  <p className="text-sm text-muted-foreground">Satisfaction rating across demographics</p>
                </div>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart 
                    cx="50%" 
                    cy="50%" 
                    innerRadius="20%" 
                    outerRadius="80%" 
                    barSize={10} 
                    data={userSatisfactionData}
                  >
                    <RadialBar
                      background={{ fill: "hsl(var(--muted))" }}
                      clockWise
                      dataKey="uv"
                      animationDuration={1000}
                      animationBegin={300}
                    />
                    <Legend 
                      iconSize={10} 
                      layout="vertical" 
                      verticalAlign="middle" 
                      wrapperStyle={{ lineHeight: '24px' }}
                    />
                    <Tooltip 
                      formatter={(value) => {
                        if (typeof value === 'number') {
                          return [`${value.toFixed(2)}% satisfaction`, 'Rating'];
                        }
                        return [`${value}% satisfaction`, 'Rating'];
                      }} 
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Dialog */}
        <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
          <DialogContent className="sm:max-w-md animate-scale-in">
            <DialogHeader>
              <DialogTitle>Export Report</DialogTitle>
              <DialogDescription>
                Choose a file format and customize export options
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Export Format</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["csv", "pdf", "docx"].map((format) => (
                    <div 
                      key={format}
                      className={`
                        border rounded-md p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover-scale
                        ${exportFormat === format ? 'border-primary bg-primary/5' : 'border-muted'}
                      `}
                      onClick={() => setExportFormat(format)}
                    >
                      <FileText className="h-8 w-8" />
                      <span className="text-sm font-medium uppercase">{format}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Export Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="charts" defaultChecked />
                    <label
                      htmlFor="charts"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include charts and visualizations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tables" defaultChecked />
                    <label
                      htmlFor="tables"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include data tables
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="summary" defaultChecked />
                    <label
                      htmlFor="summary"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Include executive summary
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="hover-scale">Cancel</Button>
              </DialogClose>
              <Button onClick={handleExport} className="hover-scale">
                <FileUp className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Print Dialog */}
        <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
          <DialogContent className="sm:max-w-md animate-scale-in">
            <DialogHeader>
              <DialogTitle>Print Report</DialogTitle>
              <DialogDescription>
                Customize print settings before printing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Print Sections</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="p-charts" defaultChecked />
                    <label
                      htmlFor="p-charts"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Charts and Visualizations
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="p-tables" defaultChecked />
                    <label
                      htmlFor="p-tables"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Data Tables
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="p-summary" defaultChecked />
                    <label
                      htmlFor="p-summary"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Summary Insights
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Layout Options</Label>
                <Select defaultValue="portrait">
                  <SelectTrigger className="hover-scale">
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="hover-scale">Cancel</Button>
              </DialogClose>
              <Button onClick={handlePrint} className="hover-scale">
                <Printer className="mr-2 h-4 w-4" />
                Print Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Filter Drawer */}
        <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
          <DrawerContent className="animate-slide-in-right">
            <DrawerHeader className="text-left">
              <DrawerTitle>Filter Reports</DrawerTitle>
              <DrawerDescription>
                Customize what data is shown in your reports
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 py-2 space-y-6">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="border rounded-md p-4">
                  <DateRangePicker
                    initialDateFrom={dateRange?.from}
                    initialDateTo={dateRange?.to}
                    onUpdate={(range) => setDateRange(range)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Restaurants</Label>
                <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                  {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`filter-rest-${restaurant.id}`} 
                        checked={filterData.restaurants.includes(restaurant.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilterData(prev => ({
                              ...prev,
                              restaurants: [...prev.restaurants, restaurant.name]
                            }));
                          } else {
                            setFilterData(prev => ({
                              ...prev,
                              restaurants: prev.restaurants.filter(r => r !== restaurant.name)
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor={`filter-rest-${restaurant.id}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {restaurant.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Metrics to Include</Label>
                <div className="border rounded-md p-3 space-y-2">
                  {["revenue", "users", "orders", "growth", "conversion"].map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`filter-metric-${metric}`}
                        checked={filterData.metrics.includes(metric)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilterData(prev => ({
                              ...prev,
                              metrics: [...prev.metrics, metric]
                            }));
                          } else {
                            setFilterData(prev => ({
                              ...prev,
                              metrics: prev.metrics.filter(m => m !== metric)
                            }));
                          }
                        }}
                      />
                      <label
                        htmlFor={`filter-metric-${metric}`}
                        className="text-sm capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {metric}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="compare-prev" 
                      checked={filterData.compareWithPrevious}
                      onCheckedChange={(checked) => {
                        setFilterData(prev => ({ ...prev, compareWithPrevious: checked as boolean }));
                      }}
                    />
                    <label
                      htmlFor="compare-prev"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Compare with previous period
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="show-avg" 
                      checked={filterData.showAverages}
                      onCheckedChange={(checked) => {
                        setFilterData(prev => ({ ...prev, showAverages: checked as boolean }));
                      }}
                    />
                    <label
                      htmlFor="show-avg"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show averages
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Applied Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {filterData.restaurants.length > 0 && (
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <Building2 className="h-3 w-3" />
                      <span>{filterData.restaurants.length} Restaurants</span>
                    </Badge>
                  )}
                  {filterData.metrics.map(metric => (
                    <Badge key={metric} variant="outline" className="flex gap-1 items-center">
                      <span className="capitalize">{metric}</span>
                    </Badge>
                  ))}
                  {filterData.compareWithPrevious && (
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <RefreshCw className="h-3 w-3" />
                      <span>Comparing periods</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button className="hover-scale" onClick={applyFilters}>Apply Filters</Button>
              <Button variant="outline" className="hover-scale" onClick={resetFilters}>Reset Filters</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </AdminLayout>
  );
}
