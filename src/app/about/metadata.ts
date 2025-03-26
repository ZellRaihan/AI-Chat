import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'About Us - AI Chat',
  description: 'Learn about AI Chat, our mission to provide intelligent conversations, and how we\'re making AI accessible to everyone.',
  path: '/about',
}); 