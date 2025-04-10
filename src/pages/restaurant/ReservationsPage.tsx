import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Calendar as CalendarIcon } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  User,
  Calendar,
  Phone,
  Clock,
  Users,
  Filter,
  Plus,
  Check,
  X,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MapPin
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TimeInput } from "@/components/ui/time-input";

// Type definitions
interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  partySize: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  tableNumber?: string;
  specialRequests?: string;
  createdAt: string;
  branch: string;
}

// Mock data
const initialReservations: Reservation[] = [
  {
    id: "R1001",
    customerName: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@example.com",
    date: "2025-04-10",
    time: "19:00",
    partySize: 4,
    status: "confirmed",
    tableNumber: "12",
    specialRequests: "Window seat if possible",
    createdAt: "2025-04-01T15:30:00",
    branch: "Downtown",
  },
  {
    id: "R1002",
    customerName: "Sarah Johnson",
    phone: "(555) 234-5678",
    email: "sarah.j@example.com",
    date: "2025-04-10",
    time: "20:00",
    partySize: 2,
    status: "confirmed",
    tableNumber: "5",
    specialRequests: "Anniversary celebration",
    createdAt: "2025-04-02T10:15:00",
    branch: "Uptown",
  },
  {
    id: "R1003",
    customerName: "Michael Chang",
    phone: "(555) 345-6789",
    email: "michael.c@example.com",
    date: "2025-04-11",
    time: "18:30",
    partySize: 6,
    status: "pending",
    createdAt: "2025-04-02T16:45:00",
    branch: "Downtown",
  },
  {
    id: "R1004",
    customerName: "Emily Davis",
    phone: "(555) 456-7890",
    email: "emily.d@example.com",
    date: "2025-04-10",
    time: "17:00",
    partySize: 3,
    status: "cancelled",
    createdAt: "2025-04-01T09:20:00",
    branch: "Westside",
  },
  {
    id: "R1005",
    customerName: "Robert Wilson",
    phone: "(555) 567-8901",
    email: "robert.w@example.com",
    date: "2025-04-09",
    time: "19:30",
    partySize: 4,
    status: "completed",
    tableNumber: "8",
    specialRequests: "Food allergies: nuts",
    createdAt: "2025-04-01T11:10:00",
    branch: "Downtown",
  },
  {
    id: "R1006",
    customerName: "Jessica Brown",
    phone: "(555) 678-9012",
    email: "jessica.b@example.com",
    date: "2025-04-11",
    time: "20:15",
    partySize: 5,
    status: "confirmed",
    tableNumber: "15",
    createdAt: "2025-04-03T14:25:00",
    branch: "Uptown",
  }
];

