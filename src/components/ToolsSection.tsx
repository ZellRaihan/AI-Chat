'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import styles from '../styles/ToolsSection.module.css';

const ToolCard = ({ 
  title, 
  description, 
  icon, 
  link 
}: { 
  title: string, 
  description: string, 
  icon: React.ReactNode, 
  link: string 
}) => {
  return (
    <Link href={link} className={styles.toolCard}>
      <div className={styles.toolIcon}>{icon}</div>
      <h3 className={styles.toolTitle}>{title}</h3>
      <p className={styles.toolDescription}>{description}</p>
      <div className={styles.tryNow}>
        <span>Try Now</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.arrowIcon}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  );
};

const ToolsSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={styles.toolsSection}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Free AI Chat Tools - No Signup Required</h2>
          <p className={styles.subtitle}>
            Access our complete suite of powerful AI Chat tools without creating an account. 
            Start using them immediately with no login, no payment, and no limits.
          </p>
        </div>
        
        <div className={styles.toolsGrid}>
          <ToolCard
            title="AI Chat Assistant"
            description="Chat with our advanced AI for answers, advice, and conversation - completely free and with no login required."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            link="/chat"
          />
          
          <ToolCard
            title="AI Writer"
            description="Generate essays, stories, and professional content instantly without creating an account or providing payment info."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
            link="/chat?prompt=I%20need%20help%20writing"
          />
          
          <ToolCard
            title="AI Story Generator"
            description="Create engaging stories in seconds with our free AI story generator - no signup, no credit card, instant access."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            link="/chat?prompt=Please%20help%20me%20write%20a%20creative%20story.%20I%20would%20like%20a%20story%20about"
          />
          
          <ToolCard
            title="AI Blog Writer"
            description="Draft engaging blog posts with free AI assistance - no account needed, start creating professional content instantly."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
            link="/chat?prompt=Help%20me%20write%20a%20blog%20post%20about"
          />
          
          <ToolCard
            title="Free AI Code Helper"
            description="Get coding assistance, debug issues, and learn programming with our free AI—no login required, start coding now."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            link="/chat?prompt=Help%20me%20with%20this%20code"
          />
          
          <ToolCard
            title="AI Email Writer"
            description="Craft professional emails in seconds with our free AI email assistant - no signup needed, start writing effectively now."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={styles.svg}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            link="/chat?prompt=Help%20me%20write%20an%20email%20to"
          />
        </div>
      </div>
    </section>
  );
};

export default ToolsSection; 
 