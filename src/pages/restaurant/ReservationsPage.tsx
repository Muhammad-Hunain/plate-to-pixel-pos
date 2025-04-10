
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Phone, 
  CalendarDays, 
  CircleCheck, 
  CircleX, 
  MoreVertical, 
  Edit, 
  Trash2,
  CheckCircle,
  Clock4,
  Bell,
  CalendarClock,
  LayoutGrid,
  ListFilter,
  UserRound,
  MessageSquare,
  Table as TableIcon,
  Mail
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  date: string;
  time: string;
  partySize: number;
  status: "confirmed" | "seated" | "completed" | "no-show" | "cancelled";
  tableNumber?: string;
  specialRequests?: string;
  source: "online" | "phone" | "walk-in";
  createdAt: string;
  notes?: string;
  branch: string;
}

// Mock reservation data
const mockReservations: Reservation[] = [
  {
    id: "1",
    customerName: "John Smith",
    customerPhone: "(555) 123-4567",
    customerEmail: "john.smith@example.com",
    date: "2023-04-10",
    time: "19:00",
    partySize: 4,
    status: "confirmed",
    tableNumber: "T5",
    specialRequests: "Window seat if possible",
    source: "online",
    createdAt: "2023-04-01T10:30:00",
    branch: "Downtown"
  },
  {
    id: "2",
    customerName: "Maria Garcia",
    customerPhone: "(555) 234-5678",
    date: "2023-04-10",
    time: "20:30",
    partySize: 2,
    status: "seated",
    tableNumber: "T3",
    source: "phone",
    createdAt: "2023-04-02T14:15:00",
    branch: "Downtown"
  },
  {
    id: "3",
    customerName: "Robert Johnson",
    customerPhone: "(555) 345-6789",
    customerEmail: "robert.j@example.com",
    date: "2023-04-11",
    time: "18:15",
    partySize: 6,
    status: "confirmed",
    tableNumber: "T8",
    specialRequests: "Birthday celebration, bringing own cake",
    source: "online",
    createdAt: "2023-04-03T09:45:00",
    branch: "Uptown"
  },
  {
    id: "4",
    customerName: "Sarah Williams",
    customerPhone: "(555) 456-7890",
    date: "2023-04-10",
    time: "19:45",
    partySize: 3,
    status: "confirmed",
    tableNumber: "T4",
    source: "walk-in",
    createdAt: "2023-04-10T17:30:00",
    branch: "Downtown"
  },
  {
    id: "5",
    customerName: "David Lee",
    customerPhone: "(555) 567-8901",
    customerEmail: "david.lee@example.com",
    date: "2023-04-09",
    time: "20:00",
    partySize: 5,
    status: "completed",
    tableNumber: "T7",
    source: "online",
    createdAt: "2023-04-02T11:20:00",
    notes: "Regular customer, prefers red wine",
    branch: "Downtown"
  },
  {
    id: "6",
    customerName: "Jennifer Brown",
    customerPhone: "(555) 678-9012",
    date: "2023-04-09",
    time: "19:30",
    partySize: 2,
    status: "no-show",
    tableNumber: "T2",
    source: "phone",
    createdAt: "2023-04-05T16:10:00",
    branch: "Uptown"
  },
  {
    id: "7",
    customerName: "Michael Wilson",
    customerPhone: "(555) 789-0123",
    customerEmail: "michael.w@example.com",
    date: "2023-04-11",
    time: "12:30",
    partySize: 4,
    status: "confirmed",
    tableNumber: "T6",
    specialRequests: "Allergic to nuts",
    source: "online",
    createdAt: "2023-04-06T10:15:00",
    branch: "Downtown"
  },
  {
    id: "8",
    customerName: "Lisa Martin",
    customerPhone: "(555) 890-1234",
    date: "2023-04-10",
    time: "13:00",
    partySize: 1,
    status: "cancelled",
    source: "phone",
    createdAt: "2023-04-07T15:45:00",
    notes: "Cancelled due to illness",
    branch: "Downtown"
  }
];

// Mocked tables
const mockTables = [
  { id: "T1", capacity: 2, status: "available" },
  { id: "T2", capacity: 2, status: "reserved" },
  { id: "T3", capacity: 2, status: "occupied" },
  { id: "T4", capacity: 4, status: "reserved" },
  { id: "T5", capacity: 4, status: "reserved" },
  { id: "T6", capacity: 4, status: "available" },
  { id: "T7", capacity: 6, status: "available" },
  { id: "T8", capacity: 6, status: "reserved" },
  { id: "T9", capacity: 8, status: "available" },
  { id: "T10", capacity: 10, status: "available" }
];

