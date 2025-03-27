import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'AI Chat Privacy Policy - Your Data Protection',
  description: 'Learn how we protect your privacy in our free AI chat service. Our commitment to data security and user privacy in every conversation.',
  path: '/privacy-policy',
  image: '/AI-Chat-Banner.webp'
}); 