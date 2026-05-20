import type { Seat } from '../../types/booking';
import styles from './Ticket.module.css';

interface TicketProps {
  trainNumber: string;
  wagonNumber: number;
  trainType?: string; 
  passengerName: string;
  selectedSeats: Seat[];
  totalPrice: number;
}

export const Ticket = ({ trainNumber, wagonNumber, trainType, passengerName, selectedSeats, totalPrice }: TicketProps) => {
  const ticketId = Math.random().toString(36).substring(2, 10).toUpperCase();
  const date = new Date().toLocaleDateString('uk-UA');

  return (
    <div className={styles.ticketWrapper}>
      <div className={styles.ticket}>

        <div className={styles.mainPart}>
          <div className={styles.header}>
            <span className={styles.trainBrand}>
              УКРЗАЛІЗНИЦЯ {trainType ? `• ${trainType.toUpperCase()}` : ''}
            </span>
            <span className={styles.ticketId}>#{ticketId}</span>
          </div>
          
          <div className={styles.passengerInfo}>
            <div className={styles.block}>
              <span className={styles.label}>Пасажир</span>
              <span className={styles.value}>{passengerName}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.label}>Потяг</span>
              <span className={styles.value}>{trainNumber}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.label}>Вагон</span>
              <span className={styles.value}>№{wagonNumber}</span>
            </div>
            <div className={styles.block}>
              <span className={styles.label}>Дата</span>
              <span className={styles.value}>{date}</span>
            </div>
          </div>

          <div className={styles.seatsInfo}>
            <span className={styles.label}>Місця:</span>
            <div className={styles.seatBadges}>
              {selectedSeats.map(seat => (
                <span key={seat.id} className={styles.seatBadge}>
                  №{seat.number} ({seat.type})
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.stubPart}>
          <div className={styles.stubInfo}>
            <span className={styles.label}>До сплати</span>
            <span className={styles.price}>{totalPrice} ₴</span>
          </div>

          <div className={styles.barcodeWrapper}>
            <div className={styles.barcode}></div>
            <span className={styles.barcodeText}>{ticketId}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};