"use client";

import { useEffect, useState } from "react";
import { setupResourcePage, trackResourcePage, createOnchainRating } from "@nibgate/sdk";
import { MasonryGallery } from "./masonry-gallery";
import { PublishedImage } from "./published-content";

type Props = {
  resourceId: string;
  resourceTitle: string;
  resourcePath: string;
  price: string;
  fallbackImages: PublishedImage[];
  ariaLabel: string;
  isRated?: boolean;
  recipient?: string;
};

export function GatedGallery({ resourceId, resourceTitle, resourcePath, price, fallbackImages, ariaLabel, isRated, recipient }: Props) {
  const [images, setImages] = useState<PublishedImage[]>(fallbackImages);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    const resource = {
      id: resourceId,
      title: resourceTitle,
      type: "gallery",
      price,
      currency: "USDC",
      recipient: recipient || "0x0000000000000000000000000000000000000000",
      path: resourcePath,
      url: `${window.location.origin}${resourcePath}`,
      access: { humans: "paid" as const, agents: "paid" as const },
      unlock: { mode: "one_time" }
    };

    trackResourcePage(resource, { source: "creator-site" });
    setupResourcePage(resource, {
      source: "creator-site",
      accessPath: `/api/nibgate/access?path=${resourcePath}`,
      button: "[data-nibgate-unlock]",
      status: "[data-nibgate-status]"
    });

    const checkAccess = async () => {
      try {
        const res = await fetch(`/api/nibgate/access?path=${resourcePath}`);
        if (res.ok) {
          const data = await res.json();
          setImages(data.galleryImages);
          setLocked(false);
        } else {
          setLocked(true);
        }
      } catch (err) {
        setLocked(true);
      }
    };
    checkAccess();
  }, [resourceId, resourceTitle, resourcePath, price, recipient]);

  useEffect(() => {
    if (!locked && isRated) {
      const resource = {
        id: resourceId,
        title: resourceTitle,
        type: "gallery",
        price,
        currency: "USDC",
        recipient: recipient || "0x0000000000000000000000000000000000000000",
        path: resourcePath,
        url: `${window.location.origin}${resourcePath}`,
        access: { humans: "paid" as const, agents: "paid" as const },
        unlock: { mode: "one_time" }
      };
      
      createOnchainRating(resource, {
        ratingTarget: `[data-nibgate-rating="${resourceId}"]`,
        autoMount: true
      });
    }
  }, [locked, isRated, resourceId, resourceTitle, resourcePath, price, recipient]);

  const loadContent = async () => {
    try {
      const res = await fetch(`/api/nibgate/access?path=${resourcePath}`);
      if (res.ok) {
        const data = await res.json();
        setImages(data.galleryImages);
        setLocked(false);
      }
    } catch (err) {
        console.error(err);
    }
  };

  const galleryItems = images.map((image, index) => ({
    alt: `${resourceTitle} photograph ${index + 1}`,
    aspectRatio: image.aspectRatio,
    height: image.height,
    href: image.src,
    src: image.src,
    width: image.width
  }));

  if (locked) {
    return (
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ filter: "blur(12px)", opacity: 0.6, pointerEvents: "none", userSelect: "none" }}>
          <MasonryGallery
            ariaLabel={ariaLabel}
            className="nadon-gallery-masonry"
            items={galleryItems}
          />
        </div>
        <div style={{ 
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, 
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "rgba(255, 255, 255, 0.4)", zIndex: 10 
        }}>
          <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", maxWidth: "90%" }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Premium Gallery</h3>
            <p style={{ marginBottom: "2rem", color: "#666" }}>Unlock this full gallery for {price} USDC.</p>
            
            <button 
              data-nibgate-unlock
              style={{ padding: "12px 24px", background: "#000", color: "#fff", border: "none", cursor: "pointer", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px" }}
            >
              Unlock Gallery
            </button>
            
            <div data-nibgate-status style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>
              Waiting for payment...
            </div>
            
            <button onClick={loadContent} style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#666", background: "transparent", border: "none", textDecoration: "underline", cursor: "pointer" }}>
              Load Gallery
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MasonryGallery
        ariaLabel={ariaLabel}
        className="nadon-gallery-masonry"
        items={galleryItems}
      />
      {isRated && (
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #eaeaea", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>Rate this Gallery</h3>
          <div data-nibgate-rating={resourceId}></div>
        </div>
      )}
    </>
  );
}
