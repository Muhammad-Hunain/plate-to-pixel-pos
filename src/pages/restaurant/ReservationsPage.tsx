import { useState, useEffect } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  User,
  Table as TableIcon,
  Utensils,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Filter,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Check,
  XMark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
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
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  table: string;
  date: string;
  time: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  specialRequests?: string;
  source: "online" | "phone" | "in-person";
  staffAssigned?: string;
  timeCreated: string;
  lastUpdated: string;
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    customerName: "Alice Smith",
    email: "alice.s@example.com",
    phone: "(555) 123-4567",
    table: "Table 7",
    date: "2023-04-22",
    time: "19:00",
    guests: 4,
    status: "confirmed",
    notes: "Birthday celebration",
    specialRequests: "Vegan options",
    source: "online",
    staffAssigned: "John Doe",
    timeCreated: "2023-04-20T14:30:00",
    lastUpdated: "2023-04-21T10:00:00"
  },
  {
    id: "2",
    customerName: "Bob Johnson",
    email: "bob.j@example.com",
    phone: "(555) 234-5678",
    table: "Table 3",
    date: "2023-04-23",
    time: "20:00",
    guests: 2,
    status: "pending",
    notes: "Anniversary dinner",
    specialRequests: "Window seat",
    source: "phone",
    staffAssigned: "Sara Johnson",
    timeCreated: "2023-04-21T09:15:00",
    lastUpdated: "2023-04-21T09:15:00"
  },
  {
    id: "3",
    customerName: "Charlie Brown",
    email: "charlie.b@example.com",
    phone: "(555) 345-6789",
    table: "Table 12",
    date: "2023-04-22",
    time: "21:00",
    guests: 6,
    status: "cancelled",
    notes: "Meeting postponed",
    specialRequests: "None",
    source: "online",
    staffAssigned: "John Doe",
    timeCreated: "2023-04-21T18:45:00",
    lastUpdated: "2023-04-22T08:00:00"
  },
  {
    id: "4",
    customerName: "Diana Miller",
    email: "diana.m@example.com",
    phone: "(555) 456-7890",
    table: "Table 5",
    date: "2023-04-24",
    time: "18:30",
    guests: 3,
    status: "confirmed",
    notes: "Client meeting",
    specialRequests: "Quiet area",
    source: "in-person",
    staffAssigned: "Sara Johnson",
    timeCreated: "2023-04-22T11:20:00",
    lastUpdated: "2023-04-22T11:20:00"
  },
  {
    id: "5",
    customerName: "Ethan Davis",
    email: "ethan.d@example.com",
    phone: "(555) 567-8901",
    table: "Table 9",
    date: "2023-04-23",
    time: "19:30",
    guests: 5,
    status: "completed",
    notes: "Family dinner",
    specialRequests: "High chairs needed",
    source: "online",
    staffAssigned: "John Doe",
    timeCreated: "2023-04-22T16:55:00",
    lastUpdated: "2023-04-23T21:00:00"
  }
];

