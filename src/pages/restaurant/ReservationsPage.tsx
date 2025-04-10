
import React, { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CalendarIcon, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Check, 
  X,
  Clock
} from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

// Sample data for reservations
const sampleReservations = [
  {
    id: "res-001",
    customerName: "John Doe",
    tableNumber: "T1",
    date: new Date(),
    time: "7:00 PM",
    partySize: 4,
    status: "Confirmed",
    phone: "555-123-4567",
    email: "john.doe@example.com",
    notes: "Birthday celebration",
  },
  {
    id: "res-002",
    customerName: "Jane Smith",
    tableNumber: "T3",
    date: new Date(),
    time: "8:00 PM",
    partySize: 2,
    status: "Pending",
    phone: "555-987-6543",
    email: "jane.smith@example.com",
    notes: "Window seat preferred",
  },
  {
    id: "res-003",
    customerName: "Alice Johnson",
    tableNumber: "T2",
    date: new Date(),
    time: "6:30 PM",
    partySize: 6,
    status: "Confirmed",
    phone: "555-456-7890",
    email: "alice.johnson@example.com",
    notes: "",
  },
];

type Reservation = {
  id: string;
  customerName: string;
  tableNumber: string;
  date: Date;
  time: string;
  partySize: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  phone?: string;
  email?: string;
  notes?: string;
};

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    customerName: '',
    tableNumber: '',
    time: '',
    partySize: 1,
    notes: '',
    phone: '',
    email: '',
  });
  const [reservations, setReservations] = useState<Reservation[]>(sampleReservations);
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast.error("Please select a date for the reservation.");
      return;
    }

    // Basic form validation
    if (!formData.customerName || !formData.tableNumber || !formData.time) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Create a new reservation object
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      customerName: formData.customerName,
      tableNumber: formData.tableNumber,
      date: date,
      time: formData.time,
      partySize: formData.partySize,
      status: "Pending",
      phone: formData.phone,
      email: formData.email,
      notes: formData.notes,
    };

    // Update the reservations state
    setReservations([...reservations, newReservation]);

    // Reset the form
    setFormData({
      customerName: '',
      tableNumber: '',
      time: '',
      partySize: 1,
      notes: '',
      phone: '',
      email: '',
    });
    
    setIsAddReservationOpen(false);
    toast.success("Reservation added successfully!");
  };

  const updateReservationStatus = (id: string, status: "Confirmed" | "Cancelled") => {
    setReservations(prevReservations => 
      prevReservations.map(res => 
        res.id === id ? { ...res, status } : res
      )
    );
    
    setSelectedReservation(null);
    setIsViewDetailsOpen(false);
    
    toast.success(`Reservation ${status.toLowerCase()} successfully!`);
  };

  const viewReservationDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsViewDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return <Badge variant="success" className="bg-green-100 text-green-800">Confirmed</Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "Cancelled":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
            <p className="text-muted-foreground">
              Manage your restaurant reservations
            </p>
          </div>
          <Button onClick={() => setIsAddReservationOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Reservation
          </Button>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Current Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Party Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.customerName}</TableCell>
                        <TableCell>{reservation.tableNumber}</TableCell>
                        <TableCell>{format(reservation.date, "PPP")}</TableCell>
                        <TableCell>{reservation.time}</TableCell>
                        <TableCell>{reservation.partySize}</TableCell>
                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => viewReservationDetails(reservation)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {reservation.status === "Pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => updateReservationStatus(reservation.id, "Confirmed")}
                                    className="text-green-600"
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Accept Reservation
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => updateReservationStatus(reservation.id, "Cancelled")}
                                    className="text-red-600"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel Reservation
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Reservation Dialog */}
      <Dialog open={isAddReservationOpen} onOpenChange={setIsAddReservationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Reservation</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new reservation.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tableNumber">Table Number *</Label>
                <Input
                  id="tableNumber"
                  name="tableNumber"
                  placeholder="Enter table number"
                  value={formData.tableNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate as any}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partySize">Party Size *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, partySize: parseInt(value) })}>
                  <SelectTrigger id="partySize">
                    <SelectValue placeholder="Select party size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                      <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Enter any special requests or notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="min-h-[80px]"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Reservation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Reservation Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        {selectedReservation && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reservation Details</DialogTitle>
              <DialogDescription>
                Complete details for reservation #{selectedReservation.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedReservation.customerName}</h3>
                {getStatusBadge(selectedReservation.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Table</p>
                  <p className="font-medium">{selectedReservation.tableNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Party Size</p>
                  <p className="font-medium">{selectedReservation.partySize} people</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{format(selectedReservation.date, "PPP")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <div className="font-medium flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {selectedReservation.time}
                  </div>
                </div>
              </div>

              {(selectedReservation.phone || selectedReservation.email) && (
                <div className="space-y-2 pt-2 border-t">
                  <h4 className="text-sm font-medium">Contact Information</h4>
                  {selectedReservation.phone && <p className="text-sm">{selectedReservation.phone}</p>}
                  {selectedReservation.email && <p className="text-sm">{selectedReservation.email}</p>}
                </div>
              )}

              {selectedReservation.notes && (
                <div className="space-y-2 pt-2 border-t">
                  <h4 className="text-sm font-medium">Special Requests/Notes</h4>
                  <p className="text-sm">{selectedReservation.notes}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              {selectedReservation.status === "Pending" && (
                <div className="flex w-full gap-2 sm:justify-end">
                  <Button 
                    onClick={() => updateReservationStatus(selectedReservation.id, "Cancelled")}
                    variant="destructive"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel Reservation
                  </Button>
                  <Button 
                    onClick={() => updateReservationStatus(selectedReservation.id, "Confirmed")}
                    variant="success"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accept Reservation
                  </Button>
                </div>
              )}
              {selectedReservation.status !== "Pending" && (
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </RestaurantLayout>
  );
}
