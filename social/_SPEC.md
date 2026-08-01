# SPEC — Grafiche social Sottosopra (Reel + post)

Video motion B/N per Instagram: raccontano **quanto si sta riempiendo ogni serata**
con una barra di riempimento, per spingere all'acquisto. Fondo **BIANCO** (al
contrario del ledwall, che è nero), inchiostro nero: è la faccia del brand nel feed.

## Formati

Due formati, stessa scena. Si scelgono con la classe sul `<body>`:

- `<body class="reel">` → **1080×1920** (9:16) — Reel
- `<body class="post">` → **1080×1350** (4:5) — post in feed

Il formato è sovrascrivibile da `?fmt=post|reel` per il confronto rapido.
**Ogni scena deve funzionare in ENTRAMBI**: usa flex/grid e misure relative
all'altezza dello stage dove serve, non altezze fisse pensate per uno solo.

### Safe area (vincolante)

Su Reel l'interfaccia di Instagram copre delle fasce. Nulla di importante —
titoli, numeri, percentuali, CTA — deve finirci sotto:

- **in alto: 220px** (header, audio)
- **in basso: 420px** (caption, nome utente, pulsanti azione, barra di navigazione)
- **a destra: 180px** (colonna like/commenti/condividi)

Sul post in feed le fasce non ci sono, ma tieni comunque **80px di margine**.
`?safe=1` disegna le fasce in rosso trasparente: usalo mentalmente per non
piazzare contenuto dove sarà coperto. In pratica: su Reel il contenuto vivo sta
tra y=220 e y=1500.

## Asset e base condivisa

- `_shared.css` / `_shared.js` — stage, resa `.just`, `.bar`, ease-firma **`'soso'`**
- `_dati.js` — **le percentuali e i testi: NON scriverli a mano nella scena, leggili da `window.DATI`**
- `vendor/gsap.min.js`, `vendor/CustomEase.min.js`, `vendor/SplitText.min.js` (locali)
- `fonts/SoSo26.woff2` — font brand (S capovolte già attive)
- `media/sottosopra-logo-black.png` — wordmark nero (1921×215, per fondo bianco; è interamente capovolto, è il logo)

Funzioni disponibili: `SG.ready(fn)` · `SG.justify(el)` → array di `.ln` · `SG.packDeltas(line)`
· `SG.capAir(lines)` (**usala sempre dopo justify**: impedisce che una parola corta
si sfarini in lettere sparse) · `SG.W` / `SG.H` · `SG.isPost`.

## Regole DURE

1. **Palette**: `#fff` fondo, `#000` inchiostro, `#6B6B6B` grigio, `#E4E4E4` traccia della barra. Nient'altro. Nessun gradiente, nessun colore.
2. **Tipografia**: solo SoSo26, MAIUSCOLO, **niente punto finale nei titoloni**, schwa (ə) per l'inclusività. Corpi grandi: si guarda su un telefono, in mano, di sfuggita.
3. **Angoli vivi**: nessun `border-radius`, da nessuna parte. Il brand è squadrato.
4. **Regoli e barre**: spessori generosi (≥3px). Niente hairline.
5. **Motion**: solo `transform` e `opacity`. Entrate con ease **`'soso'`**, uscite `power2.in`, movimenti in scena `power2.inOut`. **La barra si riempie in `scaleX` con origine a sinistra**, mai animando `width`.
6. **Il numero conta insieme alla barra**: la percentuale sale mentre il riempimento avanza, e i due arrivano **esattamente insieme**. Il conteggio va fatto con un **rullo di cifre in puro transform** o con `onUpdate` + `lazy:false` — non fidarti di `onUpdate` da solo (sul ledwall i contatori restavano congelati a metà).
7. **Durata**: 8-12 secondi, **loop perfetto** (ultimo frame ≡ primo). I Reel si guardano più volte: il ciclo deve richiudersi senza scatto.
8. **Ritmo social**: il messaggio principale deve essere leggibile **entro 1,5 secondi** dall'inizio. Niente intro lente: si scrolla via.
9. **`window.TL = <timeline master>`** obbligatorio (serve alla verifica a scrub).
10. Il **logo** e le **date** ci vogliono: logo piccolo e discreto (non è un'inserzione), date leggibili. La CTA `DATI.cta` in fondo, fuori dalla safe area bassa.
11. Guardiano: `setTimeout` a 3s che forza lo stato finale se l'intro non è partita (rAF strozzato).
12. **NON aprire il browser** — scrivi, rileggi criticamente, correggi. La verifica visiva la fa il coordinatore.

## Anti-slop

Vietati: font diversi da SoSo26, emoji, ombre, glassmorphism, bordi arrotondati,
gradienti, contatori che rimbalzano elasticamente, "swoosh" decorativi, finti
grafici 3D. Il registro è manifesto svizzero: severo, tipografico, sicuro di sé.
Una sola idea per grafica, eseguita perfettamente.
