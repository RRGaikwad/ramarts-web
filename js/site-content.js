/**
 * RamArts CMS — Default site content & storage
 */
const RAMARTS_CMS_KEY = 'ramarts_site_content';
const RAMARTS_CMS_AUTH_KEY = 'ramarts_cms_auth';

const RAMARTS_DEFAULT_CONTENT = {
  brand: {
    name: 'Ram',
    accent: 'Arts',
  },
  business: {
    phone: '919876543210',
    phoneDisplay: '+91 98765 43210',
    email: 'info@ramarts.com',
    address: 'Your Business Address, City',
    hours: 'Mon–Sat: 9:00 AM – 8:00 PM',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.966!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sin!4v1',
  },
  seo: {
    title: 'RamArts — Premium Printing & Signage Solutions',
    description:
      'RamArts — Premium flex printing, LED sign boards, acrylic works, wedding printings, car wrapping & branding solutions. Fast delivery & professional finishing.',
    keywords:
      'flex printing near me, LED sign board manufacturer, acrylic laser cutting, car wrapping services, wedding printing, shop board manufacturer, vinyl printing',
  },
  offerBanner: {
    text: 'Free Design Consultation',
    linkText: 'Request your quote today',
  },
  hero: {
    headlineHtml:
      'Premium Printing & Signage Solutions For <span class="highlight">Businesses, Events & Vehicles</span>',
    subtitle:
      'High-quality flex printing, LED sign boards, acrylic works, wedding printings, car wrapping and branding solutions with fast delivery and professional finishing.',
    ctaQuote: 'Get Free Quote',
    ctaWhatsapp: 'WhatsApp Us',
    trust: ['1000+ Projects', 'Fast Delivery', 'Premium Quality'],
    images: [
      {
        src: 'https://images.unsplash.com/photo-1565688534245-775059ac429c?w=600&q=80',
        alt: 'LED sign board installation',
        class: 'item-1',
      },
      {
        src: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80',
        alt: 'Shop board signage',
        class: 'item-2',
      },
      {
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
        alt: 'Wedding printing decor',
        class: 'item-3',
      },
      {
        src: 'https://images.unsplash.com/photo-1619405399517-d7fde0f02c42?w=400&q=80',
        alt: 'Car wrapping service',
        class: 'item-4',
      },
      {
        src: 'https://images.unsplash.com/photo-1581094794329-cd8118869f3d?w=600&q=80',
        alt: 'Acrylic laser cutting',
        class: 'item-5',
      },
    ],
  },
  trustBar: [
    'Trusted by 500+ Businesses',
    'Fast Delivery Promise',
    'Premium Materials',
    'Expert Support',
  ],
  sections: {
    services: {
      label: 'Our Services',
      title: 'Complete Printing & Branding Solutions',
      desc: 'From shop boards to vehicle wraps — we deliver high-impact visuals for every business need.',
    },
    portfolio: {
      label: 'Our Work',
      title: 'Featured Portfolio',
      desc: 'Real projects that showcase our quality, creativity, and professional finishing.',
    },
    whyUs: {
      label: 'Why RamArts',
      title: 'Why Choose Us',
      desc: 'We combine premium materials, modern machinery, and experienced craftsmanship.',
    },
    industries: {
      label: 'Industries',
      title: 'Industries We Serve',
      desc: 'Trusted by businesses across retail, hospitality, events, and more.',
    },
    process: {
      label: 'How It Works',
      title: 'Our Simple Process',
      desc: 'From requirement to installation — a smooth, professional workflow.',
    },
    testimonials: {
      label: 'Testimonials',
      title: 'What Our Clients Say',
    },
    faq: {
      label: 'FAQ',
      title: 'Frequently Asked Questions',
    },
  },
  services: [
    {
      title: 'Flex & Banner Printing',
      desc: 'High-resolution flex banners for shops, events, and outdoor advertising.',
      image: 'https://images.unsplash.com/photo-1565688534245-775059ac429c?w=500&q=80',
    },
    {
      title: 'Vinyl Printing',
      desc: 'Durable vinyl prints for branding, signage, and promotional displays.',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80',
    },
    {
      title: 'LED Sign Boards',
      desc: 'Eye-catching LED boards that make your business visible day and night.',
      image: 'https://images.unsplash.com/photo-1565688534245-775059ac429c?w=500&q=80',
    },
    {
      title: 'Acrylic Laser Cutting',
      desc: 'Precision-cut acrylic letters and logos for premium brand presentation.',
      image: 'https://images.unsplash.com/photo-1581094794329-cd8118869f3d?w=500&q=80',
    },
    {
      title: 'Wedding Printing',
      desc: 'Welcome boards, backdrops, frames, and custom wedding decor prints.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
    },
    {
      title: 'Car Wrapping',
      desc: 'Full and partial vehicle wraps with premium vinyl and expert installation.',
      image: 'https://images.unsplash.com/photo-1619405399517-d7fde0f02c42?w=500&q=80',
    },
    {
      title: 'UV Backlite Frames',
      desc: 'Illuminated backlit frames for stunning indoor and outdoor displays.',
      image: 'https://images.unsplash.com/photo-1565688534245-775059ac429c?w=500&q=80',
    },
    {
      title: 'Vinyl Stickers',
      desc: 'Custom die-cut stickers for products, vehicles, and promotional use.',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80',
    },
    {
      title: 'Radium Stickers',
      desc: 'Glow-in-the-dark radium stickers for safety and visibility applications.',
      image: 'https://images.unsplash.com/photo-1581094794329-cd8118869f3d?w=500&q=80',
    },
    {
      title: 'Personalized Frames',
      desc: 'Custom photo frames and gift prints for events and personal branding.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80',
    },
  ],
  counters: {
    projects: 1000,
    clients: 500,
    years: 5,
    labels: ['Projects Completed', 'Happy Clients', 'Years Experience'],
  },
  testimonials: [
    {
      text: '"Excellent quality sign board and very fast installation. Our shop visibility improved dramatically within a week."',
      name: 'Rajesh Kumar',
      role: 'Retail Shop Owner',
      avatar: 'https://i.pravatar.cc/96?img=12',
    },
    {
      text: '"RamArts handled our entire wedding printing — welcome boards, backdrops, everything was perfect. Highly recommended!"',
      name: 'Priya Sharma',
      role: 'Event Client',
      avatar: 'https://i.pravatar.cc/96?img=5',
    },
    {
      text: '"Professional car wrap with attention to detail. The before/after transformation was incredible. Great team!"',
      name: 'Amit Patel',
      role: 'Vehicle Owner',
      avatar: 'https://i.pravatar.cc/96?img=33',
    },
  ],
  faq: [
    {
      q: 'How long does printing take?',
      a: 'Standard orders typically take 2–5 business days. Rush orders and bulk projects may vary — contact us for an exact timeline based on your requirements.',
    },
    {
      q: 'Do you provide installation?',
      a: 'Yes! We offer professional installation for sign boards, LED displays, acrylic letters, and vehicle wraps at your location.',
    },
    {
      q: 'Do you accept bulk orders?',
      a: 'Absolutely. We handle bulk printing for events, agencies, and corporate clients with special pricing and fast turnaround.',
    },
    {
      q: 'Can I customize designs?',
      a: "Yes! We offer free design consultation and custom design support. Share your ideas or upload your artwork — we'll bring it to life.",
    },
    {
      q: 'Do you provide vehicle wrapping at home?',
      a: 'We can arrange on-site vehicle wrapping at your preferred location within our service area. Contact us to check availability in your area.',
    },
  ],
  cta: {
    title: 'Ready To Upgrade Your Brand Visibility?',
    subtitle:
      'Get a free quote today and let our experts transform your branding vision into reality.',
    btnQuote: 'Get Instant Quote',
    btnWhatsapp: 'Contact on WhatsApp',
  },
  footer: {
    tagline:
      'Premium printing & signage solutions for businesses, events, and vehicles. Trusted quality, fast delivery.',
    copyright: '© 2026 RamArts. All rights reserved. | Premium Printing & Signage Solutions',
  },
  inquiryPopup: {
    title: 'Free Design Consultation',
    text: 'Get expert advice on your next printing or signage project — no obligation!',
    btn: 'Request Quote',
  },
  about: {
    pageTitle: 'About RamArts',
    storyTitle: 'Our Story',
    storyP1:
      'RamArts was founded with a simple mission: to help businesses stand out through premium printing and signage solutions. What started as a small flex printing shop has grown into a full-service branding and manufacturing partner trusted by hundreds of local businesses, event planners, and vehicle owners.',
    storyP2:
      "We believe your brand visibility is your biggest asset. That's why we invest in modern machinery, skilled craftsmen, and premium materials — delivering results that don't just look good, but drive real business growth.",
    mission: 'To deliver high-impact printing and signage that transforms brand visibility for every client we serve.',
    vision: 'To become the most trusted printing & signage partner for businesses, events, and vehicles in our region.',
    values: 'Quality, speed, transparency, and customer satisfaction guide every project we undertake.',
  },
  admin: {
    password: 'ramarts2026',
  },
};

