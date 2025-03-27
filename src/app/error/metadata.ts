import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Oops! Something Went Wrong - Free AI Chat',
  description: 'We encountered an error, but our free AI chat is still ready to help! Return to continue your conversation without signup, or contact our support team.',
  path: '/error',
}); 