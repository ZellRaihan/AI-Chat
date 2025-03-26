'use client';

import React from 'react';
import MainHeader from './MainHeader';
import Footer from './Footer';
import styles from '@/styles/MainLayout.module.css';
import { useTheme } from './ThemeProvider';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={styles.layoutContainer}>
      <MainHeader />
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 