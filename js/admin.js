/**
 * RamArts CMS Admin Panel
 */
(function () {
  let content = {};
  let saveTimer;
  let previewVisible = false;
  let previewLoaded = false;
  const PREVIEW_PREF_KEY = 'ramarts_admin_preview_visible';
  const ACTIVE_PANEL_KEY = 'ramarts_admin_active_panel';

  const previewPages = [
    { label: 'Home', url: 'index.html' },
    { label: 'About', url: 'about.html' },
    { label: 'Services', url: 'services.html' },
    { label: 'Portfolio', url: 'portfolio.html' },
    { label: 'Contact', url: 'contact.html' },
    { label: 'Quote', url: 'quote.html' },
  ];

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.RamArtsCMS) return;
    initLogin();
  });

  function initLogin() {
    const loginView = document.getElementById('admin-login');
    const layout = document.getElementById('admin-layout');
    const form = document.getElementById('login-form');

    if (sessionStorage.getItem(RamArtsCMS.AUTH_KEY) === '1') {
      showDashboard(loginView, layout);
      return;
    }

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const pwd = document.getElementById('login-password').value;
      content = RamArtsCMS.getContent();
      const expected = content.admin?.password || RamArtsCMS.DEFAULT.admin.password;
      if (pwd === expected) {
        sessionStorage.setItem(RamArtsCMS.AUTH_KEY, '1');
        showDashboard(loginView, layout);
      } else {
        document.getElementById('login-error').textContent = 'Incorrect password';
      }
    });
  }

  function showDashboard(loginView, layout) {
    loginView.style.display = 'none';
    layout.classList.add('active');
    content = RamArtsCMS.getContent();
    initNav();
    initPreview();
    initPreviewControls();
    initActions();
    renderAllPanels();
    bindGlobalInputs();

    const savedPreview = localStorage.getItem(PREVIEW_PREF_KEY) === 'true';
    setPreviewVisible(savedPreview, false);
  }

  function initNav() {
    const navButtons = Array.from(document.querySelectorAll('.admin-nav-btn'));
    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => activatePanel(btn.dataset.panel));
    });

    const savedPanel = localStorage.getItem(ACTIVE_PANEL_KEY);
    const firstPanel = navButtons[0]?.dataset.panel;
    const hasSavedPanel = savedPanel && navButtons.some((btn) => btn.dataset.panel === savedPanel);
    activatePanel(hasSavedPanel ? savedPanel : firstPanel);
  }

  function activatePanel(panelName) {
    if (!panelName) return;

    document.querySelectorAll('.admin-nav-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.panel === panelName);
    });

    document.querySelectorAll('.admin-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === `panel-${panelName}`);
    });

    const activeBtn = document.querySelector(`.admin-nav-btn[data-panel="${panelName}"]`);
    const title = document.getElementById('editor-title');
    if (title && activeBtn) {
      title.textContent = activeBtn.textContent.trim();
    }

    localStorage.setItem(ACTIVE_PANEL_KEY, panelName);
    activeBtn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function initPreview() {
    const selects = [
      document.getElementById('preview-page'),
      document.getElementById('preview-page-modal'),
    ].filter(Boolean);

    selects.forEach((select) => {
      previewPages.forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p.url;
        opt.textContent = p.label;
        select.appendChild(opt);
      });

      select.addEventListener('change', () => {
        selects.forEach((s) => {
          if (s !== select) s.value = select.value;
        });
        loadPreviewFrame('preview-frame');
        loadPreviewFrame('preview-frame-modal');
      });
    });
  }

  function initPreviewControls() {
    document.getElementById('btn-toggle-preview')?.addEventListener('click', () => {
      setPreviewVisible(!previewVisible);
    });

    document.getElementById('btn-sidebar-preview')?.addEventListener('click', () => {
      setPreviewVisible(!previewVisible);
    });

    document.getElementById('btn-hide-preview')?.addEventListener('click', () => {
      setPreviewVisible(false);
    });

    document.getElementById('btn-preview-tab')?.addEventListener('click', openPreviewInNewTab);

    document.getElementById('preview-refresh')?.addEventListener('click', () => {
      loadPreviewFrame('preview-frame', true);
    });

    document.getElementById('preview-fullscreen')?.addEventListener('click', openPreviewModal);

    document.getElementById('preview-modal-close')?.addEventListener('click', closePreviewModal);
    document.getElementById('preview-modal-refresh')?.addEventListener('click', () => {
      loadPreviewFrame('preview-frame-modal', true);
    });

    document.getElementById('preview-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'preview-modal') closePreviewModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePreviewModal();
    });
  }

  function setPreviewVisible(visible, savePref = true) {
    previewVisible = visible;
    const layout = document.getElementById('admin-layout');
    const panel = document.getElementById('admin-preview-panel');
    const toggleBtn = document.getElementById('btn-toggle-preview');
    const label = document.getElementById('toggle-preview-label');
    const status = document.getElementById('save-status');

    layout?.classList.toggle('preview-visible', visible);
    panel?.toggleAttribute('hidden', !visible);
    toggleBtn?.setAttribute('aria-pressed', visible ? 'true' : 'false');

    if (label) {
      label.textContent = visible ? 'Hide Live Preview' : 'Show Live Preview';
    }

    if (status) {
      status.innerHTML = visible
        ? '<i class="fas fa-check"></i> Saved — preview updated'
        : '<i class="fas fa-check"></i> Saved';
    }

    if (visible) {
      loadPreviewFrame('preview-frame');
    }

    if (savePref) {
      localStorage.setItem(PREVIEW_PREF_KEY, visible ? 'true' : 'false');
    }
  }

  function getSelectedPreviewUrl(frameId = 'preview-frame') {
    const selectId = frameId === 'preview-frame-modal' ? 'preview-page-modal' : 'preview-page';
    const select = document.getElementById(selectId) || document.getElementById('preview-page');
    const page = select?.value || 'index.html';
    return `${page}?cms_preview=1&t=${Date.now()}`;
  }

  function loadPreviewFrame(frameId, forceReload = false) {
    const frame = document.getElementById(frameId);
    if (!frame) return;

    const url = getSelectedPreviewUrl(frameId);
    if (forceReload || !frame.src || frame.src === 'about:blank') {
      frame.src = url;
      previewLoaded = true;
    } else {
      try {
        frame.contentWindow?.postMessage({ type: 'RAMARTS_CMS_UPDATE', content }, '*');
      } catch {
        frame.src = url;
      }
    }
  }

  function openPreviewInNewTab() {
    window.open(getSelectedPreviewUrl(), '_blank');
  }

  function openPreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (!modal) return;

    const mainSelect = document.getElementById('preview-page');
    const modalSelect = document.getElementById('preview-page-modal');
    if (mainSelect && modalSelect) modalSelect.value = mainSelect.value;

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    loadPreviewFrame('preview-frame-modal', true);
  }

  function closePreviewModal() {
    const modal = document.getElementById('preview-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initActions() {
    document.getElementById('btn-logout')?.addEventListener('click', () => {
      sessionStorage.removeItem(RamArtsCMS.AUTH_KEY);
      location.reload();
    });

    document.getElementById('btn-export')?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'ramarts-content.json';
      a.click();
    });

    document.getElementById('btn-import')?.addEventListener('click', () => {
      document.getElementById('import-file').click();
    });

    document.getElementById('import-file')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result);
          content = RamArtsCMS.deepMerge(RamArtsCMS.DEFAULT, imported);
          persist();
          renderAllPanels();
          alert('Content imported successfully!');
        } catch {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });

    document.getElementById('btn-reset')?.addEventListener('click', () => {
      if (confirm('Reset all content to defaults? This cannot be undone.')) {
        RamArtsCMS.resetContent();
        content = RamArtsCMS.getContent();
        renderAllPanels();
        pushPreview();
      }
    });

    document.getElementById('btn-view-site')?.addEventListener('click', () => {
      window.open('index.html', '_blank');
    });
  }

  function bindGlobalInputs() {
    document.getElementById('new-admin-password')?.addEventListener('change', (e) => {
      if (e.target.value.length >= 6) {
        content.admin.password = e.target.value;
        persist();
        e.target.value = '';
        alert('Password updated!');
      }
    });
  }

  function persist() {
    RamArtsCMS.saveContent(content);
    showSaved();
    pushPreview();
  }

  function debouncedSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 400);
  }

  function showSaved() {
    const el = document.getElementById('save-status');
    el?.classList.add('show');
    setTimeout(() => el?.classList.remove('show'), 1500);
  }

  function pushPreview() {
    if (!previewVisible) return;

    ['preview-frame', 'preview-frame-modal'].forEach((id) => {
      const frame = document.getElementById(id);
      if (!frame?.src || frame.src === 'about:blank') return;
      try {
        frame.contentWindow?.postMessage({ type: 'RAMARTS_CMS_UPDATE', content }, '*');
      } catch {
        loadPreviewFrame(id, true);
      }
    });
  }

  function field(path, label, type = 'text', hint = '') {
    const val = RamArtsCMS.getByPath(content, path) ?? '';
    const id = path.replace(/\./g, '-');
    return `
      <div class="admin-field">
        <label for="${id}">${label}</label>
        ${type === 'textarea' ? `<textarea id="${id}" data-path="${path}" rows="3">${escapeHtml(String(val))}</textarea>` : `<input type="${type}" id="${id}" data-path="${path}" value="${escapeAttr(String(val))}">`}
        ${hint ? `<p class="admin-hint">${hint}</p>` : ''}
      </div>`;
  }

  function imageField(path, label) {
    const val = RamArtsCMS.getByPath(content, path) ?? '';
    const id = path.replace(/\./g, '-');
    const displayVal = String(val).startsWith('data:image') ? '(uploaded image — stored in browser)' : val;
    const previewSrc = val ? RamArtsCMS.resolveImageUrl(val) : '';
    const warning =
      val && (String(val).includes(':\\') || String(val).startsWith('file:'))
        ? '<p class="admin-hint admin-hint-warn"><i class="fas fa-exclamation-triangle"></i> This looks like a computer folder path — it will not work. Upload below or use assets/images/</p>'
        : '';

    return `
      <div class="admin-field admin-image-field" data-image-field="${path}">
        <label for="${id}">${label}</label>
        <div class="admin-image-row">
          <input type="text" id="${id}" data-path="${path}" data-image-input value="${escapeAttr(String(displayVal))}" placeholder="https://... or assets/images/photo.jpg">
          <label class="admin-btn admin-btn-sm admin-upload-btn">
            <i class="fas fa-upload"></i> Upload
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden data-upload-path="${path}">
          </label>
        </div>
        ${warning}
        <div class="admin-image-preview" data-preview-path="${path}">
          ${previewSrc ? `<img src="${escapeAttr(previewSrc)}" alt="Preview">` : '<span class="admin-image-preview-empty">No preview</span>'}
        </div>
        <p class="admin-hint">
          <strong>Works:</strong> Upload button · Full link <code>https://...</code> · File in folder <code>assets/images/yourphoto.jpg</code><br>
          <strong>Does not work:</strong> <code>C:\\Users\\...</code> or copying path from File Explorer
        </p>
      </div>`;
  }

  function updateImagePreview(path) {
    const val = RamArtsCMS.getByPath(content, path);
    const preview = document.querySelector(`[data-preview-path="${path}"]`);
    if (!preview) return;
    if (!val) {
      preview.innerHTML = '<span class="admin-image-preview-empty">No preview</span>';
      return;
    }
    const src = RamArtsCMS.resolveImageUrl(val);
    preview.innerHTML = `<img src="${escapeAttr(src)}" alt="Preview">`;
    const img = preview.querySelector('img');
    if (img) {
      img.onerror = () => {
        preview.innerHTML =
          '<span class="admin-hint-warn">Image could not load. Check path or upload again.</span>';
      };
    }
  }

  function renderAllPanels() {
    renderBusiness();
    renderHero();
    renderSections();
    renderServices();
    renderTestimonials();
    renderFaq();
    renderCta();
    bindPanelInputs();
  }

  function renderBusiness() {
    const el = document.getElementById('panel-business');
    if (!el) return;
    el.innerHTML = `
      <div class="admin-row">
        ${field('brand.name', 'Brand Name (before accent)')}
        ${field('brand.accent', 'Brand Accent (colored)')}
      </div>
      <div class="admin-row">
        ${field('business.phone', 'WhatsApp / Phone (digits only)', 'tel', 'e.g. 919876543210')}
        ${field('business.phoneDisplay', 'Phone Display Text')}
      </div>
      <div class="admin-row">
        ${field('business.email', 'Email', 'email')}
        ${field('business.hours', 'Working Hours')}
      </div>
      ${field('business.address', 'Address')}
      ${field('business.mapEmbed', 'Google Maps Embed URL', 'url')}
      <hr style="border-color:var(--admin-border);margin:1.5rem 0">
      <h3 style="margin-bottom:1rem;font-size:1rem">SEO</h3>
      ${field('seo.title', 'Page Title')}
      ${field('seo.description', 'Meta Description', 'textarea')}
      ${field('seo.keywords', 'Meta Keywords', 'textarea')}
      <hr style="border-color:var(--admin-border);margin:1.5rem 0">
      ${field('offerBanner.text', 'Top Banner Text')}
      ${field('offerBanner.linkText', 'Top Banner Link Text')}
      <div class="admin-field">
        <label>Change Admin Password</label>
        <input type="password" id="new-admin-password" placeholder="Min 6 characters">
      </div>
    `;
  }

  function renderHero() {
    const el = document.getElementById('panel-hero');
    if (!el) return;
    el.innerHTML = `
      ${field('hero.headlineHtml', 'Headline (HTML allowed)', 'textarea', 'Use <span class="highlight">text</span> for accent')}
      ${field('hero.subtitle', 'Subheadline', 'textarea')}
      <div class="admin-row">
        ${field('hero.ctaQuote', 'Primary CTA Text')}
        ${field('hero.ctaWhatsapp', 'WhatsApp CTA Text')}
      </div>
      <h3 style="margin:1rem 0 0.75rem;font-size:0.95rem">Trust Badges</h3>
      ${content.hero.trust.map((_, i) => field(`hero.trust.${i}`, `Badge ${i + 1}`)).join('')}
      <h3 style="margin:1.5rem 0 0.75rem;font-size:0.95rem">Hero Images</h3>
      ${content.hero.images.map((img, i) => renderImageCard('hero.images', i, img)).join('')}
    `;
  }

  function renderSections() {
    const el = document.getElementById('panel-sections');
    if (!el) return;
    const keys = ['services', 'portfolio', 'whyUs', 'industries', 'process', 'testimonials', 'faq'];
    el.innerHTML = keys
      .map(
        (key) => `
      <div class="admin-card">
        <h3>${key}</h3>
        ${field(`sections.${key}.label`, 'Section Label')}
        ${field(`sections.${key}.title`, 'Section Title')}
        ${field(`sections.${key}.desc`, 'Section Description', 'textarea')}
      </div>`
      )
      .join('');
    el.innerHTML += `
      <div class="admin-card">
        <h3>Counters</h3>
        <div class="admin-row">
          ${field('counters.projects', 'Projects', 'number')}
          ${field('counters.clients', 'Clients', 'number')}
          ${field('counters.years', 'Years', 'number')}
        </div>
      </div>
      <div class="admin-card">
        <h3>Trust Bar</h3>
        ${content.trustBar.map((_, i) => field(`trustBar.${i}`, `Item ${i + 1}`)).join('')}
      </div>
    `;
  }

  function renderServices() {
    const el = document.getElementById('panel-services');
    if (!el) return;
    el.innerHTML = `
      <button type="button" class="admin-btn admin-btn-primary admin-btn-sm" id="add-service" style="margin-bottom:1rem"><i class="fas fa-plus"></i> Add Service</button>
      ${content.services.map((s, i) => renderServiceCard(i, s)).join('')}
    `;
    document.getElementById('add-service')?.addEventListener('click', () => {
      content.services.push({ title: 'New Service', desc: 'Description', image: '' });
      renderServices();
      bindPanelInputs();
      debouncedSave();
    });
  }

  function renderServiceCard(i, s) {
    return `
      <div class="admin-card" data-service="${i}">
        <div class="admin-card-header">
          <h3>Service ${i + 1}</h3>
          <button type="button" class="admin-btn admin-btn-danger admin-btn-sm" data-remove-service="${i}">Remove</button>
        </div>
        ${field(`services.${i}.title`, 'Title')}
        ${field(`services.${i}.desc`, 'Description', 'textarea')}
        ${imageField(`services.${i}.image`, 'Service Image')}
      </div>`;
  }

  function renderImageCard(path, i, img) {
    return `
      <div class="admin-card">
        <h3>Image ${i + 1}</h3>
        ${imageField(`${path}.${i}.src`, 'Image')}
        ${field(`${path}.${i}.alt`, 'Alt Text')}
        ${field(`${path}.${i}.class`, 'CSS Class (item-1, item-2...)')}
      </div>`;
  }

  function renderTestimonials() {
    const el = document.getElementById('panel-testimonials');
    if (!el) return;
    el.innerHTML = `
      <button type="button" class="admin-btn admin-btn-primary admin-btn-sm" id="add-testimonial" style="margin-bottom:1rem">Add Testimonial</button>
      ${content.testimonials.map((t, i) => `
        <div class="admin-card">
          <div class="admin-card-header">
            <h3>Testimonial ${i + 1}</h3>
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm" data-remove-testimonial="${i}">Remove</button>
          </div>
          ${field(`testimonials.${i}.text`, 'Quote', 'textarea')}
          <div class="admin-row">
            ${field(`testimonials.${i}.name`, 'Name')}
            ${field(`testimonials.${i}.role`, 'Role')}
          </div>
          ${imageField(`testimonials.${i}.avatar`, 'Avatar Image')}
        </div>`).join('')}
    `;
    document.getElementById('add-testimonial')?.addEventListener('click', () => {
      content.testimonials.push({ text: '', name: '', role: '', avatar: 'https://i.pravatar.cc/96' });
      renderTestimonials();
      bindPanelInputs();
      debouncedSave();
    });
  }

  function renderFaq() {
    const el = document.getElementById('panel-faq');
    if (!el) return;
    el.innerHTML = `
      <button type="button" class="admin-btn admin-btn-primary admin-btn-sm" id="add-faq" style="margin-bottom:1rem">Add FAQ</button>
      ${content.faq.map(
        (f, i) => `
        <div class="admin-card">
          <div class="admin-card-header">
            <h3>FAQ ${i + 1}</h3>
            <button type="button" class="admin-btn admin-btn-danger admin-btn-sm" data-remove-faq="${i}">Remove</button>
          </div>
          ${field(`faq.${i}.q`, 'Question')}
          ${field(`faq.${i}.a`, 'Answer', 'textarea')}
        </div>`
      ).join('')}
    `;
    document.getElementById('add-faq')?.addEventListener('click', () => {
      content.faq.push({ q: 'New question?', a: 'Answer here.' });
      renderFaq();
      bindPanelInputs();
      debouncedSave();
    });
  }

  function renderCta() {
    const el = document.getElementById('panel-cta');
    if (!el) return;
    el.innerHTML = `
      ${field('cta.title', 'CTA Headline')}
      ${field('cta.subtitle', 'CTA Subtitle', 'textarea')}
      <div class="admin-row">
        ${field('cta.btnQuote', 'Quote Button')}
        ${field('cta.btnWhatsapp', 'WhatsApp Button')}
      </div>
      ${field('footer.tagline', 'Footer Tagline', 'textarea')}
      ${field('footer.copyright', 'Footer Copyright')}
      <hr style="border-color:var(--admin-border);margin:1.5rem 0">
      <h3 style="margin-bottom:1rem">About Page</h3>
      ${field('about.pageTitle', 'Page Title')}
      ${field('about.storyTitle', 'Story Heading')}
      ${field('about.storyP1', 'Story Paragraph 1', 'textarea')}
      ${field('about.storyP2', 'Story Paragraph 2', 'textarea')}
      ${field('inquiryPopup.title', 'Popup Title')}
      ${field('inquiryPopup.text', 'Popup Text', 'textarea')}
    `;
  }

  function bindPanelInputs() {
    document.querySelectorAll('[data-path]').forEach((input) => {
      input.removeEventListener('input', onInput);
      input.addEventListener('input', onInput);
      if (input.dataset.imageInput) {
        input.addEventListener('input', () => updateImagePreview(input.dataset.path));
      }
    });

    document.querySelectorAll('[data-upload-path]').forEach((fileInput) => {
      fileInput.onchange = (e) => handleImageUpload(e.target);
    });

    document.querySelectorAll('[data-remove-service]').forEach((btn) => {
      btn.onclick = () => {
        content.services.splice(Number(btn.dataset.removeService), 1);
        renderServices();
        bindPanelInputs();
        debouncedSave();
      };
    });

    document.querySelectorAll('[data-remove-testimonial]').forEach((btn) => {
      btn.onclick = () => {
        content.testimonials.splice(Number(btn.dataset.removeTestimonial), 1);
        renderTestimonials();
        bindPanelInputs();
        debouncedSave();
      };
    });

    document.querySelectorAll('[data-remove-faq]').forEach((btn) => {
      btn.onclick = () => {
        content.faq.splice(Number(btn.dataset.removeFaq), 1);
        renderFaq();
        bindPanelInputs();
        debouncedSave();
      };
    });
  }

  async function handleImageUpload(fileInput) {
    const path = fileInput.dataset.uploadPath;
    const file = fileInput.files?.[0];
    if (!path || !file) return;

    if (file.size > 1024 * 1024) {
      alert('Image is too large (max 1 MB). Compress it or put the file in assets/images/ folder.');
      fileInput.value = '';
      return;
    }

    const textInput = document.querySelector(`[data-path="${path}"][data-image-input]`);

    if (RamArtsCMS.cloudEnabled?.()) {
      try {
        const group = path.replace(/\.\d+\./g, '.').replace(/\./g, '-');
        const cloudUrl = await RamArtsCMS.uploadImageToCloud(file, group);
        RamArtsCMS.setByPath(content, path, cloudUrl);
        if (textInput) textInput.value = cloudUrl;
        updateImagePreview(path);
        persist();
      } catch (err) {
        console.warn('[RamArts CMS] Cloud image upload failed:', err);
        alert(
          'Cloud image upload failed. The image will be stored only on this device.\n\n' +
            'Please check Supabase Storage bucket setup to make uploads globally visible.'
        );
        await saveImageInBrowser(file, path, textInput);
      }
      fileInput.value = '';
      return;
    }

    await saveImageInBrowser(file, path, textInput);
    fileInput.value = '';
  }

  function saveImageInBrowser(file, path, textInput) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        RamArtsCMS.setByPath(content, path, reader.result);
        if (textInput) textInput.value = '(uploaded image — stored in browser)';
        updateImagePreview(path);
        debouncedSave();
        resolve();
      };
      reader.onerror = () => resolve();
      reader.readAsDataURL(file);
    });
  }

  function onInput(e) {
    const path = e.target.dataset.path;
    if (!path) return;

    let value = e.target.value;
    if (e.target.type === 'number') value = Number(value);

    if (e.target.dataset.imageInput && value && !value.startsWith('(uploaded')) {
      const existing = RamArtsCMS.getByPath(content, path);
      if (value === '(uploaded image — stored in browser)' && String(existing).startsWith('data:image')) {
        return;
      }
      const normalized = RamArtsCMS.normalizeImageUrl(value);
      if (
        !normalized &&
        (value.includes(':\\') || value.startsWith('file:'))
      ) {
        alert(
          'That path cannot be used on a website.\n\n' +
            '• Click Upload to use your image, OR\n' +
            '• Copy your image into: assets/images/\n' +
            '• Then type: assets/images/yourfile.jpg\n' +
            '• Or paste a full link starting with https://'
        );
        return;
      }
      value = normalized || value;
      e.target.value = value;
    }

    RamArtsCMS.setByPath(content, path, value);
    debouncedSave();
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;');
  }
})();
