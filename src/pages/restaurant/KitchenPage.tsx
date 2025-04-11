import { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ChefHat, 
  Clock, 
  Bell, 
  Coffee, 
  Utensils, 
  CheckCircle, 
  Timer, 
  AlarmClock, 
  CircleX, 
  CircleCheck, 
  Filter, 
  Flame, 
  Play, 
  Pause, 
  PanelLeftOpen, 
  Package, 
  Bike 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ExportDropdown from "@/components/reports/ExportDropdown";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  modifiers?: string[];
  station?: string;
  prepTime?: number;
  status: "pending" | "preparing" | "ready" | "served";
  specialInstructions?: string;
}

interface KitchenOrder {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  type: "dine-in" | "takeaway" | "delivery";
  table?: string;
  customer: string;
  status: "new" | "preparing" | "ready" | "completed";
  priority: "normal" | "high" | "rush";
  timeReceived: string;
  estimatedCompletionTime?: string;
  elapsedTime: number; // in seconds;
  assignedTo?: string;
}

// Mock data
const mockOrders: KitchenOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    items: [
      { 
        id: "item1", 
        name: "Margherita Pizza", 
        quantity: 1, 
        station: "pizza",
        prepTime: 12, 
        status: "pending" 
      },
      { 
        id: "item2", 
        name: "Caesar Salad", 
        quantity: 1, 
        station: "salad",
        prepTime: 5, 
        status: "pending" 
      },
      { 
        id: "item3", 
        name: "Garlic Bread", 
        quantity: 1, 
        station: "grill",
        prepTime: 8, 
        status: "pending" 
      }
    ],
    type: "dine-in",
    table: "Table 5",
    customer: "Alex Johnson",
    status: "new",
    priority: "normal",
    timeReceived: "2023-04-10T10:30:00",
    elapsedTime: 0
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    items: [
      { 
        id: "item4", 
        name: "Pepperoni Pizza", 
        quantity: 1, 
        station: "pizza",
        prepTime: 12, 
        status: "preparing",
        specialInstructions: "Extra cheese"
      },
      { 
        id: "item5", 
        name: "Cheesy Garlic Bread", 
        quantity: 1, 
        station: "grill",
        prepTime: 10, 
        status: "ready" 
      },
      { 
        id: "item6", 
        name: "Tiramisu", 
        quantity: 1, 
        station: "dessert",
        prepTime: 2, 
        status: "ready" 
      }
    ],
    type: "takeaway",
    customer: "Samantha Lee",
    status: "preparing",
    priority: "high",
    timeReceived: "2023-04-10T10:20:00",
    elapsedTime: 600 // 10 minutes
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    items: [
      { 
        id: "item7", 
        name: "Spaghetti Carbonara", 
        quantity: 2, 
        station: "pasta",
        prepTime: 15, 
        status: "ready" 
      },
      { 
        id: "item8", 
        name: "Garlic Bread", 
        quantity: 1, 
        station: "grill",
        prepTime: 8, 
        status: "ready" 
      }
    ],
    type: "delivery",
    customer: "David Chen",
    status: "ready",
    priority: "rush",
    timeReceived: "2023-04-10T10:15:00",
    elapsedTime: 900, // 15 minutes
    estimatedCompletionTime: "2023-04-10T10:30:00"
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    items: [
      { 
        id: "item9", 
        name: "Chicken Burger", 
        quantity: 1, 
        station: "grill",
        prepTime: 10, 
        status: "pending" 
      },
      { 
        id: "item10", 
        name: "French Fries", 
        quantity: 1, 
        station: "fryer",
        prepTime: 7, 
        status: "pending" 
      },
      { 
        id: "item11", 
        name: "Chocolate Milkshake", 
        quantity: 1, 
        station: "beverage",
        prepTime: 5, 
        status: "pending",
        specialInstructions: "No whipped cream"
      }
    ],
    type: "dine-in",
    table: "Table 2",
    customer: "Michael Brown",
    status: "new",
    priority: "normal",
    timeReceived: "2023-04-10T10:35:00",
    elapsedTime: 0
  }
];

// Stations for filtering
const stations = [
  "all",
  "grill",
  "pizza",
  "pasta",
  "fryer",
  "salad",
  "dessert",
  "beverage"
];