const branches = ["Downtown", "Uptown", "Westside", "Airport"];
const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00"
];
const partySizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
  const [viewMode, setViewMode] = useState("list");

  const form = useForm({
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      date: new Date(),
      time: "",
      partySize: 2,
      tableNumber: "",
      specialRequests: "",
      source: "phone",
      branch: "Downtown",
    },
  });

  // Filter reservations based on search, date, and tab
  const filteredReservations = reservations.filter((reservation) => {
    // Filter by search term
    const matchesSearch =
      searchTerm === "" ||
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.customerPhone.includes(searchTerm) ||
      (reservation.customerEmail && reservation.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (reservation.tableNumber && reservation.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by date
    const matchesDate =
      !selectedDate || reservation.date === format(selectedDate, "yyyy-MM-dd");

    // Filter by tab (status)
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "upcoming" && 
        (reservation.status === "confirmed" || reservation.status === "seated")) ||
      (activeTab === "completed" && reservation.status === "completed") ||
      (activeTab === "cancelled" && 
        (reservation.status === "cancelled" || reservation.status === "no-show"));

    return matchesSearch && matchesDate && matchesTab;
  });

  const handleAddReservation = (data: any) => {
    const newReservation: Reservation = {
      id: String(reservations.length + 1),
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail || undefined,
      date: format(data.date, "yyyy-MM-dd"),
      time: data.time,
      partySize: data.partySize,
      status: "confirmed",
      tableNumber: data.tableNumber || undefined,
      specialRequests: data.specialRequests || undefined,
      source: data.source,
      createdAt: new Date().toISOString(),
      branch: data.branch,
    };

    if (currentReservation) {
      // Edit existing reservation
      const updatedReservations = reservations.map((res) =>
        res.id === currentReservation.id ? { ...res, ...newReservation, id: res.id } : res
      );
      setReservations(updatedReservations);
      toast.success(`Reservation for ${newReservation.customerName} updated successfully!`);
    } else {
      // Add new reservation
      setReservations([...reservations, newReservation]);
      toast.success(`Reservation for ${newReservation.customerName} added successfully!`);
    }

    form.reset();
    setIsAddDialogOpen(false);
    setCurrentReservation(null);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setCurrentReservation(reservation);
    form.reset({
      customerName: reservation.customerName,
      customerPhone: reservation.customerPhone,
      customerEmail: reservation.customerEmail || "",
      date: new Date(reservation.date),
      time: reservation.time,
      partySize: reservation.partySize,
      tableNumber: reservation.tableNumber || "",
      specialRequests: reservation.specialRequests || "",
      source: reservation.source,
      branch: reservation.branch,
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteReservation = (id: string) => {
    const updatedReservations = reservations.filter((res) => res.id !== id);
    setReservations(updatedReservations);
    toast.success("Reservation cancelled successfully!");
  };

  const handleUpdateStatus = (id: string, newStatus: Reservation["status"]) => {
    const updatedReservations = reservations.map((res) =>
      res.id === id ? { ...res, status: newStatus } : res
    );
    setReservations(updatedReservations);
    toast.success(`Reservation status updated to ${newStatus}!`);
  };

  // Helper function to get badge style based on reservation status
  const getStatusBadge = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Confirmed</Badge>;
      case "seated":
        return <Badge variant="default" className="bg-amber-500">Seated</Badge>;
      case "completed":
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case "no-show":
        return <Badge variant="destructive">No Show</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="border-destructive text-destructive">Cancelled</Badge>;
    }
  };

  // Helper function to get icon for reservation source
  const getSourceIcon = (source: Reservation["source"]) => {
    switch (source) {
      case "online":
        return <Globe className="h-4 w-4 text-muted-foreground" />;
      case "phone":
        return <Phone className="h-4 w-4 text-muted-foreground" />;
      case "walk-in":
        return <Users className="h-4 w-4 text-muted-foreground" />;
    }
  };
  
  // Custom component for source icon since Globe is not imported above
  const Globe = (props: any) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={props.className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );

  // Count reservations by status for the selected date
  const todayStats = {
    confirmed: filteredReservations.filter(r => r.status === "confirmed").length,
    seated: filteredReservations.filter(r => r.status === "seated").length,
    completed: filteredReservations.filter(r => r.status === "completed").length,
    cancelled: filteredReservations.filter(r => r.status === "cancelled" || r.status === "no-show").length,
    total: filteredReservations.length
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservation Management</h1>
            <p className="text-muted-foreground">
              Manage customer reservations and table assignments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="hover-scale">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="hover-scale">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Reservation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>{currentReservation ? "Edit" : "Add New"} Reservation</DialogTitle>
                  <DialogDescription>
                    {currentReservation
                      ? "Update the reservation details"
                      : "Fill out the form to create a new reservation"}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddReservation)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Customer Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="name@example.com" type="email" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partySize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Party Size</FormLabel>
                            <Select 
                              onValueChange={(value) => field.onChange(parseInt(value))}
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select party size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {partySizes.map((size) => (
                                  <SelectItem key={size} value={size.toString()}>
                                    {size} {size === 1 ? "person" : "people"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className="w-full pl-3 text-left font-normal"
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
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
                        name="tableNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Table (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Assign table" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="">No table assigned</SelectItem>
                                {mockTables.map((table) => (
                                  <SelectItem key={table.id} value={table.id}>
                                    {table.id} - {table.capacity} seats
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="source"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Source</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Reservation source" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="walk-in">Walk-in</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="specialRequests"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Special Requests</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special requests or notes"
                                className="resize-none"
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full sm:w-auto">
                        {currentReservation ? "Update Reservation" : "Create Reservation"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <div className="hidden sm:flex items-center ml-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewMode("list")}
              >
                <ListFilter className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <AnimatedDashboardCard
            title="Today's Overview"
            delay={1}
            className="col-span-1 md:col-span-2"
          >
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold">{todayStats.total}</span>
                <span className="text-xs text-muted-foreground mt-1">Total</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold text-blue-500">{todayStats.confirmed}</span>
                <span className="text-xs text-muted-foreground mt-1">Confirmed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold text-amber-500">{todayStats.seated}</span>
                <span className="text-xs text-muted-foreground mt-1">Seated</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold text-green-500">{todayStats.completed}</span>
                <span className="text-xs text-muted-foreground mt-1">Completed</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                <span className="text-2xl font-bold text-destructive">{todayStats.cancelled}</span>
                <span className="text-xs text-muted-foreground mt-1">Cancelled</span>
              </div>
            </div>
          </AnimatedDashboardCard>

          <AnimatedDashboardCard
            title="Tables Status"
            delay={2}
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {mockTables.slice(0, 8).map(table => (
                <div 
                  key={table.id}
                  className={`flex flex-col items-center justify-center w-12 h-12 rounded-md border ${
                    table.status === "occupied" ? "bg-amber-100 border-amber-500" :
                    table.status === "reserved" ? "bg-blue-100 border-blue-500" :
                    "bg-green-100 border-green-500"
                  }`}
                >
                  <span className="text-xs font-bold">{table.id}</span>
                  <span className="text-[10px]">{table.capacity}p</span>
                </div>
              ))}
            </div>
          </AnimatedDashboardCard>

          <AnimatedDashboardCard
            title="Upcoming"
            delay={3}
            rightHeader={
              <Button variant="outline" size="sm" className="h-8">
                <Bell className="h-4 w-4" />
              </Button>
            }
          >
            <div className="space-y-2">
              {reservations
                .filter(r => r.status === "confirmed" && r.date === format(new Date(), "yyyy-MM-dd"))
                .slice(0, 3)
                .map(res => (
                  <div key={res.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-sm font-medium">{res.time}</span>
                    </div>
                    <div className="text-sm">{res.customerName}</div>
                    <div className="text-xs text-muted-foreground">{res.partySize}p</div>
                  </div>
                ))}
              {reservations.filter(r => r.status === "confirmed" && r.date === format(new Date(), "yyyy-MM-dd")).length === 0 && (
                <div className="text-center text-sm text-muted-foreground py-2">
                  No upcoming reservations
                </div>
              )}
            </div>
          </AnimatedDashboardCard>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-3/4">
            <Card className="animate-fade-in [animation-delay:100ms]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                  <CardTitle>Reservations</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "All dates"}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search reservations..."
                      className="w-[200px] pl-8"
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
                <Tabs onValueChange={setActiveTab} value={activeTab}>
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-4">
                    {viewMode === "list" ? (
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Customer</TableHead>
                              <TableHead>Date & Time</TableHead>
                              <TableHead>Party Size</TableHead>
                              <TableHead>Table</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredReservations.length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                  No reservations found
                                </TableCell>
                              </TableRow>
                            ) : (
                              filteredReservations.map((reservation) => (
                                <TableRow key={reservation.id} className="hover-scale-subtle">
                                  <TableCell>
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback>{reservation.customerName[0]}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">{reservation.customerName}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Phone className="h-3 w-3" />
                                          {reservation.customerPhone}
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex flex-col">
                                      <span>{format(new Date(reservation.date), "MMM d, yyyy")}</span>
                                      <span className="text-sm text-muted-foreground">{reservation.time}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell>{reservation.partySize} people</TableCell>
                                  <TableCell>
                                    {reservation.tableNumber ? (
                                      <Badge variant="outline">{reservation.tableNumber}</Badge>
                                    ) : (
                                      <span className="text-muted-foreground text-sm">Not assigned</span>
                                    )}
                                  </TableCell>
                                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
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
                                        <DropdownMenuItem onClick={() => handleEditReservation(reservation)}>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        {reservation.status === "confirmed" && (
                                          <DropdownMenuItem onClick={() => handleUpdateStatus(reservation.id, "seated")}>
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Mark as Seated
                                          </DropdownMenuItem>
                                        )}
                                        {reservation.status === "seated" && (
                                          <DropdownMenuItem onClick={() => handleUpdateStatus(reservation.id, "completed")}>
                                            <Check className="mr-2 h-4 w-4" />
                                            Mark as Completed
                                          </DropdownMenuItem>
                                        )}
                                        {(reservation.status === "confirmed" || reservation.status === "seated") && (
                                          <>
                                            <DropdownMenuItem onClick={() => handleUpdateStatus(reservation.id, "no-show")}>
                                              <CircleX className="mr-2 h-4 w-4" />
                                              Mark as No-Show
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              className="text-destructive"
                                              onClick={() => handleDeleteReservation(reservation.id)}
                                            >
                                              <Trash2 className="mr-2 h-4 w-4" />
                                              Cancel Reservation
                                            </DropdownMenuItem>
                                          </>
                                        )}
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
                          <div className="col-span-3 text-center py-8 text-muted-foreground">
                            No reservations found
                          </div>
                        ) : (
                          filteredReservations.map((reservation) => (
                            <Card key={reservation.id} className="hover-scale-subtle overflow-hidden">
                              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                                <div className="flex items-center gap-2">
                                  <Avatar>
                                    <AvatarFallback>{reservation.customerName[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <CardTitle className="text-base">{reservation.customerName}</CardTitle>
                                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                      {getSourceIcon(reservation.source)}
                                      <span className="ml-1 capitalize">{reservation.source}</span>
                                    </div>
                                  </div>
                                </div>
                                {getStatusBadge(reservation.status)}
                              </CardHeader>
                              <CardContent className="pb-3">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                    <span>{format(new Date(reservation.date), "EEEE, MMMM d, yyyy")}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{reservation.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span>{reservation.partySize} people</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <TableIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{reservation.tableNumber || "Not assigned"}</span>
                                  </div>
                                  {reservation.specialRequests && (
                                    <div className="flex items-start gap-2">
                                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                                      <span className="text-sm">{reservation.specialRequests}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditReservation(reservation)}
                                  >
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                  </Button>
                                  {reservation.status === "confirmed" && (
                                    <Button 
                                      variant="default" 
                                      size="sm"
                                      onClick={() => handleUpdateStatus(reservation.id, "seated")}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" /> Seat
                                    </Button>
                                  )}
                                  {reservation.status === "seated" && (
                                    <Button 
                                      variant="default" 
                                      size="sm"
                                      onClick={() => handleUpdateStatus(reservation.id, "completed")}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" /> Complete
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full sm:w-1/4 space-y-4">
            <AnimatedDashboardCard
              title="Quick Actions"
              delay={2}
              className="animate-fade-in [animation-delay:200ms]"
            >
              <div className="space-y-2">
                <Button className="w-full justify-start" size="sm">
                  <UserRound className="mr-2 h-4 w-4" />
                  Walk-in Customer
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminders
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <CalendarClock className="mr-2 h-4 w-4" />
                  View Waitlist
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <TableIcon className="mr-2 h-4 w-4" />
                  Manage Tables
                </Button>
              </div>
            </AnimatedDashboardCard>

            <AnimatedDashboardCard
              title="Reservation Insights"
              delay={3}
              className="animate-fade-in [animation-delay:300ms]"
              rightHeader={
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <CalendarDays className="h-4 w-4" />
                </Button>
              }
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Popular Times</h3>
                  <div className="flex items-end h-24 gap-1">
                    {[10, 30, 85, 70, 45, 60, 90, 50, 20, 15].map((height, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>12p</span>
                    <span>3p</span>
                    <span>6p</span>
                    <span>9p</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 border-t pt-3">
                  <h3 className="text-sm font-medium">Upcoming Week</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Today</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-100">12</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tomorrow</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-100">8</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekend</span>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs bg-blue-100">24</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedDashboardCard>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
