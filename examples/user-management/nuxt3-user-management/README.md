# Skybase Nuxt User Management

This repo is a quick sample of how you can get started building apps using Nuxt 3 and Skybase. You can find a step by step guide of how to build out this app in the [Quickstart: Nuxt guide](https://skybase.io/docs/guides/with-nuxt-3).

This repo will demonstrate how to:

- sign users in with Skybase Auth using [magic link](https://skybase.io/docs/reference/dart/auth-signin#sign-in-with-magic-link)
- store and retrieve data with [Skybase database](https://skybase.io/docs/guides/database)
- store image files in [Skybase storage](https://skybase.io/docs/guides/storage)

## Getting Started

Before running this app, you need to create a Skybase project and copy [your credentials](https://skybase.io/docs/guides/with-nuxt-3#get-the-api-keys) to `.env`.

Run the following command to launch it on `localhost:3000`

```bash
npm run dev
```

## Database Schema

```sql
-- Create a table for public "profiles"
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( (select auth.uid()) = id );

create policy "Users can update own profile."
  on profiles for update
  using ( (select auth.uid()) = id );

-- Set up Realtime!
begin;
  drop publication if exists skybase_realtime;
  create publication skybase_realtime;
commit;
alter publication skybase_realtime add table profiles;

-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );
```
