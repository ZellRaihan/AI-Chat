import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Page Not Found - AI Chat',
  description: 'The page you\'re looking for doesn\'t exist. Please check the URL or navigate back to our homepage.',
  path: '/not-found',
}); 