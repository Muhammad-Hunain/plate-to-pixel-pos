
import React, { useState } from 'react';
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Search,
} from "lucide-react";
import ReservationDialog from '@/components/reservations/ReservationDialog';
import ReservationDetails from '@/components/reservations/ReservationDetails';
import { useToast } from "@/hooks/use-toast";

// Mock data for reservations
const reservationsData = [
  {
    id: "RES001",
    name: "John Smith",
    date: "2025-04-10",
    time: "19:00",
    guests: 4,
    contact: "555-0123",
    status: "confirmed",
    tableNumber: "T12",
    notes: "",
  },
  {
    id: "RES002",
    name: "Sarah Johnson",
    date: "2025-04-10",
    time: "20:00",
    guests: 2,
    contact: "555-0124",
    status: "confirmed",
    tableNumber: "T5",
    notes: "Anniversary dinner",
  },
  {
    id: "RES003",
    name: "Michael Brown",
    date: "2025-04-10",
    time: "18:30",
    guests: 6,
    contact: "555-0125",
    status: "pending",
    tableNumber: "T8",
    notes: "Highchair needed",
  },
  {
    id: "RES004",
    name: "Emily Wilson",
    date: "2025-04-11",
    time: "19:30",
    guests: 3,
    contact: "555-0126",
    status: "confirmed",
    tableNumber: "T3",
    notes: "",
  },
  {
    id: "RES005",
    name: "David Lee",
    date: "2025-04-11",
    time: "20:30",
    guests: 5,
    contact: "555-0127",
    status: "cancelled",
    tableNumber: "T15",
    notes: "Gluten allergy",
  },
  {
    id: "RES006",
    name: "Jennifer Taylor",
    date: "2025-04-11",
    time: "18:00",
    guests: 2,
    contact: "555-0128",
    status: "confirmed",
    tableNumber: "T7",
    notes: "",
  },
  {
    id: "RES007",
    name: "Robert Anderson",
    date: "2025-04-12",
    time: "19:00",
    guests: 4,
    contact: "555-0129",
    status: "waiting",
    tableNumber: "T10",
    notes: "Birthday celebration",
  },
  {
    id: "RES008",
    name: "Michelle Garcia",
    date: "2025-04-12",
    time: "19:45",
    guests: 2,
    contact: "555-0130",
    status: "confirmed",
    tableNumber: "T2",
    notes: "",
  },
];

const days = [
  "Today", 
  "Tomorrow", 
  "Apr 12", 
  "Apr 13", 
  "Apr 14", 
  "Apr 15", 
  "Apr 16"
];

const ReservationsPage = () => {
  const { toast } = useToast();
  const [activeDay, setActiveDay] = useState("Today");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [reservations, setReservations] = useState(reservationsData);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          reservation.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "waiting":
        return <Badge className="bg-blue-500">Waiting</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewDetails = (reservation) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const handleConfirmReservation = (id) => {
    setReservations(reservations.map(res => {
      if (res.id === id) {
        return { ...res, status: "confirmed" };
      }
      return res;
    }));
  };

  const handleCancelReservation = (id) => {
    setReservations(reservations.map(res => {
      if (res.id === id) {
        return { ...res, status: "cancelled" };
      }
      return res;
    }));
  };

  const handleAddNewReservation = (newReservation) => {
    const id = `RES${String(reservations.length + 1).padStart(3, '0')}`;
    setReservations([...reservations, { ...newReservation, id, status: "pending" }]);
    toast({
      title: "Reservation added",
      description: `New reservation for ${newReservation.name} has been added.`
    });
  };

  return (
    <RestaurantLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Reservations</h1>
            <p className="text-muted-foreground">Manage your restaurant bookings and tables</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <ReservationDialog onSave={handleAddNewReservation} />
          </div>
        </div>

        <div className="flex justify-between items-center my-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-semibold text-lg">April 2025</div>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reservations..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="flex overflow-x-auto py-4 px-2">
              {days.map((day) => (
                <Button
                  key={day}
                  variant={activeDay === day ? "default" : "ghost"}
                  className="rounded-full px-4 mx-1 whitespace-nowrap"
                  onClick={() => setActiveDay(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <div className="flex gap-2 mb-4 overflow-x-auto">
              <Button 
                variant={statusFilter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={statusFilter === "confirmed" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("confirmed")}
              >
                Confirmed
              </Button>
              <Button 
                variant={statusFilter === "pending" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </Button>
              <Button 
                variant={statusFilter === "waiting" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("waiting")}
              >
                Waiting
              </Button>
              <Button 
                variant={statusFilter === "cancelled" ? "default" : "outline"} 
                size="sm"
                onClick={() => setStatusFilter("cancelled")}
              >
                Cancelled
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center h-24">
                        No reservations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.id}</TableCell>
                        <TableCell>{reservation.name}</TableCell>
                        <TableCell>{reservation.time}</TableCell>
                        <TableCell>{reservation.guests}</TableCell>
                        <TableCell>{reservation.tableNumber}</TableCell>
                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                        <TableCell>{reservation.contact}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={reservation.notes}>
                          {reservation.notes || "-"}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleViewDetails(reservation)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Table Assignments</CardTitle>
                <CardDescription>
                  Visual layout of your restaurant tables and reservations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="text-center p-10 bg-muted rounded-lg w-full max-w-3xl">
                  <p className="text-lg mb-2">Table View Coming Soon</p>
                  <p className="text-sm text-muted-foreground">
                    A visual representation of your restaurant layout with table assignments will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <ReservationDetails 
        reservation={selectedReservation}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onConfirm={handleConfirmReservation}
        onCancel={handleCancelReservation}
      />
    </RestaurantLayout>
  );
};

export { ReservationsPage };
export default ReservationsPage;
