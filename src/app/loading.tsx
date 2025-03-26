import MainLayout from '@/components/MainLayout';
import styles from '@/styles/Loading.module.css';

export default function Loading() {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.header}></div>
          <div className={styles.content}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 