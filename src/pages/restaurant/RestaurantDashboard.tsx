import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell, Utensils, DollarSign, ShoppingBag, TrendingUp, 
  User, ArrowUpRight, Clock, CreditCard, Calendar 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  BarChart, Bar, PieChart, Pie, Cell, Legend, CartesianGrid,
  Area, AreaChart
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const revenueData = [
  { name: "00:00", value: 1200 },
  { name: "03:00", value: 800 },
  { name: "06:00", value: 900 },
  { name: "09:00", value: 1600 },
  { name: "12:00", value: 2800 },
  { name: "15:00", value: 3200 },
  { name: "18:00", value: 4000 },
  { name: "21:00", value: 2700 },
];

const weeklyRevenueData = [
  { name: "Mon", revenue: 2400, orders: 35 },
  { name: "Tue", revenue: 1800, orders: 28 },
  { name: "Wed", revenue: 2800, orders: 42 },
  { name: "Thu", revenue: 3600, orders: 55 },
  { name: "Fri", revenue: 4200, orders: 68 },
  { name: "Sat", revenue: 5000, orders: 82 },
  { name: "Sun", revenue: 4300, orders: 74 },
];

const orderData = [
  {
    id: 1,
    table: "Table 5",
    items: 4,
    status: "Ready",
    time: "5 mins ago",
    total: "$52.50",
  },
  {
    id: 2,
    table: "Table 12",
    items: 2,
    status: "Preparing",
    time: "3 mins ago",
    total: "$27.00",
  },
  {
    id: 3,
    table: "Takeaway",
    items: 6,
    status: "New",
    time: "Just now",
    total: "$68.25",
  },
  {
    id: 4,
    table: "Table 8",
    items: 3,
    status: "Served",
    time: "12 mins ago",
    total: "$43.75",
  },
];

const popularItems = [
  { name: "Classic Burger", sold: 43, amount: "$473" },
  { name: "Caesar Salad", sold: 38, amount: "$342" },
  { name: "Margherita Pizza", sold: 35, amount: "$455" },
  { name: "Grilled Chicken", sold: 29, amount: "$406" },
];

const paymentMethodData = [
  { name: "Cash", value: 35 },
  { name: "Credit Card", value: 45 },
  { name: "Mobile Wallet", value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function RestaurantDashboard() {
  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Restaurant Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your restaurant today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button size="sm" className="h-9">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Open POS
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="stat-card animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,248.50</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>15% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Orders
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>8% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:200ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Customers
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>12% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:300ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Order
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$29.72</div>
              <div className="flex items-center text-xs text-success mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>$2.14 from yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Card className="md:col-span-8 chart-container animate-slide-in">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Weekly Revenue & Orders</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ChartContainer config={{
                revenue: { label: "Revenue" },
                orders: { label: "Orders" }
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyRevenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Revenue" />
                    <Bar dataKey="orders" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4 chart-container animate-slide-in [animation-delay:100ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
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
          <Card className="md:col-span-7 chart-container animate-slide-in [animation-delay:150ms]">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold">Daily Revenue</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1}
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                    name="Revenue"
                    activeDot={{ r: 6 }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-5 animate-slide-in [animation-delay:200ms]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Popular Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {popularItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Utensils className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.sold} sold
                      </div>
                    </div>
                    <div className="font-medium">{item.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-slide-in [animation-delay:250ms]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Live Orders</CardTitle>
            <Button size="sm" variant="outline" className="h-8">
              <Clock className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="table-responsive-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground d-none d-sm-table-cell">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground d-none d-md-table-cell">Time</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3 text-sm font-medium">{order.table}</td>
                      <td className="px-4 py-3 text-sm">{order.items} items</td>
                      <td className="px-4 py-3 text-sm d-none d-sm-table-cell">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${order.status === "Ready" ? "bg-green-100 text-green-800" : ""}
                          ${order.status === "Preparing" ? "bg-yellow-100 text-yellow-800" : ""}
                          ${order.status === "New" ? "bg-blue-100 text-blue-800" : ""}
                          ${order.status === "Served" ? "bg-gray-100 text-gray-800" : ""}
                        `}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground d-none d-md-table-cell">{order.time}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="data-card animate-slide-in [animation-delay:300ms]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Upcoming Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, name: "Sarah Johnson", time: "18:30", guests: 4, table: "Table 7" },
                  { id: 2, name: "Michael Smith", time: "19:00", guests: 2, table: "Table 3" },
                  { id: 3, name: "Emma Davis", time: "20:15", guests: 6, table: "Table 12" },
                ].map((reservation) => (
                  <div key={reservation.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{reservation.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {reservation.guests} guests · {reservation.table}
                      </div>
                    </div>
                    <div className="font-medium">{reservation.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="data-card animate-slide-in [animation-delay:350ms]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, method: "Visa ending in 4242", amount: "$78.50", time: "5 mins ago" },
                  { id: 2, method: "Cash", amount: "$42.25", time: "15 mins ago" },
                  { id: 3, method: "Apple Pay", amount: "$31.75", time: "32 mins ago" },
                ].map((payment) => (
                  <div key={payment.id} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{payment.method}</div>
                      <div className="text-sm text-muted-foreground">
                        {payment.time}
                      </div>
                    </div>
                    <div className="font-medium">{payment.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RestaurantLayout>
  );
}
