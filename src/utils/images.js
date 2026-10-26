// Image helpers.

/**
 * Ask Cloudinary for a smaller, compressed version of an image.
 * "f_auto,q_auto" picks the best format (WebP/AVIF) and quality for the
 * device; "w_600" resizes it. This turns a 3MB phone photo into ~60KB.
 * URLs that aren't from Cloudinary are returned unchanged.
 */
export function optimizedImage(url, width = 600) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_fill,w_${width}/`);
}
