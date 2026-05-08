
-- Roles
create type public.app_role as enum ('admin', 'teacher', 'student');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null default 'student',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Admins manage all roles" on public.user_roles for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  preferred_language text not null default 'English',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles readable by all authed" on public.profiles for select to authenticated using (true);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id);

-- Auto profile + role on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, preferred_language)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)), coalesce(new.raw_user_meta_data->>'preferred_language', 'English'));
  insert into public.user_roles (user_id, role) values (new.id, 'student');
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Chat sessions
create table public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'New chat',
  subject text,
  language text not null default 'English',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.chat_sessions enable row level security;
create policy "Own sessions all" on public.chat_sessions for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.chat_sessions(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamptz not null default now()
);
alter table public.chat_messages enable row level security;
create policy "Own messages all" on public.chat_messages for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Progress
create table public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  subject text not null,
  lessons_completed int not null default 0,
  xp int not null default 0,
  streak int not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, subject)
);
alter table public.progress enable row level security;
create policy "Own progress all" on public.progress for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Touch updated_at
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
create trigger sessions_touch before update on public.chat_sessions for each row execute function public.touch_updated_at();
create trigger progress_touch before update on public.progress for each row execute function public.touch_updated_at();
