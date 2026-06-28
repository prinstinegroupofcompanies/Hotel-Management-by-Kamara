import { createContext, useContext, useEffect, useState } from "react";
import { initialReservations, type Reservation } from "../data/reservations";

export interface Room {
  id: number;
  roomNumber: string;
  category: string;
  floor: number;
  capacity: number;
  price: number;
  status: "Available" | "Occupied" | "Reserved" | "Maintenance";
  roomCount?: number;
}

export interface GuestStay {
  id: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  status: "Pending" | "Checked In" | "Checked Out";
  paymentStatus: "Paid" | "Pending" | "Partial" | "Balance";
}

interface HotelContextType {
  stays: GuestStay[];
  setStays: React.Dispatch<React.SetStateAction<GuestStay[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const HotelContext = createContext<HotelContextType | null>(null);

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations);
  const [stays, setStays] = useState<GuestStay[]>([]);
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      roomNumber: "101",
      category: "Standard",
      floor: 1,
      capacity: 2,
      price: 50,
      status: "Available",
      roomCount: 3,
    },
    {
      id: 2,
      roomNumber: "102",
      category: "Deluxe",
      floor: 1,
      capacity: 3,
      price: 80,
      status: "Occupied",
      roomCount: 3,
    },
    {
      id: 3,
      roomNumber: "103",
      category: "Double",
      floor: 1,
      capacity: 2,
      price: 50,
      status: "Available",
      roomCount: 5,
    },
    {
      id: 4,
      roomNumber: "104",
      category: "Suite",
      floor: 1,
      capacity: 4,
      price: 150,
      status: "Available",
      roomCount: 2,
    },
    {
      id: 5,
      roomNumber: "105",
      category: "Executive Suite",
      floor: 1,
      capacity: 3,
      price: 80,
      status: "Occupied",
      roomCount: 10,
    },
    {
      id: 6,
      roomNumber: "106",
      category: "Family",
      floor: 1,
      capacity: 2,
      price: 50,
      status: "Available",
      roomCount: 8,
    },
    {
      id: 7,
      roomNumber: "107",
      category: "Presidential Suite",
      floor: 1,
      capacity: 3,
      price: 80,
      status: "Occupied",
      roomCount: 1,
    },
  ]);

  useEffect(() => {
    setStays(
      reservations.map((reservation) => ({
        id: reservation.id,
        guestName: reservation.guestName,
        roomNumber: reservation.roomNumber,
        roomType: reservation.roomType,
        email: reservation.email,
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
        amount: reservation.amount,
        paymentStatus: reservation.paymentStatus,
        status:
          reservation.bookingStatus === "Checked In"
            ? "Checked In"
            : reservation.bookingStatus === "Checked Out"
              ? "Checked Out"
              : "Pending",
      })),
    );
  }, [reservations]);

  return (
    <HotelContext.Provider
      value={{
        stays,
        setStays,
        reservations,
        setReservations,
        rooms,
        setRooms,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);

  if (!context) {
    throw new Error("useHotel must be used inside HotelProvider");
  }

  return context;
};
