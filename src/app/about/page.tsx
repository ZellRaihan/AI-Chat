import type { Metadata } from 'next';
import AboutPage from '@/components/about/AboutPage';

export const metadata: Metadata = {
  title: 'About Us - AI Chat',
  description: 'Learn about AI Chat, our mission to provide intelligent conversations, and how we\'re making AI accessible to everyone.',
  openGraph: {
    title: 'About Us - AI Chat',
    description: 'Learn about AI Chat, our mission to provide intelligent conversations, and how we\'re making AI accessible to everyone.',
  },
  twitter: {
    title: 'About Us - AI Chat',
    description: 'Learn about AI Chat, our mission to provide intelligent conversations, and how we\'re making AI accessible to everyone.',
  }
};

export default function Page() {
  return <AboutPage />;
} 