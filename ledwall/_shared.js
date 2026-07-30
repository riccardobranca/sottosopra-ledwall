/* ── base condivisa scene ledwall Sottosopra ──
   LW.ready(fn)          → DOM + font caricati (misure affidabili)
   LW.justify(el)        → costruisce le righe giustificate (modello poster del sito):
                           riga multi-parola = aria nei gap; riga mono-parola = lettere
                           distribuite. Ritorna l'array dei .ln (ognuno dentro un .lnmask).
   LW.packDeltas(line)   → per ogni figlio del .ln, offset X (px CSS non scalati) dalla
                           posizione "compatta" a quella giustificata: gsap.set(x=delta)
                           poi tween a 0 = l'aria che si apre.
   LW.stageScale()       → fattore di scala anteprima corrente. */
window.LW = (function () {
  var W = 1034, H = 689;

  function fit() {
    var st = document.getElementById('stage');
    if (!st) return;
    var s = Math.min(window.innerWidth / W, window.innerHeight / H);
    st.style.transform = s < 1 ? 'scale(' + s + ')' : '';
  }
  window.addEventListener('resize', fit);

  function ready(fn) {
    function go() {
      fit();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(); fn(); });
      else fn();
    }
    if (document.readyState !== 'loading') go();
    else document.addEventListener('DOMContentLoaded', go);
  }

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function justify(el) {
    var text = el.getAttribute('data-text');
    if (text === null) {
      text = el.textContent.replace(/[^\S ]+/g, ' ').trim();
      el.setAttribute('data-text', text);
      el.setAttribute('aria-label', text);
    }
    /* 1) parole inline → il browser decide gli a-capo */
    el.innerHTML = text.split(' ').map(function (w) { return '<span class="w">' + esc(w) + '</span>'; }).join(' ');
    var ws = [].slice.call(el.children), lines = [], cur = [], top = null;
    ws.forEach(function (s) {
      var t = s.offsetTop;
      if (top === null) top = t;
      if (t - top > 2) { lines.push(cur); cur = []; top = t; }
      cur.push(s.textContent);
    });
    if (cur.length) lines.push(cur);
    /* 2) righe come nei poster (ogni riga dentro una maschera per i reveal) */
    el.innerHTML = lines.map(function (lw) {
      var parts = lw.join(' ').split(/\s+/);
      var inner;
      if (parts.length > 1) {
        inner = parts.map(function (w) { return '<span class="wd">' + esc(w) + '</span>'; }).join('');
      } else {
        inner = '';
        for (var k = 0; k < parts[0].length; k++) inner += '<span class="wd">' + esc(parts[0][k]) + '</span>';
      }
      return '<span class="lnmask"><span class="ln">' + inner + '</span></span>';
    }).join('');
    return [].slice.call(el.querySelectorAll('.ln'));
  }

  function stageScale() {
    var st = document.getElementById('stage');
    return st ? st.getBoundingClientRect().width / W : 1;
  }

  function packDeltas(line, gapEm) {
    var kids = [].slice.call(line.children);
    if (!kids.length) return [];
    var fs = parseFloat(getComputedStyle(line).fontSize);
    var isLetters = kids.every(function (k) { return k.textContent.length === 1; });
    var gap = (gapEm !== undefined ? gapEm : (isLetters ? 0.02 : 0.26)) * fs;
    var sc = stageScale() || 1;
    var lineRect = line.getBoundingClientRect();
    /* tutto in px scalati (getBoundingClientRect), delta finale riportato in px CSS */
    var x = 0, deltas = [];
    kids.forEach(function (k) {
      var r = k.getBoundingClientRect();
      deltas.push((x - (r.left - lineRect.left)) / sc);
      x += r.width + gap * sc; /* r.width è scalato; gap (da font-size CSS) va scalato */
    });
    return deltas;
  }

  return { W: W, H: H, fit: fit, ready: ready, justify: justify, packDeltas: packDeltas, stageScale: stageScale };
})();

/* ── voce di moto della collezione ──
   'soso'  = ease-firma per le ENTRATE (attacco secco, coda lunghissima)
   uscite  = power2.in / power3.in · in-scena = power2.inOut · nastri = none
   force3D = i loop girano per ore: il layer GPU resta su. */
if (window.gsap) {
  if (window.CustomEase) {
    gsap.registerPlugin(CustomEase);
    CustomEase.create('soso', '0.625, 0.05, 0, 1');
  }
  gsap.defaults({ force3D: true });
}