export default function KitchenPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>(mockOrders);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStation, setSelectedStation] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  // Setup timer to update elapsed time
  useEffect(() => {
    const id = window.setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          elapsedTime: order.status !== "completed" ? order.elapsedTime + 1 : order.elapsedTime
        }))
      );
    }, 1000);
    
    setIntervalId(id);
    
    // Setup notification for new orders
    const newOrderNotification = setTimeout(() => {
      const newOrder: KitchenOrder = {
        id: "5",
        orderNumber: "ORD-005",
        items: [
          { 
            id: "item12", 
            name: "Veggie Supreme Pizza", 
            quantity: 1, 
            station: "pizza",
            prepTime: 14, 
            status: "pending",
            specialInstructions: "No olives"
          },
          { 
            id: "item13", 
            name: "Garden Salad", 
            quantity: 1, 
            station: "salad",
            prepTime: 4, 
            status: "pending" 
          }
        ],
        type: "takeaway",
        customer: "Emma Wilson",
        status: "new",
        priority: "high",
        timeReceived: new Date().toISOString(),
        elapsedTime: 0
      };
      
      setOrders(prevOrders => [...prevOrders, newOrder]);
      
      if (soundEnabled) {
        // Play notification sound
        const audio = new Audio("/notification-sound.mp3");
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Audio play error:", e));
      }
      
      toast.success("New order received!", {
        description: `Order #${newOrder.orderNumber} - ${newOrder.customer}`,
        action: {
          label: "View",
          onClick: () => console.log("Viewed order")
        }
      });
      
    }, 20000); // 20 seconds after page load
    
    return () => {
      if (intervalId) window.clearInterval(intervalId);
      clearTimeout(newOrderNotification);
    };
  }, [soundEnabled]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Calculate order completion percentage
  const calculateCompletion = (order: KitchenOrder) => {
    const totalItems = order.items.length;
    const readyItems = order.items.filter(item => item.status === "ready" || item.status === "served").length;
    const preparingItems = order.items.filter(item => item.status === "preparing").length;
    
    return {
      percent: Math.round((readyItems / totalItems) * 100),
      readyItems,
      preparingItems,
      pendingItems: totalItems - readyItems - preparingItems
    };
  };

  // Filter orders based on active tab and station
  const filteredOrders = orders.filter(order => {
    // Filter by tab (order status)
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "new" && order.status === "new") || 
      (activeTab === "preparing" && order.status === "preparing") ||
      (activeTab === "ready" && order.status === "ready");
    
    // Filter by station
    const matchesStation = 
      selectedStation === "all" || 
      order.items.some(item => item.station === selectedStation);
    
    return matchesTab && matchesStation;
  });

  // Update item status
  const updateItemStatus = (orderId: string, itemId: string, newStatus: OrderItem["status"]) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map(item => 
          item.id === itemId ? { ...item, status: newStatus } : item
        );
        
        // Determine order status based on item statuses
        let newOrderStatus = order.status;
        if (updatedItems.every(item => item.status === "ready" || item.status === "served")) {
          newOrderStatus = "ready";
        } else if (updatedItems.some(item => item.status === "preparing" || item.status === "ready")) {
          newOrderStatus = "preparing";
        }
        
        return { 
          ...order, 
          items: updatedItems,
          status: newOrderStatus
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    toast.success(`Item status updated to ${newStatus}`);
  };

  // Mark entire order as ready
  const markOrderReady = (orderId: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: "ready" as const,
          items: order.items.map(item => ({
            ...item,
            status: (item.status === "pending" || item.status === "preparing") ? "ready" : item.status
          }))
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    toast.success(`Order #${orders.find(o => o.id === orderId)?.orderNumber} marked as ready`);
  };

  // Mark entire order as completed (served/picked up)
  const completeOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: "completed" as const,
          items: order.items.map(item => ({
            ...item,
            status: "served" as const
          }))
        };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    toast.success(`Order #${orders.find(o => o.id === orderId)?.orderNumber} completed`);
  };

  // Get class for timer display based on elapsed time and priority
  const getTimerClass = (order: KitchenOrder) => {
    if (order.status === "completed") return "text-muted-foreground";
    
    const timeThresholds = {
      normal: { warning: 600, alert: 900 }, // 10/15 minutes
      high: { warning: 480, alert: 720 },   // 8/12 minutes
      rush: { warning: 300, alert: 480 }    // 5/8 minutes
    };
    
    const threshold = timeThresholds[order.priority];
    
    if (order.elapsedTime >= threshold.alert) return "text-destructive font-bold";
    if (order.elapsedTime >= threshold.warning) return "text-amber-500 font-semibold";
    return "text-green-500";
  };

  // Play a sound alert
  const playAlert = () => {
    if (soundEnabled) {
      toast.success("Kitchen alert triggered!");
      // In a real app, play a sound here
    }
  };

  // Get the appropriate order type icon
  const getOrderTypeIcon = (type: "dine-in" | "takeaway" | "delivery") => {
    switch (type) {
      case "dine-in": 
        return <Utensils className="h-4 w-4" />;
      case "takeaway": 
        return <Package className="h-4 w-4" />;
      case "delivery": 
        return <Bike className="h-4 w-4" />;
    }
  };

  // Get badge style based on priority
  const getPriorityBadge = (priority: KitchenOrder["priority"]) => {
    switch (priority) {
      case "rush": 
        return <Badge className="bg-destructive">RUSH</Badge>;
      case "high": 
        return <Badge variant="outline" className="border-amber-500 text-amber-500">High Priority</Badge>;
      default: 
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kitchen Display</h1>
            <p className="text-muted-foreground">
              Manage kitchen orders and preparation status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hover-scale" onClick={playAlert}>
              <Bell className="mr-2 h-4 w-4" />
              Test Alert
            </Button>
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <Switch 
                id="sound-mode" 
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
              <Label htmlFor="sound-mode" className="text-sm cursor-pointer">Sound</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-2">
              <Switch 
                id="view-mode" 
                checked={compactView}
                onCheckedChange={setCompactView}
              />
              <Label htmlFor="view-mode" className="text-sm cursor-pointer">Compact</Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <AnimatedDashboardCard
            title="Order Stats"
            delay={1}
            className="col-span-1 md:col-span-2"
          >
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold">{orders.filter(o => o.status === "new").length}</span>
                <span className="text-xs text-muted-foreground mt-1">New</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold">{orders.filter(o => o.status === "preparing").length}</span>
                <span className="text-xs text-muted-foreground mt-1">Preparing</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold">{orders.filter(o => o.status === "ready").length}</span>
                <span className="text-xs text-muted-foreground mt-1">Ready</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold">{orders.filter(o => o.status === "completed").length}</span>
                <span className="text-xs text-muted-foreground mt-1">Completed</span>
              </div>
            </div>
          </AnimatedDashboardCard>

          <AnimatedDashboardCard
            title="Cooking Stations"
            delay={2}
          >
            <div className="grid grid-cols-2 gap-1">
              {stations.slice(1).map(station => (
                <Button
                  key={station}
                  variant={selectedStation === station ? "default" : "outline"}
                  size="sm"
                  className="text-xs capitalize"
                  onClick={() => setSelectedStation(station)}
                >
                  {station}
                </Button>
              ))}
            </div>
          </AnimatedDashboardCard>

          <AnimatedDashboardCard
            title="Kitchen Timer"
            delay={3}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-4xl font-mono font-bold text-primary mb-2">
                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Play className="h-3 w-3 mr-1" /> Start Break
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <AlarmClock className="h-3 w-3 mr-1" /> Set Timer
                </Button>
              </div>
            </div>
          </AnimatedDashboardCard>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Kitchen Orders</CardTitle>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="preparing">Preparing</TabsTrigger>
                <TabsTrigger value="ready">Ready</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <ChefHat className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium">No Orders</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  There are no orders that match your current filters.
                </p>
              </div>
            ) : (
              <div className={`grid gap-4 ${compactView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-2'}`}>
                {filteredOrders.map((order) => (
                  <Card 
                    key={order.id} 
                    className={`hover-scale-subtle overflow-hidden border-l-4 animate-fade-in ${
                      order.status === "new" ? "border-l-blue-500" :
                      order.status === "preparing" ? "border-l-amber-500" :
                      order.status === "ready" ? "border-l-green-500" :
                      "border-l-gray-300"
                    }`}
                  >
                    <CardHeader className={`pb-2 ${compactView ? 'p-3' : 'p-4'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <span className="font-bold">{order.orderNumber}</span>
                            {order.priority !== "normal" && (
                              <span className="ml-2">{getPriorityBadge(order.priority)}</span>
                            )}
                          </div>
                          <div className="flex items-center">
                            {getOrderTypeIcon(order.type)}
                            {order.type === "dine-in" && (
                              <span className="ml-1 text-sm font-medium">{order.table}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center ${getTimerClass(order)}`}>
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="font-mono">{formatTime(order.elapsedTime)}</span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Filter className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => markOrderReady(order.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark All Ready
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => completeOrder(order.id)}>
                                <CircleCheck className="mr-2 h-4 w-4" />
                                Complete Order
                              </DropdownMenuItem>
                              {order.priority !== "rush" ? (
                                <DropdownMenuItem>
                                  <Flame className="mr-2 h-4 w-4" />
                                  Mark as Rush
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <PanelLeftOpen className="mr-2 h-4 w-4" />
                                  Clear Rush Status
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-sm">
                        <span className="text-muted-foreground">
                          {order.customer}
                        </span>
                        <span className="text-xs">
                          {new Date(order.timeReceived).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className={compactView ? 'p-3 pt-0' : 'p-4 pt-0'}>
                      <div className="space-y-3">
                        {/* Progress indicator */}
                        <div className="w-full bg-secondary h-2 rounded-full mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              calculateCompletion(order).percent === 100 ? "bg-green-500" : "bg-amber-500"
                            }`} 
                            style={{ width: `${calculateCompletion(order).percent}%` }}
                          ></div>
                        </div>
                        
                        {/* Order items */}
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div 
                              key={item.id} 
                              className={`flex items-start justify-between p-2 rounded-md ${
                                item.status === "ready" ? "bg-green-50" :
                                item.status === "preparing" ? "bg-amber-50" :
                                item.status === "served" ? "bg-gray-50 text-muted-foreground" :
                                "bg-white"
                              }`}
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-1">
                                  {item.status === "ready" && <CircleCheck className="h-4 w-4 text-green-500" />}
                                  {item.status === "preparing" && <Timer className="h-4 w-4 text-amber-500" />}
                                  {item.status === "served" && <CheckCircle className="h-4 w-4 text-muted-foreground" />}
                                  <span className={`font-medium ${item.status === "served" ? "line-through text-muted-foreground" : ""}`}>
                                    {item.quantity}x {item.name}
                                  </span>
                                </div>
                                {item.specialInstructions && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Note: {item.specialInstructions}
                                  </p>
                                )}
                                {item.station && !compactView && (
                                  <div className="mt-1">
                                    <Badge variant="outline" className="text-xs capitalize">
                                      {item.station}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                {item.status !== "served" && (
                                  <>
                                    {item.status === "pending" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 w-7 p-0"
                                        onClick={() => updateItemStatus(order.id, item.id, "preparing")}
                                      >
                                        <Play className="h-3 w-3" />
                                      </Button>
                                    )}
                                    {item.status === "preparing" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 w-7 p-0"
                                        onClick={() => updateItemStatus(order.id, item.id, "ready")}
                                      >
                                        <CheckCircle className="h-3 w-3" />
                                      </Button>
                                    )}
                                    {item.status === "ready" && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 w-7 p-0"
                                        onClick={() => updateItemStatus(order.id, item.id, "served")}
                                      >
                                        <Utensils className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {!compactView && (
                          <div className="flex justify-between items-center border-t pt-3 mt-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6 border">
                                <AvatarFallback className="text-xs">
                                  {order.assignedTo ? order.assignedTo.charAt(0) : "U"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">
                                {order.assignedTo || "Unassigned"}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              {order.status !== "completed" && (
                                <Button 
                                  size="sm" 
                                  variant={order.status === "ready" ? "outline" : "default"} 
                                  onClick={() => 
                                    order.status === "ready" 
                                      ? completeOrder(order.id) 
                                      : markOrderReady(order.id)
                                  }
                                >
                                  {order.status === "ready" ? (
                                    <>
                                      <Utensils className="mr-1 h-4 w-4" />
                                      <span>Complete</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="mr-1 h-4 w-4" />
                                      <span>Ready</span>
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
