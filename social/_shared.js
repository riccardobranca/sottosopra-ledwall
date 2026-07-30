/* ── base condivisa · grafiche social Sottosopra ──
   SG.ready(fn)        → DOM + font pronti (misure affidabili)
   SG.justify(el)      → righe giustificate, modello poster del sito
   SG.packDeltas(line) → offset «compatto → giustificato» per aprire l'aria
   SG.W / SG.H         → misure reali dello stage nel formato corrente
   Registra l'ease-firma 'soso' (la stessa del ledwall e del sito).
   ?safe=1 mostra le safe area di Instagram · ?fmt=post|reel forza il formato. */
window.SG = (function () {
  var Q = new URLSearchParams(location.search);

  /* formato: dalla classe sul body, sovrascrivibile da ?fmt= */
  var fmt = Q.get('fmt');
  if (fmt === 'post' || fmt === 'reel') {
    document.body.classList.remove('post', 'reel');
    document.body.classList.add(fmt);
  }
  var isPost = document.body.classList.contains('post');
  var W = 1080, H = isPost ? 1350 : 1920;

  if (Q.get('safe') === '1') document.body.classList.add('showsafe');

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

  /* stesso motore del sito: a-capo naturale, aria nei gap tra parole,
     riga mono-parola con le lettere distribuite edge-to-edge */
  function justify(el) {
    var text = el.getAttribute('data-text');
    if (text === null) {
      text = el.textContent.replace(/[^\S ]+/g, ' ').trim();
      el.setAttribute('data-text', text);
      el.setAttribute('aria-label', text);
    }
    el.innerHTML = text.split(' ').map(function (w) { return '<span class="w">' + esc(w) + '</span>'; }).join(' ');
    var ws = [].slice.call(el.children), lines = [], cur = [], top = null;
    ws.forEach(function (s) {
      var t = s.offsetTop;
      if (top === null) top = t;
      if (t - top > 2) { lines.push(cur); cur = []; top = t; }
      cur.push(s.textContent);
    });
    if (cur.length) lines.push(cur);
    el.innerHTML = lines.map(function (lw) {
      var parts = lw.join(' ').split(/\s+/), inner;
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
    var x = 0, deltas = [];
    kids.forEach(function (k) {
      var r = k.getBoundingClientRect();
      deltas.push((x - (r.left - lineRect.left)) / sc);
      x += r.width + gap * sc;
    });
    return deltas;
  }

  /* TETTO ALL'ARIA: il giustificato edge-to-edge ha senso finché la riga è
     abbastanza piena. Sotto soglia la parola si sfarina e non si legge più
     (lezione imparata sul ledwall). Sotto il limite, riga compatta. */
  function capAir(lines, soglia) {
    soglia = soglia || 0.62;
    var sc = stageScale() || 1;
    lines.forEach(function (ln) {
      var kids = [].slice.call(ln.children);
      if (kids.length < 2) return;
      var ink = kids.reduce(function (s, k) { return s + k.getBoundingClientRect().width / sc; }, 0);
      var lineW = ln.getBoundingClientRect().width / sc;
      if (ink / lineW < soglia) {
        ln.style.justifyContent = 'flex-start';
        var isLetters = kids.every(function (k) { return k.textContent.length === 1; });
        ln.style.gap = (isLetters ? 0.04 : 0.3) + 'em';
      }
    });
  }

  /* Il titolo viene da _dati.js, non dal markup: si cambia in un posto solo.
     Se una grafica aveva il titolo spezzato su due blocchi, il primo prende
     tutto il testo (il motore di giustificazione fa gli a-capo da sé) e gli
     altri si spengono. Va chiamata PRIMA di justify(). */
  function setTitle(sel) {
    var els = [].slice.call(document.querySelectorAll(sel));
    if (!els.length) return null;
    els[0].setAttribute('data-text', window.DATI.titolo);
    els[0].textContent = window.DATI.titolo;
    els[0].removeAttribute('hidden');
    els[0].style.display = '';
    for (var i = 1; i < els.length; i++) els[i].style.display = 'none';
    return els[0];
  }

  /* «solo animazione d'entrata»: si buttano via le tween che partono dopo un
     certo istante e il ciclo non si ripete — la grafica si compone e resta.
     Serve perché ogni variante aveva la sua uscita costruita a modo suo. */
  function noExit(tl, t) {
    tl.getChildren(false, true, true).forEach(function (c) {
      if (c.startTime() >= t - 0.001) c.kill();
    });
    tl.repeat(0);
    return tl;
  }

  return {
    W: W, H: H, isPost: isPost,
    fit: fit, ready: ready, justify: justify, setTitle: setTitle, noExit: noExit,
    packDeltas: packDeltas, stageScale: stageScale, capAir: capAir,
  };
})();

/* voce di moto: la stessa firma del ledwall e del sito */
if (window.gsap) {
  if (window.CustomEase) {
    gsap.registerPlugin(CustomEase);
    CustomEase.create('soso', '0.625, 0.05, 0, 1');
  }
  gsap.defaults({ force3D: true });
}
