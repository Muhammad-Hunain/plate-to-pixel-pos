
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  FileDown,
  Filter,
  LayoutGrid,
  LineChart,
  MoreHorizontal,
  Package,
  Search,
  Warehouse,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";
import { toast } from "sonner";
import ExportDropdown from "@/components/common/ExportDropdown";
import { addDays } from "date-fns";

// Types
interface InventoryHistoryItem {
  id: string;
  date: string;
  itemName: string;
  itemCategory: string;
  branch: string;
  previousQuantity: number;
  newQuantity: number;
  change: number;
  unit: string;
  type: "restock" | "use" | "transfer" | "adjustment" | "waste";
  staff: string;
  notes?: string;
}

// Mock data for the inventory history
const mockInventoryHistory: InventoryHistoryItem[] = [
  {
    id: "1",
    date: "2025-04-08T10:30:00",
    itemName: "All-purpose Flour",
    itemCategory: "Dry Goods",
    branch: "Downtown",
    previousQuantity: 30,
    newQuantity: 45,
    change: 15,
    unit: "kg",
    type: "restock",
    staff: "John Smith",
    notes: "Regular weekly delivery"
  },
  {
    id: "2",
    date: "2025-04-08T12:45:00",
    itemName: "Mozzarella Cheese",
    itemCategory: "Dairy",
    branch: "Downtown",
    previousQuantity: 15,
    newQuantity: 12,
    change: -3,
    unit: "kg",
    type: "use",
    staff: "Maria Garcia",
    notes: "Used for lunch service"
  },
  {
    id: "3",
    date: "2025-04-07T14:20:00",
    itemName: "Tomato Sauce",
    itemCategory: "Sauces",
    branch: "Downtown",
    previousQuantity: 10,
    newQuantity: 8,
    change: -2,
    unit: "liters",
    type: "use",
    staff: "Maria Garcia"
  },
  {
    id: "4",
    date: "2025-04-06T09:15:00",
    itemName: "Chicken Breast",
    itemCategory: "Meat",
    branch: "Downtown",
    previousQuantity: 20,
    newQuantity: 25,
    change: 5,
    unit: "kg",
    type: "restock",
    staff: "John Smith",
    notes: "Emergency restock due to high demand"
  },
  {
    id: "5",
    date: "2025-04-05T16:40:00",
    itemName: "Olive Oil",
    itemCategory: "Oils",
    branch: "Downtown",
    previousQuantity: 8,
    newQuantity: 5,
    change: -3,
    unit: "liters",
    type: "transfer",
    staff: "Alex Johnson",
    notes: "Transferred to Uptown branch"
  },
  {
    id: "6",
    date: "2025-04-04T11:10:00",
    itemName: "Paper Napkins",
    itemCategory: "Supplies",
    branch: "Downtown",
    previousQuantity: 10,
    newQuantity: 30,
    change: 20,
    unit: "packs",
    type: "restock",
    staff: "John Smith"
  },
  {
    id: "7",
    date: "2025-04-03T14:30:00",
    itemName: "Chicken Breast",
    itemCategory: "Meat",
    branch: "Downtown",
    previousQuantity: 22,
    newQuantity: 20,
    change: -2,
    unit: "kg",
    type: "waste",
    staff: "Maria Garcia",
    notes: "Expired product"
  },
  {
    id: "8",
    date: "2025-04-02T10:00:00",
    itemName: "Mozzarella Cheese",
    itemCategory: "Dairy",
    branch: "Downtown",
    previousQuantity: 18,
    newQuantity: 15,
    change: -3,
    unit: "kg",
    type: "use",
    staff: "Maria Garcia"
  },
  {
    id: "9",
    date: "2025-04-01T09:30:00",
    itemName: "All-purpose Flour",
    itemCategory: "Dry Goods",
    branch: "Downtown",
    previousQuantity: 25,
    newQuantity: 30,
    change: 5,
    unit: "kg",
    type: "adjustment",
    staff: "Alex Johnson",
    notes: "Inventory count correction"
  },
  {
    id: "10",
    date: "2025-03-31T15:20:00",
    itemName: "Tomato Sauce",
    itemCategory: "Sauces",
    branch: "Downtown",
    previousQuantity: 12,
    newQuantity: 10,
    change: -2,
    unit: "liters",
    type: "use",
    staff: "Maria Garcia"
  }
];

// Available branches
const branches = [
  "All Branches",
  "Downtown",
  "Uptown",
  "Westside",
  "Airport"
];

// Available categories
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

