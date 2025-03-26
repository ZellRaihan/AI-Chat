'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import PageLayout from '@/components/PageLayout';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert('Thank you for your message. We will get back to you soon!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <MainLayout>
      <PageLayout 
        title="Contact Us" 
        subtitle="Have a question or feedback? We'd love to hear from you"
      >
        <div className={styles.contactWrapper}>
          <div className={styles.contactInfo}>
            <h2>Get in Touch</h2>
            <p>
              We're here to help and answer any questions you might have. We look forward
              to hearing from you.
            </p>
            
            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <i className="fas fa-envelope"></i>
                <h3>Email</h3>
                <p>support@aichattools.com</p>
              </div>
              
              <div className={styles.contactMethod}>
                <i className="fas fa-clock"></i>
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9AM - 6PM EST</p>
              </div>
              
              <div className={styles.contactMethod}>
                <i className="fas fa-map-marker-alt"></i>
                <h3>Location</h3>
                <p>New York, NY 10001</p>
              </div>
            </div>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email address"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                rows={5}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>
      </PageLayout>
    </MainLayout>
  );
};

export default Contact; 