
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Utensils, DollarSign, ShoppingBag, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Sample data for charts
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

// Popular items data
const popularItems = [
  { name: "Classic Burger", sold: 43, amount: "$473" },
  { name: "Caesar Salad", sold: 38, amount: "$342" },
  { name: "Margherita Pizza", sold: 35, amount: "$455" },
  { name: "Grilled Chicken", sold: 29, amount: "$406" },
];

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
              <p className="text-xs text-muted-foreground">
                +15% from yesterday
              </p>
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
              <p className="text-xs text-muted-foreground">
                +8% from yesterday
              </p>
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
              <p className="text-xs text-muted-foreground">
                +12% from yesterday
              </p>
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
              <p className="text-xs text-muted-foreground">
                +$2.14 from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4 animate-slide-in">
            <CardHeader>
              <CardTitle>Daily Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    name="Revenue" 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3 animate-slide-in [animation-delay:100ms]">
            <CardHeader>
              <CardTitle>Popular Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularItems.map((item) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Utensils className="h-4 w-4 text-primary" />
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

        <Card className="animate-slide-in [animation-delay:200ms]">
          <CardHeader>
            <CardTitle>Live Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3 text-sm font-medium">{order.table}</td>
                      <td className="px-4 py-3 text-sm">{order.items} items</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${order.status === "Ready" ? "bg-green-100 text-green-800" : ""}
                          ${order.status === "Preparing" ? "bg-yellow-100 text-yellow-800" : ""}
                          ${order.status === "New" ? "bg-blue-100 text-blue-800" : ""}
                          ${order.status === "Served" ? "bg-gray-100 text-gray-800" : ""}
                        `}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{order.time}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
