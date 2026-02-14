import { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function SafeImage({
  src,
  fallback = '/photos/placeholders/feature.svg',
  alt,
  className = '',
  loading = 'lazy',
  ...rest
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // ARCHITECTURE ENFORCEMENT: Detect /images/ path violations in development
  if (process.env.NODE_ENV === 'development') {
    if (src.includes('/images/')) {
      console.error(
        `[PHOTO SYSTEM VIOLATION] Detected hardcoded /images/ path: "${src}"\n` +
        `All images must use /photos/ directory and be referenced via photoManifest.\n` +
        `Fix: Import from '@/app/config/photoManifest' and use manifest keys.`
      );
    }
    if (fallback && fallback.includes('/images/')) {
      console.error(
        `[PHOTO SYSTEM VIOLATION] Detected hardcoded /images/ fallback: "${fallback}"\n` +
        `Fallbacks must use /photos/placeholders/ directory.\n` +
        `Fix: Use placeholders from photoManifest.`
      );
    }
  }

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      loading={loading}
      onError={() => setError(true)}
      className={className}
      {...rest}
    />
  );
}

export default SafeImage;