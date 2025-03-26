'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} AI-Chats.net. All rights reserved.</p>
          </div>
          
          <nav className={styles.links} aria-label="Footer navigation">
            <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms & Conditions</Link>
            <Link href="/contact" className={styles.link}>Contact Us</Link>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/disclaimer" className={styles.link}>Disclaimer</Link>
            <Link href="/sitemap.xml" className={styles.link}>Sitemap</Link>
          </nav>

          <div className={styles.social} aria-label="Social media links">
            <a 
              href="https://twitter.com/aichatsnet" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Follow us on Twitter"
            >
              <i className="fab fa-twitter" aria-hidden="true"></i>
            </a>
            <a 
              href="https://linkedin.com/company/ai-chats-net" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Follow us on LinkedIn"
            >
              <i className="fab fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 