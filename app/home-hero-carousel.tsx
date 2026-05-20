"use client";

import { useEffect, useState } from "react";
import { LoadingImage } from "./loading-image";
import { homeImages, site } from "./site-data";

const heroStatement = `${site.name} is a journalistic style wedding and lifestyle photography practice, with a background in editorial imagery and an eye for beautiful details. Available for commissions worldwide.`;

function getHeroQualitySrc(src: string) {
  if (src.startsWith("data:") || src.startsWith("blob:") || src.startsWith("/")) {
    return src;
  }

  if (src.includes("static.showit.co/")) {
    return src.replace(/static\.showit\.co\/(?:222|400|800|1200|1600)\//, "static.showit.co/2400/");
  }

  if (src.includes("images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", "2400");
    url.searchParams.set("q", "90");
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
  const heroImages = images?.length ? images : homeImages.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);
  const previousIndex = () => setActiveIndex((index) => (index - 1 + heroImages.length) % heroImages.length);
  const nextIndex = () => setActiveIndex((index) => (index + 1) % heroImages.length);

  useEffect(() => {
    const timer = window.setInterval(() => {
      nextIndex();
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="nadon-home-hero" id="nadon-home-hero" aria-label="Featured wedding images">
      <div className="nadon-home-hero-track">
        {heroImages.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <LoadingImage
              alt={image.alt ?? `Hero photograph ${index + 1}`}
              aria-hidden={isActive ? undefined : "true"}
              className="nadon-home-hero-image"
              data-active={isActive ? "true" : "false"}
              decoding={isActive ? "sync" : "async"}
              fetchPriority={index === 0 ? "high" : "auto"}
              key={`${image.src}-${index}`}
              loading={index === 0 ? "eager" : "lazy"}
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
        onClick={previousIndex}
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
        onClick={nextIndex}
      >
        <svg viewBox="0 0 88 24" aria-hidden="true">
          <path d="M0 12h83" />
          <path d="m76.5 5.5 6.5 6.5-6.5 6.5" />
        </svg>
      </button>
    </section>
  );
}
