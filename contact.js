// ── FAQ ACCORDION ──
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));

  // Open clicked (if it wasn't already open)
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ── CHARACTER COUNTER ──
const msgArea  = document.getElementById('c-msg');
const charSpan = document.getElementById('char-count');
const MAX_CHARS = 500;

msgArea.addEventListener('input', function () {
  const len = this.value.length;
  if (len > MAX_CHARS) {
    this.value = this.value.substring(0, MAX_CHARS);
  }
  charSpan.textContent = Math.min(len, MAX_CHARS);
  charSpan.style.color = len >= MAX_CHARS ? '#ff5f57' : '';
});

// ── VALIDATORS ──
function validateName() {
  const v = document.getElementById('c-name').value.trim();
  const e = document.getElementById('err-cname');
  const i = document.getElementById('c-name');
  if (!v) { setError(i, e, 'Name is required.'); return false; }
  setValid(i, e); return true;
}

function validateEmail() {
  const v  = document.getElementById('c-email').value.trim();
  const e  = document.getElementById('err-cemail');
  const i  = document.getElementById('c-email');
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!v)        { setError(i, e, 'Email is required.'); return false; }
  if (!re.test(v)) { setError(i, e, 'Enter a valid email address.'); return false; }
  setValid(i, e); return true;
}

function validateSubject() {
  const v = document.getElementById('c-subject').value;
  const e = document.getElementById('err-csubject');
  const i = document.getElementById('c-subject');
  if (!v) { setError(i, e, 'Please select a topic.'); return false; }
  setValid(i, e); return true;
}

function validateMessage() {
  const v = document.getElementById('c-msg').value.trim();
  const e = document.getElementById('err-cmsg');
  const i = document.getElementById('c-msg');
  if (!v)          { setError(i, e, 'Message is required.'); return false; }
  if (v.length < 10) { setError(i, e, 'Please write at least 10 characters.'); return false; }
  setValid(i, e); return true;
}

function setError(input, errEl, msg) {
  input.classList.remove('valid'); input.classList.add('invalid');
  errEl.textContent = msg;
}
function setValid(input, errEl) {
  input.classList.remove('invalid'); input.classList.add('valid');
  errEl.textContent = '';
}

// ── INLINE VALIDATION on blur ──
document.getElementById('c-name').addEventListener('blur',    validateName);
document.getElementById('c-email').addEventListener('blur',   validateEmail);
document.getElementById('c-subject').addEventListener('blur', validateSubject);
document.getElementById('c-msg').addEventListener('blur',     validateMessage);

// ── FORM SUBMIT ──
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const ok =
    validateName()    &
    validateEmail()   &
    validateSubject() &
    validateMessage();

  if (!ok) {
    showToast('⚠ Please fix the errors above.');
    return;
  }

  const btn = document.getElementById('contact-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate sending (replace with EmailJS / backend call)
  setTimeout(() => {
    document.getElementById('success-overlay').classList.add('show');
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }, 900);
});

// ── CLOSE OVERLAY ──
function closeOverlay() {
  document.getElementById('success-overlay').classList.remove('show');
  document.getElementById('contact-form').reset();
  charSpan.textContent = '0';

  // Clear field states
  document.querySelectorAll('.field-group input, .field-group select, .field-group textarea')
    .forEach(el => el.classList.remove('valid', 'invalid'));
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
