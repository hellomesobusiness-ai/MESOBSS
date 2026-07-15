# MESO | Business Growth Ecosystem

A full-stack web platform for MESO's business growth ecosystem, built with Next.js and Supabase.

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS v4
- **Backend**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Fonts**: Bodoni Moda, Geist, Material Symbols

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url> meso-website
cd meso-website
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Copy your project URL and API keys from **Project Settings > API**

### 3. Configure environment

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

```bash
npm run build
```

Or connect the GitHub repo to Vercel for automatic deployments.

Add the same environment variables in Vercel's project settings.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── services/
│   │   └── page.tsx      # Services catalog
│   ├── ecosystem/
│   │   └── page.tsx      # Ecosystem/command center
│   ├── admin/
│   │   ├── page.tsx      # Admin dashboard (server)
│   │   └── AdminClient.tsx # Admin dashboard (client)
│   └── api/
│       └── inquiry/
│           └── route.ts  # Inquiry submission API
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   └── supabase.ts       # Supabase client
└── types/
    └── index.ts          # TypeScript types
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main landing page with hero, bento grid, ecosystem showcase, pricing, testimonials, and inquiry form |
| `/services` | Services catalog with category filtering |
| `/ecosystem` | Ecosystem / command center overview |
| `/admin` | Admin dashboard (fetches data from Supabase) |
