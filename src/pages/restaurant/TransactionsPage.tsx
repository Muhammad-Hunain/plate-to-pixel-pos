
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Filter, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ExportDropdown from "@/components/common/ExportDropdown";

// Sample transaction data (in a real app, this would come from an API)
const transactions = [
  {
    id: "TX123456",
    date: "2023-04-10",
    time: "12:30 PM",
    amount: 78.50,
    items: 4,
    customer: "John Smith",
    type: "dine-in",
    status: "completed",
    paymentMethod: "Credit Card",
    branch: "Downtown",
    staff: "Emma Wilson"
  },
  {
    id: "TX123457",
    date: "2023-04-10",
    time: "1:15 PM",
    amount: 42.25,
    items: 2,
    customer: "Sarah Johnson",
    type: "takeaway",
    status: "completed",
    paymentMethod: "Cash",
    branch: "Uptown",
    staff: "James Davis"
  },
  {
    id: "TX123458",
    date: "2023-04-10",
    time: "2:05 PM",
    amount: 56.80,
    items: 3,
    customer: "Michael Brown",
    type: "delivery",
    status: "completed",
    paymentMethod: "Credit Card",
    branch: "Westside",
    staff: "Thomas Lee"
  },
  {
    id: "TX123459",
    date: "2023-04-10",
    time: "3:30 PM",
    amount: 32.40,
    items: 2,
    customer: "Emily Wilson",
    type: "takeaway",
    status: "completed",
    paymentMethod: "Mobile Payment",
    branch: "Downtown",
    staff: "Emily Taylor"
  },
  {
    id: "TX123460",
    date: "2023-04-10",
    time: "5:45 PM",
    amount: 92.15,
    items: 5,
    customer: "David Lee",
    type: "dine-in",
    status: "completed",
    paymentMethod: "Credit Card",
    branch: "Uptown",
    staff: "James Davis"
  },
  {
    id: "TX123461",
    date: "2023-04-09",
    time: "11:20 AM",
    amount: 28.75,
    items: 2,
    customer: "Jessica Wang",
    type: "takeaway",
    status: "completed",
    paymentMethod: "Cash",
    branch: "Downtown",
    staff: "Thomas Lee"
  },
  {
    id: "TX123462",
    date: "2023-04-09",
    time: "1:45 PM",
    amount: 65.30,
    items: 4,
    customer: "Robert Chen",
    type: "dine-in",
    status: "completed",
    paymentMethod: "Credit Card",
    branch: "Westside",
    staff: "Emma Wilson"
  },
  {
    id: "TX123463",
    date: "2023-04-09",
    time: "3:10 PM",
    amount: 47.20,
    items: 3,
    customer: "Amanda Miller",
    type: "delivery",
    status: "completed",
    paymentMethod: "Mobile Payment",
    branch: "Uptown",
    staff: "Emily Taylor"
  },
  {
    id: "TX123464",
    date: "2023-04-09",
    time: "6:30 PM",
    amount: 87.45,
    items: 5,
    customer: "William Taylor",
    type: "dine-in",
    status: "completed",
    paymentMethod: "Credit Card",
    branch: "Downtown",
    staff: "James Davis"
  },
  {
    id: "TX123465",
    date: "2023-04-08",
    time: "12:15 PM",
    amount: 34.90,
    items: 2,
    customer: "Sophia Rodriguez",
    type: "takeaway",
    status: "completed",
    paymentMethod: "Cash",
    branch: "Westside",
    staff: "Thomas Lee"
  },
  {
    id: "TX123466",
    date: "2023-04-08",
    time: "1:50 PM",
    amount: 62.75,
    items: 3,
    customer: "Daniel Kim",
    type: "dine-in",
    status: "completed",
    paymentMethod: "Credit Card",
    branch: "Uptown",
    staff: "Emma Wilson"
  },
  {
    id: "TX123467",
    date: "2023-04-08",
    time: "4:25 PM",
    amount: 51.60,
    items: 3,
    customer: "Jennifer Lopez",
    type: "delivery",
    status: "completed",
    paymentMethod: "Mobile Payment",
    branch: "Downtown",
    staff: "Emily Taylor"
  }
];

export default function TransactionsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Filter transactions based on filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by search query
    const matchesSearch = 
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = 
      typeFilter === "all" || 
      transaction.type === typeFilter;
    
    // Filter by branch
    const matchesBranch =
      branchFilter === "all" ||
      transaction.branch === branchFilter;
    
    // Filter by payment method
    const matchesPaymentMethod =
      paymentMethodFilter === "all" ||
      transaction.paymentMethod === paymentMethodFilter;
    
    return matchesSearch && matchesType && matchesBranch && matchesPaymentMethod;
  });

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handleExport = (format: "pdf" | "csv" | "docx") => {
    // In a real application, implement export functionality
    console.log(`Exporting transactions as ${format}`);
  };

  return (
    <RestaurantLayout>
      <div className="p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate('/restaurant/reports')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Transaction History</h1>
          </div>
          <ExportDropdown onExport={handleExport} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span>All Transactions</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {filteredTransactions.length} transactions found
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-9 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={branchFilter} onValueChange={setBranchFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="Downtown">Downtown</SelectItem>
                    <SelectItem value="Uptown">Uptown</SelectItem>
                    <SelectItem value="Westside">Westside</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="dine-in">Dine-In</SelectItem>
                    <SelectItem value="takeaway">Takeaway</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Payment Methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payment Methods</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Staff</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center">
                        No transactions found for the selected filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>
                          {transaction.date} {transaction.time}
                        </TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            transaction.type === 'dine-in' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            transaction.type === 'takeaway' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                            'bg-green-100 text-green-800 border-green-200'
                          }>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.branch}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell>{transaction.staff}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{indexOfFirstTransaction + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastTransaction, filteredTransactions.length)}
                  </span>{" "}
                  of <span className="font-medium">{filteredTransactions.length}</span> transactions
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = currentPage <= 3
                        ? i + 1
                        : currentPage >= totalPages - 2
                          ? totalPages - 4 + i
                          : currentPage - 2 + i;
                      
                      if (pageNumber <= totalPages && pageNumber > 0) {
                        return (
                          <Button
                            key={pageNumber}
                            variant={currentPage === pageNumber ? "default" : "outline"}
                            size="sm"
                            className="mx-1 w-9"
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </Button>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
