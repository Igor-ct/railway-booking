import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Seat } from '../types/booking';

export interface PurchasedTicket {
  trainNumber: string;
  wagonNumber: number;
  seatId: string;
}

interface BookingContextType {
  purchasedTickets: PurchasedTicket[];
  addPurchasedTickets: (trainNumber: string, wagonNumber: number, seats: Seat[]) => void;
  isSeatPurchased: (trainNumber: string, wagonNumber: number, seatId: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>(() => {
    const saved = localStorage.getItem('trainTickets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('trainTickets', JSON.stringify(purchasedTickets));
  }, [purchasedTickets]);

  const addPurchasedTickets = (trainNumber: string, wagonNumber: number, seats: Seat[]) => {
    const newTickets = seats.map(seat => ({
      trainNumber,
      wagonNumber,
      seatId: seat.id,
    }));
    setPurchasedTickets(prev => [...prev, ...newTickets]);
  };

  const isSeatPurchased = (trainNumber: string, wagonNumber: number, seatId: string) => {
    return purchasedTickets.some(
      t => t.trainNumber === trainNumber && t.wagonNumber === wagonNumber && t.seatId === seatId
    );
  };

  return (
    <BookingContext.Provider value={{ purchasedTickets, addPurchasedTickets, isSeatPurchased }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookingContext must be used within a BookingProvider');
  return context;
};