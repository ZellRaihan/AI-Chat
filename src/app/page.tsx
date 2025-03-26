'use client';

import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import styles from "../styles/HomePage.module.css";
import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.homepageContainer}>
        <div className={styles.homepageScrollContainer}>
          <Hero />
          <div id="features">
            <Features />
          </div>
          <CTA />
        </div>
      </div>
    </MainLayout>
  );
}
