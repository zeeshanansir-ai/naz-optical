create table if not exists chat_sessions (
  id           uuid primary key default gen_random_uuid(),
  visitor_name text not null,
  status       text not null default 'open', -- open | closed
  created_at   timestamptz not null default now()
);

create table if not exists chat_messages (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions(id) on delete cascade,
  sender     text not null, -- 'visitor' | 'admin'
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on chat_messages (session_id, created_at asc);

-- Enable realtime
alter publication supabase_realtime add table chat_messages;
alter publication supabase_realtime add table chat_sessions;