const tables = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6", "Table 7", "Table 8", "Table 9", "Table 10", "Table 11", "Table 12"];
const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
const statusOptions = ["confirmed", "pending", "cancelled", "completed"];
const sourceOptions = ["online", "phone", "in-person"];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentReservation, setCurrentReservation] = useState<Reservation | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const form = useForm({
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      table: "",
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
      time: "",
      guests: 1,
      status: "pending",
      notes: "",
      specialRequests: "",
      source: "online",
    },
  });

  useEffect(() => {
    form.setValue("date", selectedDate ? format(selectedDate, "yyyy-MM-dd") : "");
  }, [selectedDate, form.setValue]);

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      searchTerm === "" ||
      reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.table.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" || reservation.status.toLowerCase() === activeTab.toLowerCase();

    return matchesSearch && matchesTab;
  });

  const handleAddReservation = (data: any) => {
    const newReservation: Reservation = {
      id: String(reservations.length + 1),
      customerName: data.customerName,
      email: data.email,
      phone: data.phone,
      table: data.table,
      date: data.date,
      time: data.time,
      guests: data.guests,
      status: data.status,
      notes: data.notes || "",
      specialRequests: data.specialRequests || "",
      source: data.source,
      staffAssigned: "Unassigned",
      timeCreated: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    if (currentReservation) {
      const updatedReservations = reservations.map((res) =>
        res.id === currentReservation.id ? { ...res, ...newReservation, id: res.id } : res
      );
      setReservations(updatedReservations);
      toast.success(`Reservation for ${newReservation.customerName} updated successfully!`);
    } else {
      setReservations([...reservations, newReservation]);
      toast.success(`Reservation for ${newReservation.customerName} added successfully!`);
    }

    form.reset();
    setIsAddDialogOpen(false);
    setCurrentReservation(null);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setCurrentReservation(reservation);
    setSelectedDate(new Date(reservation.date));
    form.reset({
      customerName: reservation.customerName,
      email: reservation.email,
      phone: reservation.phone,
      table: reservation.table,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      status: reservation.status,
      notes: reservation.notes,
      specialRequests: reservation.specialRequests,
      source: reservation.source,
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteReservation = (id: string) => {
    const updatedReservations = reservations.filter((res) => res.id !== id);
    setReservations(updatedReservations);
    toast.success("Reservation removed successfully!");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservation Management</h1>
            <p className="text-muted-foreground">
              Manage restaurant reservations and table bookings
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="hover-scale">
                <Plus className="mr-2 h-4 w-4" />
                Add Reservation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{currentReservation ? "Edit" : "Add New"} Reservation</DialogTitle>
                <DialogDescription>
                  {currentReservation
                    ? "Update reservation details and customer preferences"
                    : "Fill out the form below to create a new reservation"}
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
                            <Input placeholder="John Doe" {...field} />
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
                      name="table"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Table</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select table" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {tables.map((table) => (
                                <SelectItem key={table} value={table}>
                                  {table}
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
                        <FormItem className="col-span-2">
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <DatePicker
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              placeholderText="Select a date"
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          </FormControl>
                          <FormDescription>
                            Select the date for the reservation.
                          </FormDescription>
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
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guests</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="1" {...field} />
                          </FormControl>
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
                                  {status === "confirmed" ? "Confirmed" : status === "pending" ? "Pending" : status === "cancelled" ? "Cancelled" : "Completed"}
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
                                <SelectValue placeholder="Select source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sourceOptions.map((source) => (
                                <SelectItem key={source} value={source}>
                                  {source === "online" ? "Online" : source === "phone" ? "Phone" : "In-Person"}
                                </SelectItem>
                              ))}
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
                            <Textarea placeholder="Dietary restrictions, allergies, etc." {...field} />
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
                            <Textarea placeholder="Additional information" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {currentReservation ? "Update Reservation" : "Add Reservation"}
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
                <CardTitle>Reservation List</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search reservations..."
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
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Table</TableHead>
                            <TableHead>Date/Time</TableHead>
                            <TableHead>Guests</TableHead>
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
                                <TableCell className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarFallback>{reservation.customerName[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{reservation.customerName}</div>
                                    <div className="text-sm text-muted-foreground">{reservation.email}</div>
                                  </div>
                                </TableCell>
                                <TableCell>{reservation.table}</TableCell>
                                <TableCell>
                                  {new Date(reservation.date).toLocaleDateString()}
                                  {" at "}
                                  {reservation.time}
                                </TableCell>
                                <TableCell>{reservation.guests}</TableCell>
                                <TableCell>
                                  <Badge variant={
                                    reservation.status === "confirmed" ? "default" :
                                    reservation.status === "pending" ? "secondary" :
                                    reservation.status === "cancelled" ? "destructive" : "outline"
                                  }>
                                    {reservation.status === "confirmed" ? "Confirmed" :
                                      reservation.status === "pending" ? "Pending" :
                                        reservation.status === "cancelled" ? "Cancelled" : "Completed"}
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
                                      <DropdownMenuItem onClick={() => handleEditReservation(reservation)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-destructive"
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
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="w-full lg:w-1/3 space-y-4">
            <Card className="animate-fade-in [animation-delay:200ms]">
              <CardHeader>
                <CardTitle>Upcoming Reservations</CardTitle>
                <CardTitle>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate || new Date(), "PP")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.filter(r => r.date === format(selectedDate || new Date(), "yyyy-MM-dd")).length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No reservations for this date
                    </div>
                  ) : (
                    reservations.filter(r => r.date === format(selectedDate || new Date(), "yyyy-MM-dd")).map((reservation) => (
                      <div key={reservation.id} className="border rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{reservation.customerName}</div>
                          <Badge variant={
                            reservation.status === "confirmed" ? "default" :
                            reservation.status === "pending" ? "secondary" :
                            reservation.status === "cancelled" ? "destructive" : "outline"
                          }>
                            {reservation.status === "confirmed" ? "Confirmed" :
                              reservation.status === "pending" ? "Pending" :
                                reservation.status === "cancelled" ? "Cancelled" : "Completed"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {reservation.time} - Table {reservation.table} ({reservation.guests} guests)
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in [animation-delay:300ms]">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button variant="outline" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  View Customer Details
                </Button>
                <Button variant="outline" className="flex items-center">
                  <TableIcon className="mr-2 h-4 w-4" />
                  Check Table Availability
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Utensils className="mr-2 h-4 w-4" />
                  Update Menu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
