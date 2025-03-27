import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'AI Chat Terms of Service - Usage Guidelines',
  description: 'Read our terms of service for the free AI chat platform. Understand the guidelines for using our service and ensure a great experience for everyone.',
  path: '/terms',
  image: '/AI-Chat-Banner.webp'
}); 