export default function InventoryHistoryPage() {
  const [inventoryHistory, setInventoryHistory] = useState<InventoryHistoryItem[]>(mockInventoryHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  // Filter inventory history based on search, branch, category, date range, and tab
  const filteredHistory = inventoryHistory.filter((item) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.staff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by branch
    const matchesBranch =
      selectedBranch === "All Branches" || item.branch === selectedBranch;

    // Filter by category
    const matchesCategory =
      selectedCategory === "All Categories" || item.itemCategory === selectedCategory;

    // Filter by date range
    const itemDate = new Date(item.date);
    const matchesDateRange =
      !dateRange?.from ||
      !dateRange?.to ||
      (itemDate >= dateRange.from && itemDate <= dateRange.to);

    // Filter by tab (type)
    const matchesTab =
      activeTab === "all" || activeTab === item.type;

    return matchesSearch && matchesBranch && matchesCategory && matchesDateRange && matchesTab;
  });

  const handleExport = (format: "pdf" | "csv") => {
    toast.success(`Exported inventory history as ${format.toUpperCase()}`);
  };

  // Helper function to get badge style based on transaction type
  const getTransactionBadge = (type: InventoryHistoryItem["type"]) => {
    switch (type) {
      case "restock":
        return <Badge variant="default" className="bg-green-500">Restock</Badge>;
      case "use":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Use</Badge>;
      case "transfer":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Transfer</Badge>;
      case "adjustment":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Adjustment</Badge>;
      case "waste":
        return <Badge variant="destructive">Waste</Badge>;
    }
  };

  // Helper function to get color for quantity change
  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory History</h1>
            <p className="text-muted-foreground">
              Track all inventory changes, restocks, and usage
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ExportDropdown onExport={handleExport} />
            
            <div className="hidden sm:flex items-center ml-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("list")}
              >
                <LineChart className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedStatsCard
            title="Total Transactions"
            value={filteredHistory.length.toString()}
            icon={<Package className="h-4 w-4" />}
            delay={1}
          />
          <AnimatedStatsCard
            title="Restock Events"
            value={inventoryHistory.filter(item => item.type === "restock").length.toString()}
            icon={<Warehouse className="h-4 w-4" />}
            description="In selected period"
            delay={2}
          />
          <AnimatedStatsCard
            title="Usage Events"
            value={inventoryHistory.filter(item => item.type === "use").length.toString()}
            icon={<Calendar className="h-4 w-4" />}
            description="In selected period"
            delay={3}
          />
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search history..."
                  className="w-full sm:w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
              <div className="flex gap-2 w-full sm:w-auto">
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-6 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="restock">Restock</TabsTrigger>
                <TabsTrigger value="use">Use</TabsTrigger>
                <TabsTrigger value="transfer">Transfer</TabsTrigger>
                <TabsTrigger value="adjustment">Adjustment</TabsTrigger>
                <TabsTrigger value="waste">Waste</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {viewMode === "list" ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Transaction</TableHead>
                          <TableHead>Change</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Staff</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHistory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No inventory history found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredHistory.map((item) => (
                            <TableRow key={item.id} className="hover-scale-subtle">
                              <TableCell>
                                {new Date(item.date).toLocaleDateString()} 
                                <div className="text-xs text-muted-foreground">
                                  {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{item.itemName}</TableCell>
                              <TableCell>{item.itemCategory}</TableCell>
                              <TableCell>{getTransactionBadge(item.type)}</TableCell>
                              <TableCell className={getChangeColor(item.change)}>
                                {item.change > 0 && "+"}{item.change} {item.unit}
                                <div className="text-xs text-muted-foreground">
                                  {item.previousQuantity} → {item.newQuantity} {item.unit}
                                </div>
                              </TableCell>
                              <TableCell>{item.branch}</TableCell>
                              <TableCell>{item.staff}</TableCell>
                              <TableCell>
                                {item.notes ? (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem className="text-xs">{item.notes}</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                ) : (
                                  <span className="text-xs text-muted-foreground">-</span>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredHistory.length === 0 ? (
                      <div className="col-span-3 text-center py-8 text-muted-foreground">
                        No inventory history found
                      </div>
                    ) : (
                      filteredHistory.map((item) => (
                        <Card key={item.id} className="hover-scale-subtle overflow-hidden">
                          <CardHeader className="pb-2 flex flex-row justify-between items-start">
                            <div>
                              <CardTitle className="text-base">{item.itemName}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            {getTransactionBadge(item.type)}
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Change:</span>
                              <span className={`font-medium ${getChangeColor(item.change)}`}>
                                {item.change > 0 && "+"}{item.change} {item.unit}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Quantity:</span>
                              <span className="text-sm">
                                {item.previousQuantity} → {item.newQuantity} {item.unit}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Category:</span>
                              <span className="text-sm">{item.itemCategory}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Branch:</span>
                              <span className="text-sm">{item.branch}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Staff:</span>
                              <span className="text-sm">{item.staff}</span>
                            </div>
                            {item.notes && (
                              <div className="pt-2 border-t">
                                <span className="text-sm font-medium">Notes:</span>
                                <p className="text-sm text-muted-foreground">{item.notes}</p>
                              </div>
                            )}
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
    </RestaurantLayout>
  );
}
