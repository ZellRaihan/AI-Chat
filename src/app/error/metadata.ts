import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Error - AI Chat',
  description: 'Something went wrong. We apologize for the inconvenience. Please try again or contact our support team.',
  path: '/error',
}); 