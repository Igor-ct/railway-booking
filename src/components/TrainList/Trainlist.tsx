import type { Train } from '../../types/train';
import { TrainCard } from '../TrainCard/TrainCard';
import styles from './TrainList.module.css';

interface TrainListProps {
  trains: Train[];
}

export const TrainList = ({ trains }: TrainListProps) => {
  if (trains.length === 0) {
    return <div className={styles.emptyState}>Рейсів не знайдено</div>;
  }

  return (
    <div className={styles.list}>
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}