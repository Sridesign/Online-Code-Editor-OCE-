function copySnippet(btn) {
  // Get the <code> text inside the same card
  const card = btn.closest('.snippet-card');
  const codeEl = card.querySelector('code');

  // Decode HTML entities so the actual code is copied (not &lt; etc.)
  const textarea = document.createElement('textarea');
  textarea.value = codeEl.innerText;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
  } catch {
    // Fallback for modern browsers
    navigator.clipboard.writeText(textarea.value);
  }

  document.body.removeChild(textarea);

  // Button feedback
  btn.textContent = '✓ Copied!';
  btn.classList.add('copied');
  setTimeout(() => {
    btn.textContent = 'Copy';
    btn.classList.remove('copied');
  }, 2000);

  // Toast
  showToast('✓ Copied to clipboard!');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}
