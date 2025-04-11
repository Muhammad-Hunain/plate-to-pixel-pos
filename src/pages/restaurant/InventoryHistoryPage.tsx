
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Calendar,
  History,
  ArrowUp,
  ArrowDown,
  Download,
  Package,
  ArrowLeftRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { addDays, format, subDays } from "date-fns";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";
import AnimatedStatsCard from "@/components/dashboard/AnimatedStatsCard";

// Type definitions
interface InventoryTransaction {
  id: string;
  date: string;
  itemName: string;
  category: string;
  type: "in" | "out" | "transfer" | "adjust" | "expired";
  quantity: number;
  unit: string;
  branch: string;
  user: string;
  note?: string;
  supplier?: string;
  destination?: string;
}

// Mock data for inventory transactions
const mockInventoryTransactions: InventoryTransaction[] = [
  {
    id: "t1",
    date: "2023-04-10 09:15",
    itemName: "All-purpose Flour",
    category: "Dry Goods",
    type: "in",
    quantity: 25,
    unit: "kg",
    branch: "Downtown",
    user: "John Doe",
    supplier: "Global Foods Inc",
    note: "Regular weekly order"
  },
  {
    id: "t2",
    date: "2023-04-09 14:30",
    itemName: "Mozzarella Cheese",
    category: "Dairy",
    type: "out",
    quantity: 3.5,
    unit: "kg",
    branch: "Downtown",
    user: "Maria Garcia",
    note: "Used for weekend special pizza"
  },
  {
    id: "t3",
    date: "2023-04-08 11:45",
    itemName: "Chicken Breast",
    category: "Meat",
    type: "transfer",
    quantity: 5,
    unit: "kg",
    branch: "Downtown",
    destination: "Uptown",
    user: "Alex Johnson",
    note: "Emergency transfer for catering event"
  },
  {
    id: "t4",
    date: "2023-04-08 10:00",
    itemName: "Tomato Sauce",
    category: "Sauces",
    type: "adjust",
    quantity: -1.5,
    unit: "liters",
    branch: "Downtown",
    user: "Sam Wilson",
    note: "Inventory count correction"
  },
  {
    id: "t5",
    date: "2023-04-07 16:20",
    itemName: "Olive Oil",
    category: "Oils",
    type: "in",
    quantity: 10,
    unit: "liters",
    branch: "Uptown",
    user: "John Doe",
    supplier: "Italian Imports"
  },
  {
    id: "t6",
    date: "2023-04-06 09:30",
    itemName: "Paper Napkins",
    category: "Supplies",
    type: "in",
    quantity: 50,
    unit: "packs",
    branch: "Downtown",
    user: "Maria Garcia",
    supplier: "Restaurant Supplies Co."
  },
  {
    id: "t7",
    date: "2023-04-05 15:40",
    itemName: "Mozzarella Cheese",
    category: "Dairy",
    type: "expired",
    quantity: 2,
    unit: "kg",
    branch: "Uptown",
    user: "Alex Johnson",
    note: "Past expiration date"
  },
  {
    id: "t8",
    date: "2023-04-04 13:15",
    itemName: "Chicken Breast",
    category: "Meat",
    type: "out",
    quantity: 8,
    unit: "kg",
    branch: "Downtown",
    user: "Sam Wilson",
    note: "Used for daily menu preparations"
  },
  {
    id: "t9",
    date: "2023-04-03 11:30",
    itemName: "All-purpose Flour",
    category: "Dry Goods",
    type: "transfer",
    quantity: 10,
    unit: "kg",
    branch: "Downtown",
    destination: "Westside",
    user: "John Doe"
  },
  {
    id: "t10",
    date: "2023-04-02 10:45",
    itemName: "Tomato Sauce",
    category: "Sauces",
    type: "adjust",
    quantity: 2,
    unit: "liters",
    branch: "Uptown",
    user: "Maria Garcia",
    note: "Found additional stock during cleaning"
  }
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

const branches = [
  "All Branches",
  "Downtown",
  "Uptown",
  "Westside",
  "Airport"
];

const transactionTypes = [
  "All Types",
  "in",
  "out",
  "transfer",
  "adjust",
  "expired"
];

export default function InventoryHistoryPage() {
  const [transactions, setTransactions] = useState<InventoryTransaction[]>(mockInventoryTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedType, setSelectedType] = useState("All Types");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  // Filter transactions based on search, category, branch, type, and date range
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      transaction.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (transaction.note && transaction.note.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by category
    const matchesCategory =
      selectedCategory === "All Categories" || transaction.category === selectedCategory;

    // Filter by branch
    const matchesBranch =
      selectedBranch === "All Branches" || transaction.branch === selectedBranch;

    // Filter by type
    const matchesType =
      selectedType === "All Types" || transaction.type === selectedType;

    // Filter by date range
    const transactionDate = new Date(transaction.date);
    const matchesDate =
      !dateRange?.from ||
      !dateRange?.to ||
      (transactionDate >= dateRange.from &&
        transactionDate <= dateRange.to);

    // Filter by tab (All, This Week, This Month)
    const today = new Date();
    const weekAgo = subDays(today, 7);
    const monthAgo = subDays(today, 30);
    
    let matchesTab = true;
    if (activeTab === "week") {
      matchesTab = transactionDate >= weekAgo;
    } else if (activeTab === "month") {
      matchesTab = transactionDate >= monthAgo;
    }

    return matchesSearch && matchesCategory && matchesBranch && matchesType && matchesDate && matchesTab;
  });

  // Get count by transaction type
  const incomingCount = transactions.filter(t => t.type === "in").length;
  const outgoingCount = transactions.filter(t => t.type === "out").length;
  const transferCount = transactions.filter(t => t.type === "transfer").length;

  // Helper function to get badge style based on transaction type
  const getTransactionBadge = (type: InventoryTransaction["type"]) => {
    switch (type) {
      case "in":
        return <Badge className="bg-green-500">Incoming</Badge>;
      case "out":
        return <Badge className="bg-blue-500">Outgoing</Badge>;
      case "transfer":
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Transfer</Badge>;
      case "adjust":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Adjustment</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory History</h1>
            <p className="text-muted-foreground">
              Track inventory movements, transfers, and adjustments over time
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedStatsCard
            title="Incoming Stock"
            value={incomingCount.toString()}
            icon={<ArrowDown className="h-4 w-4 text-green-500" />}
            description="Total stock received"
            delay={1}
          />
          <AnimatedStatsCard
            title="Outgoing Stock"
            value={outgoingCount.toString()}
            icon={<ArrowUp className="h-4 w-4 text-blue-500" />}
            description="Total stock consumed"
            delay={2}
          />
          <AnimatedStatsCard
            title="Transfers"
            value={transferCount.toString()}
            icon={<ArrowLeftRight className="h-4 w-4" />}
            description="Between branches"
            delay={3}
          />
        </div>

        <Card className="animate-fade-in">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Transaction History</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="w-full sm:w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                <div className="w-full sm:w-auto">
                  <DateRangePicker
                    initialDateFrom={dateRange?.from}
                    initialDateTo={dateRange?.to}
                    onUpdate={setDateRange}
                  />
                </div>
                <Select onValueChange={setSelectedType} defaultValue={selectedType}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "in" ? "Incoming" : 
                         type === "out" ? "Outgoing" : 
                         type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All Time</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="month">This Month</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
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

                <div className="rounded-md border overflow-hidden">
                  <ScrollArea className="h-[500px] sm:h-auto">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Item</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="hidden lg:table-cell">Branch</TableHead>
                          <TableHead className="hidden lg:table-cell">User</TableHead>
                          <TableHead className="hidden md:table-cell">Note</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No transaction records found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id} className="hover-scale-subtle">
                              <TableCell className="font-medium whitespace-nowrap">
                                {transaction.date}
                              </TableCell>
                              <TableCell>{transaction.itemName}</TableCell>
                              <TableCell className="hidden md:table-cell">{transaction.category}</TableCell>
                              <TableCell>{getTransactionBadge(transaction.type)}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  {transaction.type === "adjust" && transaction.quantity < 0 ? (
                                    <TrendingDown className="h-4 w-4 text-destructive" />
                                  ) : transaction.type === "adjust" ? (
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                  ) : null}
                                  {Math.abs(transaction.quantity)} {transaction.unit}
                                </div>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">{transaction.branch}</TableCell>
                              <TableCell className="hidden lg:table-cell">{transaction.user}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                <span className="truncate block max-w-[200px]" title={transaction.note}>
                                  {transaction.note || 
                                   (transaction.type === "in" && transaction.supplier ? `From ${transaction.supplier}` : '') ||
                                   (transaction.type === "transfer" && transaction.destination ? `To ${transaction.destination}` : '') ||
                                   "-"}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
                
                {filteredTransactions.length > 0 && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
                    <div>Showing {filteredTransactions.length} of {transactions.length} transactions</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedDashboardCard
            title="Top Items Movement"
            delay={2}
            rightHeader={
              <Badge variant="outline" className="bg-muted/50">Last 30 Days</Badge>
            }
          >
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mozzarella Cheese</span>
                    <span className="text-sm font-medium">24 kg</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Chicken Breast</span>
                    <span className="text-sm font-medium">18 kg</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">All-purpose Flour</span>
                    <span className="text-sm font-medium">15 kg</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "55%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tomato Sauce</span>
                    <span className="text-sm font-medium">12 liters</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Olive Oil</span>
                    <span className="text-sm font-medium">10 liters</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Paper Napkins</span>
                    <span className="text-sm font-medium">50 packs</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Movement By Category</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-xs">Dairy</span>
                      </div>
                      <span className="text-xs font-medium">32%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-xs">Meat</span>
                      </div>
                      <span className="text-xs font-medium">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-xs">Dry Goods</span>
                      </div>
                      <span className="text-xs font-medium">17%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-xs">Sauces</span>
                      </div>
                      <span className="text-xs font-medium">14%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-xs">Others</span>
                      </div>
                      <span className="text-xs font-medium">9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </AnimatedDashboardCard>
          
          <AnimatedDashboardCard
            title="Recent Activity"
            delay={3}
            rightHeader={
              <Button variant="ghost" size="icon">
                <History className="h-4 w-4" />
              </Button>
            }
          >
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction, i) => (
                  <div key={i} className="flex items-start pb-3 border-b last:border-0">
                    <div className="mr-4 mt-0.5">
                      {transaction.type === "in" ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <ArrowDown className="h-4 w-4 text-green-600" />
                        </div>
                      ) : transaction.type === "out" ? (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <ArrowUp className="h-4 w-4 text-blue-600" />
                        </div>
                      ) : transaction.type === "transfer" ? (
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <ArrowLeftRight className="h-4 w-4 text-purple-600" />
                        </div>
                      ) : transaction.type === "adjust" ? (
                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <Filter className="h-4 w-4 text-amber-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <Package className="h-4 w-4 text-red-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{transaction.itemName}</h4>
                        <span className="text-xs text-muted-foreground">{transaction.date.split(" ")[0]}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {transaction.type === "in" ? (
                          <>Received {transaction.quantity} {transaction.unit} from {transaction.supplier}</>
                        ) : transaction.type === "out" ? (
                          <>Used {transaction.quantity} {transaction.unit} for {transaction.note}</>
                        ) : transaction.type === "transfer" ? (
                          <>Transferred {transaction.quantity} {transaction.unit} to {transaction.destination}</>
                        ) : transaction.type === "adjust" ? (
                          <>Adjusted stock by {transaction.quantity > 0 ? "+" : ""}{transaction.quantity} {transaction.unit}</>
                        ) : (
                          <>Marked {transaction.quantity} {transaction.unit} as expired</>
                        )}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs">{transaction.date.split(" ")[1]}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">{transaction.branch} · {transaction.user}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </AnimatedDashboardCard>
        </div>
      </div>
    </RestaurantLayout>
  );
}
