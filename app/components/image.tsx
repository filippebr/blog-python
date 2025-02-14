import { IKImage } from "imagekitio-react"

type ImageProps = {
  src: string,
  className?: string,
  w: number,
  h: number,
  alt: string
}

export function Image({src, className, w, h, alt}: ImageProps) {
  return (
    <IKImage 
      urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT} 
      path={src}
      // src="https://ik.imagekit.io/1cfqygcu6/logo.png"
      className={className} 
      loading="lazy"
      lpip={{active: true, quality: 20}}
      width={w}
      height={h}
      alt={alt} 
    />
  )
}