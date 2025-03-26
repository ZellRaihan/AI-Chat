'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import styles from '../styles/MainHeader.module.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.navbar}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoLink} aria-label="AI-Chats.net Home">
              <span className={styles.logo}>
                <i className="fas fa-robot" aria-hidden="true"></i> AI Chat
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav 
            className={`${styles.navigation} ${mobileMenuOpen ? styles.mobileOpen : ''}`}
            role="navigation"
            aria-label="Main navigation"
          >
            <Link href="/" className={styles.navLink} aria-current="page">
              Home
            </Link>
            <Link href="/chat" className={styles.navLink}>
              Chat
            </Link>
            <Link href="/#features" className={styles.navLink}>
              Features
            </Link>
            <Link href="/settings" className={styles.navLink}>
              Settings
            </Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className={styles.authButtons}>
            <button 
              onClick={toggleTheme} 
              className={styles.themeToggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? (
                <i className={`fas fa-sun ${styles.lightIcon}`} aria-hidden="true"></i>
              ) : (
                <i className={`fas fa-moon ${styles.darkIcon}`} aria-hidden="true"></i>
              )}
            </button>
            
            <Link 
              href="/chat" 
              className={styles.signupButton}
              aria-label="Start chatting with AI"
            >
              Start Chatting
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className={styles.mobileMenuButton}>
            <button 
              onClick={toggleMobileMenu} 
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}