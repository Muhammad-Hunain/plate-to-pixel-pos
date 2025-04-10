
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Building, Users, ShoppingBag, Clock, MapPin, Phone, User, Calendar, Package,
  BarChart3, Settings, ChevronRight, DollarSign, Truck, CreditCard, X
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Branch interface - make sure this matches your actual data structure
interface Branch {
  id: number;
  name: string;
  address: string;
  manager: string;
  contact: string;
  status: string;
  openHours: string;
  employees: number;
  todayOrders: number;
  todayRevenue: number;
  lowStockItems: number;
  // Add any other fields needed
}

interface BranchDetailsViewProps {
  branch: Branch;
  onClose: () => void;
  onEdit: (branchId: number) => void;
}

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

const StatsCard = ({ icon, title, value, color }: StatsCardProps) => (
  <div className={`flex flex-col items-center justify-center ${color} p-4 rounded-lg`}>
    <div className="mb-2">{icon}</div>
    <div className="text-xs text-muted-foreground mb-1">{title}</div>
    <div className="font-bold">{value}</div>
  </div>
);

const BranchDetailsView: React.FC<BranchDetailsViewProps> = ({ branch, onClose, onEdit }) => {
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

  // Mock data for the demo
  const mockActiveOrders = [
    { id: "ORD-001", table: "Table 5", items: 4, status: "Preparing", time: "10:15 AM", amount: "$52.50" },
    { id: "ORD-002", table: "Takeaway", items: 2, status: "Ready", time: "10:20 AM", amount: "$27.25" },
  ];

  const mockInventoryItems = [
    { name: "Tomatoes", category: "Produce", stock: 5, minRequired: 10, status: "Low" },
    { name: "Chicken Breast", category: "Meat", stock: 3, minRequired: 8, status: "Critical" },
    { name: "Olive Oil", category: "Pantry", stock: 2, minRequired: 5, status: "Critical" },
  ];

  const mockStaff = [
    { name: "John Smith", role: "Waiter", shift: "Morning", status: "Present" },
    { name: "Sarah Lee", role: "Chef", shift: "Morning", status: "Present" },
    { name: "Mike Johnson", role: "Waiter", shift: "Evening", status: "Scheduled" },
  ];

  const mockPaymentMethods = [
    { method: "Cash", percentage: 30 },
    { method: "Credit Card", percentage: 55 },
    { method: "Online", percentage: 15 },
  ];

  const mockPopularItems = [
    { name: "Margherita Pizza", category: "Pizza", orders: 42, revenue: "$630" },
    { name: "Chicken Parmesan", category: "Main", orders: 38, revenue: "$570" },
    { name: "Tiramisu", category: "Dessert", orders: 25, revenue: "$175" },
  ];

  return (
    <Card className="animate-fade-in shadow-sm overflow-hidden max-h-[calc(100vh-8rem)] overflow-y-auto">
      <CardHeader className="sticky top-0 bg-background z-10 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{branch.name}</CardTitle>
            <CardDescription>{branch.address}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(branch.status)}>
              {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
            </Badge>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pb-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Manager:</span>
              <span className="text-sm font-medium">{branch.manager}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Contact:</span>
              <span className="text-sm font-medium">{branch.contact}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Hours:</span>
              <span className="text-sm font-medium">{branch.openHours}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Address:</span>
              <span className="text-sm font-medium truncate">{branch.address}</span>
            </div>
          </div>
          
          <Separator />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatsCard
              icon={<Users className="h-5 w-5 text-primary" />}
              title="Staff"
              value={branch.employees}
              color="bg-primary/10"
            />
            
            <StatsCard
              icon={<ShoppingBag className="h-5 w-5 text-green-600" />}
              title="Today's Orders"
              value={branch.todayOrders}
              color="bg-green-100/50"
            />
            
            <StatsCard
              icon={<DollarSign className="h-5 w-5 text-blue-600" />}
              title="Today's Revenue"
              value={`$${branch.todayRevenue.toFixed(2)}`}
              color="bg-blue-100/50"
            />
            
            <StatsCard
              icon={<Package className="h-5 w-5 text-amber-600" />}
              title="Low Stock Items"
              value={branch.lowStockItems}
              color="bg-amber-100/50"
            />
          </div>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="space-y-4">
            <h3 className="text-sm font-medium">Active Orders</h3>
            
            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockActiveOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.table}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>
                        <Badge className={
                          order.status === "Preparing" ? "bg-yellow-100 text-yellow-800" :
                          order.status === "Ready" ? "bg-green-100 text-green-800" :
                          "bg-blue-100 text-blue-800"
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.time}</TableCell>
                      <TableCell className="text-right">{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="text-primary">
                View All Orders <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <h3 className="text-sm font-medium">Low Stock Items</h3>
            
            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Min. Required</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInventoryItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.minRequired}</TableCell>
                      <TableCell>
                        <Badge className={
                          item.status === "Critical" ? "bg-red-100 text-red-800" :
                          item.status === "Low" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                <Truck className="mr-1 h-4 w-4" />
                Order Supplies
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                View Inventory <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="staff" className="space-y-4">
            <h3 className="text-sm font-medium">Current Staff</h3>
            
            <div className="overflow-x-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStaff.map((staff, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.shift}</TableCell>
                      <TableCell>
                        <Badge className={
                          staff.status === "Present" ? "bg-green-100 text-green-800" :
                          staff.status === "Scheduled" ? "bg-blue-100 text-blue-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {staff.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="text-primary">
                Manage Staff <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Payment Methods</h3>
              
              <div className="space-y-3">
                {mockPaymentMethods.map((payment, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        {payment.method === "Cash" ? <DollarSign className="h-4 w-4 mr-2 text-green-600" /> :
                          payment.method === "Credit Card" ? <CreditCard className="h-4 w-4 mr-2 text-blue-600" /> :
                          <Globe className="h-4 w-4 mr-2 text-purple-600" />}
                        <span className="text-sm">{payment.method}</span>
                      </div>
                      <span className="text-sm font-medium">{payment.percentage}%</span>
                    </div>
                    <Progress value={payment.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Popular Items</h3>
              
              <div className="overflow-x-auto border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPopularItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.orders}</TableCell>
                        <TableCell className="text-right">{item.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-1 h-4 w-4" />
                View Reports
              </Button>
              <Button variant="outline" size="sm" className="text-primary">
                <BarChart3 className="mr-1 h-4 w-4" />
                Full Analytics
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator />
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => onEdit(branch.id)}>
            <Settings className="mr-2 h-4 w-4" />
            Edit Branch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Add a missing icon component
const Globe = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default BranchDetailsView;
