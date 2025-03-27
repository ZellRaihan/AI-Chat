import React from 'react';
import Link from 'next/link';
import styles from '@/styles/NotFound.module.css';
import MainLayout from '@/components/MainLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found - Free AI Chat | AI-Chats.net',
  description: 'Sorry, this page doesn\'t exist. Return to our free AI chat to start a conversation without signup, or check out our other helpful resources.',
  openGraph: {
    title: 'Page Not Found - Free AI Chat | AI-Chats.net',
    description: 'Sorry, this page doesn\'t exist. Return to our free AI chat to start a conversation without signup, or check out our other helpful resources.',
  },
  twitter: {
    title: 'Page Not Found - Free AI Chat | AI-Chats.net',
    description: 'Sorry, this page doesn\'t exist. Return to our free AI chat to start a conversation without signup, or check out our other helpful resources.',
  }
};

export default function NotFound() {
  return (
    <MainLayout>
      <div className={styles.notFoundContainer}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Page Not Found</h2>
          <p className={styles.description}>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.homeButton}>
              <i className="fas fa-home"></i>
              Return Home
            </Link>
            <Link href="/contact" className={styles.contactButton}>
              <i className="fas fa-envelope"></i>
              Contact Support
            </Link>
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