const mockBranches = ["All Branches", "Downtown", "Uptown", "Westside", "Northside", "Eastside"];

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("All Branches");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);
  const [currentView, setCurrentView] = useState<"list" | "calendar">("list");

  const form = useForm({
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      date: new Date(),
      time: "19:00",
      partySize: 2,
      branch: "Downtown",
      tableNumber: "",
      specialRequests: "",
      status: "confirmed" as "confirmed" | "pending" | "cancelled" | "completed",
    },
  });

  // Filter reservations based on search, status, date, and branch
  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      searchQuery === "" ||
      reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    
    const reservationDate = new Date(reservation.date);
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    const matchesDate = 
      reservationDate.toISOString().split("T")[0] === selectedDateStr;

    const matchesBranch = 
      branchFilter === "All Branches" || 
      reservation.branch === branchFilter;

    return matchesSearch && matchesStatus && matchesDate && matchesBranch;
  });

  const handleReservationSubmit = (data: any) => {
    const formattedDate = data.date.toISOString().split("T")[0];
    
    if (editingReservation) {
      // Edit existing reservation
      const updatedReservations = reservations.map((res) =>
        res.id === editingReservation.id
          ? {
              ...res,
              customerName: data.customerName,
              phone: data.phone,
              email: data.email,
              date: formattedDate,
              time: data.time,
              partySize: data.partySize,
              status: data.status,
              tableNumber: data.tableNumber,
              specialRequests: data.specialRequests,
              branch: data.branch,
            }
          : res
      );
      setReservations(updatedReservations);
      toast.success("Reservation updated successfully!");
    } else {
      // Add new reservation
      const newReservation: Reservation = {
        id: `R${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        date: formattedDate,
        time: data.time,
        partySize: data.partySize,
        status: data.status,
        tableNumber: data.tableNumber,
        specialRequests: data.specialRequests,
        createdAt: new Date().toISOString(),
        branch: data.branch,
      };
      setReservations([...reservations, newReservation]);
      toast.success("Reservation added successfully!");
    }

    setIsAddDialogOpen(false);
    setEditingReservation(null);
    form.reset();
  };

  const handleEditReservation = (reservation: Reservation) => {
    setEditingReservation(reservation);
    
    form.reset({
      customerName: reservation.customerName,
      phone: reservation.phone,
      email: reservation.email,
      date: new Date(reservation.date),
      time: reservation.time,
      partySize: reservation.partySize,
      status: reservation.status,
      tableNumber: reservation.tableNumber || "",
      specialRequests: reservation.specialRequests || "",
      branch: reservation.branch,
    });
    
    setIsAddDialogOpen(true);
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(reservations.filter((res) => res.id !== id));
    toast.success("Reservation deleted successfully!");
  };

  const handleStatusChange = (id: string, status: "confirmed" | "pending" | "cancelled" | "completed") => {
    const updatedReservations = reservations.map((res) =>
      res.id === id ? { ...res, status } : res
    );
    setReservations(updatedReservations);
    
    const statusMessages = {
      confirmed: "Reservation confirmed successfully!",
      pending: "Reservation marked as pending.",
      cancelled: "Reservation cancelled.",
      completed: "Reservation marked as completed.",
    };
    
    toast.success(statusMessages[status]);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const addNewReservation = () => {
    setEditingReservation(null);
    form.reset({
      customerName: "",
      phone: "",
      email: "",
      date: selectedDate,
      time: "19:00",
      partySize: 2,
      branch: branchFilter !== "All Branches" ? branchFilter : "Downtown",
      tableNumber: "",
      specialRequests: "",
      status: "confirmed",
    });
    setIsAddDialogOpen(true);
  };

  return (
    <RestaurantLayout>
      <div className="space-y-8 p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Reservations</h1>
            <p className="text-muted-foreground">
              Manage restaurant reservations and table assignments
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={branchFilter}
              onValueChange={setBranchFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {mockBranches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={addNewReservation} className="hover-scale">
              <Plus className="mr-2 h-4 w-4" />
              Add Reservation
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reservation Date</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <DatePicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="w-full"
                />
                
                <div className="flex justify-between items-center w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const prevDay = new Date(selectedDate);
                      prevDay.setDate(prevDay.getDate() - 1);
                      setSelectedDate(prevDay);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date())}
                  >
                    Today
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const nextDay = new Date(selectedDate);
                      nextDay.setDate(nextDay.getDate() + 1);
                      setSelectedDate(nextDay);
                    }}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Fast access to reservation tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left" 
                  onClick={addNewReservation}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Reservation
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    const confirmed = reservations.filter(r => 
                      r.status === "confirmed" && 
                      r.date === selectedDate.toISOString().split("T")[0] && 
                      (branchFilter === "All Branches" || r.branch === branchFilter)
                    );
                    if (confirmed.length > 0) {
                      const message = `${confirmed.length} confirmed reservations for ${
                        selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      }${branchFilter !== "All Branches" ? ` at ${branchFilter}` : ''}`;
                      toast.success(message);
                    } else {
                      toast.info("No confirmed reservations found for the selected date and branch.");
                    }
                  }}
                >
                  <Check className="mr-2 h-4 w-4" />
                  View Confirmed
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    const pending = reservations.filter(r => 
                      r.status === "pending" && 
                      r.date === selectedDate.toISOString().split("T")[0] && 
                      (branchFilter === "All Branches" || r.branch === branchFilter)
                    );
                    if (pending.length > 0) {
                      toast.info(`${pending.length} pending reservations require your attention`);
                    } else {
                      toast.success("No pending reservations for the selected date and branch.");
                    }
                  }}
                >
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Review Pending
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setCurrentView(currentView === "list" ? "calendar" : "list");
                    toast.info(`Switched to ${currentView === "list" ? "calendar" : "list"} view`);
                  }}
                >
                  {currentView === "list" ? (
                    <Calendar className="mr-2 h-4 w-4" />
                  ) : (
                    <Users className="mr-2 h-4 w-4" />
                  )}
                  Toggle View
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => {
                    const today = new Date();
                    const todayString = today.toISOString().split("T")[0];
                    const completed = reservations.filter(r => 
                      r.date === todayString && 
                      r.status === "completed" && 
                      (branchFilter === "All Branches" || r.branch === branchFilter)
                    );
                    toast.success(`${completed.length} reservations completed today${branchFilter !== "All Branches" ? ` at ${branchFilter}` : ''}`);
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Today's Summary
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today's Bookings:</span>
                  <span className="font-medium">
                    {reservations.filter(r => r.date === new Date().toISOString().split("T")[0]).length}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Selected Date:</span>
                  <span className="font-medium">
                    {filteredReservations.length}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pending:</span>
                  <span className="font-medium">
                    {filteredReservations.filter(r => r.status === "pending").length}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confirmed:</span>
                  <span className="font-medium">
                    {filteredReservations.filter(r => r.status === "confirmed").length}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Party Size:</span>
                  <span className="font-medium">
                    {filteredReservations.reduce((total, r) => total + r.partySize, 0)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                  <CardTitle>
                    Reservations for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </CardTitle>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search reservations..."
                        className="pl-9 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="All Statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4">
                    {currentView === "list" ? (
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[180px]">Customer</TableHead>
                              <TableHead>Time</TableHead>
                              <TableHead>Party Size</TableHead>
                              <TableHead>Branch</TableHead>
                              <TableHead>Table</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredReservations.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center">
                                  No reservations found for the selected date and filters
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredReservations.map((reservation) => (
                                <TableRow key={reservation.id}>
                                  <TableCell>
                                    <div className="font-medium">{reservation.customerName}</div>
                                    <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                                  </TableCell>
                                  <TableCell>{reservation.time}</TableCell>
                                  <TableCell>{reservation.partySize}</TableCell>
                                  <TableCell>{reservation.branch}</TableCell>
                                  <TableCell>{reservation.tableNumber || "—"}</TableCell>
                                  <TableCell>
                                    <Badge className={getStatusBadgeColor(reservation.status)}>
                                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuItem onClick={() => handleEditReservation(reservation)}>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleStatusChange(reservation.id, "confirmed")}
                                          disabled={reservation.status === "confirmed"}
                                        >
                                          <Check className="mr-2 h-4 w-4 text-green-600" />
                                          Confirm
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleStatusChange(reservation.id, "completed")}
                                          disabled={reservation.status === "completed"}
                                        >
                                          <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                                          Mark as Completed
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => handleStatusChange(reservation.id, "cancelled")}
                                          disabled={reservation.status === "cancelled"}
                                        >
                                          <X className="mr-2 h-4 w-4 text-red-600" />
                                          Cancel
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                          className="text-red-600"
                                          onClick={() => handleDeleteReservation(reservation.id)}
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
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredReservations.length === 0 ? (
                          <div className="col-span-full h-32 flex items-center justify-center text-muted-foreground">
                            No reservations found for the selected date and filters
                          </div>
                        ) : (
                          filteredReservations.map((reservation) => (
                            <Card key={reservation.id} className={`hover:shadow-md transition-shadow ${
                              reservation.status === "cancelled" ? "opacity-60" : ""
                            }`}>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-base">{reservation.customerName}</CardTitle>
                                    <CardDescription>{reservation.phone}</CardDescription>
                                  </div>
                                  <Badge className={getStatusBadgeColor(reservation.status)}>
                                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{reservation.time}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{reservation.partySize} guests</span>
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{reservation.branch}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>Table {reservation.tableNumber || "—"}</span>
                                  </div>
                                </div>
                                {reservation.specialRequests && (
                                  <div className="mt-3 text-sm">
                                    <p className="text-muted-foreground">Notes:</p>
                                    <p className="italic">{reservation.specialRequests}</p>
                                  </div>
                                )}
                              </CardContent>
                              <CardFooter className="flex justify-end pt-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditReservation(reservation)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleStatusChange(reservation.id, "confirmed")}
                                      disabled={reservation.status === "confirmed"}
                                    >
                                      <Check className="mr-2 h-4 w-4 text-green-600" />
                                      Confirm
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleStatusChange(reservation.id, "completed")}
                                      disabled={reservation.status === "completed"}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                                      Mark as Completed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleStatusChange(reservation.id, "cancelled")}
                                      disabled={reservation.status === "cancelled"}
                                    >
                                      <X className="mr-2 h-4 w-4 text-red-600" />
                                      Cancel
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => handleDeleteReservation(reservation.id)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </CardFooter>
                            </Card>
                          ))
                        )}
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Other tabs will use filtered data based on status */}
                  {["confirmed", "pending", "cancelled", "completed"].map((status) => (
                    <TabsContent key={status} value={status} className="space-y-4">
                      {currentView === "list" ? (
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[180px]">Customer</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Party Size</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Table</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredReservations.filter(r => r.status === status).length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={7} className="h-32 text-center">
                                    No {status} reservations found for the selected date
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredReservations
                                  .filter(r => r.status === status)
                                  .map((reservation) => (
                                    <TableRow key={reservation.id}>
                                      <TableCell>
                                        <div className="font-medium">{reservation.customerName}</div>
                                        <div className="text-sm text-muted-foreground">{reservation.phone}</div>
                                      </TableCell>
                                      <TableCell>{reservation.time}</TableCell>
                                      <TableCell>{reservation.partySize}</TableCell>
                                      <TableCell>{reservation.branch}</TableCell>
                                      <TableCell>{reservation.tableNumber || "—"}</TableCell>
                                      <TableCell>
                                        <Badge className={getStatusBadgeColor(status)}>
                                          {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                              <MoreVertical className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuItem onClick={() => handleEditReservation(reservation)}>
                                              <Edit className="mr-2 h-4 w-4" />
                                              Edit Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => handleStatusChange(reservation.id, "confirmed")}
                                              disabled={status === "confirmed"}
                                            >
                                              <Check className="mr-2 h-4 w-4 text-green-600" />
                                              Confirm
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => handleStatusChange(reservation.id, "completed")}
                                              disabled={status === "completed"}
                                            >
                                              <CheckCircle className="mr-2 h-4 w
