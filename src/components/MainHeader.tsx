'use client';

import React from 'react';
import Link from 'next/link';
import styles from '@/styles/MainHeader.module.css';
import { useTheme } from './ThemeProvider';

const MainHeader = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink}>
              <span className={styles.logo}>AI Chat</span>
            </Link>
          </div>
          
          <div className={styles.navigation}>
            <Link href="/features" className={styles.navLink}>
              Features
            </Link>
            <Link href="/pricing" className={styles.navLink}>
              Pricing
            </Link>
            <Link href="/documentation" className={styles.navLink}>
              Docs
            </Link>
            <Link href="/settings" className={styles.navLink}>
              Settings
            </Link>
          </div>
          
          <div className={styles.authButtons}>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {theme === 'dark' ? (
                <i className="fa fa-sun-o"></i>
              ) : (
                <i className="fa fa-moon-o"></i>
              )}
            </button>
            <Link href="/login" className={styles.loginButton}>
              Login
            </Link>
            <Link href="/chat" className={styles.signupButton}>
              Try Now
            </Link>
          </div>
          
          <button className={styles.mobileMenuButton}>
            <i className="fa fa-bars"></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader; 