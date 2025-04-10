
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart, Legend
} from "recharts";
import { 
  Building2, DollarSign, TrendingUp, Users, 
  ArrowUpRight, ChevronRight, Store, Wallet,
  Clock, Globe, CircleUser, Percent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

// Revenue by month
const revenueData = [
  { name: "Jan", revenue: 15400 },
  { name: "Feb", revenue: 18200 },
  { name: "Mar", revenue: 21000 },
  { name: "Apr", revenue: 25500 },
  { name: "May", revenue: 27800 },
  { name: "Jun", revenue: 31200 },
  { name: "Jul", revenue: 34600 },
];

// Active users data
const activeUsersData = [
  { name: "Jan", users: 120 },
  { name: "Feb", users: 145 },
  { name: "Mar", users: 162 },
  { name: "Apr", users: 197 },
  { name: "May", users: 235 },
  { name: "Jun", users: 284 },
  { name: "Jul", users: 314 },
];

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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Last 30 Days
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

        <div className="grid gap-6 md:grid-cols-12">
          <Card className="col-span-12 md:col-span-8 chart-container animate-slide-in">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer config={{
                revenue: { label: "Total Revenue" }
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1}
                      fill="url(#colorRevenue)" 
                      strokeWidth={2}
                      name="Revenue" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-12 md:col-span-4 chart-container animate-slide-in [animation-delay:100ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Subscription Plans</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height="100%">
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
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Card className="col-span-12 md:col-span-6 chart-container animate-slide-in [animation-delay:150ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Restaurant Growth</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height="100%">
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
          
          <Card className="col-span-12 md:col-span-6 chart-container animate-slide-in [animation-delay:200ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activeUsersData}>
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    dot={{ fill: "hsl(var(--primary))" }}
                    name="Users" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Card className="col-span-12 md:col-span-5 chart-container animate-slide-in [animation-delay:250ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Restaurants by Location</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={locationData} margin={{ top: 5, right: 30, bottom: 5, left: 20 }}>
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--secondary))" name="Restaurants" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
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
