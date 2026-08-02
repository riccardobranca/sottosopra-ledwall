/* Story unica «biglietto Giardino» — domenica 2 agosto 2026.

   Il copy è quello di Riccardo, asciugato per la lettura in story (3-4 secondi
   di attenzione): stesse informazioni, stesso ordine, meno parole.

   ⚠️ Nodo del messaggio: il biglietto si chiama GIARDINO ma l'area sulla mappa
   si chiama FOOD & DRINK. Se le due parole non vengono legate esplicitamente,
   al varco arriva gente convinta di aver comprato altro → la legenda della
   mappa accosta sempre «area» e «biglietto». */
window.GIARDINO = {
  giorno: 'Domenica 2 agosto',
  claim: 'Rimangono pochi posti',
  intro: 'Da oggi c’è anche il <b>biglietto Giardino</b>, a prezzo ridotto: dà accesso alla zona food &amp; drink, non al parterre.',
  legenda: [
    ['part', 'Area parterre', 'biglietto parterre'],
    ['food', 'Area food &amp; drink', 'biglietto giardino'],
  ],
  vendita: 'Biglietti online e in cassa',
  ps: 'P.S. Per motivi tecnici non sarà possibile fare l’upgrade da Giardino a Parterre in loco.',
};
