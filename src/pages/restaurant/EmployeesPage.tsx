
import { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Users, Search, Plus, Edit, Trash2, MoreVertical, CheckCircle, XCircle, 
  UserPlus, Coffee, ChevronRight, Clock, Calendar, Shield, 
  BadgeCheck, Mail, Phone, CalendarDays, CircleCheck, BriefcaseBusiness,
  SlidersHorizontal, UserCog, LogOut, Ban, AlertCircle, Star,
  LayoutGrid, List
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

// Mock data for branches
const branches = [
  { id: "1", name: "Downtown", address: "123 Main St, Downtown" },
  { id: "2", name: "Westside", address: "456 West Ave, Westside" },
  { id: "3", name: "Airport", address: "789 Airport Road, Terminal 2" },
  { id: "4", name: "Mall Location", address: "101 Shopping Center, Floor 3" },
];

// Mock data for roles
const roles = [
  { id: "owner", name: "Restaurant Owner", permissions: ["all"] },
  { id: "manager", name: "Manager", permissions: ["manage_staff", "manage_menu", "view_reports", "process_orders"] },
  { id: "chef", name: "Chef", permissions: ["view_kitchen", "update_order_status"] },
  { id: "cashier", name: "Cashier", permissions: ["manage_orders", "process_payments"] },
  { id: "server", name: "Server", permissions: ["manage_orders", "view_tables"] },
];

// Mock data for employees
const initialEmployees = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@restaurant.com",
    phone: "(555) 123-4567",
    role: "owner",
    branch: "1",
    hireDate: "2023-01-15",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=john.doe@restaurant.com",
    lastActive: "2025-04-10T08:45:00",
    address: "123 Employee St, Apt 4B",
    emergencyContact: "Jane Doe: (555) 987-6543",
    notes: "Founding member of the restaurant",
    permissions: ["all"]
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@restaurant.com",
    phone: "(555) 234-5678",
    role: "manager",
    branch: "1",
    hireDate: "2023-03-22",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=sarah.j@restaurant.com",
    lastActive: "2025-04-09T17:30:00",
    address: "456 Manager Lane",
    emergencyContact: "Mike Johnson: (555) 876-5432",
    notes: "Previously worked at Fine Dining Co. for 5 years",
    permissions: ["manage_staff", "manage_menu", "view_reports", "process_orders"]
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.b@restaurant.com",
    phone: "(555) 345-6789",
    role: "chef",
    branch: "1",
    hireDate: "2023-02-10",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=michael.b@restaurant.com",
    lastActive: "2025-04-10T10:15:00",
    address: "789 Chef Road",
    emergencyContact: "Lisa Brown: (555) 765-4321",
    notes: "Specializes in Italian cuisine",
    permissions: ["view_kitchen", "update_order_status"]
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@restaurant.com",
    phone: "(555) 456-7890",
    role: "cashier",
    branch: "2",
    hireDate: "2023-05-05",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=emily.d@restaurant.com",
    lastActive: "2025-04-09T19:45:00",
    address: "101 Cashier Blvd",
    emergencyContact: "Robert Davis: (555) 654-3210",
    notes: "Part-time student at City College",
    permissions: ["manage_orders", "process_payments"]
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.w@restaurant.com",
    phone: "(555) 567-8901",
    role: "server",
    branch: "1",
    hireDate: "2023-06-15",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=david.w@restaurant.com",
    lastActive: "2025-04-10T09:30:00",
    address: "202 Server Street",
    emergencyContact: "Maria Wilson: (555) 543-2109",
    notes: "Speaks fluent Spanish",
    permissions: ["manage_orders", "view_tables"]
  },
  {
    id: "6",
    firstName: "Jennifer",
    lastName: "Garcia",
    email: "jennifer.g@restaurant.com",
    phone: "(555) 678-9012",
    role: "manager",
    branch: "3",
    hireDate: "2023-04-20",
    status: "on-leave",
    avatar: "https://i.pravatar.cc/150?u=jennifer.g@restaurant.com",
    lastActive: "2025-04-01T14:20:00",
    address: "303 Manager Ave",
    emergencyContact: "Carlos Garcia: (555) 432-1098",
    notes: "On maternity leave until June 2025",
    permissions: ["manage_staff", "manage_menu", "view_reports", "process_orders"]
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.m@restaurant.com",
    phone: "(555) 789-0123",
    role: "chef",
    branch: "2",
    hireDate: "2023-07-10",
    status: "active",
    avatar: "https://i.pravatar.cc/150?u=robert.m@restaurant.com",
    lastActive: "2025-04-10T07:45:00",
    address: "404 Chef Circle",
    emergencyContact: "Anna Martinez: (555) 321-0987",
    notes: "Dessert specialist",
    permissions: ["view_kitchen", "update_order_status"]
  },
  {
    id: "8",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.a@restaurant.com",
    phone: "(555) 890-1234",
    role: "server",
    branch: "4",
    hireDate: "2023-09-05",
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?u=lisa.a@restaurant.com",
    lastActive: "2025-03-15T16:30:00",
    address: "505 Former Employee Road",
    emergencyContact: "Mark Anderson: (555) 210-9876",
    notes: "Employment ended on March 15, 2025",
    permissions: []
  }
];

