import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Terms & Conditions - AI Chat',
  description: 'Read our terms and conditions to understand the rules and guidelines for using the AI Chat platform and services.',
  path: '/terms',
}); 