import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Loading - AI Chat',
  description: 'Please wait while we load your content. This should only take a moment.',
  path: '/loading',
}); 