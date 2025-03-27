import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Just a Moment - Free AI Chat is Loading',
  description: 'Your free AI chat experience is loading. No signups, no waiting, just intelligent conversation coming right up!',
  path: '/loading',
}); 