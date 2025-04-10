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
import { CalendarIcon } from "lucide-react";
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
} from "@/components/ui/table"

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
  },
  {
    id: "res-002",
    customerName: "Jane Smith",
    tableNumber: "T3",
    date: new Date(),
    time: "8:00 PM",
    partySize: 2,
    status: "Pending",
  },
  {
    id: "res-003",
    customerName: "Alice Johnson",
    tableNumber: "T2",
    date: new Date(),
    time: "6:30 PM",
    partySize: 6,
    status: "Confirmed",
  },
];

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    customerName: '',
    tableNumber: '',
    time: '',
    partySize: 1,
    notes: '',
  });
  const [reservations, setReservations] = useState(sampleReservations);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      partySize: parseInt(e.target.value),
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
    const newReservation = {
      id: `res-${Date.now()}`,
      customerName: formData.customerName,
      tableNumber: formData.tableNumber,
      date: date,
      time: formData.time,
      partySize: formData.partySize,
      status: "Pending", // Default status
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
    });

    toast.success("Reservation added successfully!");
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">
            Manage your restaurant reservations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Reservation Form */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Add Reservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      type="text"
                      id="customerName"
                      name="customerName"
                      placeholder="Enter customer name"
                      value={formData.customerName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tableNumber">Table Number</Label>
                    <Input
                      type="text"
                      id="tableNumber"
                      name="tableNumber"
                      placeholder="Enter table number"
                      value={formData.tableNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={format(date as Date, "PPP")}
                        >
                          {date ? (
                            format(date as Date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate as any}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partySize">Party Size</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, partySize: parseInt(value) })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select party size" value={formData.partySize.toString()} />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Enter any special requests or notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit">Add Reservation</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Reservation List */}
          <div className="md:col-span-2">
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>{reservation.customerName}</TableCell>
                          <TableCell>{reservation.tableNumber}</TableCell>
                          <TableCell>{format(reservation.date as Date, "PPP")}</TableCell>
                          <TableCell>{reservation.time}</TableCell>
                          <TableCell>{reservation.partySize}</TableCell>
                          <TableCell>{reservation.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
