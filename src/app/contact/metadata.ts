import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Contact Us - AI Chat',
  description: 'Get in touch with the AI Chat team. We\'re here to help with any questions about our AI chat platform and services.',
  path: '/contact',
}); 