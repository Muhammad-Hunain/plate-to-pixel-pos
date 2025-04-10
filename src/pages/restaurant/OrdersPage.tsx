
import { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import {
  Search,
  Calendar as CalendarIcon,
  Filter,
  MoreVertical,
  FileDown,
  Printer,
  Eye,
  RefreshCcw,
  X,
  Clock,
  Utensils,
  Package,
  Bike,
  CreditCard,
  Banknote,
  Receipt,
  BarChart4,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    avatar?: string;
  };
  items: OrderItem[];
  total: number;
  status: "new" | "preparing" | "ready" | "completed" | "cancelled";
  type: "dine-in" | "takeaway" | "delivery";
  paymentMethod: "cash" | "card" | "online" | "pending";
  paymentStatus: "paid" | "pending" | "refunded";
  table?: string;
  staff: string;
  branch: string;
  createdAt: string;
  notes?: string;
}

// Mock order data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: {
      name: "Alex Johnson",
      phone: "(555) 123-4567",
      email: "alex@example.com",
      avatar: "",
    },
    items: [
      { id: "item1", name: "Margherita Pizza", quantity: 1, price: 12.99 },
      { id: "item2", name: "Caesar Salad", quantity: 1, price: 8.99 },
      { id: "item3", name: "Soft Drink", quantity: 2, price: 2.99, modifiers: ["No Ice"] },
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
      avatar: "",
    },
    items: [
      { id: "item4", name: "Pepperoni Pizza", quantity: 1, price: 14.99 },
      { id: "item5", name: "Garlic Bread", quantity: 1, price: 4.99 },
    ],
    total: 19.98,
    status: "preparing",
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
      avatar: "",
    },
    items: [
      { id: "item6", name: "Spaghetti Carbonara", quantity: 2, price: 15.99 },
      { id: "item7", name: "Tiramisu", quantity: 1, price: 7.99 },
      { id: "item8", name: "Sparkling Water", quantity: 2, price: 3.99 },
    ],
    total: 47.95,
    status: "new",
    type: "delivery",
    paymentMethod: "online",
    paymentStatus: "paid",
    staff: "Emily Chang",
    branch: "Uptown",
    createdAt: "2023-04-10T13:15:00",
    notes: "Please deliver to side entrance",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customer: {
      name: "Michael Brown",
      phone: "(555) 456-7890",
      avatar: "",
    },
    items: [
      { id: "item9", name: "Chicken Burger", quantity: 1, price: 11.99 },
      { id: "item10", name: "French Fries", quantity: 1, price: 4.99 },
      { id: "item11", name: "Milkshake", quantity: 1, price: 5.99 },
    ],
    total: 22.97,
    status: "ready",
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
      avatar: "",
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
    notes: "Customer canceled due to wait time",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 3, 10),
    to: new Date(),
  });
  
  // Form state for adding new order
  const [newOrderType, setNewOrderType] = useState<"dine-in" | "takeaway" | "delivery">("dine-in");
  const [newOrderTable, setNewOrderTable] = useState("");
  const [newOrderCustomerName, setNewOrderCustomerName] = useState("");
  const [newOrderCustomerPhone, setNewOrderCustomerPhone] = useState("");
  const [newOrderItems, setNewOrderItems] = useState<{name: string; price: string; quantity: string}[]>([
    { name: "", price: "", quantity: "1" }
  ]);
  const [newOrderNotes, setNewOrderNotes] = useState("");
  
  const navigate = useNavigate();

  // Check local storage for orders from POS
  useEffect(() => {
    const storedOrders = localStorage.getItem('restaurant-orders');
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      
      // Add any new orders to the orders state
      if (Array.isArray(parsedOrders) && parsedOrders.length > 0) {
        // Look for new orders by checking IDs
        const existingOrderIds = orders.map(order => order.id);
        const newOrders = parsedOrders.filter(
          (order: Order) => !existingOrderIds.includes(order.id)
        );
        
        if (newOrders.length > 0) {
          setOrders(prevOrders => [...newOrders, ...prevOrders]);
          toast.success(`${newOrders.length} new order(s) received from POS`);
        }
      }
    }
  }, []);

  // Add a new order manually
  const handleAddOrder = () => {
    // Validate form
    if (!newOrderCustomerName) {
      toast.error("Customer name is required");
      return;
    }
    
    if (newOrderType === "dine-in" && !newOrderTable) {
      toast.error("Table number is required for dine-in orders");
      return;
    }
    
    // Validate items
    const validItems = newOrderItems.filter(item => 
      item.name && !isNaN(parseFloat(item.price)) && parseInt(item.quantity) > 0
    );
    
    if (validItems.length === 0) {
      toast.error("At least one valid item is required");
      return;
    }
    
    // Create new order
    const orderItems: OrderItem[] = validItems.map(item => ({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: item.name,
      price: parseFloat(item.price),
      quantity: parseInt(item.quantity)
    }));
    
    const total = orderItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: {
        name: newOrderCustomerName,
        phone: newOrderCustomerPhone || undefined,
      },
      items: orderItems,
      total: total,
      status: "new",
      type: newOrderType,
      paymentMethod: "pending",
      paymentStatus: "pending",
      table: newOrderType === "dine-in" ? `Table ${newOrderTable}` : undefined,
      staff: "Current User",
      branch: "Main Branch",
      createdAt: new Date().toISOString(),
      notes: newOrderNotes || undefined
    };
    
    // Add to orders
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    // Reset form and close dialog
    setNewOrderType("dine-in");
    setNewOrderTable("");
    setNewOrderCustomerName("");
    setNewOrderCustomerPhone("");
    setNewOrderItems([{ name: "", price: "", quantity: "1" }]);
    setNewOrderNotes("");
    setIsAddOrderOpen(false);
    
    toast.success("Order added successfully!");
  };

  // Add a new item field to the order form
  const addItemField = () => {
    setNewOrderItems([...newOrderItems, { name: "", price: "", quantity: "1" }]);
  };
  
  // Update an item field
  const updateItemField = (index: number, field: string, value: string) => {
    const updatedItems = [...newOrderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNewOrderItems(updatedItems);
  };
  
  // Remove an item field
  const removeItemField = (index: number) => {
    if (newOrderItems.length > 1) {
      const updatedItems = newOrderItems.filter((_, i) => i !== index);
      setNewOrderItems(updatedItems);
    }
  };

  // Filter orders based on search term, tab filter, and date range
  const filteredOrders = orders.filter((order) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer.phone && order.customer.phone.includes(searchTerm)) ||
      (order.customer.email && order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by tab
    const matchesTab =
      activeTab === "all" || order.status === activeTab || 
      (activeTab === "dine-in" && order.type === "dine-in") ||
      (activeTab === "takeaway" && order.type === "takeaway") ||
      (activeTab === "delivery" && order.type === "delivery");

    // Filter by date range
    const orderDate = new Date(order.createdAt);
    const matchesDateRange =
      !date ||
      !date.from ||
      (date.from && orderDate >= date.from && (!date.to || orderDate <= date.to));

    return matchesSearch && matchesTab && matchesDateRange;
  });

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handlePrintReceipt = (orderId: string) => {
    toast.success(`Receipt for order #${orderId} sent to printer`);
  };

  const handleRefundOrder = (orderId: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: "cancelled" as const, paymentStatus: "refunded" as const }
        : order
    );
    setOrders(updatedOrders);
    toast.success(`Order #${orderId} has been refunded`);
  };

  const handleExportData = () => {
    toast.success("Orders data exported successfully!");
  };
  
  const navigateToPOS = () => {
    navigate('/restaurant/pos');
  };

  // Helper function to get style based on order status
  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return {
          variant: "outline" as const,
          color: "text-blue-600",
          bg: "bg-blue-100",
        };
      case "preparing":
        return {
          variant: "outline" as const,
          color: "text-amber-600",
          bg: "bg-amber-100",
        };
      case "ready":
        return {
          variant: "default" as const,
          color: "text-white",
          bg: "bg-green-500",
        };
      case "completed":
        return {
          variant: "default" as const,
          color: "text-white",
          bg: "bg-primary",
        };
      case "cancelled":
        return {
          variant: "destructive" as const,
          color: "text-white",
          bg: "bg-destructive",
        };
    }
  };

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

  const getPaymentMethodIcon = (method: Order["paymentMethod"]) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-4 w-4" />;
      case "cash":
        return <Banknote className="h-4 w-4" />;
      case "online":
        return <Receipt className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
            <p className="text-muted-foreground">
              View and manage all restaurant orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hover-scale" onClick={navigateToPOS}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Go to POS
            </Button>
            <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
              <DialogTrigger asChild>
                <Button className="hover-scale">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Order
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Order</DialogTitle>
                  <DialogDescription>
                    Create a new order manually with the details below.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                      <Label htmlFor="orderType">Order Type</Label>
                      <Select 
                        value={newOrderType} 
                        onValueChange={(value) => setNewOrderType(value as any)}
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select order type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dine-in">Dine-in</SelectItem>
                          <SelectItem value="takeaway">Takeaway</SelectItem>
                          <SelectItem value="delivery">Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {newOrderType === "dine-in" && (
                      <div className="col-span-4 sm:col-span-2">
                        <Label htmlFor="tableNumber">Table Number</Label>
                        <Input
                          id="tableNumber"
                          className="mt-1"
                          value={newOrderTable}
                          onChange={(e) => setNewOrderTable(e.target.value)}
                        />
                      </div>
                    )}
                    
                    <div className="col-span-4 sm:col-span-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input
                        id="customerName"
                        className="mt-1"
                        value={newOrderCustomerName}
                        onChange={(e) => setNewOrderCustomerName(e.target.value)}
                      />
                    </div>
                    
                    <div className="col-span-4 sm:col-span-2">
                      <Label htmlFor="customerPhone">Customer Phone</Label>
                      <Input
                        id="customerPhone"
                        className="mt-1"
                        value={newOrderCustomerPhone}
                        onChange={(e) => setNewOrderCustomerPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Order Items</Label>
                    {newOrderItems.map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Item name"
                            value={item.name}
                            onChange={(e) => updateItemField(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="w-20">
                          <Input
                            placeholder="Price"
                            type="number"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItemField(index, "price", e.target.value)}
                          />
                        </div>
                        <div className="w-16">
                          <Input
                            placeholder="Qty"
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItemField(index, "quantity", e.target.value)}
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="shrink-0"
                          onClick={() => removeItemField(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={addItemField}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Order notes or special instructions"
                      className="mt-1"
                      value={newOrderNotes}
                      onChange={(e) => setNewOrderNotes(e.target.value)}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOrderOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddOrder}>Create Order</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <Button variant="outline" className="hover-scale" onClick={handleExportData}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/3">
            <Card className="animate-fade-in [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Order History</CardTitle>
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
                  <TabsList className="grid w-full grid-cols-7 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="preparing">Preparing</TabsTrigger>
                    <TabsTrigger value="ready">Ready</TabsTrigger>
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
                            <TableHead>Status</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                No orders found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredOrders.map((order) => (
                              <TableRow key={order.id} className="hover-scale-subtle">
                                <TableCell className="font-medium">
                                  <div className="flex items-center">
                                    <span className="mr-2">{order.orderNumber}</span>
                                    {getOrderTypeIcon(order.type)}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                                      <AvatarFallback>{order.customer.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{order.customer.name}</div>
                                      {order.type === "dine-in" && order.table && (
                                        <div className="text-xs text-muted-foreground">{order.table}</div>
                                      )}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={getStatusStyle(order.status).variant} className={getStatusStyle(order.status).bg}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col">
                                    <span>${order.total.toFixed(2)}</span>
                                    <span className="text-xs text-muted-foreground flex items-center">
                                      {getPaymentMethodIcon(order.paymentMethod)}
                                      <span className="ml-1 capitalize">{order.paymentMethod}</span>
                                    </span>
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
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={() => handleViewOrderDetails(order)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handlePrintReceipt(order.id)}>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print Receipt
                                      </DropdownMenuItem>
                                      {(order.status !== "cancelled" && order.status !== "completed") && (
                                        <DropdownMenuItem>
                                          <RefreshCcw className="mr-2 h-4 w-4" />
                                          Update Status
                                        </DropdownMenuItem>
                                      )}
                                      {order.status !== "cancelled" && order.paymentStatus === "paid" && (
                                        <DropdownMenuItem 
                                          className="text-destructive"
                                          onClick={() => handleRefundOrder(order.id)}
                                        >
                                          <X className="mr-2 h-4 w-4" />
                                          Cancel & Refund
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
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

          <div className="w-full sm:w-1/3 space-y-4">
            <AnimatedDashboardCard
              title="Order Statistics"
              delay={2}
              className="animate-fade-in [animation-delay:200ms]"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col border rounded-md p-3">
                  <span className="text-xs text-muted-foreground">Today's Orders</span>
                  <span className="text-2xl font-bold">24</span>
                  <span className="text-xs text-emerald-500 mt-1">↑ 8.5% from yesterday</span>
                </div>
                <div className="flex flex-col border rounded-md p-3">
                  <span className="text-xs text-muted-foreground">Revenue</span>
                  <span className="text-2xl font-bold">$745.80</span>
                  <span className="text-xs text-emerald-500 mt-1">↑ 12.3% from yesterday</span>
                </div>
                <div className="flex flex-col border rounded-md p-3">
                  <span className="text-xs text-muted-foreground">Avg. Order Value</span>
                  <span className="text-2xl font-bold">$31.07</span>
                  <span className="text-xs text-emerald-500 mt-1">↑ 3.2% from yesterday</span>
                </div>
                <div className="flex flex-col border rounded-md p-3">
                  <span className="text-xs text-muted-foreground">Completed Orders</span>
                  <span className="text-2xl font-bold">22</span>
                  <span className="text-xs text-muted-foreground mt-1">2 in progress</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Order Type Breakdown</span>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 bg-primary rounded-full flex-1" style={{ width: "45%" }}></div>
                    <div className="h-2 bg-amber-400 rounded-full flex-1" style={{ width: "30%" }}></div>
                    <div className="h-2 bg-emerald-500 rounded-full flex-1" style={{ width: "25%" }}></div>
                  </div>
                  <div className="flex text-xs mt-1 space-x-4">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-primary rounded-full mr-1"></div>
                      <span>Dine-in (45%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-amber-400 rounded-full mr-1"></div>
                      <span>Takeaway (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-emerald-500 rounded-full mr-1"></div>
                      <span>Delivery (25%)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3 mt-3">
                  <Button variant="outline" className="w-full" size="sm">
                    <BarChart4 className="mr-2 h-4 w-4" />
                    View Full Report
                  </Button>
                </div>
              </div>
            </AnimatedDashboardCard>

            <AnimatedDashboardCard
              title="Recent Activity"
              delay={3}
              className="animate-fade-in [animation-delay:300ms]"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-blue-100 p-2 mt-1">
                    <Package className="h-3 w-3 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New takeaway order received</p>
                    <p className="text-xs text-muted-foreground">
                      Order #ORD-006 from William Taylor
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="inline h-3 w-3 mr-1" /> Just now
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-green-100 p-2 mt-1">
                    <RefreshCcw className="h-3 w-3 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order status updated</p>
                    <p className="text-xs text-muted-foreground">
                      Order #ORD-002 is now ready for pickup
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="inline h-3 w-3 mr-1" /> 5 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-red-100 p-2 mt-1">
                    <X className="h-3 w-3 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Order cancelled</p>
                    <p className="text-xs text-muted-foreground">
                      Order #ORD-005 has been cancelled and refunded
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="inline h-3 w-3 mr-1" /> 30 minutes ago
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedDashboardCard>
          </div>
        </div>
      </div>

      {/* Order details dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Order #${selectedOrder.orderNumber} - ${new Date(selectedOrder.createdAt).toLocaleString()}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer information */}
              <div>
                <h3 className="text-sm font-semibold mb-1">Customer Information</h3>
                <div className="flex items-center space-x-3 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedOrder.customer.avatar} alt={selectedOrder.customer.name} />
                    <AvatarFallback>{selectedOrder.customer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedOrder.customer.name}</div>
                    {selectedOrder.customer.phone && (
                      <div className="text-xs text-muted-foreground">{selectedOrder.customer.phone}</div>
                    )}
                  </div>
                </div>
                {selectedOrder.customer.email && (
                  <div className="text-xs text-muted-foreground">Email: {selectedOrder.customer.email}</div>
                )}
                {selectedOrder.type === "dine-in" && selectedOrder.table && (
                  <div className="text-xs text-muted-foreground mt-1">{selectedOrder.table}</div>
                )}
              </div>

              {/* Order items */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Order Items</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              {item.modifiers && item.modifiers.length > 0 && (
                                <div className="text-xs text-muted-foreground">
                                  {item.modifiers.join(", ")}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-between mt-2 font-medium">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Order details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs">Order Type</Label>
                  <div className="flex items-center mt-1">
                    {getOrderTypeIcon(selectedOrder.type)}
                    <span className="ml-1 capitalize">{selectedOrder.type}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Status</Label>
                  <div className="mt-1">
                    <Badge variant={getStatusStyle(selectedOrder.status).variant}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Payment Method</Label>
                  <div className="flex items-center mt-1">
                    {getPaymentMethodIcon(selectedOrder.paymentMethod)}
                    <span className="ml-1 capitalize">{selectedOrder.paymentMethod}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Payment Status</Label>
                  <div className="mt-1">
                    <Badge variant={selectedOrder.paymentStatus === "paid" ? "default" : selectedOrder.paymentStatus === "pending" ? "outline" : "destructive"}>
                      {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Branch</Label>
                  <div className="mt-1">{selectedOrder.branch}</div>
                </div>
                <div>
                  <Label className="text-xs">Staff</Label>
                  <div className="mt-1">{selectedOrder.staff}</div>
                </div>
              </div>

              {/* Order notes */}
              {selectedOrder.notes && (
                <div>
                  <Label className="text-xs">Notes</Label>
                  <div className="border rounded-md p-2 mt-1 text-sm">
                    {selectedOrder.notes}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => handlePrintReceipt(selectedOrder?.id || "")}>
              <Printer className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>
            {selectedOrder && selectedOrder.status !== "cancelled" && selectedOrder.paymentStatus === "paid" && (
              <Button 
                variant="destructive"
                onClick={() => {
                  handleRefundOrder(selectedOrder.id);
                  setIsOrderDetailsOpen(false);
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel & Refund
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RestaurantLayout>
  );
}