// Form schemas
const employeeFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }).optional(),
  role: z.string().min(1, { message: "Please select a role." }),
  branch: z.string().min(1, { message: "Please select a branch." }),
  status: z.enum(["active", "inactive", "on-leave"]).default("active"),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  notes: z.string().optional(),
});

// Status configuration
const statusConfig = {
  "active": { label: "Active", color: "bg-green-100 text-green-800", icon: CheckCircle },
  "inactive": { label: "Inactive", color: "bg-red-100 text-red-800", icon: XCircle },
  "on-leave": { label: "On Leave", color: "bg-yellow-100 text-yellow-800", icon: Calendar }
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterBranch, setFilterBranch] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showNewEmployeeDialog, setShowNewEmployeeDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  
  // Employee form
  const employeeForm = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      branch: "",
      status: "active",
      address: "",
      emergencyContact: "",
      notes: "",
    },
  });

  // Reset form when dialog closes
  useEffect(() => {
    if (!showNewEmployeeDialog) {
      employeeForm.reset();
    }
  }, [showNewEmployeeDialog, employeeForm]);

  // Set form values when editing employee
  useEffect(() => {
    if (selectedEmployee && showNewEmployeeDialog) {
      employeeForm.reset({
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone || "",
        role: selectedEmployee.role,
        branch: selectedEmployee.branch,
        status: selectedEmployee.status,
        address: selectedEmployee.address || "",
        emergencyContact: selectedEmployee.emergencyContact || "",
        notes: selectedEmployee.notes || "",
      });
    }
  }, [selectedEmployee, showNewEmployeeDialog, employeeForm]);

  // Filter employees
  useEffect(() => {
    let result = [...employees];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(employee => 
        employee.firstName.toLowerCase().includes(query) || 
        employee.lastName.toLowerCase().includes(query) || 
        employee.email.toLowerCase().includes(query)
      );
    }
    
    if (filterRole) {
      result = result.filter(employee => employee.role === filterRole);
    }
    
    if (filterBranch) {
      result = result.filter(employee => employee.branch === filterBranch);
    }
    
    if (filterStatus) {
      result = result.filter(employee => employee.status === filterStatus);
    }
    
    setFilteredEmployees(result);
  }, [employees, searchQuery, filterRole, filterBranch, filterStatus]);

  // Submit handlers
  const handleEmployeeSubmit = (values: z.infer<typeof employeeFormSchema>) => {
    // Get role permissions
    const roleData = roles.find(r => r.id === values.role);
    const permissions = roleData ? roleData.permissions : [];
    
    if (selectedEmployee) {
      // Update existing employee
      const updatedEmployees = employees.map(emp => 
        emp.id === selectedEmployee.id 
        ? { 
            ...emp, 
            ...values,
            permissions
          } 
        : emp
      );
      setEmployees(updatedEmployees);
      toast.success("Employee updated successfully!");
    } else {
      // Create new employee
      const newEmployee = {
        id: (employees.length + 1).toString(),
        ...values,
        hireDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString(),
        avatar: `https://i.pravatar.cc/150?u=${values.email}`,
        permissions
      };
      setEmployees([...employees, newEmployee]);
      toast.success("Employee added successfully!");
    }
    setShowNewEmployeeDialog(false);
    setSelectedEmployee(null);
    employeeForm.reset();
  };
  
  // Delete handler
  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    setSelectedEmployee(null);
    setShowEmployeeDetails(false);
    toast.success("Employee deleted successfully!");
  };
  
  // Status handler
  const handleStatusChange = (employeeId: string, newStatus: string) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === employeeId ? { ...emp, status: newStatus } : emp
    );
    setEmployees(updatedEmployees);
    
    // Update selected employee if it's the one being viewed
    if (selectedEmployee && selectedEmployee.id === employeeId) {
      setSelectedEmployee({ ...selectedEmployee, status: newStatus });
    }
    
    toast.success(`Employee status updated to ${statusConfig[newStatus as keyof typeof statusConfig].label}`);
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setFilterRole(null);
    setFilterBranch(null);
    setFilterStatus(null);
  };
  
  // View employee details
  const handleViewEmployeeDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };
  
  // Handle new employee or edit
  const handleAddOrEditEmployee = (employee?: any) => {
    if (employee) {
      setSelectedEmployee(employee);
    } else {
      setSelectedEmployee(null);
    }
    setShowNewEmployeeDialog(true);
  };
  
  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color} transition-all duration-200`}>
        <Icon className="mr-1 h-3 w-3" />
        {config.label}
      </div>
    );
  };
  
  // Format Date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Format Datetime
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return "Invalid date";
    }
  };
  
  // Get branch name by id
  const getBranchName = (branchId: string) => {
    return branches.find(branch => branch.id === branchId)?.name || "Unknown";
  };
  
  // Get role name by id
  const getRoleName = (roleId: string) => {
    return roles.find(role => role.id === roleId)?.name || "Unknown";
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
            <p className="text-muted-foreground">
              Manage your restaurant staff and roles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="hover-scale" onClick={() => handleAddOrEditEmployee()}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filterRole === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterRole(null)}
            >
              All Roles
            </Button>
            {roles.map(role => (
              <Button
                key={role.id}
                variant={filterRole === role.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRole(filterRole === role.id ? null : role.id)}
              >
                {role.name}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                className="pl-9 w-full md:w-72"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-2">
                  <div className="mb-2 font-medium">Filter by Branch:</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="all-branches" 
                        name="branch-filter"
                        checked={filterBranch === null}
                        onChange={() => setFilterBranch(null)}
                      />
                      <Label htmlFor="all-branches">All Branches</Label>
                    </div>
                    
                    {branches.map(branch => (
                      <div key={branch.id} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id={`branch-${branch.id}`} 
                          name="branch-filter"
                          checked={filterBranch === branch.id}
                          onChange={() => setFilterBranch(branch.id)}
                        />
                        <Label htmlFor={`branch-${branch.id}`}>{branch.name}</Label>
                      </div>
                    ))}
                  </div>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <div className="mb-2 font-medium">Filter by Status:</div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="all-statuses" 
                        name="status-filter"
                        checked={filterStatus === null}
                        onChange={() => setFilterStatus(null)}
                      />
                      <Label htmlFor="all-statuses">All Statuses</Label>
                    </div>
                    
                    {Object.keys(statusConfig).map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <input 
                          type="radio" 
                          id={`status-${status}`} 
                          name="status-filter"
                          checked={filterStatus === status}
                          onChange={() => setFilterStatus(status)}
                        />
                        <Label htmlFor={`status-${status}`}>
                          {statusConfig[status as keyof typeof statusConfig].label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleResetFilters}>
                  Reset All Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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

        {filteredEmployees.length === 0 ? (
          <div className="text-center py-10 animate-fade-in">
            <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium">No employees found</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              {searchQuery || filterRole || filterBranch || filterStatus
                ? "Try adjusting your filters to see more employees."
                : "Get started by adding your first employee."}
            </p>
            {(searchQuery || filterRole || filterBranch || filterStatus) && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleResetFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredEmployees.map((employee) => {
              const roleName = getRoleName(employee.role);
              const branchName = getBranchName(employee.branch);
              
              return (
                <Card 
                  key={employee.id} 
                  className={`overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer ${employee.status === 'inactive' ? 'opacity-60' : ''}`}
                  onClick={() => handleViewEmployeeDetails(employee)}
                >
                  <div className="pt-6 px-6 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                      <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{employee.firstName} {employee.lastName}</h3>
                    <p className="text-muted-foreground text-sm">{roleName}</p>
                    <StatusBadge status={employee.status} />
                  </div>
                  
                  <CardContent className="px-6 py-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="truncate">{employee.email}</span>
                      </div>
                      {employee.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{employee.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <BriefcaseBusiness className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{branchName}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Hired {formatDate(employee.hireDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="ghost" size="sm" className="hover:bg-transparent px-2" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddOrEditEmployee(employee);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" />
                        Edit
                      </Button>
                    </div>
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
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Hire Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => {
                  const roleName = getRoleName(employee.role);
                  const branchName = getBranchName(employee.branch);
                  
                  return (
                    <TableRow 
                      key={employee.id}
                      className={`cursor-pointer hover:bg-muted/50 animate-fade-in ${employee.status === 'inactive' ? 'opacity-60' : ''}`}
                      onClick={() => handleViewEmployeeDetails(employee)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                            <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                            <div className="text-sm text-muted-foreground">{employee.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{roleName}</TableCell>
                      <TableCell className="hidden md:table-cell">{branchName}</TableCell>
                      <TableCell><StatusBadge status={employee.status} /></TableCell>
                      <TableCell className="hidden lg:table-cell">{formatDate(employee.hireDate)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{formatDateTime(employee.lastActive)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleViewEmployeeDetails(employee);
                            }}>
                              <ChevronRight className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleAddOrEditEmployee(employee);
                            }}>
                              <Edit className="h-4 w-4 mr-2" /> Edit Employee
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {employee.status !== "active" && (
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(employee.id, "active");
                              }}>
                                <CircleCheck className="h-4 w-4 mr-2" /> Set as Active
                              </DropdownMenuItem>
                            )}
                            
                            {employee.status !== "on-leave" && (
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(employee.id, "on-leave");
                              }}>
                                <Calendar className="h-4 w-4 mr-2" /> Mark as On Leave
                              </DropdownMenuItem>
                            )}
                            
                            {employee.status !== "inactive" && (
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(employee.id, "inactive");
                              }}>
                                <Ban className="h-4 w-4 mr-2" /> Deactivate
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEmployee(employee.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Delete Employee
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}

        {/* New/Edit Employee Dialog */}
        <Dialog open={showNewEmployeeDialog} onOpenChange={setShowNewEmployeeDialog}>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>{selectedEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
              <DialogDescription>
                {selectedEmployee ? "Update employee information." : "Create a new employee record."}
              </DialogDescription>
            </DialogHeader>
            <Form {...employeeForm}>
              <form onSubmit={employeeForm.handleSubmit(handleEmployeeSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={employeeForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={employeeForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={employeeForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="john.doe@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={employeeForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="(555) 123-4567" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={employeeForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={employeeForm.control}
                    name="branch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a branch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {branches.map((branch) => (
                              <SelectItem key={branch.id} value={branch.id}>
                                {branch.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={employeeForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="on-leave">On Leave</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={employeeForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Employee St, City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={employeeForm.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Name: (555) 123-4567" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={employeeForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Any additional information" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">{selectedEmployee ? "Save Changes" : "Add Employee"}</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Employee Details Dialog */}
        <Dialog open={showEmployeeDetails && Boolean(selectedEmployee)} onOpenChange={setShowEmployeeDetails}>
          <DialogContent className="sm:max-w-[700px]">
            {selectedEmployee && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center justify-between">
                    <span>Employee Profile</span>
                    <StatusBadge status={selectedEmployee.status} />
                  </DialogTitle>
                  <DialogDescription>
                    Employee ID: {selectedEmployee.id}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-2">
                        <AvatarImage src={selectedEmployee.avatar} alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`} />
                        <AvatarFallback>{selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold">{selectedEmployee.firstName} {selectedEmployee.lastName}</h3>
                      <p className="text-muted-foreground">{getRoleName(selectedEmployee.role)}</p>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{selectedEmployee.email}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{selectedEmployee.phone || "Not provided"}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Branch</h4>
                          <div className="flex items-center">
                            <BriefcaseBusiness className="h-4 w-4 mr-2" />
                            <span>{getBranchName(selectedEmployee.branch)}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Hire Date</h4>
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-2" />
                            <span>{formatDate(selectedEmployee.hireDate)}</span>
                          </div>
                        </div>
                        
                        {selectedEmployee.address && (
                          <div className="md:col-span-2">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
                            <p>{selectedEmployee.address}</p>
                          </div>
                        )}
                        
                        {selectedEmployee.emergencyContact && (
                          <div className="md:col-span-2">
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Emergency Contact</h4>
                            <p>{selectedEmployee.emergencyContact}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">System Access</h4>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Last Activity</span>
                          </div>
                          <span>{formatDateTime(selectedEmployee.lastActive)}</span>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <div className="flex items-center mb-2">
                            <BadgeCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">Permissions</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedEmployee.permissions.includes("all") ? (
                              <Badge variant="default">Full Access</Badge>
                            ) : selectedEmployee.permissions.length > 0 ? (
                              selectedEmployee.permissions.map((permission: string) => (
                                <Badge key={permission} variant="outline">{permission.replace("_", " ")}</Badge>
                              ))
                            ) : (
                              <span className="text-sm text-muted-foreground">No permissions assigned</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedEmployee.notes && (
                      <div>
                        <h4 className="font-medium mb-2">Notes</h4>
                        <div className="p-3 border rounded-md">
                          <p className="text-sm">{selectedEmployee.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t">
                    <div className="flex gap-2">
                      {selectedEmployee.status !== "active" && (
                        <Button 
                          variant="outline" 
                          className="text-green-600"
                          onClick={() => handleStatusChange(selectedEmployee.id, "active")}
                        >
                          <CircleCheck className="mr-2 h-4 w-4" />
                          Set as Active
                        </Button>
                      )}
                      {selectedEmployee.status !== "on-leave" && (
                        <Button 
                          variant="outline"
                          onClick={() => handleStatusChange(selectedEmployee.id, "on-leave")}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Mark as On Leave
                        </Button>
                      )}
                      {selectedEmployee.status !== "inactive" && (
                        <Button 
                          variant="outline" 
                          className="text-destructive"
                          onClick={() => handleStatusChange(selectedEmployee.id, "inactive")}
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Deactivate
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowEmployeeDetails(false);
                          handleAddOrEditEmployee(selectedEmployee);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDeleteEmployee(selectedEmployee.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
