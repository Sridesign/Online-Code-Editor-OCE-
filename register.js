// ── TOGGLE PASSWORD VISIBILITY ──
function togglePassword(id, btn) {
  const input = document.getElementById(id);
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
}

// ── PASSWORD STRENGTH METER ──
document.getElementById('r-pass').addEventListener('input', function () {
  const val = this.value;
  const fill = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');

  let score = 0;
  if (val.length >= 6) score++;
  if (val.length >= 10) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { pct: '0%',   color: 'transparent', text: '' },
    { pct: '25%',  color: '#ff5f57',     text: 'Weak' },
    { pct: '50%',  color: '#febc2e',     text: 'Fair' },
    { pct: '75%',  color: '#4c9fef',     text: 'Good' },
    { pct: '100%', color: '#39ff8f',     text: 'Strong' },
  ];

  const lvl = levels[Math.min(score, 4)];
  fill.style.width = lvl.pct;
  fill.style.background = lvl.color;
  label.textContent = lvl.text;
  label.style.color = lvl.color;
});

// ── FIELD VALIDATORS ──
function validateUsername() {
  const val = document.getElementById('r-name').value.trim();
  const err = document.getElementById('err-name');
  const inp = document.getElementById('r-name');
  if (!val) {
    setError(inp, err, 'Username is required.');
    return false;
  }
  if (val.length < 3) {
    setError(inp, err, 'Must be at least 3 characters.');
    return false;
  }
  setValid(inp, err);
  return true;
}

function validateEmail() {
  const val = document.getElementById('r-email').value.trim();
  const err = document.getElementById('err-email');
  const inp = document.getElementById('r-email');
  const re  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!val) {
    setError(inp, err, 'Email is required.');
    return false;
  }
  if (!re.test(val)) {
    setError(inp, err, 'Enter a valid email address.');
    return false;
  }
  setValid(inp, err);
  return true;
}

function validatePassword() {
  const val = document.getElementById('r-pass').value;
  const err = document.getElementById('err-pass');
  const inp = document.getElementById('r-pass');
  if (!val) {
    setError(inp, err, 'Password is required.');
    return false;
  }
  if (val.length < 6) {
    setError(inp, err, 'Password must be at least 6 characters.');
    return false;
  }
  setValid(inp, err);
  return true;
}

function validateConfirm() {
  const pass  = document.getElementById('r-pass').value;
  const cpass = document.getElementById('r-cpass').value;
  const err   = document.getElementById('err-cpass');
  const inp   = document.getElementById('r-cpass');
  if (!cpass) {
    setError(inp, err, 'Please confirm your password.');
    return false;
  }
  if (pass !== cpass) {
    setError(inp, err, 'Passwords do not match.');
    return false;
  }
  setValid(inp, err);
  return true;
}

// ── HELPERS ──
function setError(input, errEl, msg) {
  input.classList.remove('valid');
  input.classList.add('invalid');
  errEl.textContent = msg;
}
function setValid(input, errEl) {
  input.classList.remove('invalid');
  input.classList.add('valid');
  errEl.textContent = '';
}

// ── INLINE VALIDATION on blur ──
document.getElementById('r-name').addEventListener('blur', validateUsername);
document.getElementById('r-email').addEventListener('blur', validateEmail);
document.getElementById('r-pass').addEventListener('blur', validatePassword);
document.getElementById('r-cpass').addEventListener('blur', validateConfirm);

// ── FORM SUBMIT ──
document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const ok =
    validateUsername() &
    validateEmail()    &
    validatePassword() &
    validateConfirm();

  if (!ok) {
    showToast('⚠ Please fix the errors above.');
    return;
  }

  // Simulate successful registration (replace with real backend call)
  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Creating account…';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('success-overlay').classList.add('show');
    btn.textContent = 'Create Account';
    btn.disabled = false;
  }, 900);
});

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
