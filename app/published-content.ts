export type PublishedImage = {
  aspectRatio?: number;
  height?: number;
  name?: string;
  size?: number;
  src: string;
  type?: string;
  width?: number;
};

export type PublishedContent = {
  nibgateWallet?: string;
  homeCarouselImages?: PublishedImage[];
  homeGalleryImages?: PublishedImage[];
  studioGalleries?: {
    coverImage?: PublishedImage | null;
    galleryImages?: PublishedImage[];
    name?: string;
    isGated?: boolean;
    price?: string;
    isRated?: boolean;
  }[];
  weddingGalleries?: {
    coverImage?: PublishedImage | null;
    galleryImages?: PublishedImage[];
    location?: string;
    name?: string;
    story?: string;
    isGated?: boolean;
    price?: string;
    isRated?: boolean;
  }[];
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export async function getPublishedContent(): Promise<PublishedContent | null> {
  try {
    const response = await fetch(`${backendUrl}/api/content`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { content?: PublishedContent | null };
    const content = data.content;
    if (content) {
      if (content.weddingGalleries) {
        content.weddingGalleries.forEach(g => {
          if (g.isGated) g.galleryImages = [];
        });
      }
      if (content.studioGalleries) {
        content.studioGalleries.forEach(g => {
          if (g.isGated) g.galleryImages = [];
        });
      }
    }
    return content ?? null;
  } catch {
    return null;
  }
}
