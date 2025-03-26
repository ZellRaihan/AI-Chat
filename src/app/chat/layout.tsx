import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Chat - Start a Conversation',
  description: 'Begin an intelligent conversation with our advanced AI chat assistant. Get real-time responses and engage in meaningful dialogue.',
  openGraph: {
    title: 'AI Chat - Start a Conversation',
    description: 'Begin an intelligent conversation with our advanced AI chat assistant. Get real-time responses and engage in meaningful dialogue.',
  },
  twitter: {
    title: 'AI Chat - Start a Conversation',
    description: 'Begin an intelligent conversation with our advanced AI chat assistant. Get real-time responses and engage in meaningful dialogue.',
  }
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 