'use client';

import Header from "../components/Header";
import Hero from "../components/Hero";
import ToolsSection from "../components/ToolsSection";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import styles from "../styles/HomePage.module.css";
import MainLayout from '@/components/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className={styles.homepageContainer}>
        <div className={styles.homepageScrollContainer}>
          <Hero />
          <ToolsSection />
          <div id="features">
            <Features />
          </div>
          <CTA />
        </div>
      </div>
    </MainLayout>
  );
}
