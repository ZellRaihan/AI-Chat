'use client';

import Link from 'next/link';
import styles from '@/styles/NotFound.module.css';
import MainLayout from '@/components/MainLayout';

export const metadata = {
  title: 'Page Not Found | AI-Chats.net',
  description: 'The page you are looking for could not be found. Please check the URL or return to the homepage.',
};

export default function NotFound() {
  return (
    <MainLayout>
      <div className={styles.notFoundContainer}>
        <div className={styles.content}>
          <div className={styles.errorCode}>
            <span className={styles.four}>4</span>
            <div className={styles.zeroContainer}>
              <div className={styles.zero}>0</div>
            </div>
            <span className={styles.four}>4</span>
          </div>
          
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            Oops! The page you're looking for seems to have vanished into thin air.
            Let's get you back on track!
          </p>

          <div className={styles.navigation}>
            <h2 className={styles.navTitle}>Here are some helpful links:</h2>
            <div className={styles.navLinks}>
              <Link href="/" className={styles.navLink}>
                <i className="fas fa-home"></i>
                Homepage
              </Link>
              <Link href="/chat" className={styles.navLink}>
                <i className="fas fa-comments"></i>
                Start Chatting
              </Link>
              <Link href="/features" className={styles.navLink}>
                <i className="fas fa-star"></i>
                Features
              </Link>
              <Link href="/contact" className={styles.navLink}>
                <i className="fas fa-envelope"></i>
                Contact Us
              </Link>
            </div>
          </div>

          <div className={styles.searchSection}>
            <h2 className={styles.searchTitle}>Can't find what you're looking for?</h2>
            <p className={styles.searchDescription}>
              Try searching our site or check out our documentation
            </p>
            <div className={styles.searchActions}>
              <Link href="/search" className={styles.searchButton}>
                <i className="fas fa-search"></i>
                Search Site
              </Link>
              <Link href="/docs" className={styles.docsButton}>
                <i className="fas fa-book"></i>
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 