-- Voxy Web Studio — Fullstack Upgrade Phase 1
-- Tabel `projects` (portofolio) + `leads` (prospek klien), RLS, dan storage bucket.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tabel: projects
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text not null,
  image_url   text,
  tech_stack  text[] not null default '{}',
  metrics     jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists projects_created_at_idx on public.projects (created_at desc);

-- ---------------------------------------------------------------------------
-- Tabel: leads
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  agency_name text,
  status      text not null default 'NEW'
                constraint leads_status_check check (status in ('NEW', 'CONTACTED', 'CLOSED')),
  created_at  timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.projects enable row level security;
alter table public.leads    enable row level security;

-- projects: dibaca publik, ditulis hanya oleh admin yang login.
drop policy if exists "projects_select_public" on public.projects;
create policy "projects_select_public"
  on public.projects for select
  to anon, authenticated
  using (true);

drop policy if exists "projects_insert_authenticated" on public.projects;
create policy "projects_insert_authenticated"
  on public.projects for insert
  to authenticated
  with check (true);

drop policy if exists "projects_update_authenticated" on public.projects;
create policy "projects_update_authenticated"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "projects_delete_authenticated" on public.projects;
create policy "projects_delete_authenticated"
  on public.projects for delete
  to authenticated
  using (true);

-- leads: publik hanya boleh INSERT (submit form), tidak boleh membaca daftar.
drop policy if exists "leads_insert_public" on public.leads;
create policy "leads_insert_public"
  on public.leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "leads_select_authenticated" on public.leads;
create policy "leads_select_authenticated"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "leads_update_authenticated" on public.leads;
create policy "leads_update_authenticated"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "leads_delete_authenticated" on public.leads;
create policy "leads_delete_authenticated"
  on public.leads for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- Storage: bucket `portfolio_images` (public read, admin write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio_images', 'portfolio_images', true)
on conflict (id) do update set public = true;

drop policy if exists "portfolio_images_read_public" on storage.objects;
create policy "portfolio_images_read_public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio_images');

drop policy if exists "portfolio_images_insert_authenticated" on storage.objects;
create policy "portfolio_images_insert_authenticated"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio_images');

drop policy if exists "portfolio_images_update_authenticated" on storage.objects;
create policy "portfolio_images_update_authenticated"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio_images')
  with check (bucket_id = 'portfolio_images');

drop policy if exists "portfolio_images_delete_authenticated" on storage.objects;
create policy "portfolio_images_delete_authenticated"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio_images');

-- ---------------------------------------------------------------------------
-- Explicit Grants (Fix for HTTP 401 on anon insert)
-- ---------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO anon, authenticated;
