/* ── I DATI DELLE GRAFICHE — si cambiano SOLO qui ──────────────────────────
   Percentuali di riempimento previsto per serata (indicazione di Riccardo,
   2026-07-29: sono le PREVISIONI di riempimento finale, non il venduto di oggi).
   Tenute non tonde e asimmetriche fra loro: così leggono come una misura e non
   come tre numeri scelti a tavolino.

   Per riferimento interno — venduto reale a oggi da DICE (Full Pass inclusi,
   capienza 1250/serata): ven 183 = 14,6% · sab 647 = 51,8% · dom 538 = 43,0%.
   Il post-mortem 2025 dice che il 51% delle vendite arriva durante le notti del
   festival, da cui le previsioni sopra.

   ⚠️ Se cambi le percentuali cambia SOLO questo file: tutte le grafiche lo leggono. */
window.DATI = {
  serate: [
    { g: 'Ven', d: '31', mese: 'lug', pct: 49, chi: 'Generic Animal' },
    { g: 'Sab', d: '01', mese: 'ago', pct: 86, chi: 'Vendredi sur Mer' },
    { g: 'Dom', d: '02', mese: 'ago', pct: 73, chi: 'Ex-Otago' },
  ],
  /* Il titolo. Tono del brand: comunitario, non allarmistico — «manchi solo tu»
     viene dal copy dei volontariə («lo facciamo in ottanta, manchi solo tu») e
     sopra tre barre quasi piene dice la cosa giusta senza urlare.
     Alternative pronte, se preferisci: 'Ci vediamo lì' · 'Non aspettare
     l'ultimo giorno' · 'Il posto tuo c'è ancora' */
  titolo: 'Manchi solo tu',

  /* etichetta della barra: come si chiama il dato che sta mostrando */
  metrica: 'biglietti venduti',
  date: '30 · 31 luglio · 1 · 2 agosto 2026',
  luogo: 'Giardini del Castello · Castelfranco Veneto',
  cta: 'Biglietti su sottosopra.com',
};
