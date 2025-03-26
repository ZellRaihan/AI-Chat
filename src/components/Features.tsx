'use client';

import React from 'react';
import styles from '../styles/Features.module.css';
import { useTheme } from './ThemeProvider';

// Feature item component
const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>{icon}</div>
      <div className={styles.featureContent}>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
};

// Testimonial component
const Testimonial = ({ quote, author, role }: { quote: string, author: string, role: string }) => {
  return (
    <div className={styles.testimonialItem}>
      <div className={styles.quoteIcon}>"</div>
      <p className={styles.quote}>{quote}</p>
      <div className={styles.authorInfo}>
        <span className={styles.author}>{author}</span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
};

const Features = () => {
  const { theme } = useTheme();
  
  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Why People Choose Our AI Chat</h2>
          <p className={styles.subtitle}>
            See how our AI chat makes a real difference in people's daily lives
          </p>
        </div>
        
        <div className={styles.testimonialGrid}>
          <Testimonial 
            quote="I was stuck on my essay at midnight. This AI chat helped me organize my thoughts and finish it in time. No signup needed - just instant help!"
            author="Emma"
            role="College Student"
          />
          <Testimonial 
            quote="As a busy professional, I love how I can quickly get help with emails and reports. The natural conversations make it feel like working with a real assistant."
            author="James"
            role="Marketing Manager"
          />
          <Testimonial 
            quote="My kids use it for homework help, and I use it for work. It's become our family's go-to helper for everything!"
            author="Sarah"
            role="Parent"
          />
        </div>
        
        <div className={styles.featuresGrid}>
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="It Just Works"
            description="No complicated setup or account creation. Just type and start getting help."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Always There When You Need It"
            description="Whether it's 2 PM or 2 AM, your AI chat partner is ready to help."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            title="Talks Like a Friend"
            description="Natural conversations that feel like chatting with a helpful friend."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            title="Keeps Your Secrets"
            description="Your chats are private and secure. No data collection or tracking."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            title="Grows With You"
            description="From simple questions to complex projects, our AI adapts to your needs."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Smart Solutions"
            description="Advanced AI algorithms provide intelligent and context-aware responses to your queries."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            title="Continuous Learning"
            description="Our AI system continuously improves through user interactions, getting better every day."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            title="Cost Effective"
            description="Get premium AI assistance without breaking the bank - no subscription required."
          />
        </div>
      </div>
    </section>
  );
};

export default Features; 