import { useState } from 'react';
import { TrainList } from '../../components/TrainList/TrainList';
import { SearchFilter } from '../../components/shared/SearchFilter/SearchFilter';
import { Booking } from '../Booking.tsx/Booking';
import { AnimatedTrainTrack } from '../../components/shared/AnimatedTrainTrack/AnimatedTrainTrack';
import { mockTrains } from '../../data/train';
import styles from './Home.module.css';

export const Home = () => {
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });
  // НОВИЙ СТАН: зберігаємо номер вибраного потяга (null, якщо нічого не вибрано)
  const [selectedTrainNumber, setSelectedTrainNumber] = useState<string | null>(null);

  const handleSearch = (from: string, to: string, date: string) => {
    setSearchParams({ from, to, date });
  };

  const filteredTrains = mockTrains.filter((train) => {
    const matchFrom = train.route.from.toLowerCase().includes(searchParams.from.toLowerCase());
    const matchTo = train.route.to.toLowerCase().includes(searchParams.to.toLowerCase());
    const matchDate = searchParams.date ? train.departureTime.startsWith(searchParams.date) : true;
    return matchFrom && matchTo && matchDate;
  });

  return (
    <div className={styles.homeContainer}>
      <section className={styles.searchSection}>
        <div className={styles.titleWrapper}>
          <svg className={styles.decorativeTrain} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <rect x="3" y="10" width="10" height="8" rx="2" ry="2"></rect>
             <path d="M13 14h6a2 2 0 0 0 2-2v-2"></path>
             <circle cx="6" cy="18" r="2"></circle>
             <circle cx="18" cy="18" r="2"></circle>
             <path d="M4 10V6a2 2 0 0 1 2-2h3"></path>
             <path d="M11 4v6"></path>
             <line x1="2" y1="21" x2="22" y2="21"></line>
          </svg>
          <h1 className={styles.pageTitle}>Пошук залізничних квитків</h1>
        </div>
        
        <SearchFilter onSearch={handleSearch} />
      </section>

      <AnimatedTrainTrack />

      <section className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>Доступні рейси</h2>
        <TrainList 
          trains={filteredTrains} 
          onSelectTrain={(trainNumber) => setSelectedTrainNumber(trainNumber)} 
        />
      </section>

      {selectedTrainNumber && (
        <Booking 
          trainNumber={selectedTrainNumber} 
          onClose={() => setSelectedTrainNumber(null)} 
        />
      )}
    </div>
  );
};