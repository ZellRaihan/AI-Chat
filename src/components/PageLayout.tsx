'use client';

import React from 'react';
import styles from '@/styles/PageLayout.module.css';
import { useTheme } from './ThemeProvider';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, subtitle, children }: PageLayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageLayout; 