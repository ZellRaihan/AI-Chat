'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import PageLayout from '@/components/PageLayout';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <PageLayout 
        title="Privacy Policy" 
        subtitle="We value your privacy and are committed to protecting your personal information"
      >
        <h2>Introduction</h2>
        <p>
          At AI Chat Tools, we take your privacy seriously. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our website and services.
        </p>

        <h2>Information We Collect</h2>
        <p>We collect information that you provide directly to us, including:</p>
        <ul>
          <li>Chat conversations and queries</li>
          <li>Usage data and preferences</li>
          <li>Device and browser information</li>
          <li>Cookies and similar technologies</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the collected information for various purposes:</p>
        <ul>
          <li>To provide and maintain our services</li>
          <li>To improve our AI models and user experience</li>
          <li>To analyze usage patterns and optimize performance</li>
          <li>To protect against misuse and ensure security</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal
          information against unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of certain data collection</li>
        </ul>

        <h2>Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the effective date.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through our Contact
          page or email us at privacy@aichattools.com.
        </p>
      </PageLayout>
    </MainLayout>
  );
};

export default PrivacyPolicy; 