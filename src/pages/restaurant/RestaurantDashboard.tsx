
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bell, Utensils, DollarSign, ShoppingBag, TrendingUp, 
  User, ArrowUpRight, Clock, CreditCard, Calendar, ChefHat,
  Package, FileBarChart, AlertTriangle, TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
  BarChart, Bar, PieChart, Pie, Cell, Legend, CartesianGrid,
  Area, AreaChart
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useState } from "react";
import SalesPerformanceChart from "@/components/dashboard/SalesPerformanceChart";
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";

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

// Popular items data
const popularItems = [
  { name: "Classic Burger", sold: 43, amount: "$473" },
  { name: "Caesar Salad", sold: 38, amount: "$342" },
  { name: "Margherita Pizza", sold: 35, amount: "$455" },
  { name: "Grilled Chicken", sold: 29, amount: "$406" },
];

// Payment method data
const paymentMethodData = [
  { name: "Cash", value: 35 },
  { name: "Credit Card", value: 45 },
  { name: "Mobile Wallet", value: 20 },
];

// Inventory stats data
const inventoryStatsData = [
  { name: "Low Stock Items", value: 12, icon: <AlertTriangle className="h-5 w-5 text-amber-500" />, trend: { value: "+3", positive: false } },
  { name: "Out of Stock", value: 5, icon: <Package className="h-5 w-5 text-red-500" />, trend: { value: "+2", positive: false } },
  { name: "Total Items", value: 248, icon: <FileBarChart className="h-5 w-5 text-blue-500" />, trend: { value: "+12", positive: true } },
];

// Staff performance data
const staffPerformanceData = [
  { name: "Chef Johnson", role: "Head Chef", ordersCompleted: 68, avgPrepTime: "12 min", rating: 4.9 },
  { name: "Maria Garcia", role: "Sous Chef", ordersCompleted: 54, avgPrepTime: "14 min", rating: 4.7 },
  { name: "Sam Williams", role: "Line Cook", ordersCompleted: 46, avgPrepTime: "15 min", rating: 4.5 },
];

// Table turnover data
const tableUsageData = [
  { name: "Table 1", capacity: 2, turnovers: 8, avgDuration: "45 min" },
  { name: "Table 5", capacity: 4, turnovers: 6, avgDuration: "75 min" },
  { name: "Table 8", capacity: 6, turnovers: 4, avgDuration: "95 min" },
  { name: "Table 12", capacity: 8, turnovers: 3, avgDuration: "120 min" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Animation variants for framer motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function RestaurantDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedStatsCard
            title="Today's Revenue"
            value="$1,248.50"
            icon={<DollarSign />}
            description="15% from yesterday"
            trend={{ value: "15%", positive: true }}
            delay={0}
          />
          
          <AnimatedStatsCard
            title="Orders"
            value="42"
            icon={<ShoppingBag />}
            description="8% from yesterday"
            trend={{ value: "8%", positive: true }}
            delay={1}
          />
          
          <AnimatedStatsCard
            title="Customers"
            value="124"
            icon={<User />}
            description="12% from yesterday"
            trend={{ value: "12%", positive: true }}
            delay={2}
          />
          
          <AnimatedStatsCard
            title="Average Order"
            value="$29.72"
            icon={<TrendingUp />}
            description="$2.14 from yesterday"
            trend={{ value: "$2.14", positive: true }}
            delay={3}
          />
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:col-span-8">
            <AnimatedDashboardCard
              title="Weekly Revenue & Orders"
              delay={0}
            >
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
            </AnimatedDashboardCard>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-4">
            <AnimatedDashboardCard
              title="Payment Methods"
              delay={1}
            >
              <ResponsiveContainer width="100%" height={300}>
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
            </AnimatedDashboardCard>
          </motion.div>
        </motion.div>

        <SalesPerformanceChart />

        <motion.div
          className="grid gap-6 md:grid-cols-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:col-span-7">
            <AnimatedDashboardCard
              title="Daily Revenue"
              delay={0}
            >
              <ResponsiveContainer width="100%" height={300}>
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
            </AnimatedDashboardCard>
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-5">
            <AnimatedDashboardCard
              title="Popular Items"
              delay={1}
            >
              <div className="space-y-5">
                {popularItems.map((item, index) => (
                  <motion.div 
                    key={item.name} 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
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
                  </motion.div>
                ))}
              </div>
            </AnimatedDashboardCard>
          </motion.div>
        </motion.div>
        
        {/* Inventory Stats Cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {inventoryStatsData.map((item, index) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Card className="inventory-card">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  {item.trend && (
                    <div 
                      className={`flex items-center text-xs mt-1 ${
                        item.trend.positive ? "text-success" : "text-destructive"
                      }`}
                    >
                      {item.trend.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      <span>{item.trend.value} from yesterday</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedDashboardCard
          title="Live Orders"
          delay={2}
          rightHeader={
            <Button size="sm" variant="outline" className="h-8">
              <Clock className="h-4 w-4 mr-2" />
              View All
            </Button>
          }
        >
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
                {orderData.map((order, index) => (
                  <motion.tr 
                    key={order.id} 
                    className="border-b"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
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
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedDashboardCard>

        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <AnimatedDashboardCard
              title="Table Turnover"
              delay={3}
            >
              <div className="space-y-4">
                {tableUsageData.map((table, index) => (
                  <motion.div 
                    key={table.name} 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{table.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Capacity: {table.capacity} • {table.turnovers} turnovers
                      </div>
                    </div>
                    <div className="font-medium">{table.avgDuration}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedDashboardCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatedDashboardCard
              title="Staff Performance"
              delay={4}
            >
              <div className="space-y-4">
                {staffPerformanceData.map((staff, index) => (
                  <motion.div 
                    key={staff.name} 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                      <ChefHat className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{staff.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {staff.role} • {staff.ordersCompleted} orders
                      </div>
                    </div>
                    <div className="font-medium">{staff.rating}★</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedDashboardCard>
          </motion.div>
        </motion.div>
      </div>
    </RestaurantLayout>
  );
}
