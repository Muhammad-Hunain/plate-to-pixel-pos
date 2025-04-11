import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  FileDown,
  FileText,
  FileSpreadsheet,
  BarChart4,
  PieChart,
  LineChart,
  Utensils,
  Package,
  Bike,
  CreditCard,
  Banknote,
  Receipt,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Types for order report data
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  modifiers?: string[];
}

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone?: string;
    email?: string;
  };
  items: OrderItem[];
  total: number;
  status: "new" | "preparing" | "ready" | "completed" | "cancelled";
  type: "dine-in" | "takeaway" | "delivery";
  paymentMethod: "cash" | "card" | "online";
  paymentStatus: "paid" | "pending" | "refunded";
  table?: string;
  staff: string;
  branch: string;
  createdAt: string;
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: {
      name: "Alex Johnson",
      phone: "(555) 123-4567",
      email: "alex@example.com",
    },
    items: [
      { id: "item1", name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { id: "item2", name: "Caesar Salad", quantity: 1, price: 8.99 },
      { id: "item3", name: "Soft Drink", quantity: 2, price: 2.99 },
    ],
    total: 27.96,
    status: "completed",
    type: "dine-in",
    paymentMethod: "card",
    paymentStatus: "paid",
    table: "Table 5",
    staff: "Miguel Rodriguez",
    branch: "Downtown",
    createdAt: "2023-04-10T10:30:00",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: {
      name: "Samantha Lee",
      phone: "(555) 234-5678",
    },
    items: [
      { id: "item4", name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
      { id: "item5", name: "Garlic Bread", quantity: 1, price: 4.99 },
    ],
    total: 19.98,
    status: "completed",
    type: "takeaway",
    paymentMethod: "cash",
    paymentStatus: "paid",
    staff: "Sara Johnson",
    branch: "Downtown",
    createdAt: "2023-04-10T12:45:00",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: {
      name: "David Chen",
      phone: "(555) 345-6789",
      email: "david@example.com",
    },
    items: [
      { id: "item6", name: "Spaghetti Carbonara", quantity: 2, price: 15.99 },
      { id: "item7", name: "Tiramisu", quantity: 1, price: 7.99 },
      { id: "item8", name: "Sparkling Water", quantity: 2, price: 3.99 },
    ],
    total: 47.95,
    status: "completed",
    type: "delivery",
    paymentMethod: "online",
    paymentStatus: "paid",
    staff: "Emily Chang",
    branch: "Uptown",
    createdAt: "2023-04-10T13:15:00",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customer: {
      name: "Michael Brown",
      phone: "(555) 456-7890",
    },
    items: [
      { id: "item9", name: "Chicken Burger", quantity: 1, price: 11.99 },
      { id: "item10", name: "French Fries", quantity: 1, price: 4.99 },
      { id: "item11", name: "Milkshake", quantity: 1, price: 5.99 },
    ],
    total: 22.97,
    status: "completed",
    type: "dine-in",
    paymentMethod: "card",
    paymentStatus: "paid",
    table: "Table 2",
    staff: "John Doe",
    branch: "Downtown",
    createdAt: "2023-04-10T14:30:00",
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customer: {
      name: "Emma Wilson",
      phone: "(555) 567-8901",
      email: "emma@example.com",
    },
    items: [
      { id: "item12", name: "Veggie Bowl", quantity: 1, price: 13.99 },
      { id: "item13", name: "Fruit Smoothie", quantity: 1, price: 6.99 },
    ],
    total: 20.98,
    status: "cancelled",
    type: "takeaway",
    paymentMethod: "online",
    paymentStatus: "refunded",
    staff: "Sara Johnson",
    branch: "Uptown",
    createdAt: "2023-04-10T11:15:00",
  },
  // Additional orders over time for the report
  {
    id: "6",
    orderNumber: "ORD-006",
    customer: {
      name: "William Taylor",
      phone: "(555) 678-9012",
    },
    items: [
      { id: "item14", name: "BBQ Chicken Pizza", quantity: 1, price: 16.99 },
      { id: "item15", name: "Mozzarella Sticks", quantity: 1, price: 6.99 },
      { id: "item16", name: "Iced Tea", quantity: 2, price: 2.75 },
    ],
    total: 29.48,
    status: "completed",
    type: "takeaway",
    paymentMethod: "card",
    paymentStatus: "paid",
    staff: "Miguel Rodriguez",
    branch: "Downtown",
    createdAt: "2023-04-09T18:20:00",
  },
  {
    id: "7",
    orderNumber: "ORD-007",
    customer: {
      name: "Olivia Martinez",
      phone: "(555) 789-0123",
      email: "olivia@example.com",
    },
    items: [
      { id: "item17", name: "Greek Salad", quantity: 1, price: 9.50 },
      { id: "item18", name: "Falafel Wrap", quantity: 1, price: 8.99 },
      { id: "item19", name: "Sparkling Water", quantity: 1, price: 3.99 },
    ],
    total: 22.48,
    status: "completed",
    type: "dine-in",
    paymentMethod: "cash",
    paymentStatus: "paid",
    table: "Table 8",
    staff: "John Doe",
    branch: "Uptown",
    createdAt: "2023-04-11T12:10:00",
  },
  {
    id: "8",
    orderNumber: "ORD-008",
    customer: {
      name: "Ethan Jackson",
      phone: "(555) 890-1234",
    },
    items: [
      { id: "item20", name: "Veggie Supreme Pizza", quantity: 1, price: 14.99 },
      { id: "item21", name: "Chocolate Cake", quantity: 1, price: 6.50 },
      { id: "item22", name: "Cola", quantity: 2, price: 2.50 },
    ],
    total: 26.49,
    status: "completed",
    type: "delivery",
    paymentMethod: "online",
    paymentStatus: "paid",
    staff: "Emily Chang",
    branch: "Downtown",
    createdAt: "2023-04-12T19:45:00",
  },
];

