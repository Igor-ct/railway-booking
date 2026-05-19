import React from 'react';
import type { Seat, Wagon } from '../../types/booking';
import styles from './SeatMap.module.css';

interface SeatMapProps {
  wagon: Wagon;
  selectedSeats: Seat[];
  onToggleSeat: (seat: Seat) => void;
}

export const SeatMap = ({ wagon, selectedSeats, onToggleSeat }: SeatMapProps) => {
  const getSeatClass = (seat: Seat) => {
    if (!seat.isAvailable) return styles.occupied;
    if (selectedSeats.find((s) => s.id === seat.id)) return styles.selected;
    
    switch (seat.type) {
      case 'Біля туалету': return styles.toilet;
      case 'Біля виходу': return styles.exit;
      case 'Біля вікна': return styles.window;
      default: return styles.standard;
    }
  };

  return (
    <div className={styles.seatMapContainer}>
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.standard}`}></div> Стандарт
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.window}`}></div> Біля вікна (дорожче)
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.toilet}`}></div> Біля туалету (дешевше)
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.exit}`}></div> Біля виходу
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.occupied}`}></div> Зайнято
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.seatSample} ${styles.selected}`}></div> Обрано
        </div>
      </div>

      <div className={styles.wagonOutline}>
        <div className={styles.wagonInterior}>
          {wagon.seats.map((seat, index) => {
            const isLeftAisleSeat = (index + 1) % 4 === 2;

            return (
              <React.Fragment key={seat.id}>
                <button
                  disabled={!seat.isAvailable}
                  className={`${styles.seat} ${getSeatClass(seat)}`}
                  onClick={() => onToggleSeat(seat)}
                  title={`${seat.type} - ${seat.price} грн`}
                >
                  <span className={styles.seatNumber}>{seat.number}</span>
                  <span className={styles.seatPrice}>{seat.price}</span>
                </button>

                {isLeftAisleSeat && <div className={styles.aisle} aria-hidden="true" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};