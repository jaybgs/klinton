/* eslint-disable @next/next/no-img-element */
"use client";

import { ImgHTMLAttributes, SyntheticEvent, useEffect, useRef, useState } from "react";

type LoadingImageProps = ImgHTMLAttributes<HTMLImageElement>;

// Global in-memory cache to prevent re-flashing skeleton for already loaded images
const loadedSourcesCache = new Set<string>();

export function LoadingImage({ className = "", onLoad, src, ...props }: LoadingImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(() => {
    if (typeof src === "string" && loadedSourcesCache.has(src)) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (typeof src === "string" && loadedSourcesCache.has(src)) {
      setLoaded(true);
      return;
    }

    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      if (typeof src === "string") loadedSourcesCache.add(src);
      setLoaded(true);
    }
  }, [src]);

  function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
    if (typeof src === "string") loadedSourcesCache.add(src);
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
