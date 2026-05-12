import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Railwood</h3>
          <p className={styles.footerText}>
            Сучасний сервіс бронювання залізничних квитків. Швидко, зручно, надійно.
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Пасажирам</h4>
          <ul className={styles.footerList}>
            <li><a href="#">Розклад руху</a></li>
            <li><a href="#">Правила перевезення</a></li>
            <li><a href="#">Повернення квитків</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Контакти</h4>
          <ul className={styles.footerList}>
            <li>Гаряча лінія: 0 800 503 111</li>
            <li>Email: support@railwood.com</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2026 Railwood. Всі права захищено.</p>
      </div>
    </footer>
  );
};