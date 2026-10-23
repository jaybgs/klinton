"use client";

import { useEffect, useRef } from "react";
import { LoadingImage } from "./loading-image";

export function InfinitePhotoStrip({ images }: { images: string[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const uniqueImages = [...new Set(images)];

  useEffect(() => {
    const element = viewport.current;
    if (!element || !uniqueImages.length) return;

    let span = 0;
    const count = uniqueImages.length;

    const measure = () => {
      const photos = element.querySelectorAll<HTMLElement>("img");
      if (!photos[count] || !photos[0]) return;
      const nextSpan = photos[count].offsetLeft - photos[0].offsetLeft;
      if (nextSpan > 0 && Math.abs(nextSpan - span) > 2) {
        span = nextSpan;
        element.scrollLeft = span;
      }
    };

    const wrap = () => {
      if (!span) return;
      const position = element.scrollLeft;
      if (position < span * 0.25 || position >= span * 1.75) {
        element.scrollLeft = span + (((position % span) + span) % span);
      }
    };

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();

    element.addEventListener("scroll", wrap, { passive: true });
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", wrap);
    };
  }, [uniqueImages.length]);

  return (
    <div
      ref={viewport}
      className="nadon-social-grid"
      role="region"
      aria-label="Nadon photographs, scroll horizontally"
      tabIndex={0}
      style={{ scrollBehavior: "auto", overflowAnchor: "none" }}
    >
      <div className="nadon-social-track">
        {Array.from({ length: 3 }, (_, copy) =>
          uniqueImages.map((src) => (
            <LoadingImage
              key={`${copy}-${src}`}
              src={src}
              alt="Nadon Klinton portfolio preview"
              aria-hidden="true"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ))
        )}
      </div>
    </div>
  );
}