function deepMerge(target, source) {
  const out = { ...target };
  if (!source || typeof source !== 'object') return out;
  Object.keys(source).forEach((key) => {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      out[key] = deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      out[key] = source[key];
    }
  });
  return out;
}

function getStoredContent() {
  try {
    const raw = localStorage.getItem(RAMARTS_CMS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getContent() {
  const stored = getStoredContent();
  return deepMerge(RAMARTS_DEFAULT_CONTENT, stored || {});
}

function saveContent(content) {
  localStorage.setItem(RAMARTS_CMS_KEY, JSON.stringify(content));
  window.dispatchEvent(new CustomEvent('ramarts-cms-update', { detail: content }));
}

function resetContent() {
  localStorage.removeItem(RAMARTS_CMS_KEY);
  window.dispatchEvent(new CustomEvent('ramarts-cms-update', { detail: getContent() }));
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, part) => (acc != null ? acc[part] : undefined), obj);
}

function setByPath(obj, path, value) {
  const parts = path.split('.');
  let target = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const next = parts[i + 1];
    if (/^\d+$/.test(next)) {
      if (!Array.isArray(target[key])) target[key] = [];
    } else if (target[key] == null || typeof target[key] !== 'object') {
      target[key] = {};
    }
    target = target[key];
  }
  target[parts[parts.length - 1]] = value;
}

