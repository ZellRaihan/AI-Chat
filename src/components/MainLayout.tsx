'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/MainLayout.module.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.mainContent}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout; 