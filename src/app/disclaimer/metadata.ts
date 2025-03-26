import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Disclaimer - AI Chat',
  description: 'Read our disclaimer to understand the terms of use, limitations, and important information about using the AI Chat platform.',
  path: '/disclaimer',
}); 