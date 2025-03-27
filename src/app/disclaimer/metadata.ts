import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'AI Chat Disclaimer - Important Information',
  description: 'Important information about our free AI chat service. Understand the limitations and responsibilities when using our AI chat platform.',
  path: '/disclaimer',
  image: '/AI-Chat-Banner.webp'
}); 