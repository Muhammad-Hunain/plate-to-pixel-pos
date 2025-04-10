
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Coffee, Search, Utensils, Pizza, Sandwich, IceCream, Beef, Beer, Plus, Minus, Trash, CreditCard, Receipt } from "lucide-react";

// Sample menu categories and items
const menuCategories = [
  { id: 1, name: "Starters", icon: Utensils },
  { id: 2, name: "Main Course", icon: Pizza },
  { id: 3, name: "Sandwiches", icon: Sandwich },
  { id: 4, name: "Desserts", icon: IceCream },
  { id: 5, name: "Drinks", icon: Coffee },
  { id: 6, name: "Specials", icon: Beef },
  { id: 7, name: "Beverages", icon: Beer },
];

const menuItems = [
  // Starters
  { id: 101, name: "Garlic Bread", price: 4.99, category: 1, image: "placeholder.svg" },
  { id: 102, name: "Buffalo Wings", price: 8.99, category: 1, image: "placeholder.svg" },
  { id: 103, name: "Mozzarella Sticks", price: 6.99, category: 1, image: "placeholder.svg" },
  { id: 104, name: "Loaded Nachos", price: 9.99, category: 1, image: "placeholder.svg" },
  
  // Main Course
  { id: 201, name: "Margherita Pizza", price: 12.99, category: 2, image: "placeholder.svg" },
  { id: 202, name: "Pepperoni Pizza", price: 14.99, category: 2, image: "placeholder.svg" },
  { id: 203, name: "Spaghetti Bolognese", price: 13.99, category: 2, image: "placeholder.svg" },
  { id: 204, name: "Grilled Salmon", price: 19.99, category: 2, image: "placeholder.svg" },
  
  // Sandwiches
  { id: 301, name: "Club Sandwich", price: 11.99, category: 3, image: "placeholder.svg" },
  { id: 302, name: "BLT", price: 9.99, category: 3, image: "placeholder.svg" },
  { id: 303, name: "Chicken Wrap", price: 10.99, category: 3, image: "placeholder.svg" },
  
  // Desserts
  { id: 401, name: "Chocolate Cake", price: 6.99, category: 4, image: "placeholder.svg" },
  { id: 402, name: "Cheesecake", price: 7.99, category: 4, image: "placeholder.svg" },
  { id: 403, name: "Apple Pie", price: 5.99, category: 4, image: "placeholder.svg" },
  
  // Drinks
  { id: 501, name: "Cappuccino", price: 3.99, category: 5, image: "placeholder.svg" },
  { id: 502, name: "Latte", price: 4.29, category: 5, image: "placeholder.svg" },
  { id: 503, name: "Espresso", price: 2.99, category: 5, image: "placeholder.svg" },
  { id: 504, name: "Hot Chocolate", price: 3.49, category: 5, image: "placeholder.svg" },
];

// Type definitions
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

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState("dine-in");
  const [tableNumber, setTableNumber] = useState("1");
  
  // Filter menu items by category and search query
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add item to order
  const addItemToOrder = (item: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((orderItem) => orderItem.id === item.id);
      
      if (existingItem) {
        return prevItems.map((orderItem) => 
          orderItem.id === item.id 
            ? { ...orderItem, quantity: orderItem.quantity + 1 } 
            : orderItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    
    toast.success(`Added ${item.name} to order`);
  };

  // Update item quantity in order
  const updateItemQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setOrderItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      return;
    }

    setOrderItems((prevItems) => 
      prevItems.map((item) => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from order
  const removeItem = (itemId: number) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    toast("Item removed from order");
  };

  // Calculate order subtotal
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Process payment
  const processPayment = () => {
    toast.success("Payment processed successfully!");
    setOrderItems([]);
    setTableNumber("1");
  };

  // Print receipt
  const printReceipt = () => {
    toast("Printing receipt...");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">POS System</h1>
          <p className="text-muted-foreground">Create and manage orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Menu Section */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                  <CardTitle>Menu Items</CardTitle>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search items..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Categories */}
                <div className="flex gap-2 pb-4 overflow-x-auto">
                  {menuCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="animate-fade-in"
                    >
                      <category.icon className="mr-2 h-4 w-4" />
                      {category.name}
                    </Button>
                  ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredMenuItems.map((item) => (
                    <div
                      key={item.id}
                      className="pos-item"
                      onClick={() => addItemToOrder(item)}
                    >
                      <div className="aspect-square rounded-md bg-muted mb-2 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-sm font-bold">${item.price.toFixed(2)}</div>
                    </div>
                  ))}

                  {filteredMenuItems.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No menu items found.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Section */}
          <div className="md:col-span-1">
            <Card className="animate-slide-in">
              <CardHeader>
                <CardTitle>Current Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                {/* Order Items */}
                <div className="space-y-4">
                  <div className="text-sm font-medium">Order Items</div>

                  {orderItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No items in order.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b pb-2">
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
                    onClick={processPayment}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
