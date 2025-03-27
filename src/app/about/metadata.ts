import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'About AI Chat - Free AI Chat Assistant',
  description: 'Learn about our mission to make AI chat accessible to everyone. Discover how we provide free, no-signup AI conversations that feel natural and helpful.',
  path: '/about',
  image: '/AI-Chat-Banner.webp'
}); 