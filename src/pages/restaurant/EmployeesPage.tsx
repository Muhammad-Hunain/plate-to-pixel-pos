
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, MoreVertical, Search, Mail, Phone, MapPin, Building, CalendarDays, DollarSign, Edit, Trash, Filter, Download, CheckCircle, XCircle, Clock } from "lucide-react";
import { FilterMenu, FilterOption } from "@/components/filters/FilterMenu";

// Mock data for employees
const employees = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    position: "Manager",
    branch: "Downtown",
    status: "active",
    salary: "$4,500/month",
    hireDate: "2020-05-15",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(555) 234-5678",
    position: "Chef",
    branch: "Downtown",
    status: "active",
    salary: "$3,800/month",
    hireDate: "2021-02-10",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    phone: "(555) 345-6789",
    position: "Waiter",
    branch: "Uptown",
    status: "inactive",
    salary: "$2,200/month",
    hireDate: "2022-01-05",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(555) 456-7890",
    position: "Hostess",
    branch: "Downtown",
    status: "active",
    salary: "$2,500/month",
    hireDate: "2021-08-22",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "5",
    name: "David Miller",
    email: "david@example.com",
    phone: "(555) 567-8901",
    position: "Bartender",
    branch: "Uptown",
    status: "active",
    salary: "$2,800/month",
    hireDate: "2020-11-15",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "6",
    name: "Jessica Wilson",
    email: "jessica@example.com",
    phone: "(555) 678-9012",
    position: "Server",
    branch: "Downtown",
    status: "inactive",
    salary: "$2,200/month",
    hireDate: "2022-03-01",
    avatar: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james@example.com",
    phone: "(555) 789-0123",
    position: "Sous Chef",
    branch: "Uptown",
    status: "active",
    salary: "$3,500/month",
    hireDate: "2020-07-10",
    avatar: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: "8",
    name: "Sophia Martinez",
    email: "sophia@example.com",
    phone: "(555) 890-1234",
    position: "Cashier",
    branch: "Downtown",
    status: "active",
    salary: "$2,300/month",
    hireDate: "2021-09-12",
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];

const positions = [
  "Manager", "Chef", "Sous Chef", "Waiter", "Server", "Hostess", "Bartender", "Cashier", "Cleaner"
];

const branches = [
  "Downtown", "Uptown", "Mall Location"
];

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<typeof employees[0] | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
  
  const filteredEmployees = employees.filter(employee => {
    // Base search filter
    const matchesSearch = !appliedFilters.search || 
      employee.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      employee.email.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      employee.phone.includes(appliedFilters.search);
      
    // Position filter  
    const matchesPosition = !appliedFilters.position || 
      appliedFilters.position.includes(employee.position);
      
    // Branch filter  
    const matchesBranch = !appliedFilters.branch || 
      appliedFilters.branch.includes(employee.branch);
      
    // Status filter
    const matchesStatus = !appliedFilters.status || 
      appliedFilters.status.includes(employee.status);
      
    // Active tab filter (overwrites status filter)
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "active" && employee.status === "active") || 
      (activeTab === "inactive" && employee.status === "inactive");
      
    return matchesSearch && matchesPosition && matchesBranch && matchesStatus && matchesTab;
  });

  const handleDeleteEmployee = () => {
    toast.success("Employee deleted successfully");
    setShowDeleteDialog(false);
    setSelectedEmployee(null);
  };

  const positionOptions: FilterOption[] = positions.map(position => ({
    id: position.toLowerCase().replace(/\s/g, "-"),
    label: position,
    value: position
  }));
  
  const branchOptions: FilterOption[] = branches.map(branch => ({
    id: branch.toLowerCase().replace(/\s/g, "-"),
    label: branch,
    value: branch
  }));
  
  const statusOptions: FilterOption[] = [
    { id: "active", label: "Active", value: "active" },
    { id: "inactive", label: "Inactive", value: "inactive" }
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    setAppliedFilters(filters);
    
    // Update search query if it's in the filters
    if ('search' in filters) {
      setSearchQuery(filters.search || "");
    }
    
    // Update active tab based on status filter
    if (filters.status && filters.status.length === 1) {
      setActiveTab(filters.status[0]);
    } else {
      setActiveTab("all");
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
            <p className="text-muted-foreground">
              Manage your restaurant's employees
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast.success("Employee data exported!")}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => toast.success("Add employee functionality coming soon!")}>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-4">
            <FilterMenu
              options={{
                search: true,
                categories: positionOptions,
                status: statusOptions,
                types: branchOptions
              }}
              onFilterChange={handleFilterChange}
            />
          </CardContent>
        </Card>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Staff</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                        No employees found matching your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employee.avatar} alt={employee.name} />
                              <AvatarFallback>{employee.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm text-muted-foreground">Hired: {new Date(employee.hireDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{employee.branch}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span>{employee.email}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span>{employee.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={employee.status === "active" ? "outline" : "secondary"}>
                            {employee.status === "active" ? (
                              <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                            ) : (
                              <XCircle className="mr-1 h-3 w-3 text-muted-foreground" />
                            )}
                            <span className="capitalize">{employee.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => toast.success("View details functionality coming soon!")}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success("Edit functionality coming soon!")}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setShowDeleteDialog(true);
                                }}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete this employee?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                {selectedEmployee?.name}'s account and remove their data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteEmployee}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
