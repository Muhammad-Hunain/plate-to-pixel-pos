import React, { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Plus,
  Search,
} from "lucide-react";

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [branches, setBranches] = useState([
    {
      name: "Downtown",
      address: "456 Elm St, City, State",
      manager: "Alice Johnson",
      contact: "+1 987-654-3210",
      status: "active",
      openingTime: "7:00 AM",
      closingTime: "9:00 PM",
      taxRate: 7.5,
      notes: "Flagship location with outdoor seating.",
    },
    {
      name: "Uptown",
      address: "789 Oak St, City, State",
      manager: "Bob Williams",
      contact: "+1 555-123-4567",
      status: "maintenance",
      openingTime: "8:00 AM",
      closingTime: "10:00 PM",
      taxRate: 8.0,
      notes: "Recently renovated with a modern design.",
    },
    {
      name: "Suburb",
      address: "101 Pine St, City, State",
      manager: "Charlie Brown",
      contact: "+1 111-222-3333",
      status: "closed",
      openingTime: "9:00 AM",
      closingTime: "8:00 PM",
      taxRate: 7.0,
      notes: "Temporarily closed for remodeling.",
    },
  ]);

  const filteredBranches = branches.filter((branch) => {
    const searchMatch =
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch =
      filterStatus === "all" || branch.status === filterStatus;
    return searchMatch && statusMatch;
  });

  const addNewBranch = () => {
    const newBranch = {
      name: "New Location",
      address: "123 Main St, City, State",
      manager: "John Doe",
      contact: "+1 234-567-8901",
      status: "active" as "active" | "maintenance" | "closed",
      openingTime: "8:00 AM",
      closingTime: "10:00 PM",
      taxRate: 8.5,
      notes: "This is a new branch location."
    };
    setBranches([...branches, newBranch]);
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Branches</h1>
            <p className="text-muted-foreground">
              Manage all your restaurant branches
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={addNewBranch}>
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <CardTitle>Branch List</CardTitle>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search branches..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Manager</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBranches.map((branch, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{branch.name}</TableCell>
                      <TableCell>{branch.address}</TableCell>
                      <TableCell>{branch.manager}</TableCell>
                      <TableCell>{branch.contact}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            branch.status === "active"
                              ? "success"
                              : branch.status === "maintenance"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {branch.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Branch</DropdownMenuItem>
                            <DropdownMenuItem>Disable Branch</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredBranches.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No branches found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Branch Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Here you can view and edit detailed information about each
                  branch.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Branch Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Track performance metrics and gain insights into each branch's
                  operations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Branch Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Configure settings such as opening hours, tax rates, and
                  more for each branch.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}
