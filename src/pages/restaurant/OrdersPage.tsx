
import { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Utensils, Search, Filter, FileDown, Clock, Coffee, CheckCircle,
  AlertCircle, ChevronRight, Printer, MoreVertical, Ban, RefreshCcw, 
  UserCheck, ShoppingBag, CalendarIcon, User, ArrowUpDown, Banknote,
  Receipt, Calendar, X, CreditCard, CircleDollarSign
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Mock data for branches
const branches = [
  { id: "1", name: "Downtown" },
  { id: "2", name: "Westside" },
  { id: "3", name: "Airport" },
  { id: "4", name: "Mall Location" },
];

// Mock data for orders
const initialOrders = [
  {
    id: "ORD-1234",
    customer: "John Doe",
    date: "2025-04-10T12:30:00",
    status: "completed",
    total: 38.50,
    paymentMethod: "credit-card",
    type: "dine-in",
    branch: "1",
    server: "Emily Johnson",
    table: "Table 5",
    items: [
      { id: "1", name: "Classic Burger", quantity: 2, price: 12.99, total: 25.98, modifiers: ["Extra Cheese", "No Onions"] },
      { id: "4", name: "Iced Coffee", quantity: 2, price: 4.99, total: 9.98, modifiers: [] },
      { id: "3", name: "Chocolate Cake", quantity: 1, price: 7.99, total: 7.99, modifiers: ["Add Ice Cream"] }
    ],
    subtotal: 43.95,
    discount: 5.45,
    tax: 3.51,
    tip: 7.70
  },
  {
    id: "ORD-1235",
    customer: "Jane Smith",
    date: "2025-04-10T13:15:00",
    status: "in-progress",
    total: 26.75,
    paymentMethod: "cash",
    type: "takeaway",
    branch: "1",
    server: "Michael Brown",
    table: null,
    items: [
      { id: "2", name: "Caesar Salad", quantity: 1, price: 9.99, total: 9.99, modifiers: ["Grilled Chicken"] },
      { id: "5", name: "Chef's Special Pasta", quantity: 1, price: 16.99, total: 16.99, modifiers: [] }
    ],
    subtotal: 26.98,
    discount: 0,
    tax: 2.16,
    tip: 0
  },
  {
    id: "ORD-1236",
    customer: "Robert Wilson",
    date: "2025-04-10T11:45:00",
    status: "canceled",
    total: 42.20,
    paymentMethod: "wallet",
    type: "delivery",
    branch: "2",
    server: "Sarah Davis",
    table: null,
    items: [
      { id: "1", name: "Classic Burger", quantity: 1, price: 12.99, total: 12.99, modifiers: [] },
      { id: "2", name: "Caesar Salad", quantity: 2, price: 9.99, total: 19.98, modifiers: ["No Croutons"] },
      { id: "4", name: "Iced Coffee", quantity: 2, price: 4.99, total: 9.98, modifiers: ["Almond Milk"] }
    ],
    subtotal: 42.95,
    discount: 5.00,
    tax: 3.44,
    tip: 8.44
  },
  {
    id: "ORD-1237",
    customer: "Lisa Johnson",
    date: "2025-04-10T10:30:00",
    status: "ready",
    total: 54.30,
    paymentMethod: "credit-card",
    type: "dine-in",
    branch: "3",
    server: "Kevin Lee",
    table: "Table 12",
    items: [
      { id: "5", name: "Chef's Special Pasta", quantity: 2, price: 16.99, total: 33.98, modifiers: [] },
      { id: "3", name: "Chocolate Cake", quantity: 2, price: 7.99, total: 15.98, modifiers: [] },
      { id: "4", name: "Iced Coffee", quantity: 1, price: 4.99, total: 4.99, modifiers: ["Flavored Syrup"] }
    ],
    subtotal: 54.95,
    discount: 5.50,
    tax: 4.40,
    tip: 10.86
  },
  {
    id: "ORD-1238",
    customer: "Michael Roberts",
    date: "2025-04-09T19:20:00",
    status: "completed",
    total: 22.50,
    paymentMethod: "wallet",
    type: "takeaway",
    branch: "4",
    server: "Thomas Garcia",
    table: null,
    items: [
      { id: "1", name: "Classic Burger", quantity: 1, price: 12.99, total: 12.99, modifiers: ["Bacon"] },
      { id: "4", name: "Iced Coffee", quantity: 2, price: 4.99, total: 9.98, modifiers: [] }
    ],
    subtotal: 22.97,
    discount: 2.30,
    tax: 1.83,
    tip: 0
  },
  {
    id: "ORD-1239",
    customer: "Sarah Thompson",
    date: "2025-04-09T18:45:00",
    status: "completed",
    total: 68.25,
    paymentMethod: "credit-card",
    type: "dine-in",
    branch: "1",
    server: "Emily Johnson",
    table: "Table 8",
    items: [
      { id: "5", name: "Chef's Special Pasta", quantity: 2, price: 16.99, total: 33.98, modifiers: [] },
      { id: "1", name: "Classic Burger", quantity: 1, price: 12.99, total: 12.99, modifiers: ["Double Patty"] },
      { id: "2", name: "Caesar Salad", quantity: 1, price: 9.99, total: 9.99, modifiers: [] },
      { id: "3", name: "Chocolate Cake", quantity: 1, price: 7.99, total: 7.99, modifiers: [] },
      { id: "4", name: "Iced Coffee", quantity: 2, price: 4.99, total: 9.98, modifiers: [] }
    ],
    subtotal: 74.93,
    discount: 10.00,
    tax: 5.99,
    tip: 13.65
  },
  {
    id: "ORD-1240",
    customer: "David Miller",
    date: "2025-04-09T17:30:00",
    status: "completed",
    total: 36.45,
    paymentMethod: "cash",
    type: "dine-in",
    branch: "2",
    server: "Sarah Davis",
    table: "Table 3",
    items: [
      { id: "2", name: "Caesar Salad", quantity: 2, price: 9.99, total: 19.98, modifiers: ["Shrimp"] },
      { id: "4", name: "Iced Coffee", quantity: 3, price: 4.99, total: 14.97, modifiers: ["Extra Shot"] }
    ],
    subtotal: 34.95,
    discount: 0,
    tax: 2.80,
    tip: 7.00
  }
];

// Status display configurations
const orderStatusConfig = {
  "placed": { label: "Placed", color: "bg-blue-100 text-blue-800", icon: AlertCircle },
  "in-progress": { label: "Preparing", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  "ready": { label: "Ready", color: "bg-green-100 text-green-800", icon: CheckCircle },
  "completed": { label: "Completed", color: "bg-green-700 text-white", icon: CheckCircle },
  "canceled": { label: "Canceled", color: "bg-red-100 text-red-800", icon: X }
};

// Order type display configurations
const orderTypeConfig = {
  "dine-in": { label: "Dine-in", icon: Utensils },
  "takeaway": { label: "Takeaway", icon: ShoppingBag },
  "delivery": { label: "Delivery", icon: ShoppingBag }
};

// Payment method display configurations
const paymentMethodConfig = {
  "credit-card": { label: "Credit Card", icon: CreditCard },
  "cash": { label: "Cash", icon: Banknote },
  "wallet": { label: "Mobile Wallet", icon: CircleDollarSign }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterBranch, setFilterBranch] = useState<string | null>(null);
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string | null>(null);
  const [filterDateRange, setFilterDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });

  // Export drawer state
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | "doc">("csv");

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...initialOrders];
    
    // Filter by tab
    if (activeTab !== "all") {
      result = result.filter(order => {
        switch(activeTab) {
          case "dine-in": return order.type === "dine-in";
          case "takeaway": return order.type === "takeaway";
          case "delivery": return order.type === "delivery";
          default: return true;
        }
      });
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(query) || 
        order.customer.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(order => order.status === filterStatus);
    }
    
    // Apply type filter
    if (filterType) {
      result = result.filter(order => order.type === filterType);
    }
    
    // Apply branch filter
    if (filterBranch) {
      result = result.filter(order => order.branch === filterBranch);
    }
    
    // Apply payment method filter
    if (filterPaymentMethod) {
      result = result.filter(order => order.paymentMethod === filterPaymentMethod);
    }
    
    // Apply date range filter
    if (filterDateRange.from || filterDateRange.to) {
      result = result.filter(order => {
        const orderDate = new Date(order.date);
        
        if (filterDateRange.from && !filterDateRange.to) {
          return orderDate >= filterDateRange.from;
        }
        
        if (!filterDateRange.from && filterDateRange.to) {
          return orderDate <= filterDateRange.to;
        }
        
        if (filterDateRange.from && filterDateRange.to) {
          return orderDate >= filterDateRange.from && orderDate <= filterDateRange.to;
        }
        
        return true;
      });
    }
    
    setFilteredOrders(result);
  }, [activeTab, searchQuery, filterStatus, filterType, filterBranch, filterPaymentMethod, filterDateRange]);

  // Reset all filters
  const handleResetFilters = () => {
    setFilterStatus(null);
    setFilterType(null);
    setFilterBranch(null);
    setFilterPaymentMethod(null);
    setFilterDateRange({ from: undefined, to: undefined });
    setSearchQuery("");
  };
  
  // Handle order status update
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    // Update selected order if it's the one being viewed
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    toast.success(`Order ${orderId} status updated to ${orderStatusConfig[newStatus as keyof typeof orderStatusConfig].label}`);
  };
  
  // Handle export action
  const handleExport = () => {
    toast.success(`Exporting ${filteredOrders.length} orders as ${exportFormat.toUpperCase()}`);
    setIsExportOpen(false);
  };
  
  // Handle print action
  const handlePrint = (orderId?: string) => {
    if (orderId) {
      toast.success(`Printing order ${orderId}`);
    } else {
      toast.success(`Printing ${filteredOrders.length} orders`);
    }
  };
  
  // View order details
  const handleViewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "PPpp");
  }
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const config = orderStatusConfig[status as keyof typeof orderStatusConfig];
    const Icon = config.icon;
    
    return (
      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color} transition-all duration-200`}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </div>
    );
  };
  
  // Order type badge component
  const OrderTypeBadge = ({ type }: { type: string }) => {
    const config = orderTypeConfig[type as keyof typeof orderTypeConfig];
    const Icon = config.icon;
    
    return (
      <div className="inline-flex items-center text-xs text-muted-foreground">
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </div>
    );
  };
  
  // Payment method badge component
  const PaymentMethodBadge = ({ method }: { method: string }) => {
    const config = paymentMethodConfig[method as keyof typeof paymentMethodConfig];
    const Icon = config.icon;
    
    return (
      <div className="inline-flex items-center text-xs">
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </div>
    );
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
            <p className="text-muted-foreground">
              View and manage all your restaurant orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hover-scale" onClick={() => handlePrint()}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" className="hover-scale" onClick={() => setIsExportOpen(true)}>
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                All Orders
              </TabsTrigger>
              <TabsTrigger value="dine-in" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Dine-in
              </TabsTrigger>
              <TabsTrigger value="takeaway" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Takeaway
              </TabsTrigger>
              <TabsTrigger value="delivery" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Delivery
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-9 w-full md:w-72"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                variant={showFilters ? "default" : "outline"} 
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-primary text-primary-foreground" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card className="mb-6 animate-fade-in">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <Label htmlFor="filter-status">Order Status</Label>
                    <Select value={filterStatus || ""} onValueChange={v => setFilterStatus(v === "" ? null : v)}>
                      <SelectTrigger id="filter-status">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        <SelectItem value="placed">Placed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="ready">Ready</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="filter-type">Order Type</Label>
                    <Select value={filterType || ""} onValueChange={v => setFilterType(v === "" ? null : v)}>
                      <SelectTrigger id="filter-type">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="dine-in">Dine-in</SelectItem>
                        <SelectItem value="takeaway">Takeaway</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="filter-branch">Branch</Label>
                    <Select value={filterBranch || ""} onValueChange={v => setFilterBranch(v === "" ? null : v)}>
                      <SelectTrigger id="filter-branch">
                        <SelectValue placeholder="All Branches" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Branches</SelectItem>
                        {branches.map(branch => (
                          <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="filter-payment">Payment Method</Label>
                    <Select value={filterPaymentMethod || ""} onValueChange={v => setFilterPaymentMethod(v === "" ? null : v)}>
                      <SelectTrigger id="filter-payment">
                        <SelectValue placeholder="All Methods" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Methods</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="wallet">Mobile Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Date Range</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filterDateRange.from ? (
                            filterDateRange.to ? (
                              <>
                                {format(filterDateRange.from, "LLL dd")} - {format(filterDateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(filterDateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          initialFocus
                          mode="range"
                          defaultMonth={filterDateRange.from}
                          selected={filterDateRange}
                          onSelect={setFilterDateRange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="ghost" onClick={handleResetFilters}>Reset Filters</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <TabsContent value="all" className="mt-0">
            {renderOrdersTable()}
          </TabsContent>
          <TabsContent value="dine-in" className="mt-0">
            {renderOrdersTable()}
          </TabsContent>
          <TabsContent value="takeaway" className="mt-0">
            {renderOrdersTable()}
          </TabsContent>
          <TabsContent value="delivery" className="mt-0">
            {renderOrdersTable()}
          </TabsContent>
        </Tabs>

        {/* Order details dialog */}
        <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Order Details</span>
                <StatusBadge status={selectedOrder?.status || "placed"} />
              </DialogTitle>
              <DialogDescription>
                Order ID: {selectedOrder?.id} | {selectedOrder && formatDate(selectedOrder.date)}
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Customer</h4>
                    <p>{selectedOrder.customer}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Branch</h4>
                    <p>{branches.find(b => b.id === selectedOrder.branch)?.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Type</h4>
                    <div className="flex items-center">
                      <OrderTypeBadge type={selectedOrder.type} />
                      {selectedOrder.table && <span className="ml-2">({selectedOrder.table})</span>}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Server</h4>
                    <p>{selectedOrder.server}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Method</h4>
                    <PaymentMethodBadge method={selectedOrder.paymentMethod} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Total</h4>
                    <p className="font-semibold">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div>{item.name}</div>
                              {item.modifiers.length > 0 && (
                                <div className="text-sm text-muted-foreground">
                                  {item.modifiers.join(', ')}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Status Actions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedOrder.status !== "placed" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedOrder.id, "placed")}
                        >
                          Mark as Placed
                        </Button>
                      )}
                      {selectedOrder.status !== "in-progress" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedOrder.id, "in-progress")}
                        >
                          Mark as Preparing
                        </Button>
                      )}
                      {selectedOrder.status !== "ready" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedOrder.id, "ready")}
                        >
                          Mark as Ready
                        </Button>
                      )}
                      {selectedOrder.status !== "completed" && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedOrder.id, "completed")}
                        >
                          Complete Order
                        </Button>
                      )}
                      {selectedOrder.status !== "canceled" && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedOrder.id, "canceled")}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>${selectedOrder.subtotal.toFixed(2)}</span>
                      </div>
                      {selectedOrder.discount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Discount:</span>
                          <span>-${selectedOrder.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax:</span>
                        <span>${selectedOrder.tax.toFixed(2)}</span>
                      </div>
                      {selectedOrder.tip > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tip:</span>
                          <span>${selectedOrder.tip.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Total:</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => handlePrint(selectedOrder.id)}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    Print Receipt
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Export drawer */}
        <Drawer open={isExportOpen} onOpenChange={setIsExportOpen}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Export Orders</DrawerTitle>
                <DrawerDescription>Choose your export format</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="grid grid-cols-3 gap-2">
                  <div 
                    className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer transition-all ${exportFormat === 'csv' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setExportFormat('csv')}
                  >
                    <FileDown className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">CSV</span>
                    <span className="text-xs text-muted-foreground">Spreadsheet</span>
                  </div>
                  <div 
                    className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer transition-all ${exportFormat === 'pdf' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setExportFormat('pdf')}
                  >
                    <FileDown className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">PDF</span>
                    <span className="text-xs text-muted-foreground">Document</span>
                  </div>
                  <div 
                    className={`flex flex-col items-center justify-center border rounded-md p-3 cursor-pointer transition-all ${exportFormat === 'doc' ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                    onClick={() => setExportFormat('doc')}
                  >
                    <FileDown className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">DOC</span>
                    <span className="text-xs text-muted-foreground">Word</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>This will export {filteredOrders.length} orders with current filters applied.</p>
                </div>
              </div>
              <DrawerFooter>
                <Button onClick={handleExport}>Export Now</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </RestaurantLayout>
  );
  
  // Helper function to render orders table
  function renderOrdersTable() {
    if (filteredOrders.length === 0) {
      return (
        <Card>
          <CardContent className="text-center py-10 animate-fade-in">
            <Coffee className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium">No orders found</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              {searchQuery || filterStatus || filterType || filterBranch || filterPaymentMethod || filterDateRange.from || filterDateRange.to
                ? "Try adjusting your filters to see more orders."
                : "No orders have been placed yet."}
            </p>
            {(searchQuery || filterStatus || filterType || filterBranch || filterPaymentMethod || filterDateRange.from || filterDateRange.to) && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleResetFilters}
              >
                Clear Filters
              </Button>
            )}
          </CardContent>
        </Card>
      );
    }
    
    return (
      <Card className="animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Type</TableHead>
              <TableHead className="hidden lg:table-cell">Branch</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => {
              const branchName = branches.find(branch => branch.id === order.branch)?.name;
              
              return (
                <TableRow 
                  key={order.id} 
                  className="cursor-pointer hover:bg-muted/50 animate-fade-in"
                  onClick={() => handleViewOrderDetails(order)}
                >
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {format(new Date(order.date), "PPp")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <OrderTypeBadge type={order.type} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{branchName}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={e => {
                          e.stopPropagation();
                          handleViewOrderDetails(order);
                        }}>
                          <ChevronRight className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={e => {
                          e.stopPropagation();
                          handlePrint(order.id);
                        }}>
                          <Printer className="h-4 w-4 mr-2" /> Print Receipt
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        {order.status !== "completed" && (
                          <DropdownMenuItem onClick={e => {
                            e.stopPropagation();
                            handleUpdateStatus(order.id, "completed");
                          }}>
                            <CheckCircle className="h-4 w-4 mr-2" /> Mark as Completed
                          </DropdownMenuItem>
                        )}
                        
                        {order.status !== "canceled" && (
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={e => {
                              e.stopPropagation();
                              handleUpdateStatus(order.id, "canceled");
                            }}
                          >
                            <Ban className="h-4 w-4 mr-2" /> Cancel Order
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
