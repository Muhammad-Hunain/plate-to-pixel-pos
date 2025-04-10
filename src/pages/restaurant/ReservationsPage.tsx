
// Fix only the following sections to address type errors

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

// Fix the button variant type
<Button variant="default" onClick={handleAcceptReservation} className="bg-green-600 hover:bg-green-700"> 
  Accept Reservation
</Button>
