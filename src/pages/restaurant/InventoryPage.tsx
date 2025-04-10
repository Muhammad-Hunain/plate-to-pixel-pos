
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Filter,
  Package,
  BarChart3,
  AlertTriangle,
  ArrowLeftRight,
  CalendarClock,
  Circle,
  Clipboard,
  Building,
  History,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Interfaces
interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  cost: number;
  lastRestocked: string;
  expiryDate?: string;
  supplier: string;
  branch: string;
  minimumLevel: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  notes?: string;
  linkedMenu?: string[];
}

// Mock data
const mockInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "All-purpose Flour",
    category: "Dry Goods",
    quantity: 45,
    unit: "kg",
    cost: 1.2,
    lastRestocked: "2023-04-01",
    expiryDate: "2023-07-15",
    supplier: "Global Foods Inc",
    branch: "Downtown",
    minimumLevel: 20,
    status: "in-stock",
    linkedMenu: ["Margherita Pizza", "Garlic Bread"]
  },
  {
    id: "2",
    name: "Mozzarella Cheese",
    category: "Dairy",
    quantity: 12,
    unit: "kg",
    cost: 6.5,
    lastRestocked: "2023-04-05",
    expiryDate: "2023-04-20",
    supplier: "Local Dairy Co.",
    branch: "Downtown",
    minimumLevel: 15,
    status: "low-stock",
    linkedMenu: ["Margherita Pizza", "Cheese Lasagna"]
  },
  {
    id: "3",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 25,
    unit: "kg",
    cost: 8.75,
    lastRestocked: "2023-04-07",
    expiryDate: "2023-04-14",
    supplier: "Premium Meats Ltd.",
    branch: "Uptown",
    minimumLevel: 10,
    status: "in-stock",
    linkedMenu: ["Chicken Parmesan", "Chicken Alfredo"]
  },
  {
    id: "4",
    name: "Tomato Sauce",
    category: "Sauces",
    quantity: 8,
    unit: "liters",
    cost: 3.25,
    lastRestocked: "2023-03-28",
    expiryDate: "2023-06-28",
    supplier: "Italian Imports",
    branch: "Downtown",
    minimumLevel: 10,
    status: "low-stock",
    linkedMenu: ["Margherita Pizza", "Spaghetti Bolognese"]
  },
  {
    id: "5",
    name: "Paper Napkins",
    category: "Supplies",
    quantity: 0,
    unit: "packs",
    cost: 2.50,
    lastRestocked: "2023-03-15",
    supplier: "Restaurant Supplies Co.",
    branch: "Downtown",
    minimumLevel: 20,
    status: "out-of-stock"
  },
  {
    id: "6",
    name: "Olive Oil",
    category: "Oils",
    quantity: 18,
    unit: "liters",
    cost: 12.99,
    lastRestocked: "2023-03-20",
    expiryDate: "2023-09-20",
    supplier: "Italian Imports",
    branch: "Uptown",
    minimumLevel: 5,
    status: "in-stock",
    notes: "Extra virgin, cold-pressed"
  },
];

const categories = [
  "All Categories",
  "Dry Goods",
  "Dairy",
  "Meat",
  "Seafood",
  "Produce",
  "Oils",
  "Sauces",
  "Spices",
  "Beverages",
  "Supplies",
  "Packaging"
];

const units = [
  "kg",
  "liters",
  "packs",
  "boxes",
  "units",
  "bottles",
  "cans",
  "bags",
  "bunches",
  "dozens"
];

const branches = [
  "All Branches",
  "Downtown",
  "Uptown",
  "Westside",
  "Airport"
];

const suppliers = [
  "Global Foods Inc",
  "Local Dairy Co.",
  "Premium Meats Ltd.",
  "Italian Imports",
  "Restaurant Supplies Co.",
  "Fresh Produce Farms",
  "Beverage Distributors"
];

