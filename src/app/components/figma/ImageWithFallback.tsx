import { useState } from 'react'

const base64PlaceholderImage =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

/**
 * @deprecated This component is DEPRECATED and should not be used in new code.
 * 
 * **Use SafeImage instead:**
 * import { SafeImage } from '@/app/components/SafeImage';
 * 
 * SafeImage provides:
 * - Automatic fallback to photoManifest
 * - Better error handling
 * - Consistent placeholder system
 * - Full integration with BIDA photo system
 * 
 * This component exists only for backwards compatibility with legacy asset imports.
 * DO NOT USE IN NEW CODE.
 */
export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  console.warn('[DEPRECATED] ImageWithFallback is deprecated. Use SafeImage instead from @/app/components/SafeImage')

  return (
    <img
      {...props}
      src={didError ? base64PlaceholderImage : props.src}
      onError={() => setDidError(true)}
    />
  )
}