
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow, format, parseISO, set } from "date-fns";
import {
  Plus,
  Search,
  CalendarIcon,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  Check,
  X,
  MoreVertical,
  Calendar as CalendarFull,
  List,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ClipboardCheck,
  Ban,
  AlertTriangle,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import ReservationCalendar from "@/components/reservations/ReservationCalendar";
import ReservationDetails from "@/components/reservations/ReservationDetails";
import ReservationDialog from "@/components/reservations/ReservationDialog";
import { FilterMenu, FilterOption } from "@/components/filters/FilterMenu";

// Define reservation statuses for type safety
type ReservationStatus = "confirmed" | "pending" | "cancelled" | "completed" | "no-show";

// Define reservation data structure
interface Reservation {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerAvatar?: string;
  guests: number;
  date: string;
  time: string;
  duration: number;
  table: string;
  status: ReservationStatus;
  specialRequests?: string;
  createdAt: string;
  source: "phone" | "website" | "walk-in" | "app";
}

// Mock reservation data
const reservationsData: Reservation[] = [
  {
    id: "res-001",
    customerName: "John Smith",
    customerEmail: "john@example.com",
    customerPhone: "(555) 123-4567",
    customerAvatar: "https://i.pravatar.cc/150?img=1",
    guests: 4,
    date: "2023-04-15",
    time: "19:00",
    duration: 120,
    table: "Table 5",
    status: "confirmed",
    specialRequests: "Window seat if possible",
    createdAt: "2023-04-10T15:30:00",
    source: "website"
  },
  {
    id: "res-002",
    customerName: "Emily Johnson",
    customerPhone: "(555) 234-5678",
    guests: 2,
    date: "2023-04-15",
    time: "18:00",
    duration: 90,
    table: "Table 2",
    status: "completed",
    createdAt: "2023-04-09T12:15:00",
    source: "phone"
  },
  {
    id: "res-003",
    customerName: "Michael Brown",
    customerEmail: "michael@example.com",
    customerPhone: "(555) 345-6789",
    customerAvatar: "https://i.pravatar.cc/150?img=3",
    guests: 6,
    date: "2023-04-16",
    time: "20:00",
    duration: 150,
    table: "Table 10",
    status: "pending",
    specialRequests: "Birthday celebration, need cake service",
    createdAt: "2023-04-10T09:45:00",
    source: "app"
  },
  {
    id: "res-004",
    customerName: "Sarah Williams",
    customerPhone: "(555) 456-7890",
    guests: 3,
    date: "2023-04-14",
    time: "19:30",
    duration: 120,
    table: "Table 7",
    status: "cancelled",
    specialRequests: "Canceled due to illness",
    createdAt: "2023-04-08T16:20:00",
    source: "website"
  },
  {
    id: "res-005",
    customerName: "David Miller",
    customerEmail: "david@example.com",
    customerPhone: "(555) 567-8901",
    customerAvatar: "https://i.pravatar.cc/150?img=5",
    guests: 2,
    date: "2023-04-15",
    time: "20:30",
    duration: 90,
    table: "Table 3",
    status: "confirmed",
    createdAt: "2023-04-11T10:10:00",
    source: "walk-in"
  },
  {
    id: "res-006",
    customerName: "Jessica Wilson",
    customerPhone: "(555) 678-9012",
    guests: 4,
    date: "2023-04-14",
    time: "18:30",
    duration: 120,
    table: "Table 8",
    status: "no-show",
    createdAt: "2023-04-07T14:30:00",
    source: "phone"
  },
  {
    id: "res-007",
    customerName: "James Taylor",
    customerEmail: "james@example.com",
    customerPhone: "(555) 789-0123",
    guests: 5,
    date: "2023-04-16",
    time: "19:00",
    duration: 150,
    table: "Table 12",
    status: "confirmed",
    specialRequests: "Gluten-free options needed for 2 guests",
    createdAt: "2023-04-12T11:25:00",
    source: "website"
  },
  {
    id: "res-008",
    customerName: "Sophia Martinez",
    customerPhone: "(555) 890-1234",
    customerAvatar: "https://i.pravatar.cc/150?img=8",
    guests: 2,
    date: "2023-04-17",
    time: "18:00",
    duration: 90,
    table: "Table 4",
    status: "pending",
    createdAt: "2023-04-13T09:15:00",
    source: "app"
  }
];

export default function ReservationsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [reservations, setReservations] = useState<Reservation[]>(reservationsData);
  const [activeTab, setActiveTab] = useState<"all" | ReservationStatus>("all");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const filteredReservations = reservations.filter((reservation) => {
    // Base search filter
    const matchesSearch = !appliedFilters.search || 
      reservation.customerName.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
      reservation.customerPhone.includes(appliedFilters.search) ||
      (reservation.customerEmail && 
       reservation.customerEmail.toLowerCase().includes(appliedFilters.search.toLowerCase())) ||
      reservation.id.toLowerCase().includes(appliedFilters.search.toLowerCase());
      
    // Status filter
    const matchesStatus = !appliedFilters.status || 
      appliedFilters.status.includes(reservation.status);
      
    // Date filter
    const matchesDate = !appliedFilters.dateRange || 
      !appliedFilters.dateRange.from || 
      (appliedFilters.dateRange.from && 
       reservation.date >= format(appliedFilters.dateRange.from, 'yyyy-MM-dd') && 
       (!appliedFilters.dateRange.to || 
        reservation.date <= format(appliedFilters.dateRange.to, 'yyyy-MM-dd')));
        
    // Guest count filter
    const matchesGuestCount = !appliedFilters.minGuests || 
      reservation.guests >= parseInt(appliedFilters.minGuests);
      
    // Source filter
    const matchesSource = !appliedFilters.source || 
      appliedFilters.source.includes(reservation.source);
      
    // Active tab filter (overwrites status filter)
    const matchesTab = 
      activeTab === "all" || 
      reservation.status === activeTab;
      
    return matchesSearch && matchesStatus && matchesDate && matchesGuestCount && matchesSource && matchesTab;
  });

  const viewReservationDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    const updated = reservations.map((res) =>
      res.id === id ? { ...res, status } : res
    );
    setReservations(updated);
    
    if (selectedReservation?.id === id) {
      setSelectedReservation({...selectedReservation, status});
    }
    
    toast.success(`Reservation ${id} marked as ${status}`);
  };

  const statusColors: Record<ReservationStatus, { color: string; bg: string }> = {
    confirmed: { color: "text-emerald-700", bg: "bg-emerald-100" },
    pending: { color: "text-amber-700", bg: "bg-amber-100" },
    cancelled: { color: "text-red-700", bg: "bg-red-100" },
    completed: { color: "text-blue-700", bg: "bg-blue-100" },
    "no-show": { color: "text-slate-700", bg: "bg-slate-100" },
  };
  
  const sourceIcons = {
    phone: <Phone className="h-4 w-4" />,
    website: <Globe className="h-4 w-4" />,
    "walk-in": <User className="h-4 w-4" />,
    app: <Smartphone className="h-4 w-4" />,
  };

  const statusOptions: FilterOption[] = [
    { id: "confirmed", label: "Confirmed", value: "confirmed" },
    { id: "pending", label: "Pending", value: "pending" },
    { id: "completed", label: "Completed", value: "completed" },
    { id: "cancelled", label: "Cancelled", value: "cancelled" },
    { id: "no-show", label: "No Show", value: "no-show" }
  ];
  
  const sourceOptions: FilterOption[] = [
    { id: "website", label: "Website", value: "website" },
    { id: "phone", label: "Phone", value: "phone" },
    { id: "walk-in", label: "Walk-in", value: "walk-in" },
    { id: "app", label: "App", value: "app" }
  ];

  const handleFilterChange = (filters: Record<string, any>) => {
    setAppliedFilters(filters);
    
    // Update status tab if status filter is applied
    if (filters.status && filters.status.length === 1 && 
        ["confirmed", "pending", "completed", "cancelled", "no-show"].includes(filters.status[0])) {
      setActiveTab(filters.status[0] as ReservationStatus);
    } else {
      setActiveTab("all");
    }
    
    // Update date if date filter is applied
    if (filters.dateRange && filters.dateRange.from) {
      setDate(filters.dateRange.from);
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
            <p className="text-muted-foreground">
              Manage your restaurant's table reservations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "calendar" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setView("calendar")}
              >
                <CalendarFull className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Reservation
            </Button>
          </div>
        </div>
        
        <Card className="mb-4">
          <CardContent className="pt-4">
            <FilterMenu
              options={{
                search: true,
                status: statusOptions,
                dateRange: true,
                types: sourceOptions,
                toggles: [
                  { id: "specialRequests", label: "Has Special Requests" }
                ]
              }}
              onFilterChange={handleFilterChange}
            />
          </CardContent>
        </Card>

        {view === "list" ? (
          <>
            <Tabs defaultValue="all" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              <TabsContent value={activeTab}>
                <Card>
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
                          <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                            No reservations found matching your filters
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredReservations.map((reservation) => (
                          <TableRow key={reservation.id} className="hover-scale-subtle">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={reservation.customerAvatar} />
                                  <AvatarFallback>{reservation.customerName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{reservation.customerName}</div>
                                  <div className="text-xs text-muted-foreground">{reservation.customerPhone}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {format(parseISO(reservation.date), "MMM d, yyyy")}
                                </div>
                                <div className="flex items-center mt-1">
                                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                  {reservation.time} ({reservation.duration} min)
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                {reservation.guests} {reservation.guests === 1 ? "guest" : "guests"}
                              </div>
                            </TableCell>
                            <TableCell>{reservation.table}</TableCell>
                            <TableCell>
                              <Badge className={`${statusColors[reservation.status].bg} ${statusColors[reservation.status].color}`}>
                                {reservation.status === "confirmed" && (
                                  <Check className="mr-1 h-3 w-3" />
                                )}
                                {reservation.status === "pending" && (
                                  <Clock className="mr-1 h-3 w-3" />
                                )}
                                {reservation.status === "cancelled" && (
                                  <X className="mr-1 h-3 w-3" />
                                )}
                                {reservation.status === "completed" && (
                                  <ClipboardCheck className="mr-1 h-3 w-3" />
                                )}
                                {reservation.status === "no-show" && (
                                  <Ban className="mr-1 h-3 w-3" />
                                )}
                                <span className="capitalize">{reservation.status.replace("-", " ")}</span>
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => viewReservationDetails(reservation)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                                  {reservation.status !== "confirmed" && (
                                    <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, "confirmed")}>
                                      <Check className="mr-2 h-4 w-4 text-emerald-500" />
                                      Confirm
                                    </DropdownMenuItem>
                                  )}
                                  {reservation.status !== "completed" && (
                                    <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, "completed")}>
                                      <ClipboardCheck className="mr-2 h-4 w-4 text-blue-500" />
                                      Mark as Completed
                                    </DropdownMenuItem>
                                  )}
                                  {reservation.status !== "no-show" && (
                                    <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, "no-show")}>
                                      <Ban className="mr-2 h-4 w-4 text-gray-500" />
                                      Mark as No-Show
                                    </DropdownMenuItem>
                                  )}
                                  {reservation.status !== "cancelled" && (
                                    <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, "cancelled")}>
                                      <X className="mr-2 h-4 w-4 text-red-500" />
                                      Cancel Reservation
                                    </DropdownMenuItem>
                                  )}
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
          </>
        ) : (
          <Card className="p-4">
            <ReservationCalendar 
              reservations={filteredReservations}
              onReservationClick={viewReservationDetails}
              selectedDate={date}
              onDateChange={setDate}
            />
          </Card>
        )}

        <ReservationDialog 
          open={isCreateOpen} 
          onOpenChange={setIsCreateOpen}
        />

        {selectedReservation && (
          <ReservationDetails
            reservation={selectedReservation}
            open={isDetailsOpen}
            onOpenChange={setIsDetailsOpen}
            onStatusChange={updateReservationStatus}
          />
        )}
      </div>
    </RestaurantLayout>
  );
}

// Missing icons that need to be imported
import { Globe, Smartphone } from "lucide-react";
