import { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  Menu as MenuIcon, Search, Plus, Edit, Trash2, ImagePlus, 
  DollarSign, Tag, AlertTriangle, Filter, SlidersHorizontal, 
  MoreVertical, ArrowUpDown, CheckCircle, XCircle, Coffee, 
  Clock, ChevronRight, PenLine, Star, LayoutGrid, List
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AddMenuItemForm from "@/components/menu/AddMenuItemForm";
import { FilterMenu, FilterOption } from "@/components/filters/FilterMenu";

const initialCategories = [
  { id: "1", name: "Main Course", description: "Primary dishes", itemCount: 12, isActive: true },
  { id: "2", name: "Appetizers", description: "Starters and small bites", itemCount: 8, isActive: true },
  { id: "3", name: "Desserts", description: "Sweet treats", itemCount: 6, isActive: true },
  { id: "4", name: "Beverages", description: "Drinks and refreshments", itemCount: 10, isActive: true },
  { id: "5", name: "Specials", description: "Chef's recommendations", itemCount: 4, isActive: true },
];

const initialItems = [
  { 
    id: "1", 
    name: "Classic Burger", 
    category: "1", 
    description: "Juicy beef patty with lettuce, tomato, and special sauce", 
    price: 12.99, 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isActive: true,
    isFeatured: true,
    branches: ["all"],
    allergens: ["dairy", "gluten"],
    nutrition: {
      calories: 650,
      protein: "30g",
      carbs: "45g",
      fat: "35g"
    },
    variants: [
      { name: "Regular", price: 12.99 },
      { name: "Double Patty", price: 15.99 },
      { name: "No Bun (Low Carb)", price: 10.99 }
    ],
    modifiers: [
      { name: "Extra Cheese", price: 1.00 },
      { name: "Bacon", price: 1.50 },
      { name: "Avocado", price: 2.00 }
    ]
  },
  { 
    id: "2", 
    name: "Caesar Salad", 
    category: "2", 
    description: "Crisp romaine lettuce with parmesan, croutons, and Caesar dressing", 
    price: 9.99, 
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isActive: true,
    isFeatured: false,
    branches: ["all"],
    allergens: ["dairy", "gluten", "egg"],
    nutrition: {
      calories: 350,
      protein: "15g",
      carbs: "20g",
      fat: "25g"
    },
    variants: [
      { name: "Side", price: 5.99 },
      { name: "Regular", price: 9.99 },
      { name: "Large", price: 12.99 }
    ],
    modifiers: [
      { name: "Grilled Chicken", price: 3.00 },
      { name: "Shrimp", price: 4.00 },
      { name: "No Croutons", price: 0.00 }
    ]
  },
  { 
    id: "3", 
    name: "Chocolate Cake", 
    category: "3", 
    description: "Rich chocolate cake with ganache frosting", 
    price: 7.99, 
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isActive: true,
    isFeatured: false,
    branches: ["all"],
    allergens: ["dairy", "gluten", "egg"],
    nutrition: {
      calories: 450,
      protein: "5g",
      carbs: "60g",
      fat: "20g"
    },
    variants: [
      { name: "Slice", price: 7.99 },
      { name: "Whole Cake (8 slices)", price: 45.99 }
    ],
    modifiers: [
      { name: "Add Ice Cream", price: 2.00 },
      { name: "Extra Frosting", price: 1.00 }
    ]
  },
  {
    id: "4", 
    name: "Iced Coffee", 
    category: "4", 
    description: "Chilled coffee with your choice of milk", 
    price: 4.99, 
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isActive: true,
    isFeatured: false,
    branches: ["all"],
    allergens: ["dairy"],
    nutrition: {
      calories: 150,
      protein: "2g",
      carbs: "15g",
      fat: "8g"
    },
    variants: [
      { name: "Small", price: 3.99 },
      { name: "Regular", price: 4.99 },
      { name: "Large", price: 5.99 }
    ],
    modifiers: [
      { name: "Extra Shot", price: 0.75 },
      { name: "Flavored Syrup", price: 0.50 },
      { name: "Almond Milk", price: 0.75 }
    ]
  },
  { 
    id: "5", 
    name: "Chef's Special Pasta", 
    category: "5", 
    description: "Handmade pasta with seasonal ingredients", 
    price: 16.99, 
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isActive: true,
    isFeatured: true,
    branches: ["all"],
    allergens: ["gluten", "dairy"],
    nutrition: {
      calories: 750,
      protein: "25g",
      carbs: "90g",
      fat: "30g"
    },
    variants: [
      { name: "Regular", price: 16.99 },
      { name: "Gluten-Free Option", price: 18.99 }
    ],
    modifiers: [
      { name: "Add Grilled Chicken", price: 3.50 },
      { name: "Add Shrimp", price: 4.50 },
      { name: "Extra Sauce", price: 1.00 }
    ]
  }
];

const branches = [
  { id: "1", name: "Downtown" },
  { id: "2", name: "Westside" },
  { id: "3", name: "Airport" },
  { id: "4", name: "Mall Location" },
];

const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

const menuItemFormSchema = z.object({
  name: z.string().min(2, { message: "Menu item name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  description: z.string().optional(),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  branchAvailability: z.string().default("all"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export default function MenuPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [menuItems, setMenuItems] = useState(initialItems);
  const [activeTab, setActiveTab] = useState("items");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const categoryForm = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  const menuItemForm = useForm<z.infer<typeof menuItemFormSchema>>({
    resolver: zodResolver(menuItemFormSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      price: 0,
      branchAvailability: "all",
      isActive: true,
      isFeatured: false,
    },
  });

  useEffect(() => {
    if (!showNewCategoryDialog && !editingCategory) {
      categoryForm.reset();
    }
  }, [showNewCategoryDialog, editingCategory, categoryForm]);

  useEffect(() => {
    if (!showNewItemDialog && !editingItem) {
      menuItemForm.reset();
    }
  }, [showNewItemDialog, editingItem, menuItemForm]);

  useEffect(() => {
    if (editingCategory) {
      categoryForm.reset({
        name: editingCategory.name,
        description: editingCategory.description || "",
        isActive: editingCategory.isActive,
      });
    }
  }, [editingCategory, categoryForm]);

  useEffect(() => {
    if (editingItem) {
      menuItemForm.reset({
        name: editingItem.name,
        category: editingItem.category,
        description: editingItem.description || "",
        price: editingItem.price,
        branchAvailability: editingItem.branches[0],
        isActive: editingItem.isActive,
        isFeatured: editingItem.isFeatured,
      });
    }
  }, [editingItem, menuItemForm]);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = (appliedFilters.search ? 
      item.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) || 
      item.description.toLowerCase().includes(appliedFilters.search.toLowerCase())
      : true);
    
    const matchesCategory = (!appliedFilters.category || 
      appliedFilters.category.includes(item.category));
    
    const matchesActiveState = (appliedFilters.showInactive ? true : item.isActive);
    
    const matchesFeatured = (appliedFilters.onlyFeatured ? item.isFeatured : true);
    
    const matchesPriceRange = (!appliedFilters.priceRange || 
      (item.price >= appliedFilters.priceRange.min && item.price <= appliedFilters.priceRange.max));
    
    return matchesSearch && matchesCategory && matchesActiveState && matchesFeatured && matchesPriceRange;
  });

  const handleCategorySubmit = (values: z.infer<typeof categoryFormSchema>) => {
    if (editingCategory) {
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, ...values } : cat
      );
      setCategories(updatedCategories);
      toast.success("Category updated successfully!");
    } else {
      const newCategory = {
        id: (categories.length + 1).toString(),
        name: values.name,
        description: values.description || "",
        itemCount: 0,
        isActive: values.isActive,
      };
      setCategories([...categories, newCategory]);
      toast.success("Category created successfully!");
    }
    setShowNewCategoryDialog(false);
    setEditingCategory(null);
    categoryForm.reset();
  };

  const handleItemSubmit = (values: any) => {
    if (editingItem) {
      const updatedItems = menuItems.map(item => 
        item.id === editingItem.id 
        ? { 
            ...item, 
            name: values.name,
            category: values.category,
            description: values.description || "",
            price: values.price,
            image: values.image || item.image,
            branches: [values.branchAvailability || "all"],
            isActive: values.isAvailable,
            isFeatured: values.isFeatured || item.isFeatured,
          } 
        : item
      );
      setMenuItems(updatedItems);
      toast.success("Menu item updated successfully!");
    } else {
      const newItem = {
        id: (menuItems.length + 1).toString(),
        name: values.name,
        category: values.category,
        description: values.description || "",
        price: values.price,
        image: values.image || "https://via.placeholder.com/150",
        isActive: values.isAvailable,
        isFeatured: values.isFeatured || false,
        branches: [values.branchAvailability || "all"],
        allergens: values.nutritionalInfo?.allergens ? [values.nutritionalInfo.allergens] : [],
        nutrition: {
          calories: values.nutritionalInfo?.calories || "0",
          protein: "0g",
          carbs: "0g",
          fat: "0g"
        },
        variants: [],
        modifiers: [],
      };
      setMenuItems([...menuItems, newItem]);
      toast.success("Menu item created successfully!");
    }
    setShowNewItemDialog(false);
    setEditingItem(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const itemsUsingCategory = menuItems.filter(item => item.category === categoryId);
    if (itemsUsingCategory.length > 0) {
      toast.error(`Cannot delete category: ${itemsUsingCategory.length} menu items are using it.`);
      return;
    }

    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast.success("Category deleted successfully!");
  };

  const handleDeleteItem = (itemId: string) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
    toast.success("Menu item deleted successfully!");
  };

  const categoryFilterOptions: FilterOption[] = categories.map(cat => ({
    id: cat.id,
    label: cat.name,
    value: cat.id
  }));

  const handleFilterChange = (filters: Record<string, any>) => {
    setAppliedFilters(filters);
    if ('showInactive' in filters) {
      setShowInactive(!!filters.showInactive);
    }
    if (filters.category && filters.category.length > 0) {
      setFilterCategory(filters.category[0]);
    } else {
      setFilterCategory(null);
    }
    if ('search' in filters) {
      setSearchQuery(filters.search || "");
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
            <p className="text-muted-foreground">
              Create and manage your restaurant menu items and categories
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hover-scale" onClick={() => setShowNewCategoryDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
            <Button className="hover-scale" onClick={() => setShowNewItemDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </div>
        </div>

        <Tabs defaultValue="items" value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="items" className="flex items-center gap-2">
                <MenuIcon className="h-4 w-4" />
                Menu Items
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Categories
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {activeTab === "items" && (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <FilterMenu 
                  options={{
                    search: true,
                    categories: categoryFilterOptions,
                    toggles: [
                      { id: 'showInactive', label: 'Show Inactive Items' },
                      { id: 'onlyFeatured', label: 'Featured Items Only' }
                    ]
                  }}
                  onFilterChange={handleFilterChange}
                />
              </CardContent>
            </Card>
          )}

          <TabsContent value="items" className="mt-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-10 animate-fade-in">
                <Coffee className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                <h3 className="text-lg font-medium">No menu items found</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  {searchQuery || filterCategory || !showInactive
                    ? "Try adjusting your filters to see more items."
                    : "Get started by adding your first menu item."}
                </p>
                {(searchQuery || filterCategory || !showInactive) && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterCategory(null);
                      setShowInactive(false);
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                  const category = categories.find(cat => cat.id === item.category);
                  
                  return (
                    <Card key={item.id} className={`overflow-hidden hover:shadow-md transition-all duration-300 ${!item.isActive ? 'opacity-60' : ''}`}>
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.isFeatured && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
                            <Star className="h-3 w-3 mr-1" /> Featured
                          </Badge>
                        )}
                        {!item.isActive && (
                          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                            <Badge variant="destructive">Inactive</Badge>
                          </div>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem 
                              onClick={() => {
                                setEditingItem(item);
                                setShowNewItemDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" /> Edit Item
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setMenuItems(items => 
                                  items.map(i => i.id === item.id ? {...i, isFeatured: !i.isFeatured} : i)
                                );
                                toast.success(`${item.name} ${item.isFeatured ? 'removed from' : 'marked as'} featured`);
                              }}
                            >
                              <Star className="h-4 w-4 mr-2" /> {item.isFeatured ? "Unmark Featured" : "Mark as Featured"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setMenuItems(items => 
                                  items.map(i => i.id === item.id ? {...i, isActive: !i.isActive} : i)
                                );
                                toast.success(`${item.name} ${item.isActive ? 'deactivated' : 'activated'}`);
                              }}
                            >
                              {item.isActive ? 
                                <><XCircle className="h-4 w-4 mr-2" /> Deactivate</> : 
                                <><CheckCircle className="h-4 w-4 mr-2" /> Activate</>
                              }
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <CardDescription>
                              {category?.name}
                            </CardDescription>
                          </div>
                          <div className="text-lg font-semibold">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        {item.variants && item.variants.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs font-medium text-muted-foreground">Variants:</div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.variants.map((variant: any, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {variant.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => {
                      const category = categories.find(cat => cat.id === item.category);
                      
                      return (
                        <TableRow key={item.id} className={!item.isActive ? 'opacity-60' : ''}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{category?.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={item.isActive ? "outline" : "secondary"}>
                              {item.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {item.isFeatured ? (
                              <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                                <Star className="h-3 w-3 mr-1" /> Featured
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setEditingItem(item);
                                  setShowNewItemDialog(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => {
                                  setMenuItems(items => 
                                    items.map(i => i.id === item.id ? {...i, isActive: !i.isActive} : i)
                                  );
                                  toast.success(`${item.name} ${item.isActive ? 'deactivated' : 'activated'}`);
                                }}
                              >
                                {item.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Menu Items</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => {
                    const itemsInCategory = menuItems.filter(item => item.category === category.id).length;
                    
                    return (
                      <TableRow key={category.id} className={`animate-fade-in ${!category.isActive ? 'opacity-60' : ''}`}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>{itemsInCategory}</TableCell>
                        <TableCell>
                          <Badge variant={category.isActive ? "outline" : "secondary"}>
                            {category.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingCategory(category);
                                setShowNewCategoryDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setCategories(cats => 
                                  cats.map(c => c.id === category.id ? {...c, isActive: !c.isActive} : c)
                                );
                                toast.success(`${category.name} ${category.isActive ? 'deactivated' : 'activated'}`);
                              }}
                            >
                              {category.isActive ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => handleDeleteCategory(category.id)}
                              disabled={itemsInCategory > 0}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showNewCategoryDialog} onOpenChange={setShowNewCategoryDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
              <DialogDescription>
                {editingCategory ? "Edit your menu category details." : "Create a new menu category."}
              </DialogDescription>
            </DialogHeader>
            <Form {...categoryForm}>
              <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-4">
                <FormField
                  control={categoryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Appetizers, Main Course" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={categoryForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Brief description of this category" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={categoryForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Active Status</FormLabel>
                        <FormDescription>Inactive categories won't appear in menus</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">{editingCategory ? "Save Changes" : "Create Category"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Edit your menu item details." : "Create a new menu item."}
              </DialogDescription>
            </DialogHeader>
            
            <AddMenuItemForm 
              onSubmit={handleItemSubmit}
              initialData={editingItem}
              categories={categories}
            />
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
