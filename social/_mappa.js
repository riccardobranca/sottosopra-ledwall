/* ── Mappa dell'area evento, ricostruita in vettoriale ──
   Impianto fedele alla planimetria originale: pieni NERI per il costruito
   (isolato a ovest, strada, castello, palco) su fondo bianco. Le due zone
   sono due EVIDENZIATORI sovrapposti, come segnati a mano sulla mappa:
     · PARTERRE       → azzurro
     · FOOD & DRINK   → rosso
   La campitura è in `multiply`: sopra il bianco fa il pastello, sopra il nero
   sparisce — esattamente come un pennarello vero. A delimitare l'area resta
   il contorno pieno, che invece passa sopra tutto.

   Sistema di riferimento: viewBox 1629×1180, le proporzioni dell'originale.
   I riquadri «area palco» e «area strada» non ci sono più: ora le aree sono
   le campiture stesse. */
window.MAPPA = (function () {

  /* castello: blocco in alto a destra. Il bordo scende verticale e poi si apre
     con un'unica curva ampia verso sud-est — è il muro che chiude il giardino. */
  var CASTELLO = 'M 1186 140 H 1629 V 726 C 1420 726, 1245 640, 1186 404 Z';

  /* food & drink: la «L» attorno alla strada — il ramo lungo l'isolato a ovest
     e la fascia a sud, che passa appena sotto il muro del castello */
  var FOOD = 'M 372 138 H 686 V 752 H 1596 V 980 H 372 Z';

  /* parterre: dal palco al muro del castello, che il lato destro costeggia a
     una decina di unità di distanza. Attacca a 292 per lasciar respirare
     l'etichetta del palco. */
  var PARTERRE = 'M 842 292 H 1172 C 1180 430, 1206 560, 1238 648 Q 1244 668 1220 670 L 842 688 Z';

  function svg() {
    return '' +
    '<svg id="mappa" viewBox="0 116 1629 1064" xmlns="http://www.w3.org/2000/svg" aria-label="Mappa dell area: in rosso l area food and drink, in azzurro l area parterre">' +
      '<defs>' +
        '<clipPath id="wipeFood"><rect id="wipeR" x="360" y="120" width="0" height="900"/></clipPath>' +
        '<clipPath id="wipePart"><rect id="wipeP" x="820" y="270" width="0" height="440"/></clipPath>' +
      '</defs>' +

      /* ── il costruito ── */
      '<g id="ctx">' +
        '<rect class="ed" x="18" y="140" width="330" height="1040"/>' +
        '<path class="ed" d="' + CASTELLO + '"/>' +
        '<path class="strada" d="M 753 140 V 895 Q 753 1035 893 1035 H 1629"/>' +
      '</g>' +

      '<g id="palcoG">' +
        '<rect class="palco" x="925" y="140" width="130" height="78"/>' +
        '<text class="lbl-ctx" x="990" y="272">Palco</text>' +
      '</g>' +

      '<text class="lbl-ctx lbl-neg" id="lblCast" x="1400" y="336">Castello</text>' +

      /* ── evidenziatore 1 · parterre ── */
      '<g id="gPart">' +
        '<path class="wash wash-blu" d="' + PARTERRE + '" clip-path="url(#wipePart)"/>' +
        '<path id="parterre" class="edge edge-blu" d="' + PARTERRE + '"/>' +
        '<text id="lblPart" class="lbl lbl-blu" x="1016" y="502">Parterre</text>' +
      '</g>' +

      /* ── evidenziatore 2 · food & drink ── */
      '<g id="gFood">' +
        '<path class="wash wash-red" d="' + FOOD + '" clip-path="url(#wipeFood)"/>' +
        '<path id="food" class="edge edge-red" d="' + FOOD + '"/>' +
        '<text id="lblFood"  class="lbl lbl-red" x="530" y="470">Food</text>' +
        '<text id="lblFood2" class="lbl lbl-red" x="530" y="546">&amp; drink</text>' +
      '</g>' +

      /* ── ingressi: scritti IN BIANCO dentro la strada, che è la via da cui
         si entra. Fuori, su fondo bianco, si accavallavano alle campiture.
         Le frecce sono disegnate, non scritte: un glifo dentro un testo
         ruotato punta dalla parte sbagliata. ── */
      '<g id="ingr">' +
        '<text class="lbl-in" x="753" y="300" transform="rotate(-90 753 300)">Ingresso</text>' +
        '<path class="arrow" d="M 753 470 V 552 M 722 524 L 753 556 L 784 524"/>' +
        '<text class="lbl-in" x="1210" y="1050">Ingresso</text>' +
        '<path class="arrow" d="M 1380 1036 H 1462 M 1434 1005 L 1466 1036 L 1434 1067"/>' +
      '</g>' +
    '</svg>';
  }

  /* Le tween della mappa, agganciate alla timeline della grafica.
     Ordine di lettura: il luogo → dove non si entra → dove si entra. */
  function anima(tl, t0) {
    /* ⚠️ i set vanno ancorati a 0: senza posizione GSAP li accoda alla FINE
       della timeline già costruita, e da lì rimetterebbe a zero proprio le
       tween della mappa che partono prima. */
    var part = document.getElementById('parterre');
    var food = document.getElementById('food');
    var lp = part.getTotalLength(), lf = food.getTotalLength();

    tl.set('#ctx > *', { opacity: 0 }, 0);
    tl.set('#palcoG, #lblCast, #ingr', { opacity: 0 }, 0);
    tl.set(part, { strokeDasharray: lp, strokeDashoffset: lp }, 0);
    tl.set(food, { strokeDasharray: lf, strokeDashoffset: lf }, 0);
    tl.set('#wipeP', { attr: { width: 0 } }, 0);
    tl.set('#wipeR', { attr: { width: 0 } }, 0);
    tl.set('#lblPart, #lblFood, #lblFood2', { opacity: 0 }, 0);

    tl.to('#ctx > *', { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.07 }, t0);
    tl.to('#palcoG, #lblCast', { opacity: 1, duration: 0.4 }, t0 + 0.3);

    /* i due evidenziatori: prima il tratto che delimita, poi il colore che
       riempie — il gesto di chi segna una mappa con il pennarello */
    tl.to(part, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' }, t0 + 0.5);
    tl.to('#wipeP', { attr: { width: 420 }, duration: 0.7, ease: 'power2.out' }, t0 + 0.85);
    tl.to('#lblPart', { opacity: 1, duration: 0.35 }, t0 + 1.15);

    tl.to(food, { strokeDashoffset: 0, duration: 1.0, ease: 'power2.inOut' }, t0 + 1.25);
    tl.to('#wipeR', { attr: { width: 1300 }, duration: 0.9, ease: 'power2.out' }, t0 + 1.7);
    tl.to('#lblFood, #lblFood2', { opacity: 1, duration: 0.35, stagger: 0.06 }, t0 + 2.05);
    tl.to('#ingr', { opacity: 1, duration: 0.4 }, t0 + 2.2);
    return tl;
  }

  return { svg: svg, anima: anima };
})();
