# Ledwall Sottosopra — 34 scene motion B/N

Grafiche animate per il ledwall dietro al palco (2.9mm IP65, 3×2 m, **1034×689 px**),
da mostrare nei cambi-atto. Tutto in bianco e nero, tipografia SoSo26, linguaggio
manifesto giustificato — le stesse regole del sito.

## Come si guarda

Server di anteprima: launch config **`ledwall`** (porta 8931).

| Pagina | Cosa |
|---|---|
| `index.html` | **Galleria**: tutte le scene in miniatura, live. Clic = apre a grandezza piena |
| `player.html` | **Il player da ledwall**: ruota le scene automaticamente |

## Le scene

| File | Idea organizzante | Loop |
|---|---|---|
| `titoloni.html` | Le frasi del brand si compongono, l'aria si apre nei gap | 27.6s |
| `palco.html` | Chi suona stasera: ledger del giorno, headliner invertita | 18.1s |
| `flip.html` | «Cambia il punto di vista» si capovolge davvero | 14.6s |
| `ribbons.html` | Nastri partner: 3 bande in gerarchia, velocità diverse | continuo |
| `eco.html` | SOTTOSOPRA ×6, una riga per volta si gira come una tessera | 25.2s |
| `finestre.html` | SOTTO / SOPRA con la folla dentro le lettere | 234s (cicli co-primi) |
| `marquee.html` | Tre nastri giganti, uno in outline | continuo |
| `date.html` | 30 31 01 02, l'highlight cicla sulle giornate | 15s |
| `contatore.html` | «Non solo concerti» + slot machine delle discipline | 19.2s |
| `qr.html` | «Vuoi sapere tutto del festival?» + QR verso /ingresso | 18s |
| `respiro.html` | La scena quieta: wordmark che respira, lame di luce | co-primo |
| `foto.html` | Foto folla + wordmark capovolto, ken burns | continuo |
| `prossimo.html` | **Chi arriva adesso + quanto manca** (ora vera) | 13.4s |
| `istituzioni.html` | Patrocinio e contributo, diciture ufficiali | 17.5s |
| `splitflap.html` | Tabellone a palette, come in stazione | 28.8s |
| `zoom.html` | Tunnel infinito di parole in contorno | continuo |
| `onda.html` | Campo di S: un'onda diagonale le capovolge | 24s |
| `numeri.html` | 8 · 80 · 4 · 1, ognuno arriva contando | 27.6s |
| `lineup.html` | Tutti i nomi che scorrono | continuo |
| `persiane.html` | Barre nere che si aprono sulla frase | 22.8s |
| `serigrafia.html` | La folla in alto contrasto, come una stampa | 30s |
| `social.html` | @sottosoprafestival gigante | 24s |
| `crew.html` | 80 persone — omaggio allə volontariə | 19.8s |
| `notte.html` | L'ora vera + la frase giusta per quell'ora | continuo |

### Istituzioni — quattro impianti

| File | Impianto |
|---|---|
| `istituzioni.html` | Una per volta, centrata, tenute lunghe |
| `istituzioni-duo.html` | **Le due insieme**, due colonne pari divise da un regolo |
| `istituzioni-ledger.html` | A righe con regoli, come il ledger del sito |
| `istituzioni-manifesto.html` | La dicitura **diventa** il titolone giustificato |
| `istituzioni-sigillo.html` | Il logo dentro una cornice che si imprime |

Le diciture sono quelle ufficiali, alla lettera: «Con il Patrocinio di» e «Progetto
realizzato in collaborazione e con il contributo della Camera di commercio di
Treviso-Belluno». Non vanno abbreviate né riscritte.

### Serate

| File | Cosa dice | Loop |
|---|---|---|
| `stasera.html` | I nomi della serata, giganti, senza orari | 22s |
| `serate.html` | **La mappa**: passate spente, in corso invertita, quelle che restano accese | 14.4s |
| `domani.html` | Chi c'è domani + biglietti (la domenica: «ci vediamo l'anno prossimo») | 20s |
| `restano.html` | Quante serate restano dopo stasera | 20s |
| `gratis.html` | Il giovedì si entra gratis | 20s |
| `fullpass.html` | «Un giorno non basta» + Full Pass | 19.2s |

`palco`, `prossimo`, `stasera`, `serate`, `domani` e `restano` scelgono la giornata
dalla data reale; per forzarla: `?day=gio|ven|sab|dom`. `prossimo.html` accetta anche
`?now=21:10` per le prove. **`gratis.html` entra in rotazione solo il giovedì** — le
altre sere direbbe una cosa falsa.

Parametri del player: `?t=25` (secondi per scena) · `?scenes=titoloni,flip,respiro`
(sottoinsieme) · `?day=sab` (giornata per la scena palco).

## Come si porta sul ledwall

Dipende da come il service alimenta lo schermo — **da chiedere a loro**:

**A · PC con uscita HDMI** (la via migliore): si apre `player.html` a schermo intero.

```bash
open -a "Google Chrome" --args --kiosk --window-size=1034,689 --disable-features=Translate "file:///PERCORSO/ledwall/player.html?t=25&day=ven"
```

Risoluzione davvero nativa, nessuna compressione, e si modifica un file per cambiare
i contenuti durante il festival.

**B · Player USB / solo file video**: servono gli mp4. Da sapere: **689 è dispari** e
H.264 esige dimensioni pari → si esporta a **1034×690** (1px di nero in fondo,
invisibile). Export a 30fps, senza traccia audio (è la causa n.1 dei loop che
scattano), con faststart. Se il service usa Resolume, chiedere se preferisce HAP.

## Regole di questa collezione

Sono in `_SPEC.md` — leggerlo prima di aggiungere una scena. In sintesi: fondo nero
dominante (i LED spenti non sparano luce sul palco), niente linee sotto i 2px
(shimmer), corpi giganti (a 2.9mm si legge da ~9 m), movimenti lenti, loop che si
chiudono esatti, una sola idea per scena.

## File di lavoro

- `_shared.css` / `_shared.js` — base comune: stage 1034×689, motore di
  giustificazione del sito, ease-firma `soso`
- `vendor/` — GSAP + CustomEase **in locale** (al festival può non esserci internet)
- `fonts/`, `logos/`, `media/` — asset del brand
