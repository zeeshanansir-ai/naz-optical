-- Naz Optical — Supabase Schema
-- Run this in Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists products (
  id             uuid primary key default uuid_generate_v4(),
  name           text not null,
  category       text not null check (category in ('men','women','kids','sunglasses','computer')),
  brand          text,
  price          numeric(10,2) not null,
  original_price numeric(10,2),
  badge          text check (badge in ('new','premium','sale')),
  image_url      text not null,
  storage_path   text not null default '',
  whatsapp_msg   text generated always as (
                   'I am interested in: ' || name || ' (Price: Rs. ' || price::text || ')'
                 ) stored,
  is_active      boolean default true,
  created_at     timestamptz default now()
);

-- Migration: run this if the table already exists
-- alter table products add column if not exists brand text;
-- alter table products add column if not exists original_price numeric(10,2);
-- alter table products add column if not exists badge text check (badge in ('new','premium','sale'));

alter table products enable row level security;

create policy "public_read_products"
  on products for select
  using (is_active = true);

create policy "admin_write_products"
  on products for all
  using (auth.role() = 'authenticated');

-- Storage: create bucket named "product-images" in Supabase Dashboard > Storage
-- Set it to Public
