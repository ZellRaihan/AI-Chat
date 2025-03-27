import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Contact AI Chat - Get in Touch',
  description: 'Have questions about our free AI chat service? Contact us for support, feedback, or partnership opportunities. We\'re here to help!',
  path: '/contact',
  image: '/AI-Chat-Banner.webp'
}); 