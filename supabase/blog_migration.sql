create table if not exists blog_posts (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  slug             text not null unique,
  excerpt          text,
  content          text not null,
  cover_image_url  text,
  is_published     boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists blog_posts_slug_idx       on blog_posts (slug);
create index if not exists blog_posts_published_idx  on blog_posts (is_published, created_at desc);
