import React, { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define a type for the order status
type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

// Define a type for an order item
type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

// Define a type for an order
type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      orderNumber: "ORD-2023-001",
      customerName: "John Doe",
      date: "2023-01-01",
      status: "Delivered",
      total: 150.00,
      items: [
        { id: "1", name: "Burger", quantity: 2, price: 20.00 },
        { id: "2", name: "Fries", quantity: 2, price: 10.00 },
        { id: "3", name: "Coke", quantity: 2, price: 5.00 },
      ],
    },
    {
      id: "2",
      orderNumber: "ORD-2023-002",
      customerName: "Jane Smith",
      date: "2023-01-02",
      status: "Shipped",
      total: 75.00,
      items: [
        { id: "4", name: "Pizza", quantity: 1, price: 50.00 },
        { id: "5", name: "Coke", quantity: 1, price: 5.00 },
      ],
    },
    {
      id: "3",
      orderNumber: "ORD-2023-003",
      customerName: "Mike Johnson",
      date: "2023-01-03",
      status: "Processing",
      total: 50.00,
      items: [
        { id: "6", name: "Burger", quantity: 1, price: 20.00 },
        { id: "7", name: "Fries", quantity: 1, price: 10.00 },
        { id: "8", name: "Coke", quantity: 1, price: 5.00 },
      ],
    },
    {
      id: "4",
      orderNumber: "ORD-2023-004",
      customerName: "Sarah Williams",
      date: "2023-01-04",
      status: "Pending",
      total: 25.00,
      items: [
        { id: "9", name: "Coke", quantity: 5, price: 5.00 },
      ],
    },
    {
      id: "5",
      orderNumber: "ORD-2023-005",
      customerName: "David Brown",
      date: "2023-01-05",
      status: "Cancelled",
      total: 100.00,
      items: [
        { id: "10", name: "Burger", quantity: 2, price: 20.00 },
        { id: "11", name: "Fries", quantity: 2, price: 10.00 },
        { id: "12", name: "Coke", quantity: 2, price: 5.00 },
      ],
    },
  ]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const searchRegex = new RegExp(search, "i");
    const searchMatch = searchRegex.test(order.customerName) || searchRegex.test(order.orderNumber);

    const statusMatch = statusFilter === "All" || order.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <RestaurantLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Orders</h1>
          <Button><Plus className="mr-2 h-4 w-4" />Add Order</Button>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          <Input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select onValueChange={(value) => setStatusFilter(value as OrderStatus | "All")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Shipped">Shipped</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "success"
                            : order.status === "Shipped"
                              ? "secondary"
                              : order.status === "Processing"
                                ? "warning"
                                : order.status === "Pending"
                                  ? "default"
                                  : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View details for order {selectedOrder?.orderNumber}.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="orderNumber" className="text-right font-medium">
                  Order Number
                </label>
                <Input type="text" id="orderNumber" value={selectedOrder.orderNumber} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="customerName" className="text-right font-medium">
                  Customer Name
                </label>
                <Input type="text" id="customerName" value={selectedOrder.customerName} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right font-medium">
                  Date
                </label>
                <Input type="text" id="date" value={selectedOrder.date} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="total" className="text-right font-medium">
                  Total
                </label>
                <Input type="text" id="total" value={`$${selectedOrder.total.toFixed(2)}`} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="status" className="text-right font-medium">
                  Status
                </label>
                <Select value={selectedOrder.status} onValueChange={(value) => handleStatusChange(selectedOrder.id, value as OrderStatus)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h2 className="text-lg font-medium">Items</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </RestaurantLayout>
  );
};

export default OrdersPage;
