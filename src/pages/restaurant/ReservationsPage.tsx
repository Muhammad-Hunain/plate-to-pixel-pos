
import { useState } from "react";
import RestaurantLayout from "@/components/layout/RestaurantLayout";
import { Button } from "@/components/ui/button";

// Update the Reservation type to use the correct status values
type Reservation = {
  id: string;
  customerName: string;
  tableNumber: string;
  date: Date;
  time: string;
  partySize: number;
  status: "Confirmed" | "Pending" | "Cancelled";
  phone: string;
  email: string;
  notes: string;
};

// Create ReservationsPage component with proper export
const ReservationsPage = () => {
  // Ensure mock data uses the right status types
  const mockReservations: Reservation[] = [
    {
      id: "1",
      customerName: "John Doe",
      tableNumber: "5",
      date: new Date(2023, 3, 12, 19, 0),
      time: "19:00",
      partySize: 2,
      status: "Confirmed", // Fixed status value
      phone: "555-1234",
      email: "john.doe@example.com",
      notes: "Anniversary dinner"
    },
    {
      id: "2",
      customerName: "Jane Smith",
      tableNumber: "10",
      date: new Date(2023, 3, 12, 20, 0),
      time: "20:00",
      partySize: 4,
      status: "Pending", // Fixed status value
      phone: "555-5678",
      email: "jane.smith@example.com",
      notes: "Window seat preferred"
    },
    {
      id: "3", 
      customerName: "Robert Johnson",
      tableNumber: "8",
      date: new Date(2023, 3, 13, 18, 30),
      time: "18:30",
      partySize: 6,
      status: "Confirmed", // Fixed status value
      phone: "555-9012",
      email: "robert.johnson@example.com",
      notes: "Business dinner"
    },
    {
      id: "4",
      customerName: "Sarah Williams",
      tableNumber: "3",
      date: new Date(2023, 3, 14, 19, 30),
      time: "19:30",
      partySize: 2,
      status: "Cancelled", // Fixed status value
      phone: "555-3456",
      email: "sarah.williams@example.com",
      notes: "Cancelled due to illness"
    }
  ];

  // Add state to track the current reservation
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  
  // Add handlers for reservation actions
  const handleAcceptReservation = () => {
    // Implement the logic for accepting reservations
    console.log("Accepting reservation:", selectedReservation);
  };
  
  const handleCancelReservation = () => {
    // Implement the logic for canceling reservations
    console.log("Cancelling reservation:", selectedReservation);
  };
  
  return (
    <RestaurantLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Reservations</h2>
          <Button variant="default">Add Reservation</Button>
        </div>
        
        {/* Display reservations */}
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{reservation.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.date.toLocaleDateString()} at {reservation.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{reservation.tableNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{reservation.partySize}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      reservation.status === "Confirmed" ? "bg-green-100 text-green-800" :
                      reservation.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="outline" size="sm" onClick={() => setSelectedReservation(reservation)}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Reservation details modal or section */}
        {selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6">
              <h3 className="text-lg font-medium mb-4">Reservation Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedReservation.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{selectedReservation.phone}</p>
                    <p className="text-sm">{selectedReservation.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Table</p>
                    <p className="font-medium">{selectedReservation.tableNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{selectedReservation.date.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium">{selectedReservation.time}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="font-medium">{selectedReservation.notes || "No notes provided"}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="default" onClick={handleAcceptReservation} className="bg-green-600 hover:bg-green-700"> 
                  Accept Reservation
                </Button>
                <Button variant="destructive" onClick={handleCancelReservation}>
                  Decline Reservation
                </Button>
                <Button variant="outline" onClick={() => setSelectedReservation(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RestaurantLayout>
  );
};

export default ReservationsPage;
