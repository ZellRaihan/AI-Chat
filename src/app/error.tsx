'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/MainLayout';
import styles from '@/styles/Error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1>Something went wrong!</h1>
        <p>We apologize for the inconvenience. Please try one of these options:</p>
        <div className={styles.actions}>
          <button onClick={reset} className={styles.button}>
            Try again
          </button>
          <Link href="/" className={styles.button}>
            Return to Homepage
          </Link>
        </div>
        <p className={styles.help}>
          If the problem persists, please{' '}
          <Link href="/contact">contact our support team</Link>.
        </p>
      </div>
    </MainLayout>
  );
} 