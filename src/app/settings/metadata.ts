import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'AI Chat Settings - Customize Your Experience',
  description: 'Customize your AI chat experience. Choose your preferred AI model, adjust settings, and make the most of our free chat service.',
  path: '/settings',
  image: '/AI-Chat-Banner.webp'
}); 