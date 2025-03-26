import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Settings - AI Chat',
  description: 'Customize your AI Chat experience. Manage your preferences, language settings, and AI model configurations.',
  path: '/settings',
}); 