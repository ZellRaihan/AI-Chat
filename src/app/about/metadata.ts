import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'About Our Free AI Chat Service',
  description: 'Learn about AI-Chats.net, our mission to provide free, human-like AI conversations accessible to everyone without signups or fees.',
  path: '/about',
}); 