
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Phone, Bookmark, MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ReservationDetailsProps {
  reservation: {
    id: string;
    name: string;
    date: string;
    time: string;
    guests: number;
    contact: string;
    status: string;
    tableNumber: string;
    notes: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
}

const ReservationDetails: React.FC<ReservationDetailsProps> = ({
  reservation,
  isOpen,
  onClose,
  onConfirm,
  onCancel
}) => {
  const { toast } = useToast();

  if (!reservation) return null;

  const handleConfirm = () => {
    onConfirm(reservation.id);
    toast({
      title: "Reservation confirmed",
      description: `Reservation #${reservation.id} has been confirmed.`,
    });
    onClose();
  };

  const handleCancel = () => {
    onCancel(reservation.id);
    toast({
      title: "Reservation cancelled",
      description: `Reservation #${reservation.id} has been cancelled.`,
    });
    onClose();
  };

  const getStatusBadge = (status: string) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Reservation #{reservation.id}</span>
            {getStatusBadge(reservation.status)}
          </DialogTitle>
          <DialogDescription>
            Reservation details for {reservation.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-4">
            <div className="min-w-8">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">{reservation.name}</p>
              <p className="text-sm text-muted-foreground">{reservation.guests} guests</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="min-w-8">
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-muted-foreground">{reservation.date}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="min-w-8">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-muted-foreground">{reservation.time}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="min-w-8">
              <Phone className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Contact</p>
              <p className="text-sm text-muted-foreground">{reservation.contact}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="min-w-8">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Table</p>
              <p className="text-sm text-muted-foreground">{reservation.tableNumber}</p>
            </div>
          </div>
          
          {reservation.notes && (
            <div className="flex items-start space-x-4">
              <div className="min-w-8">
                <Bookmark className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Notes</p>
                <p className="text-sm text-muted-foreground">{reservation.notes}</p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2 sm:justify-between">
          {reservation.status !== "cancelled" && (
            <Button variant="destructive" onClick={handleCancel}>
              Cancel Reservation
            </Button>
          )}
          {(reservation.status === "pending" || reservation.status === "waiting") && (
            <Button onClick={handleConfirm}>
              Confirm Reservation
            </Button>
          )}
          {(reservation.status === "confirmed" || reservation.status === "cancelled") && (
            <Button onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetails;
