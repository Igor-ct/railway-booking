import type { Seat, SeatType, Wagon, WagonClass } from '../types/booking';

const CLASS_MULTIPLIER: Record<WagonClass, number> = {
  'Люкс': 3.0,
  'Купе': 1.5,
  'Сидячий 1-й клас': 1.8,
  'Плацкарт': 1.0,
  'Сидячий 2-й клас': 1.0,
};

const SEAT_MODIFIERS: Record<SeatType, number> = {
  'Стандарт': 1.0,
  'Біля вікна': 1.1,     
  'Біля виходу': 0.9,    
  'Біля туалету': 0.8,   
};

const generateSeats = (count: number, basePrice: number, wagonClass: WagonClass): Seat[] => {
  const seats: Seat[] = [];
  
  for (let i = 1; i <= count; i++) {
    let type: SeatType = 'Стандарт';
    
    if (i >= count - 1) type = 'Біля туалету';
    else if (i <= 2) type = 'Біля виходу';
    else if (i % 2 !== 0) type = 'Біля вікна';

    const classMultiplier = CLASS_MULTIPLIER[wagonClass];
    const seatModifier = SEAT_MODIFIERS[type];
    const finalPrice = Math.round(basePrice * classMultiplier * seatModifier);

    seats.push({
      id: `seat-${i}`,
      number: i,
      type,
      isAvailable: true, 
      price: finalPrice,
    });
  }
  return seats;
};

export const generateTrainWagons = (trainBasePrice: number = 400): Wagon[] => {
  return [
    {
      id: 'w-1',
      number: 1,
      wagonClass: 'Люкс',
      basePrice: trainBasePrice,
      seats: generateSeats(18, trainBasePrice, 'Люкс'),
    },
    {
      id: 'w-2',
      number: 2,
      wagonClass: 'Купе',
      basePrice: trainBasePrice,
      seats: generateSeats(36, trainBasePrice, 'Купе'),
    },
    {
      id: 'w-3',
      number: 3,
      wagonClass: 'Плацкарт',
      basePrice: trainBasePrice,
      seats: generateSeats(54, trainBasePrice, 'Плацкарт'),
    }
  ];
};