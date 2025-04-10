
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AllTransactionsProps {
  transactions: any[];
  onClose: () => void;
  branchFilter: string;
  setBranchFilter: (value: string) => void;
}

const AllTransactions: React.FC<AllTransactionsProps> = ({
  transactions,
  onClose,
  branchFilter,
  setBranchFilter
}) => {
  const [transactionSearchQuery, setTransactionSearchQuery] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Filter transactions based on filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by search query
    const matchesSearch = 
      transaction.customer.toLowerCase().includes(transactionSearchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(transactionSearchQuery.toLowerCase());
    
    // Filter by type
    const matchesType = 
      transactionTypeFilter === "all" || 
      transaction.type === transactionTypeFilter;
    
    // Filter by branch
    const matchesBranch =
      branchFilter === "all" ||
      transaction.branch === branchFilter;
    
    // Filter by staff
    const matchesStaff =
      staffFilter === "all" ||
      transaction.staff === staffFilter;
    
    return matchesSearch && matchesType && matchesBranch && matchesStaff;
  });

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [transactionSearchQuery, transactionTypeFilter, branchFilter, staffFilter]);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>All Transactions</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          Close View
        </Button>
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
                value={transactionSearchQuery}
                onChange={(e) => setTransactionSearchQuery(e.target.value)}
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
            <Select value={transactionTypeFilter} onValueChange={setTransactionTypeFilter}>
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
            <Select value={staffFilter} onValueChange={setStaffFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="Emma Wilson">Emma Wilson</SelectItem>
                <SelectItem value="James Davis">James Davis</SelectItem>
                <SelectItem value="Thomas Lee">Thomas Lee</SelectItem>
                <SelectItem value="Emily Taylor">Emily Taylor</SelectItem>
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
                <TableHead>Staff</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
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
  );
};

export default AllTransactions;
