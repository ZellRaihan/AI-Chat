import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'AI Chat Error - Something Went Wrong',
  description: 'We encountered an error. Please try again or contact us for support. Our free AI chat service is here to help.',
  path: '/error',
  image: '/AI-Chat-Banner.webp'
}); 