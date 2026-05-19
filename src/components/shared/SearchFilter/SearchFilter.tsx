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
        <div className={styles.inputWrapper}>
          <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <input 
            type="text" 
            placeholder="Наприклад: Київ" 
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
      </div>
      
      <div className={styles.inputGroup}>
        <label>Куди</label>
        <div className={styles.inputWrapper}>
          <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <input 
            type="text" 
            placeholder="Наприклад: Львів" 
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>
      
      <div className={styles.inputGroup}>
        <label>Дата відправлення</label>
        <div className={styles.inputWrapper}>
          <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      
      <button type="submit" className={styles.searchButton}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
          <rect x="4" y="3" width="16" height="16" rx="2" ry="2"></rect>
          <path d="M4 11h16"></path><path d="M12 3v8"></path>
          <path d="M8 19l-2 3"></path><path d="M16 19l2 3"></path>
        </svg>
        Знайти квитки
      </button>
    </form>
  );
};