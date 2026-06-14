// ── TAB SWITCHING ──
function switchTab(lang, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pane').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pane-' + lang).classList.add('active');
}

// ── RUN CODE ──
function runCode() {
  const html  = document.getElementById('htmlCode').value;
  const css   = '<style>' + document.getElementById('cssCode').value + '</style>';
  const js    = '<scr' + 'ipt>' + document.getElementById('jsCode').value + '</scr' + 'ipt>';
  const frame = document.getElementById('preview-window').contentWindow.document;
  frame.open();
  frame.write(html + css + js);
  frame.close();
  showToast('▶ Code executed!');
}

// ── CLEAR ALL ──
function clearCode() {
  document.getElementById('htmlCode').value = '';
  document.getElementById('cssCode').value  = '';
  document.getElementById('jsCode').value   = '';
  const frame = document.getElementById('preview-window').contentWindow.document;
  frame.open(); frame.write(''); frame.close();
  showToast('Editor cleared');
}

// ── LIVE PREVIEW on keyup ──
['htmlCode', 'cssCode', 'jsCode'].forEach(id => {
  document.getElementById(id).addEventListener('keyup', runCode);
});

// ── TAB KEY INDENT ──
['htmlCode', 'cssCode', 'jsCode'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.selectionStart;
      const end   = this.selectionEnd;
      this.value  = this.value.substring(0, start) + '  ' + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 2;
    }
  });
});

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// ── STARTER CODE ──
window.onload = () => {
  document.getElementById('htmlCode').value =
`<!DOCTYPE html>
<html>
<body>
  <h1 style="color:#39ff8f;font-family:sans-serif;text-align:center;margin-top:40px">
    Hello, World! 🚀
  </h1>
  <p style="text-align:center;color:#888;font-family:sans-serif">
    Edit the code on the left to see changes here.
  </p>
</body>
</html>`;
  runCode();
};
