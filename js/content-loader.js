/**
 * RamArts CMS — Apply content to all pages
 */
(function () {
  function applyContent(content) {
    if (!content) content = window.RamArtsCMS.getContent();

    applyMeta(content);
    applyBindings(content);
    applyBusinessLinks(content);
    applyOfferBanner(content);
    applyHero(content);
    applyTrustBar(content);
    applySectionHeaders(content);
    renderServices(content);
    renderTestimonials(content);
    renderFaq(content);
    applyCounters(content);
    applyCta(content);
    applyFooter(content);
    applyInquiryPopup(content);
    applyAbout(content);
    applyBrand(content);

    window.dispatchEvent(new CustomEvent('cms:applied', { detail: content }));
  }

  function applyMeta(content) {
    if (content.seo?.title) document.title = content.seo.title;
    setMeta('description', content.seo?.description);
    setMeta('keywords', content.seo?.keywords);

    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema && content.business) {
      try {
        const data = JSON.parse(schema.textContent);
        data.name = `${content.brand?.name || 'Ram'}${content.brand?.accent || 'Arts'}`;
        data.telephone = content.business.phoneDisplay || content.business.phone;
        data.description = content.seo?.description || data.description;
        schema.textContent = JSON.stringify(data, null, 2);
      } catch {
        /* ignore */
      }
    }
  }

  function setMeta(name, value) {
    if (!value) return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (el) el.setAttribute('content', value);
  }

  function applyBindings(content) {
    document.querySelectorAll('[data-cms]').forEach((el) => {
      const val = window.RamArtsCMS.getByPath(content, el.dataset.cms);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-cms-html]').forEach((el) => {
      const val = window.RamArtsCMS.getByPath(content, el.dataset.cmsHtml);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-cms-src]').forEach((el) => {
      const val = window.RamArtsCMS.getByPath(content, el.dataset.cmsSrc);
      if (val) setImageSrc(el, val);
    });
  }

  function setImageSrc(img, url) {
    const resolved = window.RamArtsCMS.resolveImageUrl(url);
    img.src = resolved;
    img.onerror = () => {
      img.onerror = null;
      img.src = window.RamArtsCMS.IMAGE_PLACEHOLDER;
    };
  }

  function applyBusinessLinks(content) {
    const phone = content.business?.phone || '';
    const display = content.business?.phoneDisplay || phone;
    const email = content.business?.email || '';

    document.querySelectorAll('[data-cms-phone]').forEach((el) => {
      el.textContent = display;
      if (el.tagName === 'A') el.href = `tel:+${phone.replace(/\D/g, '')}`;
    });

    document.querySelectorAll('[data-cms-email]').forEach((el) => {
      el.textContent = email;
      if (el.tagName === 'A') el.href = `mailto:${email}`;
    });

    document.querySelectorAll('[data-cms-address]').forEach((el) => {
      el.textContent = content.business?.address || '';
    });

    document.querySelectorAll('[data-cms-hours]').forEach((el) => {
      el.textContent = content.business?.hours || '';
    });

    document.querySelectorAll('a[href*="wa.me"], [data-cms-whatsapp]').forEach((el) => {
      if (phone) el.href = `https://wa.me/${phone.replace(/\D/g, '')}`;
    });

    document.querySelectorAll('[data-cms-tel]').forEach((el) => {
      el.href = `tel:+${phone.replace(/\D/g, '')}`;
    });

    document.querySelectorAll('.sticky-call a, [data-cms-call-text]').forEach((el) => {
      if (el.matches('[data-cms-call-text]') || el.closest('.sticky-call')) {
        const icon = el.querySelector('i');
        el.innerHTML = icon ? `${icon.outerHTML} Call Now — ${display}` : `Call Now — ${display}`;
      }
    });

    document.querySelectorAll('iframe[data-cms-map], .footer-map iframe, .contact-map iframe').forEach((el) => {
      if (content.business?.mapEmbed) el.src = content.business.mapEmbed;
    });
  }

  function applyOfferBanner(content) {
    const banner = document.querySelector('.offer-banner');
    if (!banner || !content.offerBanner) return;
    banner.innerHTML = `<strong>${content.offerBanner.text}</strong> — <a href="quote.html">${content.offerBanner.linkText}</a>`;
  }

  function applyHero(content) {
    const h = content.hero;
    if (!h) return;

    const h1 = document.querySelector('.hero-content h1');
    if (h1 && h.headlineHtml) h1.innerHTML = h.headlineHtml;

    const sub = document.querySelector('.hero-subtitle');
    if (sub && h.subtitle) sub.textContent = h.subtitle;

    const quoteBtn = document.querySelector('.hero-cta .btn-primary');
    if (quoteBtn && h.ctaQuote) {
      const icon = quoteBtn.querySelector('i');
      quoteBtn.innerHTML = icon ? `${icon.outerHTML} ${h.ctaQuote}` : h.ctaQuote;
    }

    const waBtn = document.querySelector('.hero-cta .btn-whatsapp');
    if (waBtn && h.ctaWhatsapp) {
      const icon = waBtn.querySelector('i');
      waBtn.innerHTML = icon ? `${icon.outerHTML} ${h.ctaWhatsapp}` : h.ctaWhatsapp;
    }

    const trustItems = document.querySelectorAll('.hero-trust-item');
    h.trust?.forEach((text, i) => {
      if (trustItems[i]) {
        trustItems[i].innerHTML = `<i class="fas fa-check-circle"></i> ${text}`;
      }
    });

    const collage = document.querySelector('.hero-collage');
    if (collage && h.images?.length) {
      collage.innerHTML = h.images
        .map((img) => {
          const src = window.RamArtsCMS.resolveImageUrl(img.src);
          return `<img class="${img.class || ''}" src="${escapeAttr(src)}" alt="${escapeAttr(img.alt || '')}" loading="lazy">`;
        })
        .join('');
      collage.querySelectorAll('img').forEach((imgEl) => {
        imgEl.onerror = () => {
          imgEl.onerror = null;
          imgEl.src = window.RamArtsCMS.IMAGE_PLACEHOLDER;
        };
      });
    }
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  function applyTrustBar(content) {
    const items = document.querySelectorAll('.trust-bar-item');
    content.trustBar?.forEach((text, i) => {
      if (!items[i]) return;
      const icons = ['shield-alt', 'truck', 'award', 'headset'];
      items[i].innerHTML = `<i class="fas fa-${icons[i] || 'check'}"></i> ${text}`;
    });
  }

  function applySectionHeaders(content) {
    const map = {
      services: '#services .section-header',
      portfolio: '#portfolio .section-header',
      whyUs: '#why-us .section-header',
      industries: '#industries .section-header',
      process: '#process .section-header',
      testimonials: '#testimonials .section-header',
      faq: '#faq .section-header',
    };

    Object.entries(map).forEach(([key, selector]) => {
      const sec = content.sections?.[key];
      const header = document.querySelector(selector);
      if (!header || !sec) return;
      const label = header.querySelector('.section-label');
      const title = header.querySelector('.section-title');
      const desc = header.querySelector('.section-desc');
      if (label && sec.label) label.textContent = sec.label;
      if (title && sec.title) title.textContent = sec.title;
      if (desc && sec.desc) desc.textContent = sec.desc;
    });
  }

  function renderServices(content) {
    const grid = document.getElementById('cms-services-grid') || document.querySelector('#services .services-grid');
    if (!grid || !content.services?.length) return;

    grid.innerHTML = content.services
      .map(
        (s, i) => `
      <article class="service-card" data-aos="fade-up" ${i ? `data-aos-delay="${i * 50}"` : ''}>
        <div class="service-card-image"><img src="${escapeAttr(window.RamArtsCMS.resolveImageUrl(s.image))}" alt="${escapeAttr(s.title)}"></div>
        <div class="service-card-body">
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <a href="quote.html" class="btn btn-outline btn-sm">Get Quote</a>
        </div>
      </article>`
      )
      .join('');

    grid.querySelectorAll('.service-card-image img').forEach((imgEl) => {
      imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.src = window.RamArtsCMS.IMAGE_PLACEHOLDER;
      };
    });
  }

  function renderTestimonials(content) {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider || !content.testimonials?.length) return;

    const dots = slider.querySelector('.slider-dots');
    const cardsHtml = content.testimonials
      .map(
        (t) => `
      <div class="testimonial-card">
        <div class="testimonial-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p class="testimonial-text">${t.text}</p>
        <div class="testimonial-author">
          <img class="testimonial-avatar" src="${escapeAttr(window.RamArtsCMS.resolveImageUrl(t.avatar))}" alt="${escapeAttr(t.name)}">
          <div><h5>${t.name}</h5><span>${t.role}</span></div>
        </div>
      </div>`
      )
      .join('');

    slider.innerHTML = cardsHtml + (dots ? '<div class="slider-dots"></div>' : '<div class="slider-dots"></div>');
  }

  function renderFaq(content) {
    const list = document.querySelector('.faq-list');
    if (!list || !content.faq?.length) return;

    list.innerHTML = content.faq
      .map(
        (f) => `
      <div class="faq-item">
        <button class="faq-question">${f.q} <i class="fas fa-chevron-down"></i></button>
        <div class="faq-answer"><p>${f.a}</p></div>
      </div>`
      )
      .join('');
  }

  function applyCounters(content) {
    const c = content.counters;
    if (!c) return;

    const numbers = document.querySelectorAll('.counter-item .number');
    const values = [c.projects, c.clients, c.years];
    numbers.forEach((el, i) => {
      if (values[i] != null) {
        el.dataset.target = values[i];
        el.dataset.suffix = '+';
      }
    });

    const labels = document.querySelectorAll('.counter-item .label');
    c.labels?.forEach((text, i) => {
      if (labels[i]) labels[i].textContent = text;
    });
  }

  function applyCta(content) {
    const c = content.cta;
    if (!c) return;
    const banner = document.querySelector('.cta-banner');
    if (!banner) return;

    const h2 = banner.querySelector('h2');
    const p = banner.querySelector('p');
    const quote = banner.querySelector('.btn-primary');
    const wa = banner.querySelector('.btn-whatsapp');

    if (h2 && c.title) h2.textContent = c.title;
    if (p && c.subtitle) p.textContent = c.subtitle;
    if (quote && c.btnQuote) quote.textContent = c.btnQuote;
    if (wa && c.btnWhatsapp) {
      const icon = wa.querySelector('i');
      wa.innerHTML = icon ? `${icon.outerHTML} ${c.btnWhatsapp}` : c.btnWhatsapp;
    }
  }

  function applyFooter(content) {
    const tagline = document.querySelector('.footer-brand p');
    if (tagline && content.footer?.tagline) tagline.textContent = content.footer.tagline;

    const copy = document.querySelector('.footer-bottom p');
    if (copy && content.footer?.copyright) copy.textContent = content.footer.copyright;
  }

  function applyInquiryPopup(content) {
    const pop = document.querySelector('.inquiry-popup');
    if (!pop || !content.inquiryPopup) return;
    const h4 = pop.querySelector('h4');
    const p = pop.querySelector('p');
    const btn = pop.querySelector('.btn');
    if (h4) h4.textContent = content.inquiryPopup.title;
    if (p) p.textContent = content.inquiryPopup.text;
    if (btn) btn.textContent = content.inquiryPopup.btn;
  }

  function applyAbout(content) {
    const a = content.about;
    if (!a) return;

    const pageTitle = document.querySelector('.page-hero h1');
    if (pageTitle && a.pageTitle && document.body.contains(pageTitle)) {
      if (location.pathname.includes('about')) pageTitle.textContent = a.pageTitle;
    }

    const storyTitle = document.querySelector('.about-content h2');
    if (storyTitle && a.storyTitle) storyTitle.textContent = a.storyTitle;

    const ps = document.querySelectorAll('.about-content > p');
    if (a.storyP1 && ps[0]) ps[0].textContent = a.storyP1;
    if (a.storyP2 && ps[1]) ps[1].textContent = a.storyP2;

    const missions = document.querySelectorAll('.mission-card p');
    if (a.mission && missions[0]) missions[0].textContent = a.mission;
    if (a.vision && missions[1]) missions[1].textContent = a.vision;
    if (a.values && missions[2]) missions[2].textContent = a.values;
  }

  function applyBrand(content) {
    document.querySelectorAll('.logo').forEach((logo) => {
      const name = content.brand?.name || 'Ram';
      const accent = content.brand?.accent || 'Arts';
      logo.innerHTML = `${name}<span>${accent}</span>`;
    });
  }

  function initLiveSync() {
    window.addEventListener('ramarts-cms-update', (e) => applyContent(e.detail));
    window.addEventListener('storage', (e) => {
      if (e.key === window.RamArtsCMS.KEY) applyContent();
    });
    window.addEventListener('message', (e) => {
      if (e.data?.type === 'RAMARTS_CMS_UPDATE') applyContent(e.data.content);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.RamArtsCMS) return;
    applyContent();
    initLiveSync();
  });

  window.RamArtsCMS.applyContent = applyContent;
})();
