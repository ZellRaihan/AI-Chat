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
          <h1 className={styles.title}>AI Chat: Your Intelligent Conversation Partner</h1>
          <p className={styles.subtitle}>
            Looking for a free AI chat that actually understands you? You've found it at AI-Chats.net. Our online AI chat assistant delivers helpful, human-like conversations without signups, subscriptions, or complications.
          </p>

          <form onSubmit={handleSubmit} className={styles.chatPromptBox}>
            <div className={styles.inputContainer}>
              <input
                type="text"
                className={styles.promptInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything... we actually understand you"
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
              <span>Instant responses</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>🔓</span>
              <span>No signup needed</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>💎</span>
              <span>Truly free</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>💬</span>
              <span>Human-like chat</span>
            </div>
            <div className={styles.benefitItem}>
              <span className={styles.icon}>🛡️</span>
              <span>Private & secure</span>
            </div>
          </div>
          
          <div className={styles.buttons}>
            <Link href="#features" className={styles.primaryButton}>
              Why Choose Us
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