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
  Check,
  X,
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
    const matchesSearch =
      searchTerm === "" ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());

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
      permissions: [],
      hourlyRate: data.hourlyRate || 0,
      education: data.education || "",
      socialSecurity: data.socialSecurity || "",
      bankDetails: data.bankDetails || "",
    };

    if (currentEmployee) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === currentEmployee.id ? { ...emp, ...newEmployee, id: emp.id } : emp
      );
      setEmployees(updatedEmployees);
      toast.success(`Employee ${newEmployee.firstName} updated successfully!`);
    } else {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const formatDateString = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTimeString = (dateTimeString: string) => {
    if (!dateTimeString) return "-";
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <RestaurantLayout>
      <div className="space-y-8 p-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Employee Management</h1>
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

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <Card className="animate-fade-in [animation-delay:100ms] shadow-sm">
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
                  <TabsList className="grid w-full grid-cols-4 mb-6">
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
                            <TableHead className="w-[40%]">Employee</TableHead>
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
                                        Activity
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
          </div>

          <div className="w-full lg:w-1/3 space-y-8">
            {currentEmployee && currentView ? (
              <Card className="animate-fade-in shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {currentView === "profile" && "Employee Profile"}
                    {currentView === "availability" && "Schedule & Availability"}
                    {currentView === "documents" && "Documents & Certifications"}
                    {currentView === "activity" && "Activity Log"}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setCurrentView(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  {currentView === "profile" && (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center space-y-2 pb-4">
                        <Avatar className="h-20 w-20 mb-2">
                          <AvatarImage src={currentEmployee.avatar} alt={currentEmployee.firstName} />
                          <AvatarFallback className="text-xl">
                            {currentEmployee.firstName[0] + currentEmployee.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-semibold">{currentEmployee.firstName} {currentEmployee.lastName}</h3>
                        <Badge className="mt-1">{currentEmployee.role}</Badge>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                        
                        <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-3 items-center">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{currentEmployee.email}</span>
                          
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{currentEmployee.phone}</span>
                          
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{currentEmployee.address}</span>
                          
                          <AlertCircle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{currentEmployee.emergencyContact}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-muted-foreground">Employment Details</h4>
                        
                        <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-3 items-center">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{currentEmployee.branch}</span>
                          
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Hired: {formatDateString(currentEmployee.hireDate)}</span>
                          
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Last active: {formatDateString(currentEmployee.lastActive)}</span>
                          
                          {currentEmployee.hourlyRate !== undefined && (
                            <>
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                ${typeof currentEmployee.hourlyRate === 'number' 
                                   ? currentEmployee.hourlyRate.toFixed(2) 
                                   : '0.00'}/hr
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {currentEmployee.performance && (
                        <>
                          <Separator />
                          
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-muted-foreground">Performance Metrics</h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              {currentEmployee.performance.orders !== undefined && (
                                <div className="bg-primary/10 p-3 rounded-lg text-center">
                                  <div className="text-xs text-muted-foreground">Orders</div>
                                  <div className="text-xl font-bold">{currentEmployee.performance.orders}</div>
                                </div>
                              )}
                              
                              {currentEmployee.performance.rating !== undefined && (
                                <div className="bg-green-100 p-3 rounded-lg text-center">
                                  <div className="text-xs text-muted-foreground">Rating</div>
                                  <div className="text-xl font-bold">{currentEmployee.performance.rating.toFixed(1)}</div>
                                </div>
                              )}
                              
                              {currentEmployee.performance.avgTime !== undefined && (
                                <div className="bg-blue-100 p-3 rounded-lg text-center">
                                  <div className="text-xs text-muted-foreground">Avg Time</div>
                                  <div className="text-xl font-bold">{currentEmployee.performance.avgTime.toFixed(1)} min</div>
                                </div>
                              )}
                              
                              {currentEmployee.performance.feedbacks !== undefined && (
                                <div className="bg-purple-100 p-3 rounded-lg text-center">
                                  <div className="text-xs text-muted-foreground">Feedbacks</div>
                                  <div className="text-xl font-bold">{currentEmployee.performance.feedbacks}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      
                      {currentEmployee.notes && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Notes</h4>
                            <p className="text-sm bg-muted/50 p-3 rounded-md">{currentEmployee.notes}</p>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {currentView === "availability" && (
                    <div className="space-y-6">
                      <h3 className="text-base font-medium">Weekly Schedule</h3>
                      
                      {currentEmployee.availability ? (
                        <div className="space-y-3">
                          {Object.entries(currentEmployee.availability).map(([day, hours]) => (
                            <div key={day} className="flex items-center justify-between">
                              <div className="font-medium capitalize">{day}</div>
                              <div>
                                {hours && hours.length > 0 ? 
                                  hours.map((hour, idx) => (
                                    <Badge key={idx} variant="outline" className="ml-2">{hour}</Badge>
                                  )) : 
                                  <Badge variant="outline" className="bg-gray-100">Day Off</Badge>
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          No availability information found
                        </div>
                      )}

                      <Separator />
                      
                      <div className="space-y-3">
                        <h3 className="text-base font-medium">Skills & Languages</h3>
                        
                        {currentEmployee.certifications && currentEmployee.certifications.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm text-muted-foreground">Certifications</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentEmployee.certifications.map((cert, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {currentEmployee.languages && currentEmployee.languages.length > 0 && (
                          <div className="space-y-2 mt-4">
                            <h4 className="text-sm text-muted-foreground">Languages</h4>
                            <div className="flex flex-wrap gap-2">
                              {currentEmployee.languages.map((lang, idx) => (
                                <Badge key={idx} variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                                  {lang}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentView === "documents" && (
                    <div className="space-y-6">
                      <h3 className="text-base font-medium">Documents & Certifications</h3>
                      
                      {currentEmployee.documents && currentEmployee.documents.length > 0 ? (
                        <div className="space-y-4">
                          {currentEmployee.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                                <div>
                                  <div className="font-medium text-sm">{doc.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {doc.type} • {formatDateString(doc.date)}
                                  </div>
                                </div>
                              </div>
                              <div>
                                {getStatusBadge(doc.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          No documents found
                        </div>
                      )}
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-base font-medium mb-3">Access & Permissions</h3>
                        
                        {currentEmployee.permissions && currentEmployee.permissions.length > 0 ? (
                          <div className="space-y-3">
                            {currentEmployee.permissions.map((permission, idx) => {
                              const [module, action] = permission.split(".");
                              return (
                                <div key={idx} className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    {action === "edit" ? (
                                      <Unlock className="h-4 w-4 text-amber-500 mr-2" />
                                    ) : (
                                      <Lock className="h-4 w-4 text-blue-500 mr-2" />
                                    )}
                                    <span className="text-sm capitalize">{module}</span>
                                  </div>
                                  <Badge variant={action === "edit" ? "default" : "outline"} className="capitalize">
                                    {action}
                                  </Badge>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-3 text-muted-foreground">
                            No permissions defined
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {currentView === "activity" && (
                    <div className="space-y-6">
                      <h3 className="text-base font-medium">Recent Activity</h3>
                      
                      {currentEmployee.activityLog && currentEmployee.activityLog.length > 0 ? (
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-border">
                          {currentEmployee.activityLog.map((log, idx) => (
                            <div key={idx} className="relative flex items-start gap-3 pb-4">
                              <div className="absolute left-0 top-0 flex items-center justify-center size-10 rounded-full bg-muted">
                                <Activity className="h-5 w-5 text-muted-foreground" />
                              </div>
                              
                              <div className="ml-10 grow">
                                <div className="font-semibold">{log.action}</div>
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-sm text-muted-foreground">{formatDateString(log.date)} at {formatTimeString(log.date)}</span>
                                </div>
                                <div className="text-sm mt-1">{log.details}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          No activity records found
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleEditEmployee(currentEmployee)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Employee
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="animate-fade-in [animation-delay:200ms] shadow-sm">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Employee performance at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-2">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">Total Employees</span>
                      </div>
                      <span className="text-xl font-semibold">{employees.length}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-sm">Active</span>
                      </div>
                      <span className="text-xl font-semibold">
                        {employees.filter(e => e.status === "active").length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-amber-100 p-2 rounded-full mr-2">
                          <Clock className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-sm">On Leave</span>
                      </div>
                      <span className="text-xl font-semibold">
                        {employees.filter(e => e.status === "on-leave").length}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-full mr-2">
                          <X className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-sm">Inactive</span>
                      </div>
                      <span className="text-xl font-semibold">
                        {employees.filter(e => e.status === "inactive").length}
                      </span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Branch Distribution</h3>
                    
                    {branches.slice(0, 4).map(branch => {
                      const count = employees.filter(e => e.branch === branch).length;
                      const percentage = employees.length > 0 ? (count / employees.length) * 100 : 0;
                      
                      return (
                        <div key={branch} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{branch}</span>
                            <span className="text-muted-foreground">{count} employees</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
