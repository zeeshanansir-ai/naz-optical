-- Expanded seed: 60 products across all 6 categories
-- Run in Supabase SQL Editor
-- Safe to re-run: deletes seed rows first

DELETE FROM products WHERE storage_path LIKE 'seed/%';

INSERT INTO products (name, category, brand, price, original_price, badge, image_url, storage_path, is_active) VALUES

-- ─── MEN GLASSES (10) ───────────────────────────────────────────────────────
('Ray-Ban Classic Aviator',    'men', 'Ray Ban',   4500, 6000,  'sale',    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/men-1.jpg',  true),
('Tom Ford Square Frame',      'men', 'Tom Ford',  9500, null,  'premium', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80', 'seed/men-2.jpg',  true),
('Hugo Boss Rectangular',      'men', 'Hugo Boss', 7200, 8500,  'sale',    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', 'seed/men-3.jpg',  true),
('Prada Classic Black',        'men', 'Prada',    11000, null,  'premium', 'https://images.unsplash.com/photo-1512153604039-c7e5ed305a40?w=600&q=80', 'seed/men-4.jpg',  true),
('Gucci Round Frame',          'men', 'Gucci',    13500, null,  'premium', 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80', 'seed/men-5.jpg',  true),
('Dior Geometric Frame',       'men', 'Dior',      8900, 10000, 'sale',    'https://images.unsplash.com/photo-1577744486770-020ab432da65?w=600&q=80', 'seed/men-6.jpg',  true),
('Cartier Gold Rectangle',     'men', 'Cartier',  16000, null,  'premium', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', 'seed/men-7.jpg',  true),
('Oliver Peoples Classic',     'men', 'Oliver Peoples', 8200, 9500, null,  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'seed/men-8.jpg',  true),
('Versace Bold Frame',         'men', 'Versace',  12000, 14000, 'sale',    'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', 'seed/men-9.jpg',  true),
('Silhouette Rimless',         'men', null,        6500, null,  'new',     'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=600&q=80', 'seed/men-10.jpg', true),

-- ─── WOMEN GLASSES (10) ─────────────────────────────────────────────────────
('Dior Cat Eye Gold',          'women', 'Dior',     9500,  null,  'premium', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', 'seed/women-1.jpg',  true),
('Prada Butterfly Frame',      'women', 'Prada',    8500, 10000, 'sale',    'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', 'seed/women-2.jpg',  true),
('Gucci Oversized Round',      'women', 'Gucci',   12000,  null,  'premium', 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80', 'seed/women-3.jpg',  true),
('Tom Ford Cat Eye',           'women', 'Tom Ford', 11500,  null,  'premium', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'seed/women-4.jpg',  true),
('Cartier Thin Gold',          'women', 'Cartier', 15000,  null,  'premium', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', 'seed/women-5.jpg',  true),
('Ray-Ban Clubmaster',         'women', 'Ray Ban',  5500,  7000, 'sale',    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', 'seed/women-6.jpg',  true),
('Versace Cat Eye Pink',       'women', 'Versace', 10500,  null,  'new',     'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', 'seed/women-7.jpg',  true),
('Chloe Round Tortoise',       'women', 'Chloe',    7800,  9000, 'sale',    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/women-8.jpg',  true),
('Fendi Oval Transparent',     'women', 'Fendi',    9200,  null,  'new',     'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80', 'seed/women-9.jpg',  true),
('Michael Kors Rose Gold',     'women', 'Michael Kors', 6200, 7500, 'sale', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80', 'seed/women-10.jpg', true),

-- ─── KIDS GLASSES (8) ───────────────────────────────────────────────────────
('Kids Flexible Blue',         'kids', null, 1800, 2500, 'new',  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', 'seed/kids-1.jpg', true),
('Kids Round Pink',            'kids', null, 1600,  null,  null,   'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80', 'seed/kids-2.jpg', true),
('Kids Sport Red',             'kids', null, 2200, 2800, 'sale', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80', 'seed/kids-3.jpg', true),
('Kids Square Black',          'kids', null, 1500,  null,  'new',  'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80', 'seed/kids-4.jpg', true),
('Kids Oval Purple',           'kids', null, 1900, 2400, 'sale', 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', 'seed/kids-5.jpg', true),
('Kids Titanium Lightweight',  'kids', null, 2500,  null,  'new',  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80', 'seed/kids-6.jpg', true),
('Kids Heart Frame Pink',      'kids', null, 1400, 1800, 'sale', 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&q=80', 'seed/kids-7.jpg', true),
('Kids Anti-Scratch Blue',     'kids', null, 2100,  null,  null,   'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80', 'seed/kids-8.jpg', true),

-- ─── SUNGLASSES (12) ────────────────────────────────────────────────────────
('Ray-Ban Wayfarer Black',      'sunglasses', 'Ray Ban',        6500,  8000, 'sale',    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', 'seed/sun-1.jpg',  true),
('Tom Ford Pilot Gold',         'sunglasses', 'Tom Ford',      13000,  null,  'premium', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'seed/sun-2.jpg',  true),
('Louis Vuitton Shield',        'sunglasses', 'Louis Vuitton', 18000,  null,  'premium', 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80', 'seed/sun-3.jpg',  true),
('Oliver Peoples Polarized',    'sunglasses', 'Oliver Peoples', 9800, 11000,  null,      'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80', 'seed/sun-4.jpg',  true),
('Prada Sport Wrap',            'sunglasses', 'Prada',         14500,  null,  'premium', 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', 'seed/sun-5.jpg',  true),
('Cartier Rimless Gold',        'sunglasses', 'Cartier',       22000,  null,  'premium', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', 'seed/sun-6.jpg',  true),
('Gucci Oversized Brown',       'sunglasses', 'Gucci',         16000, 18000, 'sale',    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/sun-7.jpg',  true),
('Ray-Ban Aviator Green',       'sunglasses', 'Ray Ban',        7500,  9000, 'sale',    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', 'seed/sun-8.jpg',  true),
('Dior So Real',                'sunglasses', 'Dior',          17500,  null,  'premium', 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?w=600&q=80', 'seed/sun-9.jpg',  true),
('Versace Medusa',              'sunglasses', 'Versace',       15000, 17000, 'sale',    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', 'seed/sun-10.jpg', true),
('Oakley Sport Black',          'sunglasses', 'Oakley',         8500,  null,  'new',     'https://images.unsplash.com/photo-1577744486770-020ab432da65?w=600&q=80', 'seed/sun-11.jpg', true),
('Maui Jim Polarized Blue',     'sunglasses', 'Maui Jim',      11000, 13000, 'sale',    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', 'seed/sun-12.jpg', true),

-- ─── COMPUTER GLASSES (8) ───────────────────────────────────────────────────
('Blue Light Blocker Pro',       'computer', null,          2500, 3200, 'new',  'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80', 'seed/comp-1.jpg', true),
('Anti-Glare Office Frame',      'computer', null,          3200,  null,  null,   'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80', 'seed/comp-2.jpg', true),
('Progressive Bifocal',          'computer', null,          4500, 5500, 'sale', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/comp-3.jpg', true),
('UV400 Screen Shield',          'computer', null,          2800,  null,  'new',  'https://images.unsplash.com/photo-1512153604039-c7e5ed305a40?w=600&q=80', 'seed/comp-4.jpg', true),
('Anti-Fatigue Reading Glass',   'computer', null,          3500, 4200, 'sale', 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80', 'seed/comp-5.jpg', true),
('Transition Photochromic',      'computer', null,          5500, 6500, 'sale', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', 'seed/comp-6.jpg', true),
('Half-Rim Blue Blocker',        'computer', null,          2200,  null,  'new',  'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80', 'seed/comp-7.jpg', true),
('Featherlight Reading Frame',   'computer', null,          3800, 4500, 'sale', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'seed/comp-8.jpg', true),

-- ─── CONTACT LENSES (8) ─────────────────────────────────────────────────────
('Bella Gray Contact Lenses',         'contact', 'Bella',   1200,  null,  'new',  'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80', 'seed/contact-1.jpg', true),
('Bella Hazel Colored Lenses',        'contact', 'Bella',   1200,  null,  null,   'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', 'seed/contact-2.jpg', true),
('Acuvue Daily Disposable (30pk)',    'contact', 'Acuvue',  2800, 3200, 'sale', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', 'seed/contact-3.jpg', true),
('Bella Blue Colored Lenses',         'contact', 'Bella',   1200,  null,  'new',  'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80', 'seed/contact-4.jpg', true),
('Bella Green Colored Lenses',        'contact', 'Bella',   1200,  null,  null,   'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', 'seed/contact-5.jpg', true),
('Bausch & Lomb Ultra (6pk)',         'contact', 'Bausch & Lomb', 3500, 4200, 'sale', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', 'seed/contact-6.jpg', true),
('Biomedics 55 Monthly (6pk)',        'contact', 'Biomedics', 2200, null, null,   'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80', 'seed/contact-7.jpg', true),
('Acuvue Oasys (12pk)',               'contact', 'Acuvue',  4500, 5200, 'sale', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', 'seed/contact-8.jpg', true);
