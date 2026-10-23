"use client";

import { useEffect, useState, useRef } from "react";
import { LoadingImage } from "./loading-image";
import { homeImages, site } from "./site-data";

const heroStatement = `${site.name} is a journalistic style wedding and lifestyle photography practice, with a background in editorial imagery and an eye for beautiful details. Available for commissions worldwide.`;

function getHeroQualitySrc(src: string) {
  if (src.startsWith("data:") || src.startsWith("blob:") || src.startsWith("/")) {
    return src;
  }

  if (src.includes("static.showit.co/")) {
    return src.replace(/static\.showit\.co\/(?:222|400|800|1200|1600)\//, "static.showit.co/1600/");
  }

  if (src.includes("images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", "1600");
    url.searchParams.set("q", "85");
    return url.toString();
  }

  return src;
}

export function HomeHeroCarousel({
  images
}: {
  images?: {
    alt?: string;
    src: string;
  }[];
}) {
  const heroImages = images?.length
    ? images
    : [homeImages[3], homeImages[4], homeImages[15], homeImages[2], homeImages[16]];

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  // Preload and decode all hero images immediately on mount so transitions are instant
  useEffect(() => {
    heroImages.forEach((image) => {
      const src = getHeroQualitySrc(image.src);
      const img = new Image();
      img.src = src;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
    });
  }, [heroImages]);

  const goToNext = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((current) => (current + 1) % heroImages.length);
  };

  const goToPrevious = () => {
    setPreviousIndex(activeIndex);
    setActiveIndex((current) => (current - 1 + heroImages.length) % heroImages.length);
  };

  useEffect(() => {
    const timer = window.setInterval(goToNext, 5200);
    return () => window.clearInterval(timer);
  }, [activeIndex, heroImages.length]);

  return (
    <section className="nadon-home-hero" id="nadon-home-hero" aria-label="Featured wedding images">
      <div className="nadon-home-hero-track">
        {heroImages.map((image, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === previousIndex && !isActive;

          return (
            <LoadingImage
              alt={image.alt ?? `Hero photograph ${index + 1}`}
              aria-hidden={isActive ? undefined : "true"}
              className="nadon-home-hero-image"
              data-active={isActive ? "true" : "false"}
              data-previous={isPrev ? "true" : "false"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              key={`${image.src}-${index}`}
              loading="eager"
              src={getHeroQualitySrc(image.src)}
            />
          );
        })}
      </div>
      <div className="nadon-home-hero-copy">
        <p>{site.name}</p>
        <h1>{heroStatement}</h1>
      </div>
      <button
        className="nadon-home-hero-arrow nadon-home-hero-arrow-left"
        type="button"
        aria-label="Previous hero image"
        onClick={goToPrevious}
      >
        <svg viewBox="0 0 88 24" aria-hidden="true">
          <path d="M88 12H5" />
          <path d="m11.5 5.5-6.5 6.5 6.5 6.5" />
        </svg>
      </button>
      <button
        className="nadon-home-hero-arrow nadon-home-hero-arrow-right"
        type="button"
        aria-label="Next hero image"
        onClick={goToNext}
      >
        <svg viewBox="0 0 88 24" aria-hidden="true">
          <path d="M0 12h83" />
          <path d="m76.5 5.5 6.5 6.5-6.5 6.5" />
        </svg>
      </button>
    </section>
  );
}
