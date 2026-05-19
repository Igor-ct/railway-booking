export type WagonClass = 'Люкс' | 'Купе' | 'Плацкарт' | 'Сидячий 1-й клас' | 'Сидячий 2-й клас';

export type SeatType = 'Стандарт' | 'Біля вікна' | 'Біля туалету' | 'Біля виходу';

export interface Seat {
  id: string;
  number: number;
  type: SeatType;
  isAvailable: boolean;
  price: number; 
}

export interface Wagon {
  id: string;
  number: number; 
  wagonClass: WagonClass;
  basePrice: number; 
  seats: Seat[];
}