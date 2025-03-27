'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../styles/CTA.module.css';
import { useTheme } from './ThemeProvider';

const CTA = () => {
  const { theme } = useTheme();
  
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2 className={styles.title}>Start Your First Chat Now</h2>
        <p className={styles.subtitle}>
          Experience what thousands of users already know: AI chat can be natural, helpful, and surprisingly human. Whether you need practical assistance or just want to explore what's possible with AI, your next great conversation is just a click away.
        </p>
        
        <div className={styles.highlightBox}>
          <div className={styles.highlightItem}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No Signups</span>
          </div>
          <div className={styles.highlightItem}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No Downloads</span>
          </div>
          <div className={styles.highlightItem}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No Complications</span>
          </div>
        </div>
        
        <p className={styles.subtitle} style={{ fontSize: '1rem', marginTop: '1rem' }}>
          Just helpful AI conversation, instantly.
        </p>
        
        <div className={styles.buttonGroup}>
          <Link href="/chat" className={styles.primaryButton}>
            START CHATTING NOW - FREE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;