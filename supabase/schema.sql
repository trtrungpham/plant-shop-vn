-- PlantShop database schema (run this in Supabase SQL editor)

-- 1. Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  icon text,
  created_at timestamptz default now()
);

-- 2. Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  shop text not null,
  description text,
  price numeric not null,
  original_price numeric,
  category_slug text references public.categories(slug),
  images text[] default '{}',
  tags text[] default '{}',
  rating numeric default 5.0,
  reviews int default 0,
  sold int default 0,
  flash_sale boolean default false,
  freeship boolean default false,
  origin text,
  material text,
  decor_type text,
  stock int default 100,
  created_at timestamptz default now()
);

-- 3. Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  total numeric not null,
  discount numeric default 0,
  shipping numeric default 0,
  status text default 'pending',
  customer_name text,
  customer_phone text,
  shipping_address text,
  note text,
  created_at timestamptz default now()
);

-- 4. Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  product_image text,
  price numeric not null,
  quantity int not null default 1
);

-- 5. Carts (per user)
create table if not exists public.carts (
  user_id uuid primary key references auth.users on delete cascade,
  items jsonb default '[]',
  updated_at timestamptz default now()
);

-- RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.carts enable row level security;

-- Public read for catalog
create policy "Public read categories" on public.categories for select using (true);
create policy "Public read products" on public.products for select using (true);

-- Orders belong to their user
create policy "Own orders select" on public.orders for select using (auth.uid() = user_id);
create policy "Own orders insert" on public.orders for insert with check (auth.uid() = user_id);

create policy "Own order_items select" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
);
create policy "Own order_items insert" on public.order_items for insert with check (
  exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
);

-- Carts belong to their user
create policy "Own cart select" on public.carts for select using (auth.uid() = user_id);
create policy "Own cart upsert" on public.carts for insert with check (auth.uid() = user_id);
create policy "Own cart update" on public.carts for update using (auth.uid() = user_id);
