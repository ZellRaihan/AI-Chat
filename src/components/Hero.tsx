'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/Hero.module.css';
import { useTheme } from './ThemeProvider';

const Hero = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      router.push(`/chat?message=${encodeURIComponent(message.trim())}`);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Your AI Chat Partner for Everyday Help</h1>
          <p className={styles.subtitle}>
            Hey there! 👋 Need a helping hand with writing, learning, or problem-solving? Our AI chat is here to make your life easier. 
            Start chatting instantly - no signup needed, no credit card required.
          </p>

          <form onSubmit={handleSubmit} className={styles.chatPromptBox}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.promptInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What can I help you with today?"
                aria-label="Chat message"
              />
            </div>
            <button type="submit" className={styles.goButton} disabled={!message.trim()}>
              Go
            </button>
          </form>
          
          <div className={styles.benefits}>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>⚡</span>
              <span>Instant help, any task</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>🔓</span>
              <span>No signup needed</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>💎</span>
              <span>Always free</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>💬</span>
              <span>Natural chat</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>🛡️</span>
              <span>Privacy protected</span>
            </div>
          </div>
          
          <div className={styles.buttons}>
            <Link href="#features" className={styles.primaryButton}>
              Learn More
            </Link>
            <Link href="/chat" className={styles.secondaryButton}>
              Start Chatting Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 