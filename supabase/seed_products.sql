-- Test seed: 29 products across all categories
-- Run in Supabase SQL Editor

INSERT INTO products (name, category, brand, price, original_price, badge, image_url, storage_path, is_active) VALUES

-- MEN (6)
('Ray-Ban Classic Aviator', 'men', 'Ray Ban', 4500, 6000, 'sale', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/men-1.jpg', true),
('Tom Ford Square Frame', 'men', 'Tom Ford', 9500, null, 'premium', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80', 'seed/men-2.jpg', true),
('Hugo Boss Rectangular', 'men', 'Hugo Boss', 7200, 8500, 'sale', 'https://images.unsplash.com/photo-1490750967868-88df5691cc33?w=600&q=80', 'seed/men-3.jpg', true),
('Prada Classic Black', 'men', 'Prada', 11000, null, 'premium', 'https://images.unsplash.com/photo-1512153604039-c7e5ed305a40?w=600&q=80', 'seed/men-4.jpg', true),
('Gucci Round Frame', 'men', 'Gucci', 13500, null, 'premium', 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80', 'seed/men-5.jpg', true),
('Dior Geometric Frame', 'men', 'Dior', 8900, 10000, 'sale', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/men-6.jpg', true),

-- WOMEN (6)
('Dior Cat Eye Gold', 'women', 'Dior', 9500, null, 'premium', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', 'seed/women-1.jpg', true),
('Prada Butterfly Frame', 'women', 'Prada', 8500, 10000, 'sale', 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', 'seed/women-2.jpg', true),
('Gucci Oversized Round', 'women', 'Gucci', 12000, null, 'premium', 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80', 'seed/women-3.jpg', true),
('Tom Ford Cat Eye', 'women', 'Tom Ford', 11500, null, 'premium', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'seed/women-4.jpg', true),
('Cartier Thin Gold', 'women', 'Cartier', 15000, null, 'premium', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', 'seed/women-5.jpg', true),
('Ray-Ban Clubmaster', 'women', 'Ray Ban', 5500, 7000, 'sale', 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', 'seed/women-6.jpg', true),

-- KIDS (4)
('Kids Flexible Blue', 'kids', null, 1800, 2500, 'new', 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80', 'seed/kids-1.jpg', true),
('Kids Round Pink', 'kids', null, 1600, null, null, 'https://images.unsplash.com/photo-1490750967868-88df5691cc33?w=600&q=80', 'seed/kids-2.jpg', true),
('Kids Sport Red', 'kids', null, 2200, 2800, 'sale', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/kids-3.jpg', true),
('Kids Square Black', 'kids', null, 1500, null, 'new', 'https://images.unsplash.com/photo-1512153604039-c7e5ed305a40?w=600&q=80', 'seed/kids-4.jpg', true),

-- SUNGLASSES (7)
('Ray-Ban Wayfarer Black', 'sunglasses', 'Ray Ban', 6500, 8000, 'sale', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80', 'seed/sun-1.jpg', true),
('Tom Ford Pilot Gold', 'sunglasses', 'Tom Ford', 13000, null, 'premium', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', 'seed/sun-2.jpg', true),
('Louis Vuitton Shield', 'sunglasses', 'Louis Vuitton', 18000, null, 'premium', 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80', 'seed/sun-3.jpg', true),
('Oliver Peoples Polarized', 'sunglasses', 'Oliver Peoples', 9800, 11000, null, 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=600&q=80', 'seed/sun-4.jpg', true),
('Prada Sport Wrap', 'sunglasses', 'Prada', 14500, null, 'premium', 'https://images.unsplash.com/photo-1472413074923-48d9e2e7ddb5?w=600&q=80', 'seed/sun-5.jpg', true),
('Cartier Rimless Gold', 'sunglasses', 'Cartier', 22000, null, 'premium', 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80', 'seed/sun-6.jpg', true),
('Gucci Oversized Brown', 'sunglasses', 'Gucci', 16000, 18000, 'sale', 'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=600&q=80', 'seed/sun-7.jpg', true),

-- COMPUTER (3)
('Blue Light Blocker Pro', 'computer', null, 2500, 3200, 'new', 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80', 'seed/comp-1.jpg', true),
('Anti-Glare Office Frame', 'computer', null, 3200, null, null, 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80', 'seed/comp-2.jpg', true),
('Progressive Bifocal', 'computer', null, 4500, 5500, 'sale', 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80', 'seed/comp-3.jpg', true),

-- CONTACT LENSES (3)
('Bella Gray Contact Lenses', 'contact', 'Bella', 1200, null, 'new', 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=600&q=80', 'seed/contact-1.jpg', true),
('Bella Hazel Colored Lenses', 'contact', 'Bella', 1200, null, null, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', 'seed/contact-2.jpg', true),
('Acuvue Daily Disposable (30pk)', 'contact', 'Acuvue', 2800, 3200, 'sale', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80', 'seed/contact-3.jpg', true);
