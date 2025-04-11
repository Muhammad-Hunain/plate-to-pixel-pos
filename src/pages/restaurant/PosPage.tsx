import React, { useState, useRef, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Calculator, 
  Search, 
  Plus, 
  Minus, 
  X, 
  Printer, 
  Percent, 
  Gift, 
  CreditCard, 
  Cash,
  ArrowRight,
  Utensils,
  Pizza,
  Coffee,
  IceCream,
  ShoppingCart
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderNumber: string;
  customerName: string;
  orderDate: Date;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'Credit Card' | 'Cash' | 'Online';
  status: 'Pending' | 'Completed' | 'Cancelled';
}

const mockOrders: Order[] = [
  {
    orderNumber: "ORD-20240503-001",
    customerName: "John Doe",
    orderDate: new Date(),
    items: [
      { id: "item-1", name: "Margherita Pizza", price: 12.99, quantity: 1 },
      { id: "item-2", name: "Cappuccino", price: 3.50, quantity: 2 },
    ],
    totalAmount: 19.99,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
  {
    orderNumber: "ORD-20240503-002",
    customerName: "Jane Smith",
    orderDate: new Date(),
    items: [
      { id: "item-3", name: "Pasta Carbonara", price: 15.50, quantity: 1 },
      { id: "item-4", name: "Iced Latte", price: 4.25, quantity: 1 },
      { id: "item-5", name: "Chocolate Cake", price: 6.00, quantity: 1 },
    ],
    totalAmount: 25.75,
    paymentMethod: "Cash",
    status: "Pending",
  },
  {
    orderNumber: "ORD-20240503-003",
    customerName: "Alice Johnson",
    orderDate: new Date(),
    items: [
      { id: "item-6", name: "Vegetarian Pizza", price: 13.50, quantity: 1 },
      { id: "item-7", name: "Espresso", price: 2.75, quantity: 1 },
    ],
    totalAmount: 16.25,
    paymentMethod: "Online",
    status: "Completed",
  },
];

export default function RestaurantPosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'Cash' | 'Online'>('Credit Card');
  const [discount, setDiscount] = useState<number>(0);
  const [tip, setTip] = useState<number>(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const componentRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: "1", name: "Margherita Pizza", price: 12.99, category: "Pizza" },
    { id: "2", name: "Pepperoni Pizza", price: 14.99, category: "Pizza" },
    { id: "3", name: "Vegetarian Pizza", price: 13.99, category: "Pizza" },
    { id: "4", name: "Cappuccino", price: 3.50, category: "Coffee" },
    { id: "5", name: "Latte", price: 4.00, category: "Coffee" },
    { id: "6", name: "Espresso", price: 2.75, category: "Coffee" },
    { id: "7", name: "Vanilla Ice Cream", price: 5.50, category: "Dessert" },
    { id: "8", name: "Chocolate Ice Cream", price: 5.50, category: "Dessert" },
    { id: "9", name: "Strawberry Ice Cream", price: 5.50, category: "Dessert" },
    { id: "10", name: "Pasta Carbonara", price: 15.50, category: "Pasta" },
    { id: "11", name: "Spaghetti Bolognese", price: 14.75, category: "Pasta" },
    { id: "12", name: "Penne Arrabbiata", price: 13.25, category: "Pasta" },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    const itemNameLower = item.name.toLowerCase();
    return (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (searchTerm === "" || itemNameLower.includes(searchTermLower))
    );
  });

  const addToCart = (item: { id: string; name: string; price: number }) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
  
    if (existingItemIndex > -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (itemId: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };
  
  const increaseQuantity = (itemId: string) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };
  
  const decreaseQuantity = (itemId: string) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    const tipAmount = (subtotal * tip) / 100;
    return subtotal - discountAmount + tipAmount;
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setTip(0);
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCompleteOrder = () => {
    if (selectedOrder) {
      // Simulate completing the order
      toast.success(`Order ${selectedOrder.orderNumber} completed!`);
      setSelectedOrder(null);
    }
  };

  const handleCancelOrder = () => {
    if (selectedOrder) {
      // Simulate cancelling the order
      toast.warning(`Order ${selectedOrder.orderNumber} cancelled.`);
      setSelectedOrder(null);
    }
  };

  const { handlePrint } = useReactToPrint({
    documentTitle: `Receipt-${selectedOrder?.orderNumber || ''}`,
    trigger: () => null, // We don't need the default trigger
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (selectedOrder) {
      // Trigger the print automatically when an order is selected
      handlePrint();
    }
  }, [selectedOrder, handlePrint]);

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Point of Sale</h1>
            <p className="text-muted-foreground">
              Efficiently manage orders and process payments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hover-scale">
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Menu Section */}
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Menu</CardTitle>
                <CardDescription>
                  Browse available menu items
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Categories</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedCategory === "All" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("All")}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedCategory === "Pizza" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("Pizza")}
                    >
                      <Pizza className="mr-2 h-4 w-4" />
                      Pizza
                    </Button>
                    <Button
                      variant={selectedCategory === "Coffee" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("Coffee")}
                    >
                      <Coffee className="mr-2 h-4 w-4" />
                      Coffee
                    </Button>
                    <Button
                      variant={selectedCategory === "Dessert" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("Dessert")}
                    >
                      <IceCream className="mr-2 h-4 w-4" />
                      Dessert
                    </Button>
                    <Button
                      variant={selectedCategory === "Pasta" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory("Pasta")}
                    >
                      <Utensils className="mr-2 h-4 w-4" />
                      Pasta
                    </Button>
                  </div>
                </div>

                <Separator />

                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredMenuItems.map((item) => (
                      <Card key={item.id} className="hover:bg-secondary/10 cursor-pointer" onClick={() => addToCart(item)}>
                        <CardContent className="flex items-center justify-between p-3">
                          <div>
                            <CardTitle className="text-sm">{item.name}</CardTitle>
                            <CardDescription className="text-xs text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </CardDescription>
                          </div>
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Order Section */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
                <CardDescription>
                  Review and manage current order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" alt={item.name} />
                            <AvatarFallback>{item.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => decreaseQuantity(item.id)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button variant="ghost" size="icon" onClick={() => increaseQuantity(item.id)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Subtotal</Label>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Discount (%)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="0"
                        className="w-20 text-right"
                        value={discount.toString()}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                      />
                      <Percent className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Tip (%)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="0"
                        className="w-20 text-right"
                        value={tip.toString()}
                        onChange={(e) => setTip(Number(e.target.value))}
                      />
                      <Percent className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <Label>Total</Label>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col space-y-2">
                  <Button onClick={() => setIsPaymentModalOpen(true)} className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Process Payment
                  </Button>
                  <Button variant="outline" onClick={clearCart} className="w-full">
                    Clear Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History Section */}
          <div className="md:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View recent orders and details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search orders..."
                  />
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>

                <ScrollArea className="h-[300px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Order #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.orderNumber} className="cursor-pointer hover:bg-secondary/10" onClick={() => handleSelectOrder(order)}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>

                <Separator />

                {selectedOrder ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected Order: {selectedOrder.orderNumber}</p>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={handleCompleteOrder}>
                        Complete
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleCancelOrder}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Select an order to view details</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md p-6">
            <CardHeader>
              <CardTitle>Process Payment</CardTitle>
              <CardDescription>
                Select payment method and confirm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="flex space-x-4">
                  <Button
                    variant={paymentMethod === "Credit Card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("Credit Card")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Button>
                  <Button
                    variant={paymentMethod === "Cash" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("Cash")}
                  >
                    <Cash className="mr-2 h-4 w-4" />
                    Cash
                  </Button>
                  <Button
                    variant={paymentMethod === "Online" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("Online")}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Online
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amount Due</Label>
                <Input
                  type="text"
                  value={`$${calculateTotal().toFixed(2)}`}
                  readOnly
                />
              </div>
            </CardContent>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setIsPaymentModalOpen(false);
                toast.success("Payment processed successfully!");
                clearCart();
              }}>
                Confirm Payment
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Receipt Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md p-6">
            <CardHeader>
              <CardTitle>Order Receipt</CardTitle>
              <CardDescription>
                Details of the completed order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div ref={componentRef} className="p-4">
                <h2 className="text-lg font-bold text-center">Urban Bites Restaurant</h2>
                <p className="text-sm text-center text-muted-foreground">123 Foodie Lane, Metropolis</p>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <p className="text-sm">Order Number:</p>
                  <p className="text-sm">{selectedOrder.orderNumber}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Date:</p>
                  <p className="text-sm">{format(selectedOrder.orderDate, 'MMM dd, yyyy hh:mm a')}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Customer:</p>
                  <p className="text-sm">{selectedOrder.customerName}</p>
                </div>
                <Separator className="my-2" />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <p>Total:</p>
                  <p>${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Payment Method:</p>
                  <p className="text-sm">{selectedOrder.paymentMethod}</p>
                </div>
                <Separator className="my-2" />
                <p className="text-xs text-center text-muted-foreground">Thank you for dining with us!</p>
              </div>
            </CardContent>
            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
              <Button onClick={handlePrint}>
                Print Receipt
              </Button>
            </div>
          </Card>
        </div>
      )}
    </RestaurantLayout>
  );
}
