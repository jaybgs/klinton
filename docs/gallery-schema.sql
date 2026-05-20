-- Supabase/Postgres schema draft for production galleries.
-- Keep this as a starting point; run it only after a Supabase project is selected.

create extension if not exists pgcrypto;

create table if not exists galleries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  couple_name text not null,
  location text not null,
  category text not null default 'wedding',
  status text not null default 'draft',
  cover_image_id uuid,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint galleries_category_check check (category in ('wedding', 'studio', 'editorial', 'family')),
  constraint galleries_status_check check (status in ('draft', 'published', 'archived'))
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references galleries(id) on delete cascade,
  src text not null,
  storage_provider text not null default 'cloudinary',
  storage_key text,
  width integer not null,
  height integer not null,
  aspect_ratio numeric not null,
  orientation text not null,
  alt text not null default '',
  caption text,
  sort_order integer not null default 0,
  focal_x numeric,
  focal_y numeric,
  dominant_color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint gallery_images_provider_check check (
    storage_provider in ('cloudinary', 'supabase', 'vercel-blob', 'external')
  ),
  constraint gallery_images_orientation_check check (orientation in ('portrait', 'landscape', 'square')),
  constraint gallery_images_dimensions_check check (width > 0 and height > 0),
  constraint gallery_images_focal_x_check check (focal_x is null or (focal_x >= 0 and focal_x <= 1)),
  constraint gallery_images_focal_y_check check (focal_y is null or (focal_y >= 0 and focal_y <= 1))
);

alter table galleries
  add constraint galleries_cover_image_id_fkey
  foreign key (cover_image_id)
  references gallery_images(id)
  on delete set null;

create index if not exists galleries_status_slug_idx on galleries(status, slug);
create index if not exists gallery_images_gallery_order_idx on gallery_images(gallery_id, sort_order);

alter table galleries enable row level security;
alter table gallery_images enable row level security;

create policy "Public can read published galleries"
  on galleries for select
  using (status = 'published');

create policy "Public can read images for published galleries"
  on gallery_images for select
  using (
    exists (
      select 1
      from galleries
      where galleries.id = gallery_images.gallery_id
        and galleries.status = 'published'
    )
  );

-- Admin write policies should be added after admin auth roles are finalized.

