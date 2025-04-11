import React, { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useReactToPrint } from "react-to-print";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import {
  CreditCard,
  DollarSign,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  WalletCards,
  Printer,
  Utensils,
  Coffee,
  GlassWater,
  IceCream,
  Beef,
} from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Main",
    price: 12.99,
    description: "Juicy beef patty with lettuce, tomato, and special sauce.",
    image: "/images/burger.jpg",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Main",
    price: 14.50,
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil.",
    image: "/images/pizza.jpg",
  },
  {
    id: 3,
    name: "Caesar Salad",
    category: "Side",
    price: 8.75,
    description: "Fresh romaine lettuce with parmesan cheese and Caesar dressing.",
    image: "/images/salad.jpg",
  },
  {
    id: 4,
    name: "Iced Coffee",
    category: "Drink",
    price: 4.25,
    description: "Refreshing iced coffee with a hint of vanilla.",
    image: "/images/iced_coffee.jpg",
  },
  {
    id: 5,
    name: "Chocolate Ice Cream",
    category: "Dessert",
    price: 6.00,
    description: "Rich chocolate ice cream with fudge swirls.",
    image: "/images/ice_cream.jpg",
  },
  {
    id: 6,
    name: "Steak",
    category: "Main",
    price: 25.00,
    description: "Delicious steak with your choice of sides.",
    image: "/images/steak.jpeg",
  },
  {
    id: 7,
    name: "Water",
    category: "Drink",
    price: 1.00,
    description: "Refreshing water.",
    image: "/images/water.jpeg",
  },
];

export default function PosPage() {
  const [category, setCategory] = useState("Main");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discount, setDiscount] = useState(0);

  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: 'Receipt',
    onAfterPrint: () => {
      toast({
        title: "Receipt printed",
        description: "The receipt has been sent to your printer."
      });
    },
    printRef: receiptRef
  });

  const filteredMenuItems = useMemo(() => {
    return menuItems
      .filter((item) => item.category === category)
      .filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [category, searchQuery]);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (itemIndex !== -1) {
        const newCart = [...prevCart];
        newCart.splice(itemIndex, 1);
        return newCart;
      }
      return prevCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  const calculateDiscountedTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const calculateTotal = () => {
    return calculateDiscountedTotal();
  };

  return (
    <RestaurantLayout>
      <div className="container relative pb-20">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-3/4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Menu</CardTitle>
                <Input
                  type="search"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="Main" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="Main" onClick={() => setCategory("Main")}>
                      <Utensils className="h-4 w-4 mr-2" />
                      Main
                    </TabsTrigger>
                    <TabsTrigger value="Side" onClick={() => setCategory("Side")}>
                      <Package className="h-4 w-4 mr-2" />
                      Side
                    </TabsTrigger>
                    <TabsTrigger value="Drink" onClick={() => setCategory("Drink")}>
                      <Coffee className="h-4 w-4 mr-2" />
                      Drink
                    </TabsTrigger>
                    <TabsTrigger value="Dessert" onClick={() => setCategory("Dessert")}>
                      <IceCream className="h-4 w-4 mr-2" />
                      Dessert
                    </TabsTrigger>
                  </TabsList>
                  <Separator />
                  <TabsContent value="Main" className="space-y-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {filteredMenuItems.map((item) => (
                        <Card key={item.id} className="cursor-pointer hover:opacity-75 transition">
                          <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="aspect-square">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-full h-full rounded-md"
                            />
                          </CardContent>
                          <CardFooter className="justify-between">
                            <span>${item.price.toFixed(2)}</span>
                            <Button size="sm" onClick={() => addToCart(item)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="Side" className="space-y-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {filteredMenuItems.map((item) => (
                        <Card key={item.id} className="cursor-pointer hover:opacity-75 transition">
                          <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="aspect-square">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-full h-full rounded-md"
                            />
                          </CardContent>
                          <CardFooter className="justify-between">
                            <span>${item.price.toFixed(2)}</span>
                            <Button size="sm" onClick={() => addToCart(item)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="Drink" className="space-y-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {filteredMenuItems.map((item) => (
                        <Card key={item.id} className="cursor-pointer hover:opacity-75 transition">
                          <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="aspect-square">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-full h-full rounded-md"
                            />
                          </CardContent>
                          <CardFooter className="justify-between">
                            <span>${item.price.toFixed(2)}</span>
                            <Button size="sm" onClick={() => addToCart(item)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="Dessert" className="space-y-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {filteredMenuItems.map((item) => (
                        <Card key={item.id} className="cursor-pointer hover:opacity-75 transition">
                          <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="aspect-square">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="object-cover w-full h-full rounded-md"
                            />
                          </CardContent>
                          <CardFooter className="justify-between">
                            <span>${item.price.toFixed(2)}</span>
                            <Button size="sm" onClick={() => addToCart(item)}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Cart</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <span>{item.name}</span>
                        <div className="flex items-center space-x-2">
                          <span>${item.price.toFixed(2)}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(item)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount ({discount}%):</span>
                  <span>-${((calculateSubtotal() * discount) / 100).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <Input
                  type="number"
                  placeholder="Discount %"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="cash">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Cash
                      </SelectItem>
                      <SelectItem value="credit">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit Card
                      </SelectItem>
                      <SelectItem value="mobile">
                        <WalletCards className="h-4 w-4 mr-2" />
                        Mobile Wallet
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-1" 
                  disabled={cart.length === 0}
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 mr-1" />
                  Print Receipt
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="hidden">
            <div ref={receiptRef} className="p-4">
              <h1 className="text-2xl font-bold text-center">Restaurant Name</h1>
              <p className="text-center text-sm">123 Main St, City, State</p>
              <Separator className="my-2" />
              <h2 className="text-lg font-semibold">Order Details</h2>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount ({discount}%):</span>
                <span>-${((calculateSubtotal() * discount) / 100).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <p className="text-center text-sm">Thank you for your order!</p>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
