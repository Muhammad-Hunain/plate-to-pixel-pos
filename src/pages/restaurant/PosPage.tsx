
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Clock,
  Filter,
  History,
  MoreVertical,
  Plus,
  Search,
  ShoppingCart,
  Utensils,
} from "lucide-react";

import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { useToast } from "@/hooks/use-toast";

// Menu items data
const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    price: 12.99,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Cheese Pizza",
    price: 14.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: 8.99,
    category: "salads",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Chicken Wings",
    price: 10.99,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Spaghetti",
    price: 13.99,
    category: "pasta",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "French Fries",
    price: 4.99,
    category: "sides",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop",
  },
  {
    id: 7,
    name: "Chocolate Cake",
    price: 6.99,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop",
  },
  {
    id: 8,
    name: "Iced Tea",
    price: 3.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop",
  },
];

const PosPage = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }

    toast({
      title: "Added to order",
      description: `${item.name} has been added to the order.`,
    });
  };

  const handleRemoveFromCart = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    if (itemToRemove.quantity === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "No items in order",
        description: "Please add items to the order before placing it.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Order placed",
      description: `Order with ${cart.length} items has been placed successfully.`,
    });
    
    console.log("Order placed:", cart);
    setCart([]);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", name: "All" },
    { id: "burgers", name: "Burgers" },
    { id: "pizza", name: "Pizza" },
    { id: "pasta", name: "Pasta" },
    { id: "salads", name: "Salads" },
    { id: "appetizers", name: "Appetizers" },
    { id: "sides", name: "Sides" },
    { id: "desserts", name: "Desserts" },
    { id: "drinks", name: "Drinks" },
  ];

  return (
    <RestaurantLayout>
      <div className="p-6 h-full">
        <div className="flex flex-col lg:flex-row h-full gap-6">
          {/* Left side - Menu Items */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">Point of Sale</h1>
                <Badge variant="outline" className="ml-2">
                  Table 5
                </Badge>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search items..."
                    className="pl-8 w-full md:w-[200px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-2"
            >
              <div className="overflow-x-auto pb-2">
                <TabsList className="h-9 w-max">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-4"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all"
                      onClick={() => handleAddToCart(item)}
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-[120px] object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-muted-foreground text-sm">
                            {item.category}
                          </span>
                          <span className="font-bold">${item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right side - Cart */}
          <div className="w-full lg:w-1/3 h-full flex flex-col border rounded-lg p-4 bg-card text-card-foreground shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-bold">Current Order</h2>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="dine-in">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Order Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dine-in">Dine In</SelectItem>
                    <SelectItem value="takeout">Takeout</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto mb-4">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Utensils className="mx-auto h-12 w-12 mb-4 opacity-20" />
                  <p>No items in the order yet</p>
                  <p className="text-sm">Add items from the menu</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-3"
                    >
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFromCart(item.id);
                            }}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" className="gap-1" disabled={cart.length === 0}>
                  <History className="h-4 w-4 mr-1" />
                  Save Order
                </Button>
                <Button 
                  className="gap-1"
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
};

export default PosPage;
