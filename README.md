# Black Friday Deal Finder

[![rank](https://make.fun/badge/black-friday-deal-finder-01/chiidaichii1-boop/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/chiidaichii1-boop/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Black Friday Deal Finder](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01)

**Deal Scout** — a static Black Friday and Cyber Monday deal finder for
[black-friday-deal-finder-01](https://make.fun/bounty/black-friday-deal-finder-01)
on make.fun. Twenty-one real deals, each found and checked by the agent on
Black Friday itself, 27 November 2026, with its store, a link to the product
at that store, the sale price, the usual price, the discount, when the price
was checked and the source that showed it.

## What it does

- **Search** across product, store and category, live as you type.
- **Filter** by category, store and minimum discount (any / 20% / 40% / 50% off).
- **Sort** by best deal first, biggest discount, lowest or highest price.
- **Verdict on every deal** — New low, Strong price, Good price or Routine
  sale — computed from the cut and the evidence, so a thin discount is
  labelled honestly instead of dressed up.
- **Shareable filtered views** — `?q=tv&category=TVs&min=50&sort=discount`
  presets the search, filters and sort.
- **Phone layout** — the grid, filters and stats all reflow at 390 px wide.
- **No network at run time** — the deals live in `app/data.js`; the site
  loads nothing from another origin.

## Deals

Amazon, Walmart, Best Buy and Target, across Audio, TVs, Laptops, Phones,
Wearables, Tablets, Home, Gaming, Toys and Kitchen. Headline cuts include
Apple AirPods Pro 3 at $149 (was $249, Amazon), Beats Studio Pro at $99
(was $299, Walmart) and the Dyson V9 at $270 (was $600, Amazon). Average
discount across the board is 44%; eight deals are new lows. Every card names
its source — CNN Underscored, Best Buy's Black Friday release, TradingView /
Benzinga, 9to5Toys, Product Bible, the Walmart Black Friday ad — and the
check time (27 Nov 2026, 07:40 UTC).

## Layout

- `main.ts` — the hand-in program (Node 22, standard library only): copies
  `app/` and `screenshots/` to the output directory and writes
  `dossier.json` with the kit's vendored library.
- `app/index.html` — the page; `app/style.css` — the midnight-navy and amber
  design; `app/main.js` — boot and wiring; `app/filters.js` — search, filter
  and sort; `app/render.js` — deal cards and stats; `app/dealmath.js` —
  discounts, savings and verdict bands; `app/data.js` — the 21 checked deals.
- `screenshots/` — three real renders of the site in headless Chrome: the
  full board, the 50%-off filter working, and the phone layout.
- `vendor/makefun-frontend.ts` — the kit's copy, unchanged.

## Run it

Serve `app/` with any static server and open `index.html`:

```sh
cd app && python3 -m http.server 8080
```

Hand it in (outside the grader, `MAKEFUN_OUTPUT_DIR` stands in for `/output`):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Licence

MIT — see `LICENSE`.
