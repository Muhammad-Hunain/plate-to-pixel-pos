
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, Download, Filter, MoreHorizontal, Plus, Search,
  Clock, CheckCircle, AlertCircle, MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type Order = {
  id: string;
  customer: string;
  items: number;
  status: "completed" | "preparing" | "ready" | "cancelled";
  time: string;
  total: string;
  type: "dine-in" | "takeaway" | "delivery";
  table?: string;
};

const orders: Order[] = [
  { 
    id: "ORD-7652", 
    customer: "John Smith", 
    items: 4, 
    status: "completed", 
    time: "Today, 12:35 PM", 
    total: "$52.50", 
    type: "dine-in", 
    table: "Table 5" 
  },
  { 
    id: "ORD-7651", 
    customer: "Emma Johnson", 
    items: 2, 
    status: "ready", 
    time: "Today, 12:20 PM", 
    total: "$27.00", 
    type: "takeaway" 
  },
  { 
    id: "ORD-7650", 
    customer: "Michael Brown", 
    items: 6, 
    status: "preparing", 
    time: "Today, 12:15 PM", 
    total: "$68.25", 
    type: "delivery" 
  },
  { 
    id: "ORD-7649", 
    customer: "Sophia Miller", 
    items: 3, 
    status: "cancelled", 
    time: "Today, 11:55 AM", 
    total: "$43.75", 
    type: "dine-in", 
    table: "Table 8" 
  },
  { 
    id: "ORD-7648", 
    customer: "James Wilson", 
    items: 5, 
    status: "completed", 
    time: "Today, 11:40 AM", 
    total: "$62.30", 
    type: "dine-in", 
    table: "Table 3" 
  },
  { 
    id: "ORD-7647", 
    customer: "Olivia Jones", 
    items: 2, 
    status: "completed", 
    time: "Today, 11:25 AM", 
    total: "$29.50", 
    type: "takeaway" 
  },
  { 
    id: "ORD-7646", 
    customer: "William Garcia", 
    items: 7, 
    status: "completed", 
    time: "Today, 11:10 AM", 
    total: "$75.40", 
    type: "delivery" 
  },
  { 
    id: "ORD-7645", 
    customer: "Ava Martinez", 
    items: 3, 
    status: "completed", 
    time: "Today, 10:55 AM", 
    total: "$38.20", 
    type: "dine-in", 
    table: "Table 10" 
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter orders based on search query
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get status badge color
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case "preparing":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Preparing</Badge>;
      case "ready":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Ready</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  // Get order type icon
  const getOrderTypeIcon = (type: Order["type"]) => {
    switch (type) {
      case "dine-in":
        return <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20">Dine-in</Badge>;
      case "takeaway":
        return <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">Takeaway</Badge>;
      case "delivery":
        return <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Delivery</Badge>;
      default:
        return null;
    }
  };

  // Summary data
  const summaryData = {
    total: orders.length,
    completed: orders.filter(o => o.status === "completed").length,
    preparing: orders.filter(o => o.status === "preparing").length,
    ready: orders.filter(o => o.status === "ready").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };
  
  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              View and manage all your restaurant orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="h-9">
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <Card className="col-span-12 md:col-span-3 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{summaryData.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-12 md:col-span-3 animate-fade-in [animation-delay:100ms]">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{summaryData.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-12 md:col-span-3 animate-fade-in [animation-delay:200ms]">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{summaryData.preparing + summaryData.ready}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-12 md:col-span-3 animate-fade-in [animation-delay:300ms]">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Cancelled</p>
                  <p className="text-2xl font-bold">{summaryData.cancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="animate-slide-in">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg font-semibold">Order History</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search orders..." 
                    className="pl-8 w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                      <td className="px-4 py-3 text-sm">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          {order.type === "dine-in" && order.table && (
                            <p className="text-xs text-muted-foreground">{order.table}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{order.items} items</td>
                      <td className="px-4 py-3 text-sm">
                        {getOrderTypeIcon(order.type)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{order.time}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium">{order.total}</td>
                      <td className="px-4 py-3 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Update status</DropdownMenuItem>
                            <DropdownMenuItem>Print receipt</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Cancel order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
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
