import type { Train } from '../../types/train';
import styles from './TrainCard.module.css';

interface TrainCardProps {
  train: Train;
}

export const TrainCard = ({ train }: TrainCardProps) => {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDetailedDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('uk-UA', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.trainNumber}>{train.number}</span>
        <span className={styles.trainType}>{train.type}</span>
      </div>
      
      <div className={styles.routeInfo}>
        <div className={styles.cityInfo}>
          <span className={styles.time}>{formatTime(train.departureTime)}</span>
          <span className={styles.detailedDate}>{formatDetailedDate(train.departureTime)}</span>
          <span className={styles.city}>{train.route.from}</span>
        </div>
        
        <div className={styles.durationWrapper}>
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.routeLine}></div>
        </div>
        
        <div className={styles.cityInfo}>
          <span className={styles.time}>{formatTime(train.arrivalTime)}</span>
          <span className={styles.detailedDate}>{formatDetailedDate(train.arrivalTime)}</span>
          <span className={styles.city}>{train.route.to}</span>
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <button className={styles.selectButton}>Вибрати місця</button>
      </div>
    </div>
  );
};