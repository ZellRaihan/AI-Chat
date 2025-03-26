'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import PageLayout from '@/components/PageLayout';
import styles from './About.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | AI-Chats.net - Leading AI Chat Platform',
  description: 'Learn about AI-Chats.net, our mission to make AI accessible to everyone, and how we\'re revolutionizing AI chat technology. Discover our values and team.',
  openGraph: {
    title: 'About Us | AI-Chats.net - Leading AI Chat Platform',
    description: 'Learn about AI-Chats.net, our mission to make AI accessible to everyone, and how we\'re revolutionizing AI chat technology. Discover our values and team.',
    type: 'website',
    url: 'https://ai-chats.net/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | AI-Chats.net - Leading AI Chat Platform',
    description: 'Learn about AI-Chats.net, our mission to make AI accessible to everyone, and how we\'re revolutionizing AI chat technology.',
  }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is AI Chat Tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI Chat Tools is a platform dedicated to making advanced AI technology accessible to everyone. We provide intuitive, powerful, and free AI tools that help people solve problems, learn, and be more productive in their daily lives.'
      }
    },
    {
      '@type': 'Question',
      name: 'Are AI Chat Tools free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our core AI tools are completely free to use with no signup required. We believe in making AI technology accessible to everyone without barriers like subscriptions or technical expertise.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does AI Chat Tools ensure privacy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We prioritize user privacy and data security in everything we do. Our services are designed with privacy-first principles, and we do not store or share personal conversation data.'
      }
    }
  ]
};

const About = () => {
  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageLayout 
        title="About Us" 
        subtitle="Empowering users with intelligent AI solutions"
      >
        <div className={styles.aboutContent}>
          <section className={styles.mission}>
            <h2>Our Mission</h2>
            <p>
              At AI Chat Tools, we're dedicated to making advanced AI technology accessible to everyone.
              Our mission is to provide intuitive, powerful, and free AI tools that help people solve
              problems, learn, and be more productive in their daily lives.
            </p>
          </section>

          <section className={styles.values}>
            <h2>Our Values</h2>
            <div className={styles.valueGrid}>
              <div className={styles.valueCard}>
                <i className="fas fa-lock"></i>
                <h3>Privacy First</h3>
                <p>We prioritize user privacy and data security in everything we do.</p>
              </div>
              <div className={styles.valueCard}>
                <i className="fas fa-universal-access"></i>
                <h3>Accessibility</h3>
                <p>Making advanced AI technology available to everyone, regardless of technical expertise.</p>
              </div>
              <div className={styles.valueCard}>
                <i className="fas fa-brain"></i>
                <h3>Innovation</h3>
                <p>Continuously improving our AI models and user experience.</p>
              </div>
              <div className={styles.valueCard}>
                <i className="fas fa-heart"></i>
                <h3>User-Centric</h3>
                <p>Every feature and improvement is driven by user needs and feedback.</p>
              </div>
            </div>
          </section>

          <section className={styles.story}>
            <h2>Our Story</h2>
            <p>
              Founded in 2024, AI Chat Tools began with a simple idea: make AI accessible to everyone.
              We noticed that while AI technology was advancing rapidly, many tools were either too
              complex, too expensive, or required technical expertise to use.
            </p>
            <p>
              We set out to change that by creating a suite of AI tools that anyone could use
              instantly, without barriers like signups or subscriptions. Today, we're proud to help
              thousands of users leverage AI technology to enhance their work and daily lives.
            </p>
          </section>

          <section className={styles.team}>
            <h2>Leadership Team</h2>
            <div className={styles.teamGrid}>
              <div className={styles.teamMember}>
                <div className={styles.memberPhoto}>
                  <i className="fas fa-user"></i>
                </div>
                <h3>Sarah Chen</h3>
                <p className={styles.role}>CEO & Founder</p>
                <p className={styles.bio}>
                  AI researcher and entrepreneur with 10+ years of experience in machine learning.
                </p>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.memberPhoto}>
                  <i className="fas fa-user"></i>
                </div>
                <h3>David Kumar</h3>
                <p className={styles.role}>CTO</p>
                <p className={styles.bio}>
                  Former tech lead at major AI companies, specialized in NLP and cloud infrastructure.
                </p>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.memberPhoto}>
                  <i className="fas fa-user"></i>
                </div>
                <h3>Emily Rodriguez</h3>
                <p className={styles.role}>Head of Product</p>
                <p className={styles.bio}>
                  Product strategist focused on creating intuitive AI experiences for users.
                </p>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </MainLayout>
  );
};

export default About; 