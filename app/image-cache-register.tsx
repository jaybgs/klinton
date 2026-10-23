"use client";

import { useEffect } from "react";
import nadonPhotos from "./nadon-photos.json";

export function ImageCacheRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Register Service Worker for Cache-First image storage
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch(() => {
          // SW registration failed gracefully
        });
    }

    // 2. Preload & cache primary images in browser memory and Cache API
    const preloadPhotos = nadonPhotos.map((photo) => photo.src);

    // Warm up Cache API directly if available
    if ("caches" in window) {
      caches.open("nadon-image-cache-v1").then((cache) => {
        preloadPhotos.forEach((src) => {
          cache.match(src).then((matched) => {
            if (!matched) {
              fetch(src, { mode: "no-cors" })
                .then((res) => {
                  if (res.ok || res.type === "opaque") {
                    cache.put(src, res);
                  }
                })
                .catch(() => {});
            }
          });
        });
      });
    }

    // Also warm up image memory decode cache for smooth transitions
    preloadPhotos.slice(0, 8).forEach((src) => {
      const img = new Image();
      img.src = src;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  return null;
}
