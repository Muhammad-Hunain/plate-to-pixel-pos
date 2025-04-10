
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  FileDown,
  FileText,
  Calendar,
  Filter,
  Users,
  Package,
  ShoppingBag,
  User,
  AlertCircle,
  BarChart2,
  PieChart,
  TrendingUp,
  LineChart,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Bar,
  Legend,
  Pie,
  PieChart as RechartPieChart
} from 'recharts';

// Sample data for reports
const salesData = [
  { date: 'Mon', Downtown: 4200, Uptown: 2400, Westside: 3800 },
  { date: 'Tue', Downtown: 3800, Uptown: 1800, Westside: 4200 },
  { date: 'Wed', Downtown: 5200, Uptown: 3200, Westside: 3600 },
  { date: 'Thu', Downtown: 4800, Uptown: 3600, Westside: 4000 },
  { date: 'Fri', Downtown: 6800, Uptown: 4200, Westside: 5400 },
  { date: 'Sat', Downtown: 7200, Uptown: 4800, Westside: 6200 },
  { date: 'Sun', Downtown: 6400, Uptown: 3800, Westside: 5800 }
];

const itemPopularityData = [
  { name: 'Classic Burger', value: 540, fill: '#0088FE' },
  { name: 'Margherita Pizza', value: 480, fill: '#00C49F' },
  { name: 'Caesar Salad', value: 320, fill: '#FFBB28' },
  { name: 'Chicken Wings', value: 290, fill: '#FF8042' },
  { name: 'Chocolate Cake', value: 240, fill: '#8884d8' }
];

const employeePerformanceData = [
  { name: 'John D.', orders: 345, avg_time: 12, rating: 4.8 },
  { name: 'Sara K.', orders: 290, avg_time: 14, rating: 4.7 },
  { name: 'Miguel R.', orders: 310, avg_time: 13, rating: 4.5 },
  { name: 'Emily C.', orders: 380, avg_time: 11, rating: 4.9 },
  { name: 'David L.', orders: 260, avg_time: 15, rating: 4.6 }
];

const branchPerformance = [
  { name: 'Downtown', value: 34800, fill: '#0088FE' },
  { name: 'Uptown', value: 23800, fill: '#00C49F' },
  { name: 'Westside', value: 33000, fill: '#FFBB28' }
];

const revenueByTimeData = [
  { time: '9-11', revenue: 1200 },
  { time: '11-13', revenue: 2400 },
  { time: '13-15', revenue: 1800 },
  { time: '15-17', revenue: 1600 },
  { time: '17-19', revenue: 2800 },
  { time: '19-21', revenue: 3200 },
  { time: '21-23', revenue: 1800 }
];

