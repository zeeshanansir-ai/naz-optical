-- Run this in Supabase SQL Editor to remove all seed/test products
DELETE FROM products WHERE storage_path LIKE 'seed/%';
