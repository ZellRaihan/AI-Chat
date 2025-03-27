import type { Metadata } from 'next';
import DisclaimerPage from '@/components/disclaimer/DisclaimerPage';

export const metadata: Metadata = {
  title: 'Disclaimer - Important Information About Our Free AI Chat',
  description: 'Our disclaimer provides important information about AI-Chats.net. Understand how to best use our free AI chat service and what to expect from our AI responses.',
  openGraph: {
    title: 'Disclaimer - Important Information About Our Free AI Chat',
    description: 'Our disclaimer provides important information about AI-Chats.net. Understand how to best use our free AI chat service and what to expect from our AI responses.',
  },
  twitter: {
    title: 'Disclaimer - Important Information About Our Free AI Chat',
    description: 'Our disclaimer provides important information about AI-Chats.net. Understand how to best use our free AI chat service and what to expect from our AI responses.',
  }
};

export default function Page() {
  return <DisclaimerPage />;
} 