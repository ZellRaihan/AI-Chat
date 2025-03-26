import React from 'react';
import Image from 'next/image';
import styles from '@/styles/OptimizedImage.module.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
}) => {
  return (
    <div className={`${styles.imageWrapper} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={90}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        className={styles.image}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default OptimizedImage; 