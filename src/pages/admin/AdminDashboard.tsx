
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import charts and components
import SalesPerformanceChart from "@/components/dashboard/SalesPerformanceChart";
import UserActivityMap from "@/components/dashboard/UserActivityMap";
import RealtimeActivityFeed from "@/components/dashboard/RealtimeActivityFeed";

import { 
  Building2, DollarSign, TrendingUp, Users, 
  ArrowUpRight, ChevronRight, Store, Wallet,
  Clock, Globe, CircleUser, Percent,
  BarChart3, Activity, Target, CreditCard
} from "lucide-react";

import { 
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, Legend
} from "recharts";

// Monthly growth data
const growthData = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 18 },
  { name: "Apr", value: 25 },
  { name: "May", value: 32 },
  { name: "Jun", value: 35 },
  { name: "Jul", value: 43 },
];

// Subscription data
const subscriptionData = [
  { name: "Basic", value: 12 },
  { name: "Standard", value: 8 },
  { name: "Premium", value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Restaurant location data by region
const locationData = [
  { name: "North", value: 35 },
  { name: "South", value: 28 },
  { name: "East", value: 18 },
  { name: "West", value: 22 },
  { name: "Central", value: 25 },
];

const restaurantData = [
  { id: 1, name: "The Great Kitchen", plan: "Premium", status: "Active", revenue: "$4,321" },
  { id: 2, name: "Pizza Paradise", plan: "Basic", status: "Active", revenue: "$2,150" },
  { id: 3, name: "Sushi Express", plan: "Standard", status: "Active", revenue: "$3,275" },
  { id: 4, name: "Burger Zone", plan: "Premium", status: "Active", revenue: "$5,175" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Platform overview and performance metrics
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm">
              <Globe className="mr-2 h-4 w-4" />
              All Regions
            </Button>
            <Button size="sm">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="stat-card animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Restaurants
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+4 from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89,432</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:200ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">314</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+22 from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:300ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Growth
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+2.1% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="stat-card animate-fade-in [animation-delay:400ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Subscriptions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+3 from last month</span>
              </div>
              <div className="mt-3">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '89%' }}></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">89% retention rate</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:500ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Customer Satisfaction
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7/5</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+0.2 from last month</span>
              </div>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-4 w-4 ${star <= 4 ? "text-yellow-400" : "text-yellow-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:600ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Order Value
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$32.47</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+$2.14 from last month</span>
              </div>
              <div className="mt-3 h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: "Mon", value: 28 },
                    { day: "Tue", value: 30 },
                    { day: "Wed", value: 29 },
                    { day: "Thu", value: 34 },
                    { day: "Fri", value: 38 },
                    { day: "Sat", value: 35 },
                    { day: "Sun", value: 32 },
                  ]}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:700ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Platform Uptime
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.98%</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+0.01% from last month</span>
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1">
                {[99.9, 100, 100, 99.8, 100, 100, 100].map((day, i) => (
                  <div key={i} className="h-6 rounded-sm flex items-end">
                    <div 
                      className={`w-full ${day === 100 ? 'bg-emerald-500' : 'bg-amber-400'}`} 
                      style={{ height: `${day}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground mt-1 text-center">Last 7 days</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Section */}
        <div className="grid gap-6 md:grid-cols-12">
          <SalesPerformanceChart />
          
          <Card className="col-span-12 md:col-span-4 chart-container animate-slide-in [animation-delay:100ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Subscription Plans</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, value}) => `${name}: ${value}`}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {subscriptionData.map((plan, i) => (
                  <Card key={i}>
                    <CardContent className="p-2 text-center">
                      <div className="text-xs text-muted-foreground">{plan.name}</div>
                      <div className="font-bold">{plan.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Section */}
        <div className="grid gap-6 md:grid-cols-12">
          <UserActivityMap />
          <RealtimeActivityFeed />
        </div>
        
        <div className="grid gap-6 md:grid-cols-12">
          <Card className="col-span-12 md:col-span-7 animate-slide-in [animation-delay:300ms]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Top Performing Restaurants</CardTitle>
              <Button size="sm" variant="outline" className="h-8">
                <CircleUser className="h-4 w-4 mr-2" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Restaurant</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Plan</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurantData.map((restaurant) => (
                      <tr key={restaurant.id} className="border-b">
                        <td className="px-4 py-3 text-sm">{restaurant.name}</td>
                        <td className="px-4 py-3 text-sm">{restaurant.plan}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {restaurant.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium">{restaurant.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-12 md:col-span-5 animate-slide-in [animation-delay:350ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Restaurant Growth</CardTitle>
              <CardDescription>New restaurant registrations over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={growthData}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]} 
                    name="Restaurants" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="data-card animate-slide-in [animation-delay:350ms]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recently Added Restaurants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, name: "Green Bistro", date: "2 days ago", location: "New York, NY" },
                  { id: 2, name: "Thai Delight", date: "3 days ago", location: "Chicago, IL" },
                  { id: 3, name: "Ocean Breeze", date: "5 days ago", location: "Miami, FL" },
                ].map((restaurant) => (
                  <div key={restaurant.id} className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium">{restaurant.name}</p>
                      <p className="text-sm text-muted-foreground">{restaurant.location}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{restaurant.date}</p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-between" size="sm">
                  View all restaurants
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="data-card animate-slide-in [animation-delay:400ms]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, restaurant: "Burger Zone", amount: "$215.00", date: "Today" },
                  { id: 2, restaurant: "Pizza Paradise", amount: "$189.50", date: "Yesterday" },
                  { id: 3, restaurant: "Sushi Express", amount: "$142.75", date: "3 days ago" },
                ].map((payment) => (
                  <div key={payment.id} className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium">{payment.restaurant}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                    <p className="font-medium">{payment.amount}</p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-between" size="sm">
                  View all payments
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="data-card animate-slide-in [animation-delay:450ms]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Subscription Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, restaurant: "The Great Kitchen", action: "Upgraded to Premium", date: "Today" },
                  { id: 2, restaurant: "Cafe Mocha", action: "Renewed Standard plan", date: "2 days ago" },
                  { id: 3, restaurant: "Noodle House", action: "New Basic subscription", date: "4 days ago" },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <Percent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium">{activity.restaurant}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-between" size="sm">
                  View all activity
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
