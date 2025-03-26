import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy - AI Chat',
  description: 'Learn about how AI Chat collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
  path: '/privacy-policy',
}); 