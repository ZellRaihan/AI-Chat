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
        <h2 className={styles.title}>Ready to Make Your Life Easier?</h2>
        <p className={styles.subtitle}>
          Start getting help right now. No signup, no waiting - just type your question and get started With AI Chat.
        </p>
        
        <div className={styles.highlightBox}>
          <div className={styles.highlightItem}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Always Free</span>
          </div>
          <div className={styles.highlightItem}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>No Signup Required</span>
          </div>
          <div className={styles.highlightItem}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Instant Help</span>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <Link href="/chat" className={styles.primaryButton}>
            Start Free Chat
          </Link>
          <Link href="/#features" className={styles.secondaryButton}>
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;