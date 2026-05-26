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