export default function RestaurantReportsPage() {
  const [dateRange, setDateRange] = useState("week");
  const [reportType, setReportType] = useState("sales");
  const [branch, setBranch] = useState("all");
  
  const handleExport = (format: string) => {
    toast.success(`Report exported in ${format.toUpperCase()} format`);
  };
  
  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Reports</h1>
            <p className="text-muted-foreground">
              View detailed analytics and reports for your restaurant
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="hover-scale" onClick={() => handleExport('pdf')}>
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" className="hover-scale" onClick={() => handleExport('csv')}>
              <FileDown className="mr-2 h-4 w-4" />
              CSV
            </Button>
            <Button className="hover-scale">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Reports
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 pb-2">
              <CardTitle>Report Controls</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="uptown">Uptown</SelectItem>
                    <SelectItem value="westside">Westside</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Tabs value={reportType} onValueChange={setReportType} className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-4">
            <TabsTrigger value="sales" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              <span>Sales</span>
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Menu Items</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Employees</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              <span>Inventory</span>
            </TabsTrigger>
          </TabsList>

          {/* Sales Report */}
          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$91,600</div>
                  <p className="text-xs text-muted-foreground">
                    +12.5% from last week
                  </p>
                  <div className="mt-4">
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">82% of quarterly target</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,483</div>
                  <p className="text-xs text-muted-foreground">
                    +8.2% from last week
                  </p>
                  <div className="mt-4">
                    <Progress value={74} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">74% of quarterly target</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$61.77</div>
                  <p className="text-xs text-muted-foreground">
                    +3.8% from last week
                  </p>
                  <div className="mt-4">
                    <Progress value={92} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">92% of target AOV</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.7/5.0</div>
                  <p className="text-xs text-muted-foreground">
                    +0.2 from last week
                  </p>
                  <div className="mt-4">
                    <Progress value={94} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Based on 382 reviews</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales by Branch</CardTitle>
                  <CardDescription>Weekly sales comparison across all branches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Legend />
                        <Bar dataKey="Downtown" fill="#0088FE" />
                        <Bar dataKey="Uptown" fill="#00C49F" />
                        <Bar dataKey="Westside" fill="#FFBB28" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Branch</CardTitle>
                  <CardDescription>Total revenue distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <RechartPieChart>
                        <Pie
                          data={branchPerformance}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {branchPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      </RechartPieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-4 mt-2">
                      {branchPerformance.map((entry, index) => (
                        <div key={index} className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: entry.fill }}
                          />
                          <span className="text-sm">{entry.name}: ${entry.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Time of Day</CardTitle>
                <CardDescription>Hourly revenue distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueByTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Items Reports */}
          <TabsContent value="items" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Items</CardTitle>
                  <CardDescription>Based on order frequency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={itemPopularityData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {itemPopularityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} orders`, 'Count']} />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Item Performance</CardTitle>
                  <CardDescription>Top selling items by quantity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={itemPopularityData}
                        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip formatter={(value) => [`${value} orders`, 'Quantity']} />
                        <Bar dataKey="value" fill="hsl(var(--primary))">
                          {itemPopularityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Menu Category Analysis</CardTitle>
                <CardDescription>Performance by menu category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
                    <div>
                      <h4 className="font-medium">Main Course</h4>
                      <p className="text-muted-foreground text-sm">38% of total sales</p>
                    </div>
                    <div className="w-full sm:w-[40%] mt-2 sm:mt-0">
                      <Progress value={76} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-muted-foreground">$35,600 revenue</span>
                        <span>586 orders</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
                    <div>
                      <h4 className="font-medium">Appetizers</h4>
                      <p className="text-muted-foreground text-sm">24% of total sales</p>
                    </div>
                    <div className="w-full sm:w-[40%] mt-2 sm:mt-0">
                      <Progress value={48} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-muted-foreground">$21,984 revenue</span>
                        <span>412 orders</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-2">
                    <div>
                      <h4 className="font-medium">Desserts</h4>
                      <p className="text-muted-foreground text-sm">15% of total sales</p>
                    </div>
                    <div className="w-full sm:w-[40%] mt-2 sm:mt-0">
                      <Progress value={30} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-muted-foreground">$13,740 revenue</span>
                        <span>295 orders</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium">Beverages</h4>
                      <p className="text-muted-foreground text-sm">23% of total sales</p>
                    </div>
                    <div className="w-full sm:w-[40%] mt-2 sm:mt-0">
                      <Progress value={46} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs">
                        <span className="text-muted-foreground">$21,068 revenue</span>
                        <span>652 orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employees Report */}
          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Employee Performance</CardTitle>
                <CardDescription>Staff metrics based on order handling and customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Employee</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Orders</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Avg. Time (min)</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Rating</th>
                        <th className="py-3 px-4 text-center font-medium text-muted-foreground">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeePerformanceData.map((employee, index) => (
                        <tr key={index} className="border-t hover:bg-muted/50">
                          <td className="py-3 px-4">{employee.name}</td>
                          <td className="py-3 px-4">{employee.orders}</td>
                          <td className="py-3 px-4">{employee.avg_time} min</td>
                          <td className="py-3 px-4">{employee.rating}/5.0</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center">
                              <Progress 
                                value={employee.rating * 20} 
                                className="h-2 w-24"
                                indicatorClassName={
                                  employee.rating >= 4.5 ? "bg-green-500" : 
                                  employee.rating >= 4.0 ? "bg-yellow-500" : "bg-red-500"
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Labor Cost vs Revenue</CardTitle>
                  <CardDescription>Staff costs as percentage of revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name="Revenue" dataKey="Downtown" fill="#0088FE" />
                        <Bar name="Labor Cost" dataKey="Westside" fill="#FFBB28" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Staff Efficiency Score</CardTitle>
                  <CardDescription>Branch comparison</CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-[#0088FE]"></div>
                          <span className="font-medium">Downtown</span>
                        </div>
                        <span className="font-bold">92%</span>
                      </div>
                      <Progress value={92} className="h-2 mt-2" indicatorClassName="bg-[#0088FE]" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-[#00C49F]"></div>
                          <span className="font-medium">Uptown</span>
                        </div>
                        <span className="font-bold">86%</span>
                      </div>
                      <Progress value={86} className="h-2 mt-2" indicatorClassName="bg-[#00C49F]" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full bg-[#FFBB28]"></div>
                          <span className="font-medium">Westside</span>
                        </div>
                        <span className="font-bold">78%</span>
                      </div>
                      <Progress value={78} className="h-2 mt-2" indicatorClassName="bg-[#FFBB28]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Inventory Report */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    <AlertCircle className="inline h-3 w-3 mr-1" />
                    4 items need immediate restocking
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,850</div>
                  <p className="text-xs text-muted-foreground">
                    +$2,480 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Spoilage Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$642</div>
                  <p className="text-xs text-muted-foreground">
                    -$128 from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Food Cost %</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28.4%</div>
                  <p className="text-xs text-muted-foreground">
                    -0.8% from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Most Used Ingredients</CardTitle>
                <CardDescription>Usage volume by weight/units</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={[
                        { name: 'Chicken Breast', value: 120, unit: 'kg' },
                        { name: 'Tomatoes', value: 95, unit: 'kg' },
                        { name: 'Burger Patties', value: 86, unit: 'kg' },
                        { name: 'Lettuce', value: 72, unit: 'kg' },
                        { name: 'Cheese', value: 68, unit: 'kg' }
                      ]}
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value, name, props) => [`${value} ${props.payload.unit}`, 'Quantity']} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}
