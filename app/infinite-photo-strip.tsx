"use client";

import { useEffect, useRef } from "react";
import { LoadingImage } from "./loading-image";

export function InfinitePhotoStrip({ images }: { images: string[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const uniqueImages = [...new Set(images)];
  useEffect(() => {
    const element = viewport.current;
    if (!element || !images.length) return;
    let span = 0;
    const measure = () => {
      const photos = element.querySelectorAll<HTMLElement>("img");
      const count = new Set(images).size;
      if (!photos[count]) return;
      span = photos[count].offsetLeft - photos[0].offsetLeft;
      element.scrollLeft = span * 2;
    };
    const wrap = () => {
      if (!span) return;
      const position = element.scrollLeft;
      if (position < span || position >= span * 3) {
        element.scrollLeft = span * 2 + ((position % span) + span) % span;
      }
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    element.addEventListener("scroll", wrap, { passive: true });
    return () => { observer.disconnect(); element.removeEventListener("scroll", wrap); };
  }, [images]);

  return <div ref={viewport} className="nadon-social-grid" role="region" aria-label="Nadon photographs, scroll horizontally" tabIndex={0} style={{ scrollBehavior: "auto", overflowAnchor: "none" }}>
    <div className="nadon-social-track">
      {Array.from({ length: 7 }, (_, copy) => uniqueImages.map((src, index) =>
        <LoadingImage key={`${copy}-${src}`} src={src} alt="" aria-hidden="true" draggable={false} />
      ))}
    </div>
  </div>;
}