export type GalleryOrientation = "portrait" | "landscape" | "square";

export type GalleryStatus = "draft" | "published" | "archived";

export type GalleryImageRecord = {
  id: string;
  galleryId: string;
  src: string;
  storageProvider: "cloudinary" | "supabase" | "vercel-blob" | "external";
  storageKey: string | null;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: GalleryOrientation;
  alt: string;
  caption: string | null;
  sortOrder: number;
  focalX: number | null;
  focalY: number | null;
  dominantColor: string | null;
};

export type GalleryRecord = {
  id: string;
  slug: string;
  title: string;
  coupleName: string;
  location: string;
  category: "wedding" | "studio" | "editorial" | "family";
  status: GalleryStatus;
  coverImageId: string | null;
  publishedAt: string | null;
  images: GalleryImageRecord[];
};

export function getImageOrientation(width: number, height: number): GalleryOrientation {
  if (width === height) {
    return "square";
  }

  return width > height ? "landscape" : "portrait";
}

export function getAspectRatio(width: number, height: number) {
  return width / height;
}