export default function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(mockInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [viewMode, setViewMode] = useState("table");

  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      quantity: 0,
      unit: "kg",
      cost: 0,
      supplier: "",
      branch: "Downtown",
      minimumLevel: 10,
      notes: "",
      expiryDate: "",
    },
  });

  const transferForm = useForm({
    defaultValues: {
      fromBranch: "",
      toBranch: "",
      quantity: 1,
    },
  });

  // Filter inventory items based on search, category, branch, and tab
  const filteredItems = inventoryItems.filter((item) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by category
    const matchesCategory =
      selectedCategory === "All Categories" || item.category === selectedCategory;

    // Filter by branch
    const matchesBranch =
      selectedBranch === "All Branches" || item.branch === selectedBranch;

    // Filter by tab (status)
    const matchesTab =
      activeTab === "all" || item.status === activeTab;

    return matchesSearch && matchesCategory && matchesBranch && matchesTab;
  });

  const lowStockItems = inventoryItems.filter(item => item.status === "low-stock" || item.status === "out-of-stock");
  const expiringItems = inventoryItems.filter(item => 
    item.expiryDate && new Date(item.expiryDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  const handleAddItem = (data: any) => {
    const newItem: InventoryItem = {
      id: String(inventoryItems.length + 1),
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      unit: data.unit,
      cost: data.cost,
      lastRestocked: new Date().toISOString().split("T")[0],
      expiryDate: data.expiryDate || undefined,
      supplier: data.supplier,
      branch: data.branch,
      minimumLevel: data.minimumLevel,
      status: data.quantity === 0 ? "out-of-stock" : data.quantity <= data.minimumLevel ? "low-stock" : "in-stock",
      notes: data.notes || undefined,
    };

    if (currentItem) {
      // Edit existing item
      const updatedItems = inventoryItems.map((item) =>
        item.id === currentItem.id ? { ...item, ...newItem, id: item.id } : item
      );
      setInventoryItems(updatedItems);
      toast.success(`Inventory item "${newItem.name}" updated successfully!`);
    } else {
      // Add new item
      setInventoryItems([...inventoryItems, newItem]);
      toast.success(`Inventory item "${newItem.name}" added successfully!`);
    }

    form.reset();
    setIsAddDialogOpen(false);
    setCurrentItem(null);
  };

  const handleTransferItem = (data: any) => {
    if (currentItem) {
      toast.success(`Transferred ${data.quantity} ${currentItem.unit} of ${currentItem.name} from ${data.fromBranch} to ${data.toBranch}`);
      setIsTransferDialogOpen(false);
      transferForm.reset();
    }
  };

  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    form.reset({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      cost: item.cost,
      supplier: item.supplier,
      branch: item.branch,
      minimumLevel: item.minimumLevel,
      notes: item.notes || "",
      expiryDate: item.expiryDate || "",
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = inventoryItems.filter((item) => item.id !== id);
    setInventoryItems(updatedItems);
    toast.success("Inventory item removed successfully!");
  };

  const handleInitiateTransfer = (item: InventoryItem) => {
    setCurrentItem(item);
    transferForm.reset({
      fromBranch: item.branch,
      toBranch: "",
      quantity: 1,
    });
    setIsTransferDialogOpen(true);
  };

  // Helper function to get badge style based on item status
  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "in-stock":
        return <Badge variant="default" className="bg-green-500">In Stock</Badge>;
      case "low-stock":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Low Stock</Badge>;
      case "out-of-stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground">
              Track your restaurant inventory and supplies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="hover-scale">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>{currentItem ? "Edit" : "Add New"} Inventory Item</DialogTitle>
                  <DialogDescription>
                    {currentItem
                      ? "Update inventory item details and quantities"
                      : "Add a new item to your restaurant inventory"}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddItem)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., All-purpose Flour" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.slice(1).map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {units.map((unit) => (
                                  <SelectItem key={unit} value={unit}>
                                    {unit}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cost per Unit ($)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="minimumLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Level</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Alert when stock falls below this level
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="supplier"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Supplier</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select supplier" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {suppliers.map((supplier) => (
                                  <SelectItem key={supplier} value={supplier}>
                                    {supplier}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="branch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Branch</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select branch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {branches.slice(1).map((branch) => (
                                  <SelectItem key={branch} value={branch}>
                                    {branch}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Input placeholder="Additional information" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full sm:w-auto">
                        {currentItem ? "Update Item" : "Add Item"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Transfer Inventory</DialogTitle>
                  <DialogDescription>
                    {currentItem && `Transfer ${currentItem.name} between branches`}
                  </DialogDescription>
                </DialogHeader>
                
                {currentItem && (
                  <Form {...transferForm}>
                    <form onSubmit={transferForm.handleSubmit(handleTransferItem)} className="space-y-4">
                      <FormField
                        control={transferForm.control}
                        name="fromBranch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Branch</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select source branch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {branches.slice(1).map((branch) => (
                                  <SelectItem key={branch} value={branch}>
                                    {branch}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={transferForm.control}
                        name="toBranch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>To Branch</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select destination branch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {branches.slice(1)
                                  .filter(branch => branch !== transferForm.getValues("fromBranch"))
                                  .map((branch) => (
                                    <SelectItem key={branch} value={branch}>
                                      {branch}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={transferForm.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity ({currentItem.unit})</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max={currentItem.quantity}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Available: {currentItem.quantity} {currentItem.unit}
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit" className="w-full sm:w-auto">
                          Transfer Item
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                )}
              </DialogContent>
            </Dialog>

            <div className="hidden sm:flex items-center ml-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("table")}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("grid")}
              >
                <Package className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedStatsCard
            title="Total Items"
            value={inventoryItems.length.toString()}
            icon={<Package className="h-4 w-4" />}
            delay={1}
          />
          <AnimatedStatsCard
            title="Low Stock Items"
            value={lowStockItems.length.toString()}
            icon={<AlertTriangle className="h-4 w-4" />}
            description={lowStockItems.length > 0 ? "Items need restocking" : "All items well stocked"}
            trend={lowStockItems.length > 0 ? {
              value: `${lowStockItems.length} need attention`,
              positive: false
            } : undefined}
            delay={2}
          />
          <AnimatedStatsCard
            title="Expiring Soon"
            value={expiringItems.length.toString()}
            icon={<CalendarClock className="h-4 w-4" />}
            description="Items expiring in 7 days"
            trend={expiringItems.length > 0 ? {
              value: `${expiringItems.length} expiring soon`,
              positive: false
            } : {
              value: "All items fresh",
              positive: true
            }}
            delay={3}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/3">
            <Card className="animate-fade-in [animation-delay:100ms]">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Inventory Items</CardTitle>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search inventory..."
                      className="w-full sm:w-[250px] pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
                      <SelectTrigger className="w-full sm:w-[180px]">
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
                    <Select onValueChange={setSelectedBranch} defaultValue={selectedBranch}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs onValueChange={setActiveTab} value={activeTab}>
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="in-stock">In Stock</TabsTrigger>
                    <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                    <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-4">
                    {viewMode === "table" ? (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead>Quantity</TableHead>
                              <TableHead>Branch</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredItems.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                  No inventory items found
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredItems.map((item) => (
                                <TableRow key={item.id} className="hover-scale-subtle">
                                  <TableCell className="font-medium">{item.name}</TableCell>
                                  <TableCell>{item.category}</TableCell>
                                  <TableCell>
                                    {item.quantity} {item.unit}
                                    <div className="w-24 mt-1">
                                      <Progress
                                        value={(item.quantity / item.minimumLevel) * 50}
                                        className="h-1.5"
                                        indicatorClassName={
                                          item.status === "out-of-stock"
                                            ? "bg-destructive"
                                            : item.status === "low-stock"
                                            ? "bg-amber-500"
                                            : "bg-green-500"
                                        }
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell>{item.branch}</TableCell>
                                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleInitiateTransfer(item)}>
                                          <ArrowLeftRight className="mr-2 h-4 w-4" />
                                          Transfer
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-destructive"
                                          onClick={() => handleDeleteItem(item.id)}
                                        >
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredItems.length === 0 ? (
                          <div className="col-span-2 text-center py-8 text-muted-foreground">
                            No inventory items found
                          </div>
                        ) : (
                          filteredItems.map((item) => (
                            <Card key={item.id} className="hover-scale-subtle overflow-hidden">
                              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                                <div>
                                  <CardTitle className="text-base">{item.name}</CardTitle>
                                  <p className="text-sm text-muted-foreground">{item.category}</p>
                                </div>
                                {getStatusBadge(item.status)}
                              </CardHeader>
                              <CardContent className="pb-3">
                                <div className="space-y-3">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">Quantity:</span>
                                    <span className="font-medium">{item.quantity} {item.unit}</span>
                                  </div>
                                  <div className="w-full">
                                    <Progress
                                      value={(item.quantity / item.minimumLevel) * 50}
                                      className="h-1.5"
                                      indicatorClassName={
                                        item.status === "out-of-stock"
                                          ? "bg-destructive"
                                          : item.status === "low-stock"
                                          ? "bg-amber-500"
                                          : "bg-green-500"
                                      }
                                    />
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">Branch:</span>
                                    <span className="font-medium">{item.branch}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm">Cost:</span>
                                    <span className="font-medium">${item.cost.toFixed(2)} / {item.unit}</span>
                                  </div>
                                  {item.expiryDate && (
                                    <div className="flex justify-between items-center">
                                      <span className="text-sm">Expiry:</span>
                                      <span className="font-medium">{item.expiryDate}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditItem(item)}
                                  >
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                  </Button>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => handleInitiateTransfer(item)}
                                  >
                                    <ArrowLeftRight className="h-4 w-4 mr-1" /> Transfer
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full sm:w-1/3 space-y-4">
            <AnimatedDashboardCard
              title="Low Stock Alerts"
              delay={2}
              className="animate-fade-in [animation-delay:200ms]"
              headerClassName="bg-amber-50"
              rightHeader={
                <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                  {lowStockItems.length} items
                </Badge>
              }
            >
              {lowStockItems.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Circle className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-2" />
                  <p>All items are well stocked</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lowStockItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-start justify-between pb-3 border-b last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.branch} · {item.category}
                        </p>
                        <div className="flex items-center mt-1">
                          {item.status === "out-of-stock" ? (
                            <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                          ) : (
                            <Badge variant="outline" className="border-amber-500 text-amber-500 text-xs">
                              {item.quantity} {item.unit} left
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {lowStockItems.length > 5 && (
                    <Button variant="outline" className="w-full mt-2" size="sm">
                      View all {lowStockItems.length} items
                    </Button>
                  )}
                </div>
              )}
            </AnimatedDashboardCard>

            <AnimatedDashboardCard
              title="Inventory Usage"
              delay={3}
              className="animate-fade-in [animation-delay:300ms]"
              rightHeader={
                <Button variant="ghost" size="icon">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              }
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Top Used Items (Last 7 Days)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Mozzarella Cheese</span>
                      <span className="text-sm font-medium">18 kg</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tomato Sauce</span>
                      <span className="text-sm font-medium">12 liters</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Chicken Breast</span>
                      <span className="text-sm font-medium">10 kg</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Inventory Value</h3>
                    <span className="text-sm font-medium">$5,240.75</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <span>By Branch</span>
                    <span>Total</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="h-2 bg-blue-500 rounded-full flex-1" style={{ width: "45%" }}></div>
                    <div className="h-2 bg-green-500 rounded-full flex-1" style={{ width: "30%" }}></div>
                    <div className="h-2 bg-amber-500 rounded-full flex-1" style={{ width: "15%" }}></div>
                    <div className="h-2 bg-purple-500 rounded-full flex-1" style={{ width: "10%" }}></div>
                  </div>
                  <div className="flex text-xs mt-1 flex-wrap gap-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-1"></div>
                      <span>Downtown (45%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                      <span>Uptown (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-amber-500 rounded-full mr-1"></div>
                      <span>Westside (15%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-purple-500 rounded-full mr-1"></div>
                      <span>Airport (10%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-t pt-3 mt-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <History className="mr-2 h-4 w-4" />
                    Inventory History
                  </Button>
                </div>
              </div>
            </AnimatedDashboardCard>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