/** SVG placeholder when image fails or path is invalid */
const IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%2316161a' width='400' height='300'/%3E%3Ctext fill='%2371717a' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage not found%3C/text%3E%3C/svg%3E";

/**
 * Normalize image paths for browser use.
 * - https://... and data:... work as-is
 * - assets/images/photo.jpg works (relative to site root)
 * - C:\\Users\\... and file:// do NOT work in browsers
 */
function normalizeImageUrl(url) {
  if (url == null || url === '') return '';

  let path = String(url).trim().replace(/\\/g, '/');

  if (/^data:image\//i.test(path)) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('//')) return `https:${path}`;

  if (/^file:/i.test(path) || /^[a-zA-Z]:\//.test(path)) {
    console.warn(
      '[RamArts CMS] Local disk paths cannot be used in the browser. Upload the image in admin or place it in assets/images/'
    );
    return '';
  }

  path = path.replace(/^\.\//, '');
  if (!path.startsWith('/') && !path.startsWith('assets/')) {
    path = `assets/images/${path}`;
  }
  if (path.startsWith('/') && !path.startsWith('//')) {
    path = path.slice(1);
  }

  return path;
}

function resolveImageUrl(url) {
  const normalized = normalizeImageUrl(url);
  return normalized || IMAGE_PLACEHOLDER;
}

window.RamArtsCMS = {
  KEY: RAMARTS_CMS_KEY,
  AUTH_KEY: RAMARTS_CMS_AUTH_KEY,
  DEFAULT: RAMARTS_DEFAULT_CONTENT,
  IMAGE_PLACEHOLDER,
  getContent,
  saveContent,
  resetContent,
  getByPath,
  setByPath,
  deepMerge,
  normalizeImageUrl,
  resolveImageUrl,
};
