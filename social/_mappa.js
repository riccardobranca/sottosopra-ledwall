/* ── Mappa dell'area evento, ricostruita in vettoriale ──
   Serve a rendere evidente la differenza tra le due zone:
     · AREA FOOD & DRINK → nero pieno, è quella del nuovo biglietto
     · AREA PARTERRE     → bianca col contorno, ci si entra col biglietto parterre
   Il contesto (castello, edificio, strada) sta sul fondo in grigio chiaro:
   deve orientare, non competere.

   Sistema di riferimento: viewBox 1629×1130, le stesse proporzioni della
   planimetria di partenza. I due riquadri «area strada» e «area palco» della
   mappa originale non ci sono più: le aree ora sono le campiture stesse. */
window.MAPPA = (function () {

  /* castello: blocco in alto a destra, con la grande curva che lo smussa
     verso il giardino (bezier: scende quasi verticale, poi gira orizzontale) */
  var CASTELLO = 'M 1190 140 H 1629 V 760 C 1290 745, 1190 640, 1190 390 Z';

  /* area food & drink: la «L» che avvolge la strada — il ramo lungo l'edificio
     a ovest e la fascia a sud. Viene disegnata PRIMA di edifici e castello,
     così sono loro a ritagliarla dove non si può stare. */
  var FOOD = 'M 370 135 H 690 V 735 H 1629 V 985 H 370 Z';

  /* area parterre: dal palco fino al castello, il lato destro segue la curva.
     Attacca a y=292 per lasciare respiro all'etichetta del palco, che
     altrimenti finisce dentro l'area e non si legge più. */
  var PARTERRE = 'M 838 292 H 1180 C 1190 430, 1218 560, 1198 668 L 838 690 Z';

  function svg() {
    return '' +
    '<svg id="mappa" viewBox="0 0 1629 1130" xmlns="http://www.w3.org/2000/svg" aria-label="Mappa dell area: in nero l area food and drink, col contorno l area parterre">' +
      '<defs>' +
        '<clipPath id="wipeFood"><rect id="wipeR" x="360" y="120" width="0" height="880"/></clipPath>' +
      '</defs>' +

      /* ── fondo: strada, poi l area food, poi gli edifici che la ritagliano ── */
      '<g id="ctx">' +
        '<path class="strada" d="M 753 140 V 900 Q 753 1035 890 1035 H 1629"/>' +
      '</g>' +

      '<path id="food" d="' + FOOD + '" clip-path="url(#wipeFood)"/>' +

      '<g id="ctx2">' +
        '<rect class="ed" x="18" y="140" width="330" height="990"/>' +
        '<path class="ed" d="' + CASTELLO + '"/>' +
        '<text class="lbl-ctx" x="1400" y="330">Castello</text>' +
      '</g>' +

      /* ── le due aree ── */
      '<path id="parterre" d="' + PARTERRE + '"/>' +
      '<text id="lblPart" class="lbl lbl-s" x="1018" y="500">Parterre</text>' +

      '<g id="palcoG">' +
        '<rect class="palco" x="925" y="140" width="130" height="76"/>' +
        '<text class="lbl-ctx" x="990" y="266">Palco</text>' +
      '</g>' +

      '<text id="lblFood" class="lbl lbl-neg" x="510" y="560">Food</text>' +
      '<text id="lblFood2" class="lbl lbl-neg" x="510" y="640">&amp; drink</text>' +
    '</svg>';
  }

  /* Le tween della mappa, agganciate alla timeline della grafica.
     Ordine di lettura: il luogo → dove NON si entra → dove si entra. */
  function anima(tl, t0) {
    /* ⚠️ i set vanno ancorati a 0: senza posizione GSAP li accoda alla FINE
       della timeline già costruita (il claim), e da lì rimetterebbero a zero
       proprio le tween della mappa che partono prima. */
    var ctx  = '#ctx path, #ctx2 .ed, #ctx2 text';
    var part = document.getElementById('parterre');
    var len  = part.getTotalLength();

    tl.set(ctx, { opacity: 0 }, 0);
    tl.set('#palcoG', { opacity: 0 }, 0);
    tl.set(part, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 }, 0);
    tl.set('#lblPart', { opacity: 0 }, 0);
    tl.set('#wipeR', { attr: { width: 0 } }, 0);
    tl.set('#lblFood, #lblFood2', { opacity: 0 }, 0);

    tl.to(ctx, { opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05 }, t0);
    tl.to('#palcoG', { opacity: 1, duration: 0.4, ease: 'power2.out' }, t0 + 0.25);
    /* il contorno del parterre si disegna: è il perimetro che NON cambia */
    tl.to(part, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, t0 + 0.4);
    tl.to(part, { fillOpacity: 1, duration: 0.4 }, t0 + 0.9);
    tl.to('#lblPart', { opacity: 1, duration: 0.4 }, t0 + 1.0);
    /* l area food si riempie come una barra: stesso gesto delle altre story */
    tl.to('#wipeR', { attr: { width: 1300 }, duration: 1.1, ease: 'power3.out' }, t0 + 1.15);
    tl.to('#lblFood, #lblFood2', { opacity: 1, duration: 0.4, stagger: 0.06 }, t0 + 1.75);
    return tl;
  }

  return { svg: svg, anima: anima };
})();
