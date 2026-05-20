# Gallery Admin Architecture

This repo currently keeps the wedding gallery pages as a visual prototype. The long tiled gallery, sticky title block, header, press strip, and footer are intentionally still visible with the current static image URLs.

The production version should keep that same front-end look, but replace the hardcoded gallery arrays with records managed from the admin site.

## Current State

- The visible prototype lives in `app/site-template.tsx`.
- Individual gallery pages are routed from `app/[slug]/page.tsx`.
- The long-form gallery layout is styled by `app/styles/nadon-gallery-pages.css`.
- The current image list is static so we can keep reviewing the page design before wiring storage, auth, and database behavior.

Do not remove the prototype image data until the database-backed gallery loader is implemented and verified.

## Recommended Stack

Use this as the first production target:

- **Next.js** for the public site and admin site.
- **Supabase Auth** for admin login.
- **Supabase Postgres** for galleries, image records, ordering, publish status, metadata, and audit fields.
- **Cloudinary** for image upload, metadata extraction, responsive delivery, format conversion, quality optimization, and CDN delivery.

Supabase Storage can also work, but Cloudinary is better suited for a photography-heavy gallery where responsive transforms, EXIF-aware rotation, automatic format, and image CDN behavior matter.

Useful docs:

- Cloudinary image transformations: https://cloudinary.com/documentation/image_transformations
- Cloudinary responsive images: https://cloudinary.com/documentation/responsive_images
- Supabase image transformations: https://supabase.com/docs/guides/storage/image-transformations
- Supabase Storage: https://supabase.com/docs/guides/storage

## Data Model

The public page needs two records:

1. A `galleries` record for the gallery shell.
2. Ordered `gallery_images` records for the tiled gallery.

Each image record should store the image's real dimensions:

- `width`
- `height`
- `aspect_ratio`
- `orientation`
- `sort_order`
- `alt`
- `caption`
- `storage_provider`
- `storage_key`
- `src`

The front end should never guess orientation from the filename. It should use stored dimensions from Cloudinary metadata, Supabase Storage metadata, or a server-side image probe during upload.

## Orientation Rules

The tiled gallery should preserve the actual image shape:

- Portrait images render tall.
- Landscape images render wide.
- Square images render square.
- No cropping in the main tiled gallery unless a future gallery setting explicitly asks for it.

Cropping is allowed for:

- portfolio cover cards
- sticky related-gallery thumbnails
- footer/social strips
- admin thumbnails

Those cropped surfaces should use stored focal points when available.

## Upload Flow

Admin upload flow:

1. Admin signs in on `admin.nadonklinton.com`.
2. Admin creates a gallery with title, slug, location, and status.
3. Admin uploads images.
4. Server uploads each image to Cloudinary.
5. Cloudinary returns public ID, secure URL, width, height, format, bytes, and metadata.
6. Server saves one row per image in `gallery_images`.
7. Server derives `aspect_ratio` and `orientation`.
8. Admin drags images to reorder.
9. Admin sets cover image and publishes.
10. Public gallery page reads published data by slug.

## Admin Features

First version:

- login/logout
- gallery list
- create/edit gallery
- upload multiple images
- reorder images
- set cover image
- edit title/location/slug/status
- publish/unpublish

Second version:

- per-image alt text
- captions
- focal-point picker for thumbnails
- featured gallery picker
- batch delete
- duplicate gallery
- import/export backup JSON

## Public Rendering Contract

The public route should eventually use a loader like:

```ts
const gallery = await getPublishedGalleryBySlug(slug);
```

The component should receive the same normalized shape whether data comes from the current prototype or from Supabase:

```ts
type GalleryRecord = {
  slug: string;
  title: string;
  coupleName: string;
  location: string;
  coverImageId: string | null;
  images: GalleryImageRecord[];
};
```

The front end should render `gallery.images` in `sort_order` order and use the real `width`, `height`, and `aspectRatio` values to preserve layout.

## Environment Variables

Use `.env.local` for real secrets. `.env.example` documents the keys.

Expected keys:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

Never expose the Supabase service role key or Cloudinary API secret to the browser.

## Migration Plan

1. Keep current prototype galleries visible.
2. Add Supabase client/server helpers.
3. Add Cloudinary upload endpoint for admin users.
4. Add database schema from `docs/gallery-schema.sql`.
5. Add admin gallery CRUD screens.
6. Build `getPublishedGalleryBySlug`.
7. Switch gallery pages to database data when a published row exists.
8. Fall back to prototype data while content is still being migrated.
9. Remove prototype fallback only after all production galleries are uploaded.

## Important Constraint

The public gallery design should remain visually close to the current prototype. The data source can change, but the front-end layout should not be rewritten unless the design itself changes.

