
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
  User,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Phone,
  Shield,
  Briefcase,
  Building,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AnimatedDashboardCard from "@/components/dashboard/AnimatedDashboardCard";
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

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
  hireDate: string;
  status: string;
  avatar: string;
  lastActive: string;
  address: string;
  emergencyContact: string;
  notes: string;
  permissions: string[];
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    role: "Manager",
    branch: "Downtown",
    hireDate: "2021-03-15",
    status: "active",
    avatar: "",
    lastActive: "2023-04-10T09:30:00",
    address: "123 Main St, Cityville",
    emergencyContact: "Jane Doe (555) 987-6543",
    notes: "Team lead for evening shift",
    permissions: ["menu.edit", "orders.view", "orders.edit", "employees.view"],
  },
  {
    id: "2",
    firstName: "Sara",
    lastName: "Johnson",
    email: "sara.j@example.com",
    phone: "(555) 234-5678",
    role: "Chef",
    branch: "Uptown",
    hireDate: "2022-01-10",
    status: "active",
    avatar: "",
    lastActive: "2023-04-09T17:45:00",
    address: "456 Oak Ave, Townsburg",
    emergencyContact: "Mike Johnson (555) 876-5432",
    notes: "Specializes in Italian cuisine",
    permissions: ["kitchen.view", "kitchen.edit", "inventory.view"],
  },
  {
    id: "3",
    firstName: "Miguel",
    lastName: "Rodriguez",
    email: "miguel.r@example.com",
    phone: "(555) 345-6789",
    role: "Cashier",
    branch: "Downtown",
    hireDate: "2022-06-22",
    status: "on-leave",
    avatar: "",
    lastActive: "2023-04-01T12:15:00",
    address: "789 Pine St, Villagetown",
    emergencyContact: "Ana Rodriguez (555) 765-4321",
    notes: "On medical leave until April 20",
    permissions: ["pos.view", "pos.edit"],
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Chang",
    email: "emily.c@example.com",
    phone: "(555) 456-7890",
    role: "Owner",
    branch: "All Locations",
    hireDate: "2020-01-05",
    status: "active",
    avatar: "",
    lastActive: "2023-04-10T11:05:00",
    address: "101 Maple Dr, Metropolis",
    emergencyContact: "David Chang (555) 654-3210",
    notes: "Founder and principal owner",
    permissions: ["admin.all"],
  },
];

