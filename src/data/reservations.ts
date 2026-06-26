export interface Reservation {
  id: string;
  guestName: string;
  email: string;
  roomNumber: string;
  roomType: string;
  guests: number;
  amount: number;
  checkInDate: string;
  checkOutDate: string;
  paymentStatus: "Paid" | "Pending" | "Partial" | "Balance";
  bookingStatus:
    | "Confirmed"
    | "Pending"
    | "Checked In"
    | "Checked Out"
    | "Cancelled";
}

export const initialReservations: Reservation[] = [
  {
    id: "BK-1001",
    guestName: "John Doe",
    email: "john@example.com",
    roomNumber: "101",
    roomType: "Deluxe",
    checkInDate: "2026-06-15",
    checkOutDate: "2026-06-18",
    guests: 2,
    amount: 450,
    paymentStatus: "Paid",
    bookingStatus: "Confirmed",
  },
  {
    id: "BK-1002",
    guestName: "Sarah Johnson",
    email: "sarah@example.com",
    roomNumber: "205",
    roomType: "Executive Suite",
    checkInDate: "2026-06-16",
    checkOutDate: "2026-06-20",
    guests: 3,
    amount: 1200,
    paymentStatus: "Pending",
    bookingStatus: "Pending",
  },
  {
    id: "BK-1003",
    guestName: "Michael Brown",
    email: "michael@example.com",
    roomNumber: "310",
    roomType: "Standard",
    checkInDate: "2026-06-14",
    checkOutDate: "2026-06-17",
    guests: 1,
    amount: 240,
    paymentStatus: "Partial",
    bookingStatus: "Checked In",
  },
];
