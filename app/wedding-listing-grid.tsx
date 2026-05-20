/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingImage } from "./loading-image";

type WeddingListingItem = {
  aspectRatio?: number;
  href: string;
  height?: number;
  imagePosition: string;
  location: string;
  name: string;
  src: string;
  width?: number;
};

type Orientation = "landscape" | "portrait" | "square" | "unknown";

function getOrientationFromRatio(ratio: number): Orientation {

  if (!Number.isFinite(ratio) || ratio <= 0) {
    return "unknown";
  }

  if (ratio > 1.04) {
    return "landscape";
  }

  if (ratio < 0.96) {
    return "portrait";
  }

  return "square";
}

function getOrientation(image: HTMLImageElement): Orientation {
  return getOrientationFromRatio(image.naturalWidth / image.naturalHeight);
}

function getGalleryRatio(gallery: WeddingListingItem) {
  const ratio =
    gallery.aspectRatio ??
    (gallery.width && gallery.height && gallery.width > 0 && gallery.height > 0
      ? gallery.width / gallery.height
      : undefined);

  return ratio && Number.isFinite(ratio) && ratio > 0 ? ratio : undefined;
}

export function WeddingListingGrid({ galleries }: { galleries: WeddingListingItem[] }) {
  const [orientations, setOrientations] = useState<Record<string, Orientation>>(() =>
    galleries.reduce<Record<string, Orientation>>((nextOrientations, gallery) => {
      const ratio = getGalleryRatio(gallery);

      if (ratio) {
        nextOrientations[gallery.href] = getOrientationFromRatio(ratio);
      }

      return nextOrientations;
    }, {})
  );

  useEffect(() => {
    let isCurrent = true;

    galleries.forEach((gallery) => {
      if (getGalleryRatio(gallery) || (orientations[gallery.href] && orientations[gallery.href] !== "unknown")) {
        return;
      }

      const image = new Image();

      image.onload = () => {
        if (!isCurrent) {
          return;
        }

        const nextOrientation = getOrientation(image);

        setOrientations((currentOrientations) => {
          if (currentOrientations[gallery.href] === nextOrientation) {
            return currentOrientations;
          }

          return { ...currentOrientations, [gallery.href]: nextOrientation };
        });
      };
      image.src = gallery.src;
    });

    return () => {
      isCurrent = false;
    };
  }, [galleries, orientations]);

  return (
    <section className="nadon-weddings-galleries nadon-weddings-galleries--adaptive" aria-label="Wedding galleries">
      {galleries.map((gallery, index) => {
        const aspectRatio = getGalleryRatio(gallery);
        const orientation = aspectRatio ? getOrientationFromRatio(aspectRatio) : orientations[gallery.href] ?? "unknown";

        return (
          <article
            className={`nadon-wedding-gallery-card nadon-wedding-gallery-card--${orientation}`}
            key={gallery.href}
          >
            <Link className="nadon-wedding-gallery-image" href={gallery.href}>
              <LoadingImage
                src={gallery.src}
                alt={`${gallery.name} wedding gallery`}
                height={gallery.height}
                style={{ objectPosition: gallery.imagePosition }}
                width={gallery.width}
                onLoad={(event) => {
                  const nextOrientation = getOrientation(event.currentTarget);

                  setOrientations((currentOrientations) => {
                    if (currentOrientations[gallery.href] === nextOrientation) {
                      return currentOrientations;
                    }

                    return { ...currentOrientations, [gallery.href]: nextOrientation };
                  });
                }}
              />
            </Link>
            <div className="nadon-wedding-gallery-caption">
              <Link className="nadon-wedding-gallery-name" href={gallery.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {gallery.name}
              </Link>
              <Link className="nadon-wedding-gallery-location" href={gallery.href}>
                {gallery.location.split("\n").map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
