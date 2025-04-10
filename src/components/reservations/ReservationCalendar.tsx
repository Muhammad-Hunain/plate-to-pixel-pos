
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO, isSameDay, isValid } from 'date-fns';
import { Badge } from "@/components/ui/badge";

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: string;
}

interface ReservationCalendarProps {
  reservations: Reservation[];
  isOpen: boolean;
  onClose: () => void;
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  reservations,
  isOpen,
  onClose
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Group reservations by date
  const reservationsByDate = reservations.reduce((acc: Record<string, Reservation[]>, reservation) => {
    const dateStr = reservation.date;
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(reservation);
    return acc;
  }, {});
  
  // Calculate date with reservation counts for the calendar
  const reservationDates = Object.keys(reservationsByDate).map(dateStr => {
    // Safely parse the date string
    let date;
    try {
      date = parseISO(dateStr);
      // Check if the date is valid
      if (!isValid(date)) {
        console.error(`Invalid date string: ${dateStr}`);
        return null;
      }
    } catch (error) {
      console.error(`Error parsing date: ${dateStr}`, error);
      return null;
    }
    
    return {
      date,
      count: reservationsByDate[dateStr].length
    };
  }).filter(Boolean); // Remove null values

  // Get reservations for the selected date
  const selectedDateStr = selectedDate && isValid(selectedDate) ? format(selectedDate, 'yyyy-MM-dd') : '';
  const selectedDateReservations = reservationsByDate[selectedDateStr] || [];
  
  // Custom renderer for calendar days to show reservation count badges
  const renderDay = (date: Date) => {
    // Ensure we're working with a valid date
    if (!isValid(date)) {
      return <div>Invalid</div>;
    }
    
    const dateReservation = reservationDates.find(d => 
      d && d.date && isSameDay(d.date, date)
    );
    
    if (dateReservation) {
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <div>{format(date, 'd')}</div>
          <Badge
            variant="secondary"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
          >
            {dateReservation.count}
          </Badge>
        </div>
      );
    }
    
    return <div>{format(date, 'd')}</div>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Reservation Calendar</DialogTitle>
          <DialogDescription>
            View all reservations on the calendar. Dates with reservations are marked with the count.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
              components={{
                Day: ({ date, ...props }) => (
                  <Button
                    variant="ghost"
                    {...props}
                    className={`h-9 w-9 p-0 font-normal aria-selected:opacity-100 ${
                      props['aria-selected'] ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    {renderDay(date)}
                  </Button>
                ),
              }}
            />
          </div>
          
          <div className="md:w-1/2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
            <h3 className="text-lg font-semibold mb-3">
              {selectedDate && isValid(selectedDate) ? (
                <>Reservations on {format(selectedDate, 'MMMM d, yyyy')}</>
              ) : (
                <>Select a date</>
              )}
            </h3>
            
            {selectedDateReservations.length === 0 ? (
              <p className="text-muted-foreground">No reservations for this date.</p>
            ) : (
              <div className="space-y-3">
                {selectedDateReservations.map((reservation) => (
                  <div key={reservation.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{reservation.name}</span>
                      <Badge
                        variant={
                          reservation.status === "confirmed" ? "default" :
                          reservation.status === "pending" ? "outline" :
                          reservation.status === "cancelled" ? "destructive" :
                          "secondary"
                        }
                      >
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-muted-foreground text-sm">
                        {reservation.time} • {reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}
                      </span>
                      <span className="text-sm font-medium">
                        {reservation.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationCalendar;
