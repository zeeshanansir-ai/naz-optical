create table if not exists faqs (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  sort_order integer not null default 0,
  is_active  boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists faqs_sort_idx on faqs (sort_order asc);

-- Seed existing FAQs
insert into faqs (question, answer, sort_order) values
('Where is Naz Optical Service located?',         'We have locations in Lahore (Township) and Shakargarh. You can find us on Google Maps or contact us on WhatsApp at 0300-4686170 or 0327-1830170 for directions.', 1),
('Do you offer eye tests and optometry services?', 'Yes! We provide professional eye care and optometry consultations at our store. Our experienced optometrists will test your vision and recommend the right prescription lenses for you.', 2),
('What brands do you carry?',                     'We stock premium designer brands including Dior, Ray Ban, Tom Ford, Prada, Gucci, Cartier, Oliver Peoples, Louis Vuitton, Hugo Boss, and many more. We also carry Bella contact lenses, Bausch & Lomb, Biomedics, and Acuvue.', 3),
('Do you offer prescription lenses?',              'Yes! We specialise in high-clarity, prescription-ready lenses including blue-blocking lenses, bifocals, progressive, anti-glare, and transition lenses. Contact us on WhatsApp with your prescription.', 4),
('Do you sell contact lenses?',                    'Yes, we stock Bella color contact lenses and other brands including powered options. Available in both transparent and colored varieties. Contact us on WhatsApp for availability.', 5),
('How can I order online?',                        'Browse our collection, click "Inquire on WhatsApp" on any product, and our team will assist you. We deliver across Pakistan. You can also follow us on Instagram @nazopticalservice or TikTok @nazopticalservice.pk.', 6),
('What is your exchange and return policy?',       'We offer exchange or return on products. Please contact us on WhatsApp within 7 days of receiving your order. Items must be unused and in original condition.', 7);
