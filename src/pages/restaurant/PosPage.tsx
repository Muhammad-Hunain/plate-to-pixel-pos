
import { useState, useEffect, useRef } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Minus,
  X,
  Percent,
  Calculator,
  Printer,
  Receipt,
} from "lucide-react";
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';

// Mock data for menu items
const mockMenuItems = [
  { id: "1", name: "Margherita Pizza", price: 12.99, category: "Pizza" },
  { id: "2", name: "Pepperoni Pizza", price: 14.99, category: "Pizza" },
  { id: "3", name: "Chicken Alfredo Pasta", price: 15.50, category: "Pasta" },
  { id: "4", name: "Spaghetti Bolognese", price: 13.75, category: "Pasta" },
  { id: "5", name: "Classic Cheeseburger", price: 10.99, category: "Burgers" },
  { id: "6", name: "BBQ Bacon Burger", price: 12.50, category: "Burgers" },
  { id: "7", name: "Caesar Salad", price: 8.99, category: "Salads" },
  { id: "8", name: "Greek Salad", price: 9.50, category: "Salads" },
  { id: "9", name: "Coca-Cola", price: 2.50, category: "Beverages" },
  { id: "10", name: "Iced Tea", price: 2.75, category: "Beverages" },
  { id: "11", name: "Chocolate Cake", price: 6.50, category: "Desserts" },
  { id: "12", name: "Apple Pie", price: 5.99, category: "Desserts" },
];

// Type definition for menu items
type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
};

// Type definition for cart items
type CartItem = {
  menuItem: MenuItem;
  quantity: number;
};

