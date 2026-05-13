import { useState, FormEvent } from 'react';
import styles from './SearchFilter.module.css';

interface SearchFilterProps {
  onSearch: (from: string, to: string, date: string) => void;
}

export const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); 
    onSearch(from, to, date);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label>Звідки</label>
        <input 
          type="text" 
          placeholder="Наприклад: Київ" 
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label>Куди</label>
        <input 
          type="text" 
          placeholder="Наприклад: Львів" 
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label>Дата</label>
        <input 
          type="date" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      
      <button type="submit" className={styles.searchButton}>Знайти</button>
    </form>
  );
};