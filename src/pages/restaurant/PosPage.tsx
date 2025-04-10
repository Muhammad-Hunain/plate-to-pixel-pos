
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { 
  Coffee, Utensils, Pizza, Sandwich, IceCream, 
  Beef, Beer
} from "lucide-react";
import { MenuItems } from "@/components/pos/MenuItems";
import { OrderSummary } from "@/components/pos/OrderSummary";
import { MenuItemDialog } from "@/components/menu/MenuItemDialog";

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
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

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

  // Process payment
  const processPayment = () => {
    toast.success("Payment processed successfully!");
    setOrderItems([]);
  };

  // Print receipt
  const printReceipt = () => {
    toast("Printing receipt...");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">POS System</h1>
            <p className="text-muted-foreground">Create and manage orders</p>
          </div>
          <MenuItemDialog />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Menu Section */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <MenuItems 
                  menuCategories={menuCategories}
                  menuItems={menuItems}
                  onAddItem={addItemToOrder}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Section */}
          <div className="md:col-span-1">
            <Card className="animate-slide-in">
              <CardHeader>
                <CardTitle>Current Order</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderSummary
                  orderItems={orderItems}
                  updateItemQuantity={updateItemQuantity}
                  removeItem={removeItem}
                  menuCategories={menuCategories}
                  processPayment={processPayment}
                  printReceipt={printReceipt}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
