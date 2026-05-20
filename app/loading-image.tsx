/* eslint-disable @next/next/no-img-element */
"use client";

import { ImgHTMLAttributes, SyntheticEvent, useEffect, useRef, useState } from "react";

type LoadingImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function LoadingImage({ className = "", onLoad, src, ...props }: LoadingImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    setLoaded(Boolean(image?.complete && image.naturalWidth > 0));
  }, [src]);

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    setLoaded(true);
    onLoad?.(event);
  }

  return (
    <img
      {...props}
      ref={imageRef}
      className={`nadon-loading-image ${className}`.trim()}
      data-loaded={loaded ? "true" : "false"}
      onLoad={handleLoad}
      src={src}
    />
  );
}
