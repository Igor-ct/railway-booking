import { useState } from 'react';
import { TrainList } from '../../components/TrainList/TrainList';
import { SearchFilter } from '../../components/shared/SearchFilter/SearchFilter';
import { mockTrains } from '../../data/train';
import styles from './Home.module.css';

export const Home = () => {
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });

  const handleSearch = (from: string, to: string, date: string) => {
    setSearchParams({ from, to, date });
  };

  const filteredTrains = mockTrains.filter((train) => {
    const matchFrom = train.route.from.toLowerCase().includes(searchParams.from.toLowerCase());
    const matchTo = train.route.to.toLowerCase().includes(searchParams.to.toLowerCase());
    
    const matchDate = searchParams.date 
      ? train.departureTime.startsWith(searchParams.date) 
      : true;

    return matchFrom && matchTo && matchDate;
  });

  return (
    <div className={styles.homeContainer}>
      <section className={styles.searchSection}>
        <h1 className={styles.pageTitle}>Пошук залізничних квитків</h1>
        
        <SearchFilter onSearch={handleSearch} />
      </section>

      <section className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>Доступні рейси</h2>
        
        <TrainList trains={filteredTrains} />
      </section>
    </div>
  );
};