import { ReactNode } from 'react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};