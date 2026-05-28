# RamArts — Printing & Signage Solutions Website

A premium, conversion-focused business website built with HTML5, CSS3, and Vanilla JavaScript.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Full landing page with all PRD sections |
| About | `about.html` | Company story, mission, capabilities |
| Services | `services.html` | Detailed service descriptions |
| Portfolio | `portfolio.html` | Filterable gallery, before/after, video placeholders |
| Contact | `contact.html` | Contact form, map, business info |
| Quote | `quote.html` | Quote request form |

## Admin Panel (CMS)

Edit website content in real time with live preview:

1. Open **`admin.html`** in your browser (use a local server — see below)
2. Default password: **`ramarts2026`** (change it under Business & SEO after login)
3. Edit any section — changes save automatically
4. Click **Show Live Preview** when you want to see changes (optional panel, fullscreen, or new tab)
5. **Export** JSON to back up content; **Import** to restore on another device

> Content is stored in your browser's **localStorage**. For production, export JSON and deploy with your site, or migrate to a backend later.

### Cross-device live sync (Vercel + Supabase free)

If you want edits/images from `admin.html` to appear on any device without redeploy:

1. Create a Supabase project (free).
2. In Supabase SQL Editor, run:

```sql
create table if not exists site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

create policy "public read site content"
on site_content for select
to anon
using (true);

create policy "public upsert site content"
on site_content for insert
to anon
with check (id = 'ramarts');

create policy "public update site content"
on site_content for update
to anon
using (id = 'ramarts')
with check (id = 'ramarts');
```

3. Open `js/site-content.js` and set:
   - `enabled: true`
   - `url: 'https://YOUR_PROJECT.supabase.co'`
   - `anonKey: 'YOUR_SUPABASE_ANON_KEY'`
   - `storageBucket: 'ramarts-images'`
4. Deploy to Vercel again (`git push`).

Now CMS edits save to cloud and load on all devices.

#### Required for global image uploads

Create a public storage bucket and upload policies (SQL Editor):

```sql
insert into storage.buckets (id, name, public)
values ('ramarts-images', 'ramarts-images', true);

create policy "public read ramarts images"
on storage.objects for select
to anon
using (bucket_id = 'ramarts-images');

create policy "anon upload ramarts images"
on storage.objects for insert
to anon
with check (bucket_id = 'ramarts-images');

create policy "anon update ramarts images"
on storage.objects for update
to anon
using (bucket_id = 'ramarts-images')
with check (bucket_id = 'ramarts-images');
```

If a policy already exists, Supabase may show an "already exists" error — that's fine.

### Images not showing?

Browsers **cannot** load paths from your PC (e.g. `C:\Users\...\photo.jpg`). Use one of these:

1. **Upload** — In admin, click **Upload** next to the image field (best for quick tests)
2. **Project folder** — Copy file to `assets/images/` and enter `assets/images/yourfile.jpg`
3. **Web URL** — Paste a full link: `https://example.com/photo.jpg`

Run the site with `npx serve .` (not double-clicking HTML files) so relative paths work.

## Quick Start

1. Open `index.html` in your browser, or use a local server:
   ```bash
   npx serve .
   ```
2. Update contact details in all HTML files and `js/form.js` (`WHATSAPP_NUMBER`).

## Customize Before Launch

- **Phone / WhatsApp**: Replace `919876543210` across all files and in `js/form.js`
- **Email**: Replace `info@ramarts.com`
- **Address**: Update footer and contact page
- **Google Maps**: Replace iframe `src` with your business embed URL
- **Images**: Add real project photos to `assets/images/` and update `src` attributes
- **Social links**: Update footer social media URLs
- **Schema markup**: Update `index.html` LocalBusiness JSON-LD with real address

## Tech Stack

- HTML5, CSS3 (Variables, Flexbox, Grid)
- Vanilla JavaScript
- [AOS](https://michalsnik.github.io/aos/) — scroll animations
- [Font Awesome](https://fontawesome.com/) — icons
- [Google Fonts](https://fonts.google.com/) — Montserrat, Poppins, Inter

## Folder Structure

```
project/
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── contact.html
├── quote.html
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── slider.js
│   └── form.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
└── fonts/
```

## Features

- Dark premium UI with electric blue accent
- Floating WhatsApp button + mobile sticky call bar
- Portfolio lightbox with keyboard navigation
- Category filters on portfolio page
- Animated counters (Why Choose Us)
- Testimonials auto-slider
- FAQ accordion
- Forms submit to WhatsApp
- SEO meta tags + LocalBusiness schema
- Fully responsive (mobile-first)
