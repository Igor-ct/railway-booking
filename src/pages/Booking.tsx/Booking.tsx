import { useState } from 'react';
import { generateTrainWagons } from '../../data/wagons';
import { SeatMap } from '../../components/SeatMap/SeatMap'; 
import type { Seat } from '../../types/booking';
import styles from './Booking.module.css';

interface BookingProps {
  trainNumber: string;
  onClose: () => void;
}

export const Booking = ({ trainNumber, onClose }: BookingProps) => {
  const [wagons] = useState(() => generateTrainWagons(400));
  const [selectedWagon, setSelectedWagon] = useState(wagons[0]);
  
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleToggleSeat = (seat: Seat) => {
    setSelectedSeats((prev) => {
      if (prev.find((s) => s.id === seat.id)) {
        return prev.filter((s) => s.id !== seat.id);
      }
      return [...prev, seat];
    });
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleWagonChange = (wagon: typeof wagons[0]) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]); 
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.bookingContainer}>
        
        <div className={styles.header}>
          <h2>Потяг {trainNumber}: Вибір місць</h2>
          <button className={styles.closeButton} onClick={onClose}>✕ Закрити</button>
        </div>

        <div className={styles.content}>
          <div className={styles.wagonSelectorPlaceholder}>
            <h3>Виберіть вагон</h3>
            <div className={styles.wagonTabs}>
              {wagons.map(w => (
                <button 
                  key={w.id} 
                  className={selectedWagon.id === w.id ? styles.activeTab : styles.tab}
                  onClick={() => handleWagonChange(w)}
                >
                  Вагон {w.number} ({w.wagonClass})
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3>Виберіть місця (Вагон {selectedWagon.number})</h3>
            <SeatMap 
              wagon={selectedWagon} 
              selectedSeats={selectedSeats} 
              onToggleSeat={handleToggleSeat} 
            />
          </div>

          {selectedSeats.length > 0 && (
            <div className={styles.summaryPanel}>
              <div className={styles.summaryInfo}>
                <p>Обрано місць: <b>{selectedSeats.length}</b> (№ {selectedSeats.map(s => s.number).join(', ')})</p>
                <h3>Загальна сума: <span className={styles.totalPrice}>{totalPrice} грн</span></h3>
              </div>
              <button className={styles.continueButton}>
                Перейти до оформлення
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};