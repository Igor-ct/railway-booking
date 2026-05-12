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
        
        <div className={styles.trainsGrid}>
          <div className={styles.dummyCard}>
            <div className={styles.dummyHeader}>705К • Інтерсіті+</div>
            <div className={styles.dummyRoute}>Київ ➔ Львів</div>
            <div className={styles.dummyTime}>06:00 - 11:09</div>
          </div>
          <div className={styles.dummyCard}>
            <div className={styles.dummyHeader}>091К • Нічний експрес</div>
            <div className={styles.dummyRoute}>Київ ➔ Львів</div>
            <div className={styles.dummyTime}>22:37 - 06:26</div>
          </div>
        </div>
      </section>
    </div>
  );
};