export default function PosPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0.08); // Default tax rate of 8%
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [tenderedAmount, setTenderedAmount] = useState("");
  const [changeDue, setChangeDue] = useState(0);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState("0");
  const [isDiscountPercentage, setIsDiscountPercentage] = useState(false);
  const [isTaxPercentage, setIsTaxPercentage] = useState(true);

  const componentRef = useRef(null);

  // Function to handle printing the order receipt
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Order Receipt",
  });

  useEffect(() => {
    // Calculate change due when tendered amount changes
    const tendered = parseFloat(tenderedAmount);
    if (!isNaN(tendered)) {
      const total = calculateTotal();
      setChangeDue(Math.max(0, tendered - total));
    } else {
      setChangeDue(0);
    }
  }, [tenderedAmount, cart, discount, taxRate]);

  // Filter menu items based on search term and selected category
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Function to add a menu item to the cart
  const addToCart = (menuItem: MenuItem) => {
    const existingCartItem = cart.find(
      (cartItem) => cartItem.menuItem.id === menuItem.id
    );

    if (existingCartItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.menuItem.id === menuItem.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { menuItem, quantity: 1 }]);
    }
  };

  // Function to remove a menu item from the cart
  const removeFromCart = (menuItem: MenuItem) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem.menuItem.id !== menuItem.id
    );
    setCart(updatedCart);
  };

  // Function to increase the quantity of a cart item
  const increaseQuantity = (menuItem: MenuItem) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.menuItem.id === menuItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCart(updatedCart);
  };

  // Function to decrease the quantity of a cart item
  const decreaseQuantity = (menuItem: MenuItem) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.menuItem.id === menuItem.id
        ? cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : { ...cartItem, quantity: 1 } // Prevent quantity from going below 1
        : cartItem
    );
    setCart(updatedCart);
  };

  // Function to calculate subtotal of the cart
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.menuItem.price * cartItem.quantity,
      0
    );
  };

  // Function to calculate discount amount
  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    return isDiscountPercentage ? (subtotal * discount) / 100 : discount;
  };

  // Function to calculate tax amount
  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    const taxableAmount = subtotal - discountAmount;
    return isTaxPercentage ? taxableAmount * taxRate : taxRate;
  };

  // Function to calculate total amount
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = calculateDiscountAmount();
    const taxAmount = calculateTaxAmount();
    return subtotal - discountAmount + taxAmount;
  };

  // Function to handle opening the payment modal
  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  // Function to handle closing the payment modal
  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setTenderedAmount("");
    setChangeDue(0);
  };

  // Function to handle processing the payment
  const handleProcessPayment = () => {
    // Here, you would typically integrate with a payment gateway
    // For this example, we'll just clear the cart and close the modal
    setCart([]);
    handleClosePaymentModal();
    alert("Payment processed successfully!");
  };

  // Function to handle calculator input
  const handleCalculatorInput = (value: string) => {
    if (calculatorValue === "0") {
      setCalculatorValue(value);
    } else {
      setCalculatorValue(calculatorValue + value);
    }
  };

  // Function to handle calculator clear
  const handleCalculatorClear = () => {
    setCalculatorValue("0");
  };

  // Function to handle calculator backspace
  const handleCalculatorBackspace = () => {
    if (calculatorValue.length === 1) {
      setCalculatorValue("0");
    } else {
      setCalculatorValue(calculatorValue.slice(0, -1));
    }
  };

  // Function to handle calculator equals
  const handleCalculatorEquals = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(calculatorValue);
      setCalculatorValue(result.toString());
    } catch (error) {
      setCalculatorValue("Error");
    }
  };

  // Function to apply calculator value to discount or tax
  const applyCalculatorValue = () => {
    const value = parseFloat(calculatorValue);
    if (!isNaN(value)) {
      if (isDiscountPercentage) {
        setDiscount(value);
      } else {
        setTaxRate(value / 100);
      }
    }
    setIsCalculatorOpen(false);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setTaxRate(0.08);
    setPaymentMethod("cash");
    setIsPaymentModalOpen(false);
    setTenderedAmount("");
    setChangeDue(0);
  };

  // Get unique categories from menu items
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  return (
    <RestaurantLayout>
      <div className="container space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Point of Sale</h1>
            <p className="text-muted-foreground">
              Efficiently process transactions and manage orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">View Transactions</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Menu Section */}
          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Menu</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search menu items..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  defaultValue={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredMenuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="secondary"
                    className="justify-between hover-scale"
                    onClick={() => addToCart(item)}
                  >
                    <span>{item.name}</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary Section */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((cartItem) => (
                      <TableRow key={cartItem.menuItem.id}>
                        <TableCell className="font-medium">{cartItem.menuItem.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => decreaseQuantity(cartItem.menuItem)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{cartItem.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => increaseQuantity(cartItem.menuItem)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(cartItem.menuItem)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {cart.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          No items in cart
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="discount">Discount:</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      id="discount"
                      className="w-24 text-right"
                      value={discount.toString()}
                      onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsDiscountPercentage(!isDiscountPercentage);
                        setIsCalculatorOpen(true);
                      }}
                    >
                      {isDiscountPercentage ? <Percent className="h-4 w-4 mr-1" /> : "$"}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="tax">Tax:</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      id="tax"
                      className="w-24 text-right"
                      value={(taxRate * 100).toFixed(2)}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) / 100)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsTaxPercentage(!isTaxPercentage);
                        setIsCalculatorOpen(true);
                      }}
                    >
                      {isTaxPercentage ? <Percent className="h-4 w-4 mr-1" /> : "$"}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between font-medium">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Discount:</span>
                  <span>${calculateDiscountAmount().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Tax:</span>
                  <span>${calculateTaxAmount().toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleOpenPaymentModal}>
                Process Payment
              </Button>
              <Button variant="ghost" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment Modal */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Process Payment</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="payment-method" className="text-right">
                    Payment Method
                  </Label>
                  <Select
                    defaultValue={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger className="col-span-2">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="mobile">Mobile Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="tendered-amount" className="text-right">
                    Tendered Amount
                  </Label>
                  <Input
                    type="number"
                    id="tendered-amount"
                    className="col-span-2 text-right"
                    placeholder="0.00"
                    value={tenderedAmount}
                    onChange={(e) => setTenderedAmount(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label className="text-right">Change Due</Label>
                  <div className="col-span-2 font-medium">
                    ${changeDue.toFixed(2)}
                  </div>
                </div>
              </CardContent>
              <div className="flex justify-end space-x-2 p-4">
                <Button variant="secondary" size="sm" onClick={handleClosePaymentModal}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleProcessPayment}>
                  Process Payment
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2" 
                  onClick={handlePrint} 
                >
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Calculator Modal */}
        {isCalculatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Calculator</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Input
                  type="text"
                  className="text-right text-2xl font-medium"
                  value={calculatorValue}
                  readOnly
                />
                <div className="grid grid-cols-4 gap-2">
                  <Button variant="secondary" onClick={() => handleCalculatorInput("7")}>
                    7
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("8")}>
                    8
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("9")}>
                    9
                  </Button>
                  <Button variant="outline" onClick={() => handleCalculatorBackspace()}>
                    &#9003;
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("4")}>
                    4
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("5")}>
                    5
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("6")}>
                    6
                  </Button>
                  <Button variant="outline" onClick={() => handleCalculatorClear()}>
                    C
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("1")}>
                    1
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("2")}>
                    2
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("3")}>
                    3
                  </Button>
                  <Button variant="outline" onClick={() => handleCalculatorInput("+")}>
                    +
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput("0")}>
                    0
                  </Button>
                  <Button variant="secondary" onClick={() => handleCalculatorInput(".")}>
                    .
                  </Button>
                  <Button variant="outline" onClick={() => handleCalculatorInput("-")}>
                    -
                  </Button>
                  <Button variant="outline" onClick={() => handleCalculatorEquals()}>
                    =
                  </Button>
                </div>
              </CardContent>
              <div className="flex justify-end space-x-2 p-4">
                <Button variant="secondary" size="sm" onClick={() => setIsCalculatorOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={applyCalculatorValue}>
                  Apply
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        {/* Receipt Component (Hidden) */}
        <div style={{ display: 'none' }}>
          <div ref={componentRef} className="p-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold">Restaurant Name</h2>
              <p>123 Main Street, City, State</p>
              <p>Date: {format(new Date(), 'PPP pp')}</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.map((cartItem) => (
                  <TableRow key={cartItem.menuItem.id}>
                    <TableCell className="font-medium">{cartItem.menuItem.name}</TableCell>
                    <TableCell className="text-right">{cartItem.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${(cartItem.menuItem.price * cartItem.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between font-medium">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Discount:</span>
                <span>${calculateDiscountAmount().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Tax:</span>
                <span>${calculateTaxAmount().toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <div className="text-center mt-4">
              <p>Thank you for your order!</p>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
