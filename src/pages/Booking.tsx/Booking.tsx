import { useState } from 'react';
import { generateTrainWagons } from '../../data/wagons';
import styles from './Booking.module.css';

interface BookingProps {
  trainNumber: string;
  onClose: () => void; 
}

export const Booking = ({ trainNumber, onClose }: BookingProps) => {
  const [wagons] = useState(() => generateTrainWagons(400));
  const [selectedWagon, setSelectedWagon] = useState(wagons[0]); 

  return (
    <div className={styles.overlay}>
      <div className={styles.bookingContainer}>
        
        {/* Хедер бронювання */}
        <div className={styles.header}>
          <h2>Бронювання квитків: Потяг {trainNumber}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕ Закрити
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.wagonSelectorPlaceholder}>
            <h3>Вибір вагона</h3>
            <div className={styles.wagonTabs}>
              {wagons.map(w => (
                <button 
                  key={w.id} 
                  className={selectedWagon.id === w.id ? styles.activeTab : styles.tab}
                  onClick={() => setSelectedWagon(w)}
                >
                  Вагон {w.number} ({w.wagonClass})
                </button>
              ))}
            </div>
          </div>

          <div className={styles.seatMapPlaceholder}>
            <h3>Схема вагона {selectedWagon.number}</h3>
            <p>Базова ціна: {selectedWagon.basePrice} грн</p>
            <div className={styles.tempSeatsList}>
              {selectedWagon.seats.map(seat => (
                <div key={seat.id} style={{ color: seat.isAvailable ? 'green' : 'red' }}>
                  Місце {seat.number} ({seat.type}) - <b>{seat.price} грн</b>
                </div>
              ))}
            </div>
          </div>

          {/* ТУТ БУДЕ BOOKING FORM */}
          <div className={styles.bookingFormPlaceholder}>
            <h3>Ваші дані</h3>
            <p>Форма з'явиться після вибору місць...</p>
          </div>
        </div>

      </div>
    </div>
  );
};