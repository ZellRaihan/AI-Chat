'use client';

import React from 'react';
import MainLayout from '@/components/MainLayout';
import PageLayout from '@/components/PageLayout';

const Terms = () => {
  return (
    <MainLayout>
      <PageLayout 
        title="Terms & Conditions" 
        subtitle="Please read these terms carefully before using our services"
      >
        <h2>Agreement to Terms</h2>
        <p>
          By accessing or using AI Chat Tools, you agree to be bound by these Terms and Conditions
          and our Privacy Policy. If you disagree with any part of these terms, you may not access
          our services.
        </p>

        <h2>Use License</h2>
        <p>
          We grant you a limited, non-exclusive, non-transferable, and revocable license to use our
          services for personal, non-commercial purposes, subject to these Terms and Conditions.
        </p>

        <h2>User Guidelines</h2>
        <p>When using our services, you agree not to:</p>
        <ul>
          <li>Use the service for any illegal purposes</li>
          <li>Attempt to gain unauthorized access to any part of the service</li>
          <li>Interfere with or disrupt the service or servers</li>
          <li>Share harmful or malicious content</li>
          <li>Impersonate others or provide false information</li>
        </ul>

        <h2>Content Ownership</h2>
        <p>
          The service and its original content, features, and functionality are owned by AI Chat Tools
          and are protected by international copyright, trademark, and other intellectual property laws.
        </p>

        <h2>User Content</h2>
        <p>
          By submitting content to our service, you grant us a worldwide, non-exclusive, royalty-free
          license to use, reproduce, modify, and distribute your content for the purpose of providing
          and improving our services.
        </p>

        <h2>Disclaimer</h2>
        <p>
          Our services are provided "as is" without any warranty of any kind. We do not guarantee
          that the service will be uninterrupted, secure, or error-free.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          AI Chat Tools shall not be liable for any indirect, incidental, special, consequential,
          or punitive damages resulting from your use or inability to use the service.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. We will provide notice
          of any changes by posting the new Terms on this page.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us through our Contact page
          or email us at terms@aichattools.com.
        </p>
      </PageLayout>
    </MainLayout>
  );
};

export default Terms; 