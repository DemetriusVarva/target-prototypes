# HIP-101 — Branded order-ahead prototype

Clickable, mobile-first demo for ABM outbound (Appricotsoft). One codebase, dynamic branding per company via a URL parameter.

## Idea
Brandowana aplikacja sieci kawiarni / piekarni-kawiarni: gość zamawia kawę i wypieki **z wyprzedzeniem**, płaci telefonem (**BLIK / Apple Pay / Google Pay**), odbiera **bez kolejki** w szczycie. Lojalność i historia zakupów działają automatycznie w środku, a **profil gościa należy do sieci — nie do operatora „pudełka”**. Integracja z POS bez dodatkowego zaliza. First-party dane, nie abonament na cudzy widżet.

## Dynamic branding
Add `?id=<firma>` to the URL. Colours, fonts, hero copy and pain-quotes switch automatically (data in `data/brands.js`, generated from the Google Sheet `branding` tab).

| id | Firma | id | Firma |
|----|-------|----|-------|
| `sowa` | Cukiernia Sowa | `blikle` | A.Blikle |
| `putka` | Putka | `lubaszka` | Piekarnie Lubaszka |
| `wedel` | Pijalnie Czekolady E.Wedel | `gcn` | Green Caffè Nero |
| `etno` | Etno Cafe | `grycan` | Grycan |
| `oskroba` | Piekarnia Oskroba | `goraco` | Gorąco Polecam |
| `generic` | wersja ogólna (domyślna) | | |

Example: `.../HIP-101/?id=putka`

## Demo mode
The **🎯 Tryb demo** button overlays, on each screen, a real Google-review quote from *that* chain and the pain our product closes (queue, order errors, evening stock-outs, data-in-a-box).

## Stack
Vanilla HTML/CSS/JS + [Motion One](https://motion.dev) (CDN) for animation. No build step — hosted on GitHub Pages.

## Screens
Home → Menu → Cart + pickup-time → Payment (BLIK/Apple/Google Pay) → Confirmation + skip-the-queue QR & status tracker → Loyalty profile + purchase history.

*Prototyp sprzedażowy — dane i płatności są symulowane.*
