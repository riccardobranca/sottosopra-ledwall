/* Story unica «biglietto Giardino» — domenica 2 agosto 2026.

   ⚠️ Nodo del messaggio: il biglietto si chiama GIARDINO ma l'area sulla mappa
   è la zona food & drink. Senza legenda sotto, sono le etichette DENTRO la
   mappa a fare il ponte: ogni area porta scritto il biglietto che serve. */
window.GIARDINO = {
  giorno: 'Domenica 2 agosto',
  claim: 'Rimangono pochi posti parterre',
  intro: 'C’è anche il <b>biglietto Giardino</b>, a prezzo ridotto: dà accesso alla zona food &amp; drink, non al parterre.',
  /* due blocchi, non una frase sola: giustificati separatamente riempiono
     entrambe le righe: in una riga unica «cassa» restava orfana sotto */
  vendita: ['Biglietti giardino', 'acquistabili in cassa'],
  /* etichette delle due aree: occhiello + nome (il nome è la parola che cambia) */
  mappa: {
    kickPart: 'Biglietto', part: 'Parterre',
    kickFood: 'Biglietto', food: 'Giardino',
  },
};
