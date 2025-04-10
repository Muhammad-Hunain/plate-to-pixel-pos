
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, ResponsiveContainer, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell 
} from "recharts";
import { 
  MapPin, Users, ShoppingBag, Clock, AlertTriangle,
  Plus, Edit, Trash2, BarChart3, Calendar, Clock8, ChefHat,
  Package, DollarSign, TrendingUp, Bell, Eye, ArrowUpRight, Settings
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Sample branch data
const branches = [
  {
    id: 1,
    name: "Downtown Branch",
    address: "123 Main St, Downtown",
    manager: "John Smith",
    contact: "+1 (555) 123-4567",
    status: "active",
    openHours: "8:00 AM - 10:00 PM",
    employees: 24,
    todayOrders: 142,
    todayRevenue: 3245.75,
    lowStockItems: 5,
  },
  {
    id: 2,
    name: "Uptown Branch",
    address: "456 High St, Uptown",
    manager: "Emily Johnson",
    contact: "+1 (555) 987-6543",
    status: "active",
    openHours: "9:00 AM - 11:00 PM",
    employees: 18,
    todayOrders: 98,
    todayRevenue: 2187.50,
    lowStockItems: 3,
  },
  {
    id: 3,
    name: "Westside Branch",
    address: "789 West Blvd, Westside",
    manager: "Michael Chen",
    contact: "+1 (555) 456-7890",
    status: "active",
    openHours: "10:00 AM - 9:00 PM",
    employees: 15,
    todayOrders: 75,
    todayRevenue: 1823.25,
    lowStockItems: 8,
  },
  {
    id: 4,
    name: "Eastside Branch",
    address: "321 East Ave, Eastside",
    manager: "Sarah Rodriguez",
    contact: "+1 (555) 789-0123",
    status: "maintenance",
    openHours: "Closed for renovation",
    employees: 0,
    todayOrders: 0,
    todayRevenue: 0,
    lowStockItems: 0,
  },
  {
    id: 5,
    name: "Northside Branch",
    address: "654 North Rd, Northside",
    manager: "David Kim",
    contact: "+1 (555) 321-6547",
    status: "active",
    openHours: "8:30 AM - 10:30 PM",
    employees: 21,
    todayOrders: 112,
    todayRevenue: 2756.80,
    lowStockItems: 2,
  },
];

// Sample performance data for charts
const performanceData = [
  { name: "Mon", downtown: 2400, uptown: 1800, westside: 1600, northside: 2200 },
  { name: "Tue", downtown: 1800, uptown: 1600, westside: 1400, northside: 2000 },
  { name: "Wed", downtown: 2800, uptown: 2200, westside: 1800, northside: 2400 },
  { name: "Thu", downtown: 3600, uptown: 2800, westside: 2400, northside: 3000 },
  { name: "Fri", downtown: 4200, uptown: 3600, westside: 2800, northside: 3800 },
  { name: "Sat", downtown: 5000, uptown: 4200, westside: 3200, northside: 4400 },
  { name: "Sun", downtown: 4300, uptown: 3800, westside: 2600, northside: 3600 },
];

// Sample active orders data
const activeOrdersData = [
  { 
    id: "ORD-001", 
    branch: "Downtown Branch", 
    table: "Table 5", 
    items: 4, 
    status: "Preparing", 
    time: "10:15 AM", 
    total: "$52.50" 
  },
  { 
    id: "ORD-002", 
    branch: "Downtown Branch", 
    table: "Takeaway", 
    items: 2, 
    status: "Ready", 
    time: "10:20 AM", 
    total: "$27.25" 
  },
  { 
    id: "ORD-003", 
    branch: "Uptown Branch", 
    table: "Table 3", 
    items: 6, 
    status: "Served", 
    time: "10:05 AM", 
    total: "$68.75" 
  },
  { 
    id: "ORD-004", 
    branch: "Northside Branch", 
    table: "Table 7", 
    items: 3, 
    status: "New", 
    time: "10:25 AM", 
    total: "$41.30" 
  },
];

// Sample staff attendance data
const staffAttendanceData = [
  { id: 1, name: "John Smith", branch: "Downtown Branch", role: "Manager", status: "Present", checkIn: "08:45 AM" },
  { id: 2, name: "Sarah Lee", branch: "Downtown Branch", role: "Chef", status: "Present", checkIn: "09:00 AM" },
  { id: 3, name: "Mike Johnson", branch: "Uptown Branch", role: "Waiter", status: "Late", checkIn: "09:30 AM" },
  { id: 4, name: "Emily Davis", branch: "Westside Branch", role: "Cashier", status: "Present", checkIn: "08:50 AM" },
  { id: 5, name: "Robert Chen", branch: "Northside Branch", role: "Chef", status: "Absent", checkIn: "-" },
];

// Low stock items
const lowStockItems = [
  { id: 1, name: "Tomatoes", branch: "Downtown Branch", current: 5, minimum: 10 },
  { id: 2, name: "Chicken Breast", branch: "Downtown Branch", current: 3, minimum: 8 },
  { id: 3, name: "Olive Oil", branch: "Uptown Branch", current: 2, minimum: 5 },
  { id: 4, name: "Napkins", branch: "Westside Branch", current: 10, minimum: 25 },
  { id: 5, name: "Coffee Beans", branch: "Northside Branch", current: 4, minimum: 10 },
];

// Sales distribution
const salesDistribution = [
  { name: "Downtown", value: 35 },
  { name: "Uptown", value: 25 },
  { name: "Westside", value: 20 },
  { name: "Northside", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function BranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  
  const handleBranchSelect = (branchId: number) => {
    setSelectedBranch(branchId === selectedBranch ? null : branchId);
  };
  
  const filteredBranches = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-amber-100 text-amber-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddBranch = () => {
    toast.success("Navigate to add branch form");
  };

  const handleEditBranch = (id: number) => {
    toast.success(`Edit branch ${id}`);
  };

  const handleDeleteBranch = (id: number) => {
    toast.error(`Delete branch ${id}`);
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Branch Management</h1>
            <p className="text-muted-foreground">
              Monitor and manage all your restaurant branches
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleAddBranch} className="hover-scale">
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
          <div className="relative w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex gap-2 items-center">
            <DateRangePicker
              initialDateFrom={new Date()}
              initialDateTo={new Date()}
              className="w-full sm:w-auto"
            />
            <div className="border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Branch Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBranches.map((branch) => (
              <Card 
                key={branch.id} 
                className={`branch-card animate-fade-in hover-scale transition-all ${selectedBranch === branch.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => handleBranchSelect(branch.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{branch.name}</CardTitle>
                      <CardDescription>{branch.address}</CardDescription>
                    </div>
                    <div>
                      <Badge className={getStatusColor(branch.status)}>
                        {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Manager:</span>
                        <span className="font-medium">{branch.manager}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="font-medium">{branch.contact}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Hours:</span>
                        <span className="font-medium">{branch.openHours}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="flex flex-col items-center justify-center bg-primary/10 p-3 rounded-lg">
                        <Users className="h-5 w-5 text-primary mb-1" />
                        <span className="text-xs text-muted-foreground">Staff</span>
                        <span className="font-bold">{branch.employees}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-green-100/50 p-3 rounded-lg">
                        <ShoppingBag className="h-5 w-5 text-green-600 mb-1" />
                        <span className="text-xs text-muted-foreground">Orders</span>
                        <span className="font-bold">{branch.todayOrders}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-blue-100/50 p-3 rounded-lg">
                        <DollarSign className="h-5 w-5 text-blue-600 mb-1" />
                        <span className="text-xs text-muted-foreground">Revenue</span>
                        <span className="font-bold">${branch.todayRevenue.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-amber-100/50 p-3 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mb-1" />
                        <span className="text-xs text-muted-foreground">Low Stock</span>
                        <span className="font-bold">{branch.lowStockItems}</span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditBranch(branch.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Branch List View */}
        {viewMode === "list" && (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Branch Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Manager</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Staff</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Orders Today</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Revenue Today</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBranches.map((branch) => (
                      <tr key={branch.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm font-medium">
                          <div>
                            <div>{branch.name}</div>
                            <div className="text-xs text-muted-foreground">{branch.address}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{branch.manager}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className={getStatusColor(branch.status)}>
                            {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{branch.employees}</td>
                        <td className="px-4 py-3 text-sm">{branch.todayOrders}</td>
                        <td className="px-4 py-3 text-sm">${branch.todayRevenue.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditBranch(branch.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteBranch(branch.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Performance Analytics */}
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle>Branch Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="downtown" stroke="#0088FE" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uptown" stroke="#00C49F" />
                <Line type="monotone" dataKey="westside" stroke="#FFBB28" />
                <Line type="monotone" dataKey="northside" stroke="#FF8042" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Branch Details Tabs */}
        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle>Branch Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active-orders" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="active-orders">Active Orders</TabsTrigger>
                <TabsTrigger value="staff-attendance">Staff Attendance</TabsTrigger>
                <TabsTrigger value="inventory-alerts">Inventory Alerts</TabsTrigger>
                <TabsTrigger value="sales">Sales Distribution</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active-orders" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Branch</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Table</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Items</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeOrdersData.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                          <td className="px-4 py-3 text-sm">{order.branch}</td>
                          <td className="px-4 py-3 text-sm">{order.table}</td>
                          <td className="px-4 py-3 text-sm">{order.items} items</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge className={
                              order.status === "New" ? "bg-blue-100 text-blue-800" :
                              order.status === "Preparing" ? "bg-yellow-100 text-yellow-800" :
                              order.status === "Ready" ? "bg-green-100 text-green-800" :
                              "bg-gray-100 text-gray-800"
                            }>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{order.time}</td>
                          <td className="px-4 py-3 text-sm text-right">{order.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="staff-attendance" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Branch</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Check In</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffAttendanceData.map((staff) => (
                        <tr key={staff.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">{staff.name}</td>
                          <td className="px-4 py-3 text-sm">{staff.branch}</td>
                          <td className="px-4 py-3 text-sm">{staff.role}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge className={
                              staff.status === "Present" ? "bg-green-100 text-green-800" :
                              staff.status === "Late" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {staff.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{staff.checkIn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="inventory-alerts" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Item</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Branch</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Current Stock</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Minimum Required</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">{item.name}</td>
                          <td className="px-4 py-3 text-sm">{item.branch}</td>
                          <td className="px-4 py-3 text-sm">{item.current} units</td>
                          <td className="px-4 py-3 text-sm">{item.minimum} units</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge className={
                              item.current <= item.minimum * 0.3 ? "bg-red-100 text-red-800" :
                              item.current <= item.minimum * 0.7 ? "bg-yellow-100 text-yellow-800" :
                              "bg-amber-100 text-amber-800"
                            }>
                              {item.current <= item.minimum * 0.3 ? "Critical" :
                               item.current <= item.minimum * 0.7 ? "Low" : "Warning"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="sales" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={salesDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {salesDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Sales Summary</h3>
                    <div className="space-y-2">
                      {salesDistribution.map((branch, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            <span>{branch.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium">{branch.value}%</span>
                            <ArrowUpRight className="h-4 w-4 ml-1 text-green-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Branch Control Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="text-blue-600">
                          <Settings className="h-4 w-4 mr-1" />
                          Modify Hours
                        </Button>
                        <Button variant="outline" size="sm" className="text-purple-600">
                          <Users className="h-4 w-4 mr-1" />
                          Assign Staff
                        </Button>
                        <Button variant="outline" size="sm" className="text-orange-600">
                          <Package className="h-4 w-4 mr-1" />
                          Stock Transfer
                        </Button>
                        <Button variant="outline" size="sm" className="text-green-600">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Full Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="stat-card animate-fade-in hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Branches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{branches.length}</div>
              <div className="flex items-center text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>1 new in last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:100ms] hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <div className="flex items-center text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>5 new hires this month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:200ms] hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Daily Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">427</div>
              <div className="flex items-center text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>12% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card animate-fade-in [animation-delay:300ms] hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Operation Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.7%</div>
              <div className="flex items-center text-xs text-success mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>1.2% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RestaurantLayout>
  );
}