export default function OrderReportPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  // Filter orders based on search term, active tab, and date range
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      searchTerm === "" ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer.phone && order.customer.phone.includes(searchTerm)) ||
      (order.customer.email && order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTab =
      activeTab === "all" || 
      (activeTab === "dine-in" && order.type === "dine-in") ||
      (activeTab === "takeaway" && order.type === "takeaway") ||
      (activeTab === "delivery" && order.type === "delivery");

    const orderDate = new Date(order.createdAt);
    const matchesDateRange =
      !date ||
      !date.from ||
      (date.from && orderDate >= date.from && (!date.to || orderDate <= date.to));

    return matchesSearch && matchesTab && matchesDateRange;
  });

  // Calculate summary statistics
  const totalSales = filteredOrders.reduce((total, order) => 
    order.status !== "cancelled" ? total + order.total : total, 0);
    
  const ordersByType = {
    dineIn: filteredOrders.filter(o => o.type === "dine-in").length,
    takeaway: filteredOrders.filter(o => o.type === "takeaway").length,
    delivery: filteredOrders.filter(o => o.type === "delivery").length,
  };
  
  const ordersByPayment = {
    cash: filteredOrders.filter(o => o.paymentMethod === "cash").length,
    card: filteredOrders.filter(o => o.paymentMethod === "card").length,
    online: filteredOrders.filter(o => o.paymentMethod === "online").length,
  };

  // Function to handle exporting as PDF
  const handleExportPDF = () => {
    toast.success("Exporting report as PDF...");
    // Implementation would connect to a PDF generation library
  };

  // Function to handle exporting as CSV
  const handleExportCSV = () => {
    toast.success("Exporting report as CSV...");
    // Implementation would generate and download a CSV file
  };

  // Helper function to get order type icon
  const getOrderTypeIcon = (type: Order["type"]) => {
    switch (type) {
      case "dine-in":
        return <Utensils className="h-4 w-4" />;
      case "takeaway":
        return <Package className="h-4 w-4" />;
      case "delivery":
        return <Bike className="h-4 w-4" />;
    }
  };

  // Helper function to get payment method icon
  const getPaymentMethodIcon = (method: Order["paymentMethod"]) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "cash":
        return <Banknote className="h-4 w-4" />;
      case "online":
        return <Receipt className="h-4 w-4" />;
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order Reports</h1>
            <p className="text-muted-foreground">
              Detailed analysis of order history and performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="hover-scale">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    "Date Range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(selectedDate) => setDate(selectedDate)}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hover-scale">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportPDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportCSV}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                During the selected period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                From {filteredOrders.filter(o => o.status !== "cancelled").length} completed orders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${(totalSales / filteredOrders.filter(o => o.status !== "cancelled").length || 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Per completed order
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Utensils className="h-4 w-4 mr-2 text-primary" />
                      <span>Dine-in</span>
                    </div>
                    <span>{ordersByType.dineIn} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-primary rounded-full" 
                      style={{ width: `${(ordersByType.dineIn / filteredOrders.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-amber-500" />
                      <span>Takeaway</span>
                    </div>
                    <span>{ordersByType.takeaway} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-amber-500 rounded-full" 
                      style={{ width: `${(ordersByType.takeaway / filteredOrders.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bike className="h-4 w-4 mr-2 text-green-500" />
                      <span>Delivery</span>
                    </div>
                    <span>{ordersByType.delivery} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-green-500 rounded-full" 
                      style={{ width: `${(ordersByType.delivery / filteredOrders.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Payment Method Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Banknote className="h-4 w-4 mr-2 text-green-500" />
                      <span>Cash</span>
                    </div>
                    <span>{ordersByPayment.cash} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-green-500 rounded-full" 
                      style={{ width: `${(ordersByPayment.cash / filteredOrders.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Card</span>
                    </div>
                    <span>{ordersByPayment.card} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-blue-500 rounded-full" 
                      style={{ width: `${(ordersByPayment.card / filteredOrders.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Receipt className="h-4 w-4 mr-2 text-purple-500" />
                      <span>Online</span>
                    </div>
                    <span>{ordersByPayment.online} orders</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full mt-1">
                    <div 
                      className="h-2 bg-purple-500 rounded-full" 
                      style={{ width: `${(ordersByPayment.online / filteredOrders.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Order Details</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="w-full sm:w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="dine-in">Dine-in</TabsTrigger>
                <TabsTrigger value="takeaway">Takeaway</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No orders found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredOrders.map((order) => (
                          <TableRow key={order.id} className="hover-scale-subtle">
                            <TableCell className="font-medium">
                              {order.orderNumber}
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{order.customer.name}</div>
                                {order.type === "dine-in" && order.table && (
                                  <div className="text-xs text-muted-foreground">{order.table}</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {getOrderTypeIcon(order.type)}
                                <span className="ml-1 capitalize">{order.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{order.items.length} items</span>
                                <span className="text-xs text-muted-foreground">
                                  {order.items.map(item => item.quantity).reduce((a, b) => a + b, 0)} total
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getPaymentMethodIcon(order.paymentMethod)}
                                <Badge variant={order.paymentStatus === "paid" ? "default" : "destructive"}>
                                  {order.paymentStatus}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ${order.total.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
