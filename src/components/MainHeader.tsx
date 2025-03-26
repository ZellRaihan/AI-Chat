'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/MainHeader.module.css';
import { useTheme } from './ThemeProvider';

const MainHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink} aria-label="AI Chat Home">
              <span className={styles.logo}>AI Chat</span>
            </Link>
          </div>
          
          <div className={`${styles.navigation} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`} role="navigation" aria-label="Main navigation">
            <Link href="/" className={styles.navLink} aria-current="page">
              Home
            </Link>
            <Link href="/settings" className={styles.navLink}>
              Settings
            </Link>
          </div>
          
          <div className={styles.authButtons}>
            <button onClick={toggleTheme} className={styles.themeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? (
                <i className="fas fa-sun" aria-hidden="true"></i>
              ) : (
                <i className="fas fa-moon" aria-hidden="true"></i>
              )}
            </button>
            <Link href="/chat" className={styles.startButton} aria-label="Start chatting with AI">
              Start Chatting
            </Link>
          </div>
          
          <button 
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader; 