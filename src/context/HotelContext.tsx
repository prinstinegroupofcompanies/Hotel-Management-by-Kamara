import { createContext, useContext, useState } from "react";

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
}

interface HotelContextType {
  stays: GuestStay[];
  setStays: React.Dispatch<React.SetStateAction<GuestStay[]>>;
}

const HotelContext = createContext<HotelContextType | null>(null);

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  const [stays, setStays] = useState<GuestStay[]>([]);

  return (
    <HotelContext.Provider value={{ stays, setStays }}>
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
