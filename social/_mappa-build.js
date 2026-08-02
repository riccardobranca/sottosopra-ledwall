/* Costruzione e animazione condivise dalle tre varianti «food & drink»:
   cambia solo il claim, tutto il resto (mappa, legenda, nota, piede) è uguale
   — così le tre opzioni si confrontano sul copy, non sul layout. */
window.FOODPAGE = (function () {

  function build(claim) {
    var F = window.FOOD;

    document.getElementById('kick').textContent = F.giorno;
    document.getElementById('mapwrap').innerHTML = MAPPA.svg();
    document.getElementById('nota').innerHTML = F.nota;
    document.getElementById('legenda').innerHTML = F.legenda.map(function (r) {
      return '<div class="lr"><span class="sw ' + r[0] + '"></span>' +
             '<span class="t">' + r[1] + '</span>' +
             '<span class="k">' + r[2] + '</span></div>';
    }).join('');

    /* claim giustificato, col solito rientro di corpo se sfora in larghezza */
    var el = document.getElementById('claim');
    el.setAttribute('data-text', claim);
    el.textContent = claim;
    var lines = SG.justify(el), guard = 0;
    while (guard++ < 30) {
      var box = el.getBoundingClientRect(), over = false;
      [].slice.call(el.querySelectorAll('.ln')).forEach(function (ln) {
        var ink = [].slice.call(ln.children).reduce(function (a, k) {
          return a + k.getBoundingClientRect().width; }, 0);
        if (ink > box.width + 1) over = true;
      });
      if (!over) break;
      el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * 0.94).toFixed(1) + 'px';
      el.removeAttribute('data-text');
      el.textContent = claim;
      lines = SG.justify(el);
    }
    SG.capAir(lines);

    /* e se sfora in ALTEZZA (claim lungo + mappa + nota) si stringe il claim:
       la mappa non si tocca, è lei che deve restare leggibile */
    var scene = document.querySelector('.scene');
    var sc = SG.stageScale() || 1, g2 = 0;
    while (g2++ < 20) {
      var need = 0;
      [].slice.call(scene.children).forEach(function (c) {
        need += c.getBoundingClientRect().height / sc;
        need += parseFloat(getComputedStyle(c).marginBottom) || 0;
      });
      if (need <= scene.getBoundingClientRect().height / sc) break;
      el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * 0.93).toFixed(1) + 'px';
      el.removeAttribute('data-text');
      el.textContent = claim;
      lines = SG.justify(el);
      SG.capAir(lines);
    }

    lines.forEach(function (ln) {
      var d = SG.packDeltas(ln);
      [].slice.call(ln.children).forEach(function (wd, i) { wd._dx = d[i] || 0; });
    });

    var wds  = [].slice.call(el.querySelectorAll('.wd'));
    var kick = document.getElementById('kick');
    var lr   = [].slice.call(document.querySelectorAll('.legenda .lr'));
    var nota = document.getElementById('nota');
    var foot = [].slice.call(document.querySelectorAll('.foot .fmask > *'));

    var tl = gsap.timeline();
    tl.set(kick, { yPercent: 110 });
    tl.set(lines, { yPercent: 110 });
    tl.set(wds, { x: function (i, t) { return t._dx || 0; } });
    tl.set(lr, { opacity: 0, x: -14 });
    tl.set(nota, { opacity: 0 });
    tl.set(foot, { yPercent: 110 });

    tl.to(kick, { yPercent: 0, duration: 0.5, ease: 'soso' }, 0);
    tl.to(lines, { yPercent: 0, duration: 0.7, ease: 'soso', stagger: 0.08 }, 0.1);
    tl.to(wds, { x: 0, duration: 0.9, ease: 'expo.inOut', stagger: 0.01 }, 0.4);

    MAPPA.anima(tl, 0.8);

    tl.to(lr, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', stagger: 0.09 }, 2.55);
    tl.to(nota, { opacity: 1, duration: 0.5 }, 2.8);
    tl.to(foot, { yPercent: 0, duration: 0.6, ease: 'soso' }, 3.0);

    window.TL = tl;
    setTimeout(function () { if (!SG.frozen && tl.time() < 1) tl.progress(1); }, 4200);
    return tl;
  }

  return { build: build };
})();
