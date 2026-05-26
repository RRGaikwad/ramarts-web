/**
 * RamArts — Form Handling
 */

function getWhatsAppNumber() {
  return (
    window.RamArtsCMS?.getContent()?.business?.phone?.replace(/\D/g, '') || '919876543210'
  );
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initQuoteForm();
  initFileUpload();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const phone = data.get('phone');
    const email = data.get('email');
    const message = data.get('message');

    const text = encodeURIComponent(
      `Hello RamArts!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\n\nMessage:\n${message}`
    );

    window.open(`https://wa.me/${getWhatsAppNumber()}?text=${text}`, '_blank');
    showFormSuccess(form);
  });
}

function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const text = encodeURIComponent(
      `*Quote Request — RamArts*\n\n` +
        `Name: ${data.get('name')}\n` +
        `Phone: ${data.get('phone')}\n` +
        `Business: ${data.get('business') || 'N/A'}\n` +
        `Service: ${data.get('service')}\n` +
        `Quantity: ${data.get('quantity') || 'N/A'}\n\n` +
        `Requirements:\n${data.get('details')}`
    );

    window.open(`https://wa.me/${getWhatsAppNumber()}?text=${text}`, '_blank');
    showFormSuccess(form);
  });
}

function initFileUpload() {
  const fileAreas = document.querySelectorAll('.form-file');

  fileAreas.forEach((area) => {
    const input = area.querySelector('input[type="file"]');
    const label = area.querySelector('.file-label');

    if (!input) return;

    area.addEventListener('click', () => input.click());

    input.addEventListener('change', () => {
      if (input.files.length && label) {
        label.textContent = input.files[0].name;
      }
    });
  });
}

function showFormSuccess(form) {
  const success = form.parentElement.querySelector('.form-success');
  if (success) {
    form.style.display = 'none';
    success.classList.add('show');
  } else {
    form.reset();
    alert('Thank you! We will contact you shortly.');
  }
}
