import React, { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Filter,
  Layers,
  MapPin,
  MoreVertical,
  Printer,
  Search,
  ShoppingCart,
  Utensils,
} from "lucide-react";

import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { useToast } from "@/hooks/use-toast";
import { useReactToPrint } from "react-to-print";
import { useIsMobile } from "@/hooks/use-mobile";

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
  {
    id: 9,
    name: "Veggie Burger",
    price: 11.99,
    category: "burgers",
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=300&h=200&fit=crop",
  },
  {
    id: 10,
    name: "Pepperoni Pizza",
    price: 15.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300&h=200&fit=crop",
  },
];

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const PosPage = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderType, setOrderType] = useState("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: "Order Receipt",
    onAfterPrint: () => {
      toast({
        title: "Receipt printed",
        description: "The order receipt has been sent to the printer.",
      });
    },
    content: () => receiptRef.current,
  });

  const handleAddToCart = (item: MenuItem) => {
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

  const handleRemoveFromCart = (id: number) => {
    const itemToRemove = cart.find((item) => item.id === id);
    if (itemToRemove && itemToRemove.quantity === 1) {
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

    if (orderType === "dine-in" && !tableNumber) {
      toast({
        title: "Table number required",
        description: "Please enter a table number for dine-in orders.",
        variant: "destructive",
      });
      return;
    }

    if (orderType === "delivery" && !deliveryAddress) {
      toast({
        title: "Delivery address required",
        description: "Please enter a delivery address.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Order placed",
      description: `Order with ${cart.length} items has been placed successfully.`,
    });
    
    console.log("Order placed:", {
      items: cart,
      orderType,
      tableNumber,
      deliveryAddress
    });
    
    setCart([]);
    setTableNumber("");
    setDeliveryAddress("");
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  const itemsByCategory = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const cartByCategory = useMemo(() => {
    const groups: Record<string, CartItem[]> = {};
    cart.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [cart]);

  const categories = useMemo(() => {
    return Object.keys(itemsByCategory).map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1)
    }));
  }, [itemsByCategory]);

  return (
    <RestaurantLayout>
      <div className="p-2 sm:p-4 md:p-6 h-full">
        <div className="flex flex-col lg:flex-row h-full gap-4 md:gap-6">
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-3">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl md:text-2xl font-bold">Point of Sale</h1>
                {tableNumber && (
                  <Badge variant="outline" className="ml-2">
                    Table {tableNumber}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search items..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="flex-shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-y-auto pr-1 md:pr-2" style={{ maxHeight: isMobile ? "calc(40vh)" : "calc(100vh - 220px)" }}>
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <h2 className="text-lg font-semibold">{category.name}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {itemsByCategory[category.id].map((item) => (
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
                              <span className="font-bold">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3 h-full flex flex-col border rounded-lg p-3 md:p-4 bg-card text-card-foreground shadow-sm">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                <h2 className="text-lg md:text-xl font-bold">Current Order</h2>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs value={orderType} onValueChange={setOrderType} className="mb-3 md:mb-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="dine-in">Dine In</TabsTrigger>
                <TabsTrigger value="takeout">Takeout</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {orderType === "dine-in" && (
              <div className="mb-3 md:mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Table Number" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {orderType === "delivery" && (
              <div className="mb-3 md:mb-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium">Delivery Address</span>
                  </div>
                  <Textarea 
                    placeholder="Enter delivery address" 
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            )}

            <div className="flex-grow overflow-y-auto mb-3 md:mb-4" style={{ maxHeight: isMobile ? "30vh" : "inherit" }}>
              {cart.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Utensils className="mx-auto h-12 w-12 mb-4 opacity-20" />
                  <p>No items in the order yet</p>
                  <p className="text-sm">Add items from the menu</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(cartByCategory).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground capitalize">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center border-b pb-2"
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
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-3 md:pt-4">
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

              <div className="grid grid-cols-2 gap-2 md:gap-3 mt-3 md:mt-4">
                <Button 
                  variant="outline" 
                  className="gap-1 text-xs md:text-sm" 
                  disabled={cart.length === 0}
                  onClick={handlePrint}
                >
                  <Printer className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Print Receipt
                </Button>
                <Button 
                  className="gap-1 text-xs md:text-sm"
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                >
                  <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  Place Order
                </Button>
              </div>
            </div>

            <div className="hidden">
              <div ref={receiptRef} className="p-6 max-w-[300px]">
                <div className="text-center mb-4">
                  <h2 className="font-bold text-xl">Restaurant Name</h2>
                  <p className="text-sm text-muted-foreground">123 Main Street, City</p>
                  <p className="text-sm text-muted-foreground">Tel: (123) 456-7890</p>
                </div>

                <div className="mb-4">
                  <p><strong>Order Type:</strong> {orderType === 'dine-in' ? `Dine In (Table ${tableNumber})` : orderType === 'delivery' ? 'Delivery' : 'Takeout'}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
                </div>

                <div className="border-t border-b py-2 mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th>Item</th>
                        <th className="text-right">Qty</th>
                        <th className="text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td className="text-right">{item.quantity}</td>
                          <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-1 text-right">
                  <p><strong>Subtotal:</strong> ${calculateTotal().toFixed(2)}</p>
                  <p><strong>Tax (10%):</strong> ${(calculateTotal() * 0.1).toFixed(2)}</p>
                  <p className="text-lg font-bold"><strong>Total:</strong> ${(calculateTotal() * 1.1).toFixed(2)}</p>
                </div>

                <div className="mt-6 text-center text-sm">
                  <p>Thank you for your order!</p>
                  <p>Please come again</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
};

export default PosPage;
