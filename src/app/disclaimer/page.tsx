import type { Metadata } from 'next';
import DisclaimerPage from '@/components/disclaimer/DisclaimerPage';

export const metadata: Metadata = {
  title: 'Disclaimer - AI Chat',
  description: 'Read our disclaimer to understand the terms of use, limitations, and important information about using the AI Chat platform.',
  openGraph: {
    title: 'Disclaimer - AI Chat',
    description: 'Read our disclaimer to understand the terms of use, limitations, and important information about using the AI Chat platform.',
  },
  twitter: {
    title: 'Disclaimer - AI Chat',
    description: 'Read our disclaimer to understand the terms of use, limitations, and important information about using the AI Chat platform.',
  }
};

export default function Page() {
  return <DisclaimerPage />;
} 