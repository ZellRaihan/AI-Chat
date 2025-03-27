import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'AI Chat Loading - Please Wait',
  description: 'Loading your AI chat experience. Our free service will be ready in just a moment.',
  path: '/loading',
  image: '/AI-Chat-Banner.webp'
}); 