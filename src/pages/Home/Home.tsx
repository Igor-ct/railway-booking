import { TrainList } from '../../components/TrainList/TrainList';
import { mockTrains } from '../../data/train';
import styles from './Home.module.css';

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.searchSection}>
        <h1 className={styles.pageTitle}>Пошук залізничних квитків</h1>
        
        <div className={styles.searchFormPlaceholder}>
          <div className={styles.inputGroup}>
            <label>Звідки</label>
            <input type="text" placeholder="Наприклад: Київ" />
          </div>
          <div className={styles.inputGroup}>
            <label>Куди</label>
            <input type="text" placeholder="Наприклад: Львів" />
          </div>
          <div className={styles.inputGroup}>
            <label>Дата</label>
            <input type="date" />
          </div>
          <button className={styles.searchButton}>Знайти</button>
        </div>
      </section>

      <section className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>Доступні рейси</h2>
        
        <TrainList trains={mockTrains} />
      </section>
    </div>
  );
};