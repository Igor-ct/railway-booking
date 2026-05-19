import type { Train } from '../types/train';

export const mockTrains: Train[] = [
  {
    id: '1',
    number: '705К',
    type: 'Інтерсіті+',
    route: { from: 'Київ', to: 'Львів' },
    departureTime: '2026-05-15T06:00:00',
    arrivalTime: '2026-05-15T11:09:00',
    duration: '5 год 09 хв',
  },
  {
    id: '2',
    number: '091К',
    type: 'Нічний експрес',
    route: { from: 'Київ', to: 'Львів' },
    departureTime: '2026-05-16T22:37:00',
    arrivalTime: '2026-05-18T06:26:00',
    duration: '7 год 49 хв',
  },
  {
    id: '3',
    number: '715К',
    type: 'Інтерсіті+',
    route: { from: 'Київ', to: 'Перемишль' },
    departureTime: '2026-05-15T11:01:00',
    arrivalTime: '2026-05-15T20:25:00',
    duration: '9 год 24 хв',
  },
  {
    id: '4',
    number: '038Ш',
    type: 'Нічний швидкий',
    route: { from: 'Одеса', to: 'Київ' },
    departureTime: '2026-05-15T21:18:00',
    arrivalTime: '2026-05-16T10:35:00',
    duration: '13 год 17 хв',
  }
];