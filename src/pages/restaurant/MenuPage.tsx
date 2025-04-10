
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
