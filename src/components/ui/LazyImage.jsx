// An image that only downloads when it scrolls into view (loading="lazy"),
// is resized by Cloudinary, and falls back to a light placeholder if there's
// no photo or it fails to load.

import { useState } from 'react';
import { HomeIcon } from '../icons';
import { optimizedImage } from '../../utils/images';

export default function LazyImage({ src, alt, width = 600, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-brand-50 text-brand-300 ${className}`} role="img" aria-label={alt}>
        <HomeIcon className="h-12 w-12" />
      </div>
    );
  }

  return (
    <img
      src={optimizedImage(src, width)}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`bg-gray-100 object-cover ${className}`}
    />
  );
}
