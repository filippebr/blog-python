import { IKImage } from 'imagekitio-react'

type ImageProps = {
  src: string;
  className?: string;
  w?: string;
  h?: string;
  alt: string;
};

export default function Image({ src, className, w, h, alt }: ImageProps) {
  const transformations = [
    {
      width: w,
      height: h,
    },
  ];

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      transformation={transformations}
    />
  );
}