const roles = ["Owner", "Manager", "Chef", "Kitchen Staff", "Cashier", "Waiter", "Delivery"];
const branches = ["All Locations", "Downtown", "Uptown", "Westside", "Airport"];
const statusOptions = ["active", "inactive", "on-leave"];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const form = useForm({
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

  const filteredEmployees = employees.filter((employee) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by tab
    const matchesTab =
      activeTab === "all" || employee.status.toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesTab;
  });

  const handleAddEmployee = (data: any) => {
    const newEmployee: Employee = {
      id: String(employees.length + 1),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      branch: data.branch,
      hireDate: new Date().toISOString().split("T")[0],
      status: data.status,
      avatar: "",
      lastActive: new Date().toISOString(),
      address: data.address || "",
      emergencyContact: data.emergencyContact || "",
      notes: data.notes || "",
      permissions: [], // Default permissions based on role would be set here
    };

    if (currentEmployee) {
      // Edit existing employee
      const updatedEmployees = employees.map((emp) =>
        emp.id === currentEmployee.id ? { ...emp, ...newEmployee, id: emp.id } : emp
      );
      setEmployees(updatedEmployees);
      toast.success(`Employee ${newEmployee.firstName} updated successfully!`);
    } else {
      // Add new employee
      setEmployees([...employees, newEmployee]);
      toast.success(`Employee ${newEmployee.firstName} added successfully!`);
    }

    form.reset();
    setIsAddDialogOpen(false);
    setCurrentEmployee(null);
  };

  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee(employee);
    form.reset({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      branch: employee.branch,
      status: employee.status,
      address: employee.address,
      emergencyContact: employee.emergencyContact,
      notes: employee.notes,
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    toast.success("Employee removed successfully!");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
            <p className="text-muted-foreground">
              Manage restaurant staff and their permissions
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="hover-scale">
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{currentEmployee ? "Edit" : "Add New"} Employee</DialogTitle>
                <DialogDescription>
                  {currentEmployee
                    ? "Update employee information and access permissions"
                    : "Fill out the form below to add a new employee to your restaurant"}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddEmployee)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" type="email" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
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
                              {branches.map((branch) => (
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
                              {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status === "active" ? "Active" : status === "inactive" ? "Inactive" : "On Leave"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St, Cityville" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact Name & Phone" {...field} />
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
                      {currentEmployee ? "Update Employee" : "Add Employee"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-2/3">
            <Card className="animate-fade-in [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Employee Directory</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search employees..."
                      className="w-full sm:w-[250px] pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs onValueChange={setActiveTab} value={activeTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="on-leave">On Leave</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Branch</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredEmployees.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                No employees found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredEmployees.map((employee) => (
                              <TableRow key={employee.id} className="hover-scale-subtle">
                                <TableCell className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarImage src={employee.avatar} alt={employee.firstName} />
                                    <AvatarFallback>
                                      {employee.firstName[0] + employee.lastName[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{employee.firstName} {employee.lastName}</div>
                                    <div className="text-sm text-muted-foreground">{employee.email}</div>
                                  </div>
                                </TableCell>
                                <TableCell>{employee.role}</TableCell>
                                <TableCell>{employee.branch}</TableCell>
                                <TableCell>
                                  <Badge variant={
                                    employee.status === "active" ? "default" :
                                    employee.status === "inactive" ? "destructive" : "outline"
                                  }>
                                    {employee.status === "active" ? "Active" :
                                      employee.status === "inactive" ? "Inactive" : "On Leave"}
                                  </Badge>
                                </TableCell>
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
                                      <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => handleDeleteEmployee(employee.id)}
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
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full sm:w-1/3 space-y-4">
            {currentEmployee ? (
              <AnimatedDashboardCard
                title="Employee Details"
                delay={2}
                className="animate-fade-in [animation-delay:200ms]"
              >
                <div className="flex flex-col items-center space-y-4 pb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentEmployee.avatar} alt={currentEmployee.firstName} />
                    <AvatarFallback className="text-lg">
                      {currentEmployee.firstName[0] + currentEmployee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">{currentEmployee.firstName} {currentEmployee.lastName}</h3>
                    <Badge className="mt-1">{currentEmployee.role}</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{currentEmployee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{currentEmployee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{currentEmployee.branch}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Hired on {currentEmployee.hireDate}</span>
                  </div>
                  {currentEmployee.address && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{currentEmployee.address}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Last active {new Date(currentEmployee.lastActive).toLocaleDateString()} at {new Date(currentEmployee.lastActive).toLocaleTimeString()}</span>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentEmployee.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedDashboardCard>
            ) : (
              <AnimatedDashboardCard
                title="Role Information"
                delay={2}
                className="animate-fade-in [animation-delay:200ms]"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <Briefcase className="mr-2 h-5 w-5" /> Manager
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Oversees daily operations, staff management, and customer relations.
                    </p>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Default Permissions:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">menu.view</Badge>
                        <Badge variant="outline" className="text-xs">menu.edit</Badge>
                        <Badge variant="outline" className="text-xs">orders.view</Badge>
                        <Badge variant="outline" className="text-xs">orders.edit</Badge>
                        <Badge variant="outline" className="text-xs">employees.view</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="mr-2 h-5 w-5" /> Cashier
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Handles customer payments, order inputs, and receipt generation.
                    </p>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Default Permissions:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">pos.view</Badge>
                        <Badge variant="outline" className="text-xs">pos.edit</Badge>
                        <Badge variant="outline" className="text-xs">orders.view</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      <Shield className="mr-2 h-5 w-5" /> Owner
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Has full access to all system functions and administrative controls.
                    </p>
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Default Permissions:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">admin.all</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedDashboardCard>
            )}
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
