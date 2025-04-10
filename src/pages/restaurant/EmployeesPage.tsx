
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
  CheckCircle2,
  Activity,
  FileText,
  BookOpen,
  AlertCircle,
  CreditCard,
  ChevronRight,
  Lock,
  Unlock,
  CheckIcon
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
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

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
  socialSecurity?: string;
  bankDetails?: string;
  hourlyRate?: number;
  education?: string;
  certifications?: string[];
  languages?: string[];
  availability?: {
    monday?: string[];
    tuesday?: string[];
    wednesday?: string[];
    thursday?: string[];
    friday?: string[];
    saturday?: string[];
    sunday?: string[];
  };
  performance?: {
    orders?: number;
    avgTime?: number;
    rating?: number;
    sales?: number;
    feedbacks?: number;
  };
  documents?: {
    name: string;
    type: string;
    date: string;
    status: string;
  }[];
  activityLog?: {
    action: string;
    date: string;
    details: string;
  }[];
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
    socialSecurity: "XXX-XX-4321",
    bankDetails: "XXXX-XXXX-XXXX-1234",
    hourlyRate: 22.50,
    education: "Bachelor's in Business Administration",
    certifications: ["Food Handler's Certification", "Responsible Alcohol Service"],
    languages: ["English", "Spanish"],
    availability: {
      monday: ["9:00-17:00"],
      tuesday: ["9:00-17:00"],
      wednesday: ["9:00-17:00"],
      thursday: ["9:00-17:00"],
      friday: ["9:00-17:00"],
      saturday: [],
      sunday: [],
    },
    performance: {
      orders: 1240,
      avgTime: 12.3,
      rating: 4.8,
      sales: 32600,
      feedbacks: 56
    },
    documents: [
      { name: "Employment Contract", type: "PDF", date: "2021-03-15", status: "verified" },
      { name: "Food Handler's Certificate", type: "PDF", date: "2022-02-10", status: "verified" },
      { name: "Emergency Contact Form", type: "PDF", date: "2021-03-15", status: "verified" }
    ],
    activityLog: [
      { action: "Clock In", date: "2023-04-10T08:55:12", details: "Started shift" },
      { action: "Order #4528 Processed", date: "2023-04-10T11:32:45", details: "$78.50 total" },
      { action: "Break Start", date: "2023-04-10T13:00:00", details: "30 minute break" },
      { action: "Break End", date: "2023-04-10T13:30:00", details: "Returned from break" },
      { action: "Order #4532 Voided", date: "2023-04-10T14:15:23", details: "Customer changed mind" },
      { action: "Clock Out", date: "2023-04-10T17:05:41", details: "Ended shift" }
    ]
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
    socialSecurity: "XXX-XX-8765",
    bankDetails: "XXXX-XXXX-XXXX-5678",
    hourlyRate: 25.00,
    education: "Culinary Institute Certificate",
    certifications: ["Food Handler's Certification", "Culinary Arts Certificate"],
    languages: ["English", "Italian"],
    availability: {
      monday: ["14:00-22:00"],
      tuesday: ["14:00-22:00"],
      wednesday: ["14:00-22:00"],
      thursday: ["OFF"],
      friday: ["14:00-22:00"],
      saturday: ["14:00-22:00"],
      sunday: ["OFF"],
    },
    performance: {
      orders: 3450,
      avgTime: 18.5,
      rating: 4.9,
      sales: 0,
      feedbacks: 42
    },
    documents: [
      { name: "Employment Contract", type: "PDF", date: "2022-01-10", status: "verified" },
      { name: "Food Handler's Certificate", type: "PDF", date: "2022-01-05", status: "verified" },
      { name: "Culinary Certificate", type: "PDF", date: "2021-12-20", status: "verified" }
    ],
    activityLog: [
      { action: "Clock In", date: "2023-04-09T13:50:22", details: "Started shift" },
      { action: "Special Menu Created", date: "2023-04-09T15:12:45", details: "Weekend specials" },
      { action: "Inventory Check", date: "2023-04-09T16:30:00", details: "Weekly inventory" },
      { action: "Clock Out", date: "2023-04-09T22:05:17", details: "Ended shift" }
    ]
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
    socialSecurity: "XXX-XX-1357",
    bankDetails: "XXXX-XXXX-XXXX-9012",
    hourlyRate: 18.50,
    education: "High School Diploma",
    certifications: ["Cash Handling Certificate"],
    languages: ["English", "Spanish", "Portuguese"],
    availability: {
      monday: ["11:00-19:00"],
      tuesday: ["11:00-19:00"],
      wednesday: ["OFF"],
      thursday: ["11:00-19:00"],
      friday: ["11:00-19:00"],
      saturday: ["11:00-19:00"],
      sunday: ["OFF"],
    },
    performance: {
      orders: 2120,
      avgTime: 5.2,
      rating: 4.6,
      sales: 48750,
      feedbacks: 28
    },
    documents: [
      { name: "Employment Contract", type: "PDF", date: "2022-06-22", status: "verified" },
      { name: "Medical Leave Form", type: "PDF", date: "2023-04-01", status: "verified" },
      { name: "Doctor's Note", type: "PDF", date: "2023-04-01", status: "pending" }
    ],
    activityLog: [
      { action: "Medical Leave Start", date: "2023-04-01T09:00:00", details: "3 weeks leave" },
      { action: "Documentation Submitted", date: "2023-04-01T10:15:30", details: "Doctor's note" },
      { action: "Leave Approved", date: "2023-04-01T14:22:45", details: "By John Doe" }
    ]
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
    socialSecurity: "XXX-XX-9876",
    bankDetails: "XXXX-XXXX-XXXX-5432",
    hourlyRate: 0,
    education: "MBA, Restaurant Management",
    certifications: ["Food Safety Management", "Business Administration"],
    languages: ["English", "Mandarin", "Cantonese"],
    availability: {
      monday: ["8:00-18:00"],
      tuesday: ["8:00-18:00"],
      wednesday: ["8:00-18:00"],
      thursday: ["8:00-18:00"],
      friday: ["8:00-18:00"],
      saturday: ["10:00-14:00"],
      sunday: ["OFF"],
    },
    performance: {
      orders: 0,
      avgTime: 0,
      rating: 5.0,
      sales: 0,
      feedbacks: 12
    },
    documents: [
      { name: "Business License", type: "PDF", date: "2020-01-05", status: "verified" },
      { name: "Food Safety Certificate", type: "PDF", date: "2022-05-12", status: "verified" },
      { name: "Insurance Documents", type: "PDF", date: "2023-01-10", status: "verified" }
    ],
    activityLog: [
      { action: "System Login", date: "2023-04-10T09:05:22", details: "Dashboard access" },
      { action: "Report Generated", date: "2023-04-10T09:30:45", details: "Monthly sales report" },
      { action: "Menu Updated", date: "2023-04-10T10:15:00", details: "Added new items" },
      { action: "System Logout", date: "2023-04-10T11:05:17", details: "Session ended" }
    ]
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
  const [currentView, setCurrentView] = useState<"profile" | "availability" | "documents" | "activity" | null>(null);

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
      hourlyRate: 0,
      education: "",
      socialSecurity: "",
      bankDetails: "",
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
      hourlyRate: data.hourlyRate || 0,
      education: data.education || "",
      socialSecurity: data.socialSecurity || "",
      bankDetails: data.bankDetails || "",
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
      hourlyRate: employee.hourlyRate || 0,
      education: employee.education || "",
      socialSecurity: employee.socialSecurity || "",
      bankDetails: employee.bankDetails || "",
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    const updatedEmployees = employees.filter((emp) => emp.id !== id);
    setEmployees(updatedEmployees);
    toast.success("Employee removed successfully!");
  };

  const viewEmployeeDetails = (employee: Employee, view: "profile" | "availability" | "documents" | "activity" = "profile") => {
    setCurrentEmployee(employee);
    setCurrentView(view);
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
            <DialogContent className="sm:max-w-[600px]">
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
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="employment">Employment</TabsTrigger>
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="space-y-4">
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
                          name="education"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Education</FormLabel>
                              <FormControl>
                                <Input placeholder="Highest degree or certification" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="employment" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
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
                        <div className="flex items-center space-x-2 col-span-1">
                          <Input id="password-setup" type="checkbox" className="w-4 h-4" />
                          <Label htmlFor="password-setup">Setup account password</Label>
                        </div>
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
                    </TabsContent>
                    
                    <TabsContent value="financial" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="hourlyRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hourly Rate ($)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" min="0" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div></div>
                        <FormField
                          control={form.control}
                          name="bankDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bank Account Details</FormLabel>
                              <FormControl>
                                <Input placeholder="Last 4 digits only" {...field} />
                              </FormControl>
                              <FormDescription>
                                For identification purposes only
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="socialSecurity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tax ID / SSN</FormLabel>
                              <FormControl>
                                <Input placeholder="Last 4 digits only" {...field} />
                              </FormControl>
                              <FormDescription>
                                For identification purposes only
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {currentEmployee ? "Update Employee" : "Add Employee"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3">
            <Card className="animate-fade-in [animation-delay:100ms]">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0 pb-2">
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
                                  <Avatar className="cursor-pointer" onClick={() => viewEmployeeDetails(employee)}>
                                    <AvatarImage src={employee.avatar} alt={employee.firstName} />
                                    <AvatarFallback>
                                      {employee.firstName[0] + employee.lastName[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium cursor-pointer" onClick={() => viewEmployeeDetails(employee)}>
                                      {employee.firstName} {employee.lastName}
                                    </div>
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
                                      <DropdownMenuItem onClick={() => viewEmployeeDetails(employee)}>
                                        <User className="mr-2 h-4 w-4" />
                                        View Profile
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => viewEmployeeDetails(employee, "availability")}>
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Schedule
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => viewEmployeeDetails(employee, "documents")}>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Documents
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => viewEmployeeDetails(employee, "activity")}>
                                        <Activity className="mr-2 h-4 w-4" />
                                        Activity Log
                                      </DropdownMenuItem>
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

            {!currentEmployee && (
              <Card className="mt-6 animate-fade-in [animation-delay:300ms]">
                <CardHeader>
                  <CardTitle>Staff Overview</CardTitle>
                  <CardDescription>Distribution by role and branch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Staff by Role</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Manager</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Chef</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Cashier</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Owner</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Staff by Branch</h3>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Downtown</span>
                            <span className="text-sm">50%</span>
                          </div>
                          <Progress value={50} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Uptown</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">All Locations</span>
                            <span className="text-sm">25%</span>
                          </div>
                          <Progress value={25} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div className="border rounded-md p-4 text-center">
                        <h3 className="font-medium text-muted-foreground mb-1">Total Staff</h3>
                        <p className="text-3xl font-bold">{employees.length}</p>
                      </div>
                      <div className="border rounded-md p-4 text-center">
                        <h3 className="font-medium text-muted-foreground mb-1">Active Now</h3>
                        <p className="text-3xl font-bold">{employees.filter(e => e.status === 'active').length}</p>
                      </div>
                      <div className="border rounded-md p-4 text-center">
                        <h3 className="font-medium text-muted-foreground mb-1">On Leave</h3>
                        <p className="text-3xl font-bold">{employees.filter(e => e.status === 'on-leave').length}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="w-full lg:w-1/3 space-y-4">
            {currentEmployee ? (
              <>
                <Card className="animate-fade-in [animation-delay:200ms]">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-xl font-semibold">
                      <div className="flex items-center">
                        {currentView && currentView !== "profile" && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mr-2 h-8 w-8 p-0"
                            onClick={() => setCurrentView("profile")}
                          >
                            <ChevronRight className="h-4 w-4 rotate-180" />
                          </Button>
                        )}
                        {currentView === "profile" ? "Employee Profile" : 
                         currentView === "availability" ? "Schedule & Availability" :
                         currentView === "documents" ? "Documents" : "Activity Log"}
                      </div>
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        setCurrentEmployee(null);
                        setCurrentView(null);
                      }}
                    >
                      <XMark className="h-4 w-4" />
                    </Button>
                  </CardHeader>

                  {currentView === "profile" && (
                    <>
                      <CardContent className="pt-0">
                        <div className="flex flex-col items-center space-y-4 pb-4 pt-2">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={currentEmployee.avatar} alt={currentEmployee.firstName} />
                            <AvatarFallback className="text-lg">
                              {currentEmployee.firstName[0] + currentEmployee.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <h3 className="text-xl font-semibold">{currentEmployee.firstName} {currentEmployee.lastName}</h3>
                            <div className="flex flex-wrap justify-center gap-2 mt-1">
                              <Badge>{currentEmployee.role}</Badge>
                              <Badge variant="outline">{currentEmployee.branch}</Badge>
                            </div>
                          </div>
                        </div>

                        <Tabs defaultValue="details">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="performance">Performance</TabsTrigger>
                            <TabsTrigger value="permissions">Permissions</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="details" className="mt-4 space-y-3">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{currentEmployee.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{currentEmployee.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Hired on {new Date(currentEmployee.hireDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>Last active {new Date(currentEmployee.lastActive).toLocaleDateString()} at {new Date(currentEmployee.lastActive).toLocaleTimeString()}</span>
                            </div>
                            {currentEmployee.address && (
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{currentEmployee.address}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-4 w-4 text-muted-foreground" />
                              <span>{currentEmployee.emergencyContact}</span>
                            </div>
                            {currentEmployee.education && (
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>{currentEmployee.education}</span>
                              </div>
                            )}
                            {currentEmployee.hourlyRate !== undefined && (
                              <div className="flex items-center space-x-2">
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                                <span>Hourly Rate: ${currentEmployee.hourlyRate.toFixed(2)}/hr</span>
                              </div>
                            )}
                            {currentEmployee.notes && (
                              <div className="pt-2">
                                <p className="text-sm text-muted-foreground border-l-2 border-primary/50 pl-2 italic">
                                  {currentEmployee.notes}
                                </p>
                              </div>
                            )}
                            
                            <div className="pt-2">
                              <h4 className="text-sm font-medium mb-2">Languages</h4>
                              <div className="flex flex-wrap gap-2">
                                {currentEmployee.languages?.map((language, index) => (
                                  <Badge key={index} variant="outline">{language}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <h4 className="text-sm font-medium mb-2">Certifications</h4>
                              <div className="flex flex-wrap gap-2">
                                {currentEmployee.certifications?.map((cert, index) => (
                                  <Badge key={index} variant="secondary">{cert}</Badge>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="performance" className="mt-4 space-y-4">
                            {currentEmployee.performance ? (
                              <>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="border rounded-md p-3 text-center">
                                    <p className="text-sm text-muted-foreground">Orders Processed</p>
                                    <p className="text-2xl font-bold">{currentEmployee.performance.orders}</p>
                                  </div>
                                  <div className="border rounded-md p-3 text-center">
                                    <p className="text-sm text-muted-foreground">Avg. Processing Time</p>
                                    <p className="text-2xl font-bold">{currentEmployee.performance.avgTime} min</p>
                                  </div>
                                  <div className="border rounded-md p-3 text-center">
                                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                                    <p className="text-2xl font-bold">{currentEmployee.performance.rating}/5.0</p>
                                  </div>
                                  <div className="border rounded-md p-3 text-center">
                                    <p className="text-sm text-muted-foreground">Customer Feedback</p>
                                    <p className="text-2xl font-bold">{currentEmployee.performance.feedbacks}</p>
                                  </div>
                                </div>

                                {currentEmployee.role === 'Cashier' && currentEmployee.performance.sales && (
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Sales Performance</h4>
                                    <div className="flex items-center justify-between">
                                      <span>Total Sales</span>
                                      <span className="font-medium">${currentEmployee.performance.sales}</span>
                                    </div>
                                    <Progress value={85} className="h-2 mt-1" />
                                    <p className="text-xs text-muted-foreground text-right mt-1">85% of target</p>
                                  </div>
                                )}
                                
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Efficiency Rating</h4>
                                  <div className="flex items-center justify-between">
                                    <span>Performance Score</span>
                                    <span className="font-medium">{currentEmployee.performance.rating * 20}%</span>
                                  </div>
                                  <Progress 
                                    value={currentEmployee.performance.rating * 20} 
                                    className="h-2 mt-1" 
                                    indicatorClassName={
                                      currentEmployee.performance.rating >= 4.5 ? "bg-green-500" : 
                                      currentEmployee.performance.rating >= 4.0 ? "bg-yellow-500" : "bg-red-500"
                                    }
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="text-center py-6 text-muted-foreground">
                                No performance data available
                              </div>
                            )}
                          </TabsContent>
                          
                          <TabsContent value="permissions" className="mt-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Shield className="h-4 w-4 text-muted-foreground" />
                                  <span>Role</span>
                                </div>
                                <Badge variant="outline" className="font-mono">{currentEmployee.role}</Badge>
                              </div>
                              
                              <div className="border-t pt-3">
                                <h4 className="text-sm font-medium mb-2">Access Permissions</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {currentEmployee.permissions.map((permission, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <CheckIcon className="h-4 w-4 text-green-500" />
                                      <span className="text-sm">{permission}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div className="flex items-center space-x-2">
                                    {currentEmployee.role === 'Owner' || currentEmployee.role === 'Manager' ? (
                                      <Lock className="h-4 w-4 text-green-500" />
                                    ) : (
                                      <Unlock className="h-4 w-4 text-yellow-500" />
                                    )}
                                    <span className="text-sm">System Access</span>
                                  </div>
                                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                    Modify Permissions
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => viewEmployeeDetails(currentEmployee, "availability")}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => viewEmployeeDetails(currentEmployee, "activity")}
                          >
                            <Activity className="mr-2 h-4 w-4" />
                            Activity
                          </Button>
                        </div>
                        <Button size="sm" onClick={() => handleEditEmployee(currentEmployee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </CardFooter>
                    </>
                  )}

                  {currentView === "availability" && (
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between py-2">
                        <h3 className="font-medium">{currentEmployee.firstName} {currentEmployee.lastName}'s Schedule</h3>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Schedule
                        </Button>
                      </div>
                      
                      <div className="mt-4 border rounded-md">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="py-2 px-3 text-left font-medium text-muted-foreground">Day</th>
                              <th className="py-2 px-3 text-left font-medium text-muted-foreground">Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                              <tr key={day} className="border-t">
                                <td className="py-2 px-3 capitalize font-medium">{day}</td>
                                <td className="py-2 px-3">
                                  {currentEmployee.availability?.[day]?.length ? (
                                    currentEmployee.availability[day].join(", ")
                                  ) : (
                                    <span className="text-muted-foreground">Off</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Time-Off Requests</h3>
                        {currentEmployee.status === "on-leave" ? (
                          <div className="p-3 border rounded-md bg-yellow-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                                <span className="font-medium">Currently On Leave</span>
                              </div>
                              <Badge variant="outline">Medical</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              {currentEmployee.notes || "No additional details available."}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-muted-foreground border rounded-md">
                            No active time-off requests
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}

                  {currentView === "documents" && (
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between py-2">
                        <h3 className="font-medium">{currentEmployee.firstName} {currentEmployee.lastName}'s Documents</h3>
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Upload Document
                        </Button>
                      </div>
                      
                      {currentEmployee.documents?.length ? (
                        <div className="mt-4 divide-y border rounded-md">
                          {currentEmployee.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {doc.type} • {new Date(doc.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={doc.status === 'verified' ? 'default' : 'outline'}>
                                  {doc.status === 'verified' ? (
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                  ) : null}
                                  {doc.status === 'verified' ? 'Verified' : 'Pending'}
                                </Badge>
                                <Button variant="ghost" size="sm">View</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground border rounded-md mt-4">
                          No documents available
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Required Documents</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Employment Contract</span>
                            </div>
                            <Badge variant="outline" className={currentEmployee.documents?.find(d => d.name === 'Employment Contract') ? "bg-green-500 text-white" : ""}>
                              {currentEmployee.documents?.find(d => d.name === 'Employment Contract') ? "Completed" : "Required"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Tax Forms</span>
                            </div>
                            <Badge variant="outline" className={currentEmployee.documents?.find(d => d.name === 'Tax Forms') ? "bg-green-500 text-white" : ""}>
                              {currentEmployee.documents?.find(d => d.name === 'Tax Forms') ? "Completed" : "Required"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Food Handler's Certificate</span>
                            </div>
                            <Badge variant="outline" className={currentEmployee.documents?.find(d => d.name === 'Food Handler\'s Certificate') ? "bg-green-500 text-white" : ""}>
                              {currentEmployee.documents?.find(d => d.name === 'Food Handler\'s Certificate') ? "Completed" : "Required"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}

                  {currentView === "activity" && (
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between py-2">
                        <h3 className="font-medium">{currentEmployee.firstName} {currentEmployee.lastName}'s Activity</h3>
                        <Select defaultValue="recent">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="recent">Recent Activity</SelectItem>
                            <SelectItem value="clockin">Clock In/Out</SelectItem>
                            <SelectItem value="orders">Orders</SelectItem>
                            <SelectItem value="system">System Access</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {currentEmployee.activityLog?.length ? (
                        <div className="mt-4 border rounded-md">
                          <div className="border-b px-3 py-2 bg-muted/50 flex items-center justify-between">
                            <span className="font-medium">Activity</span>
                            <span className="font-medium">Time</span>
                          </div>
                          <div className="divide-y max-h-[300px] overflow-y-auto">
                            {currentEmployee.activityLog.map((activity, index) => (
                              <div key={index} className="px-3 py-2 hover:bg-muted/20">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium">{activity.action}</p>
                                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(activity.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground border rounded-md mt-4">
                          No activity logs available
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Export Activity Log
                        </Button>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="mt-2">
                        <h3 className="font-medium mb-2">Performance Metrics</h3>
                        {currentEmployee.performance ? (
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Order Processing Time</span>
                                <span>{currentEmployee.performance.avgTime} min (avg)</span>
                              </div>
                              <Progress 
                                value={100 - (currentEmployee.performance.avgTime / 20 * 100)} 
                                className="h-2"
                                indicatorClassName={
                                  currentEmployee.performance.avgTime < 12 ? "bg-green-500" : 
                                  currentEmployee.performance.avgTime < 16 ? "bg-yellow-500" : "bg-red-500"
                                }
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span>Customer Satisfaction</span>
                                <span>{currentEmployee.performance.rating}/5.0</span>
                              </div>
                              <Progress 
                                value={currentEmployee.performance.rating / 5 * 100} 
                                className="h-2"
                                indicatorClassName={
                                  currentEmployee.performance.rating >= 4.5 ? "bg-green-500" : 
                                  currentEmployee.performance.rating >= 4.0 ? "bg-yellow-500" : "bg-red-500"
                                }
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-4 text-muted-foreground border rounded-md">
                            No performance metrics available
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </>
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
