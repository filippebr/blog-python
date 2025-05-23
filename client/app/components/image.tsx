import { IKImage } from "imagekitio-react"

interface ImageTransformation {
  quality?: string
  crop?: string
  [key: string]: string | undefined 
}

type ImageProps = {
  src: string,
  className?: string,
  w?: string,
  h?: string,
  alt: string,
}

export default function Image({src, className, w, h, alt}: ImageProps) {

  const safeSrc = src || "default-image.png"

  // Define the transformation array with the typed structure
  const transformations: ImageTransformation[] = [
    {
      width: w,
      height: h,
    },
  ];

  return (
    <IKImage 
      urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT} 
      path={safeSrc}
      // src="https://ik.imagekit.io/1cfqygcu6/logo.png"
      className={className} 
      loading="lazy"
      lqip={{active: true, quality: 20}}
      alt={alt}
      transformation={transformations} // Use the typed transformations array
    />
  )
}