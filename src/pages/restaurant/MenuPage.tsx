
import { useState } from "react";
import { MenuItemDialog } from "@/components/menu/MenuItemDialog";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { toast } from "sonner";

// Define MenuPage component with proper export
const MenuPage = () => {
  // Add state for menu items
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic cheese and tomato pizza",
      price: 12.99,
      category: "2", // Main Course
      imageUrl: "placeholder.svg",
      isActive: true,
      isFeatured: true,
      branchAvailability: ["1", "2"], // Available at specified branches
    },
    {
      id: 2,
      name: "Chicken Caesar Salad",
      description: "Fresh salad with grilled chicken",
      price: 9.99,
      category: "1", // Starters
      imageUrl: "placeholder.svg",
      isActive: true,
      isFeatured: false,
      branchAvailability: ["1", "2", "3", "4"], // Available at all branches
    }
  ]);

  // Fix the handleAddItem method to properly handle imageUrl
  const handleAddItem = (data: any) => {
    const newItem = {
      id: menuItems.length + 1,
      name: data.name,
      description: data.description || "",
      price: parseFloat(data.price) || 0,
      category: data.category || "Uncategorized",
      imageUrl: data.imageUrl || "placeholder.svg", // Fixed imageUrl property
      isActive: data.isActive !== undefined ? data.isActive : true,
      isFeatured: data.isFeatured || false,
      branchAvailability: data.branches || ["All Branches"],
    };
    
    setMenuItems((prev) => [...prev, newItem]);
    toast.success("Menu item added successfully!");
  };

  return (
    <RestaurantLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <div className="flex gap-2">
          <MenuItemDialog onAddItem={handleAddItem} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{item.name}</h3>
              <span className="font-bold">${item.price.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 mb-2 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </RestaurantLayout>
  );
};

export default MenuPage;
