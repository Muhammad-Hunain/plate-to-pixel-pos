
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Minus, Trash, CreditCard, Receipt, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: number;
  image: string;
};

type OrderItem = MenuItem & {
  quantity: number;
};

type MenuCategory = {
  id: number;
  name: string;
  icon: React.ElementType;
};

interface OrderSummaryProps {
  orderItems: OrderItem[];
  updateItemQuantity: (itemId: number, newQuantity: number) => void;
  removeItem: (itemId: number) => void;
  menuCategories: MenuCategory[];
  processPayment: () => void;
  printReceipt: () => void;
}

export function OrderSummary({ 
  orderItems, 
  updateItemQuantity, 
  removeItem,
  menuCategories,
  processPayment,
  printReceipt
}: OrderSummaryProps) {
  const [orderType, setOrderType] = useState("dine-in");
  const [tableNumber, setTableNumber] = useState("1");
  
  // Get unique categories from order items
  const orderItemCategories = [...new Set(orderItems.map(item => {
    const category = menuCategories.find(cat => cat.id === item.category);
    return category ? category.id : null;
  }).filter(Boolean))];

  // Calculate order subtotal
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Get all items for a specific category
  const getOrderItemsByCategory = (categoryId: number) => {
    return orderItems.filter(item => item.category === categoryId);
  };

  // Handle place order button
  const handlePlaceOrder = () => {
    // Get current date and time
    const now = new Date();
    
    // Create order object
    const order = {
      id: `order-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: orderItems.map(item => ({
        id: `item-${item.id}-${Date.now()}`,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: total,
      status: "new",
      type: orderType,
      paymentMethod: "pending",
      paymentStatus: "pending",
      table: orderType === "dine-in" ? `Table ${tableNumber}` : undefined,
      staff: "Current User",
      branch: "Main Branch",
      createdAt: now.toISOString(),
      customer: {
        name: orderType === "dine-in" ? `Table ${tableNumber}` : "Walk-in Customer"
      }
    };
    
    // Save order to localStorage to make it available to the Orders page
    const existingOrders = localStorage.getItem('restaurant-orders');
    const ordersArray = existingOrders ? JSON.parse(existingOrders) : [];
    ordersArray.push(order);
    localStorage.setItem('restaurant-orders', JSON.stringify(ordersArray));
    
    // Show success message
    toast.success("Order placed successfully!", {
      description: `Order #${order.orderNumber} has been placed.`,
    });
    
    // Call process payment (which clears the order)
    processPayment();
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="dine-in" className="w-full" onValueChange={(value) => setOrderType(value)}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="dine-in">Dine In</TabsTrigger>
          <TabsTrigger value="takeaway">Takeaway</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>

        <TabsContent value="dine-in">
          <div className="space-y-2 py-2">
            <label htmlFor="table-number" className="text-sm font-medium">
              Table Number
            </label>
            <Input
              id="table-number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="takeaway">
          <div className="py-2 text-center text-sm text-muted-foreground">
            Takeaway order - ready for pickup
          </div>
        </TabsContent>
        
        <TabsContent value="delivery">
          <div className="space-y-2 py-2">
            <label className="text-sm font-medium">
              Delivery Address
            </label>
            <Input placeholder="Enter delivery address" />
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Items - Organized by Categories */}
      <div className="space-y-4">
        <div className="text-sm font-medium">Order Items</div>

        {orderItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No items in order.
          </div>
        ) : (
          <Accordion 
            type="multiple" 
            defaultValue={orderItemCategories.map(id => `order-category-${id}`)}
            className="space-y-2"
          >
            {orderItemCategories.map(categoryId => {
              const categoryItems = getOrderItemsByCategory(categoryId);
              const category = menuCategories.find(cat => cat.id === categoryId);
              
              if (!category || categoryItems.length === 0) return null;
              
              return (
                <AccordionItem 
                  key={`order-category-${categoryId}`}
                  value={`order-category-${categoryId}`}
                  className="border rounded-md overflow-hidden"
                >
                  <AccordionTrigger className="px-3 py-1.5 hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({categoryItems.length})
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 p-2">
                      {categoryItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-5 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>

      {/* Order Summary */}
      <div className="border-t pt-3">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Button 
          variant="outline" 
          className="w-full"
          disabled={orderItems.length === 0}
          onClick={printReceipt}
        >
          <Receipt className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button 
          className="w-full"
          disabled={orderItems.length === 0}
          onClick={handlePlaceOrder}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Place Order
        </Button>
      </div>
    </div>
  );
}
