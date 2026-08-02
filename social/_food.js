/* Dati della story «biglietto food & drink» — domenica 2 agosto 2026.

   ⚠️ NOTA SUL COPY — è il punto delicato di questa comunicazione.
   Il rischio è che un biglietto «solo food & drink» venga letto come un modo
   per vedere il concerto spendendo meno: sarebbe scorretto verso chi suona e
   verso chi compra. Quindi il testo dice sempre due cose insieme:
     · cosa DÀ  → l'area food & drink, il bar, la festa attorno
     · cosa NON dà → il parterre, cioè i live sotto il palco
   L'ultima frase riporta il valore sul palco e spinge il biglietto parterre
   finché ce n'è. Nessuna promessa sulla vista o sull'ascolto da fuori. */
window.FOOD = {
  giorno: 'Domenica 2 agosto',
  nota: 'Accesso alla sola area food &amp; drink: bar, cibo, la festa attorno. Per i live sotto il palco serve il biglietto parterre.',
  legenda: [
    ['food', 'Area food &amp; drink', 'nuovo biglietto'],
    ['part', 'Area parterre', 'per i live'],
  ],
  /* i tre tagli di copy messi alla prova (stessa mappa, stessa nota) */
  claim: {
    diretto:  'Nuovo ingresso food & drink',
    parterre: 'Il parterre è quasi pieno',
    insieme:  'Anche solo per stare insieme',
  },
};
