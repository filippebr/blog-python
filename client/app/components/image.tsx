<<<<<<< HEAD
import { IKImage } from 'imagekitio-react'
=======
import { IKImage } from "imagekitio-react"

interface ImageTransformation {
  quality?: string
  crop?: string
  [key: string]: string | undefined 
}
>>>>>>> 5cf5dc53a0fa630be940045c69cb76e86f347bed

type ImageProps = {
  src: string;
  className?: string;
  w?: string;
  h?: string;
  alt: string;
};

<<<<<<< HEAD
export default function Image({ src, className, w, h, alt }: ImageProps) {
  const transformations = [
=======
export default function Image({src, className, w, h, alt}: ImageProps) {

  const safeSrc = src || "default-image.png"

  // Define the transformation array with the typed structure
  const transformations: ImageTransformation[] = [
>>>>>>> 5cf5dc53a0fa630be940045c69cb76e86f347bed
    {
      width: w,
      height: h,
    },
  ];

  return (
<<<<<<< HEAD
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT}
      path={src}
      className={className}
=======
    <IKImage 
      urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT} 
      path={safeSrc}
      // src="https://ik.imagekit.io/1cfqygcu6/logo.png"
      className={className} 
>>>>>>> 5cf5dc53a0fa630be940045c69cb76e86f347bed
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      transformation={transformations}
    />
  );
}