'use client';

import React from 'react';
import styles from '../styles/Features.module.css';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';

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
          <h2 className={styles.title}>Talk With AI That Feels Human</h2>
          <p className={styles.subtitle}>
            Unlike other AI chat generators that feel robotic and limited, our free AI chatbot responds with the natural flow of real conversation.
          </p>
        </div>
        
        <div className={styles.testimonialGrid}>
          <Testimonial 
            quote="I've tried dozens of AI chat tools, but this one feels different. The responses are thoughtful and natural - it's like texting with a smart friend who's always available."
            author="Alex"
            role="Daily User"
          />
          <Testimonial 
            quote="As someone learning English, finding conversation partners was always challenging. This AI chat lets me practice anytime, corrects my mistakes gently, and explains grammar in ways I actually understand."
            author="Maria"
            role="Language Learner"
          />
          <Testimonial 
            quote="I was skeptical about AI chat tools until I tried this one. Now I use it daily for everything from drafting client emails to helping my kids with homework questions. It's become our family's go-to helper."
            author="James"
            role="Business Owner"
          />
        </div>
        
        <div className={styles.bannerContainer}>
          <Image 
            src="/AI-Chat-Banner.webp" 
            alt="AI Chat Experience - Intelligent conversations that understand you" 
            className={styles.bannerImage}
            width={1100}
            height={400}
            priority
          />
        </div>
        
        <div className={styles.heading}>
          <h2 className={styles.title}>Why Our AI Chat Stands Out</h2>
        </div>
        
        <div className={styles.featuresGrid}>
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Truly Free, No Catches"
            description="While other platforms promise 'free' then push upgrades, our AI chat is completely free to use. No premium tiers, no hidden costs, just helpful AI conversations whenever you need them."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            }
            title="No Account Required"
            description="Start chatting instantly - no email, no password, no personal information needed. Your conversation begins with your very first question."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            title="Private & Secure"
            description="Your conversations stay between you and our AI. We don't store chat history long-term or use your data for marketing. Privacy isn't just a promise; it's built into our system."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title="Remarkably Intelligent"
            description="Our AI chat online tool understands context, remembers your conversation details, and provides relevant, thoughtful responses that actually address your questions."
          />
        </div>
        
        <div className={styles.heading} style={{ marginTop: '4rem' }}>
          <h2 className={styles.title}>How People Use Our AI Chat Every Day</h2>
        </div>
        
        <div className={styles.featuresGrid}>
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            title="Students Find an Always-Available Tutor"
            description="Stuck on homework at midnight? Our AI chat explains complex concepts, helps brainstorm essay ideas, and walks through problems step-by-step - available 24/7 when other help isn't."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            }
            title="Writers Break Through Blocks"
            description="Whether drafting emails, creating content, or working on creative projects, our AI chat generator helps you find the right words, develop ideas, and polish your writing to perfection."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Professionals Save Valuable Time"
            description="From drafting responses to researching topics, our free AI chatbot helps you work smarter. Users report saving hours each week on routine writing and research tasks."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="English Learners Practice Safely"
            description="Practice conversations, ask grammar questions, or get help with translations in a judgment-free space. Our AI adapts to your level and helps you improve steadily."
          />
        </div>
        
        <div className={styles.heading} style={{ marginTop: '4rem' }}>
          <h2 className={styles.title}>Experience the Most Natural AI Chat Online</h2>
          <p className={styles.subtitle}>
            Our AI chat technology understands nuance, recognizes the intent behind your questions, and responds with helpful, relevant information. The conversation flows naturally because we've designed our system to communicate like people do - with understanding, context awareness, and helpfulness.
          </p>
        </div>
        
        <div className={styles.featuresGrid}>
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            title="Immediate Responses"
            description="No waiting or queuing for assistance - get help exactly when you need it."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            title="No Technical Knowledge Required"
            description="Simple interface anyone can use, regardless of technical background."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Available 24/7"
            description="Get help at 2 PM or 2 AM, weekday or weekend, whenever you need assistance."
          />
          <FeatureItem
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            title="Constantly Improving"
            description="Our AI gets smarter with every conversation, providing better and more helpful responses over time."
          />
        </div>
      </div>
    </section>
  );
};

export default Features; 