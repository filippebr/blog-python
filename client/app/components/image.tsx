import { IKImage } from 'imagekitio-react'
import { useEffect, useState } from 'react'

export default function Image({
  src,
  className = '',
  w = 'auto',
  h = 'auto',
  alt = '',
}: {
  src?: string;
  className?: string;
  w?: string;
  h?: string;
  alt?: string;
}) {
  const safeSrc = src || 'default-image.png'
  const cleanSrc = safeSrc.replace(/^\/+/, '') // Remove leading slashes
  const endpoint = import.meta.env.VITE_IMGKIT_URL_ENDPOINT.replace(/\/+$/, '') // Remove trailing slashes
  const imageKitUrl = `${endpoint}/${cleanSrc}`

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true); // Only render IKImage on client
  }, []);

  console.log('src:', src, 'safeSrc:', safeSrc, 'imageKitUrl:', imageKitUrl);

  if (!isClient) {
    // Render fallback on server
    return <img src={imageKitUrl} alt={alt} className={className} loading="lazy" />;
  }

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT}
      src={imageKitUrl}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      transformation={[
        {
          width: w,
          height: h,
        },
      ].filter(trans => Object.keys(trans).length > 0)}
    />
  )
}