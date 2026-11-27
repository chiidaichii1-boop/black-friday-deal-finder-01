// Rendering: one deal card per deal, and the stats bar above the grid.
// A card shows everything a shopper needs to act: the product, the store,
// the sale price, the usual price, the discount, the store link, when the
// price was checked and where it was read, plus the honest verdict.

import { discountPct, money, saved, verdictClass } from "./dealmath.js";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function dealCard(deal) {
  const pct = discountPct(deal);
  const checked = new Date(deal.checked);
  const checkedText = checked.toUTCString().slice(0, 22) + " UTC";
  return (
    '<article class="card" data-id="' +
    escapeHtml(deal.id) +
    '">' +
    '<div class="card-top"><span class="category">' +
    escapeHtml(deal.category) +
    '</span><span class="store">' +
    escapeHtml(deal.store) +
    "</span></div>" +
    '<h3 class="card-title">' +
    escapeHtml(deal.title) +
    "</h3>" +
    '<div class="prices"><span class="price">' +
    money(deal.price) +
    '</span><span class="was">' +
    money(deal.was) +
    '</span><span class="off">−' +
    pct +
    "%</span></div>" +
    '<p class="save-line">You save ' +
    money(saved(deal)) +
    "</p>" +
    '<p class="verdict ' +
    verdictClass(deal.verdict) +
    '">' +
    escapeHtml(deal.verdict) +
    "</p>" +
    '<p class="note">' +
    escapeHtml(deal.note) +
    "</p>" +
    '<a class="buy" href="' +
    escapeHtml(deal.url) +
    '" target="_blank" rel="noopener">View at ' +
    escapeHtml(deal.store) +
    " →</a>" +
    '<p class="checked">Checked ' +
    checkedText +
    "<br>Source: " +
    escapeHtml(deal.source) +
    "</p>" +
    "</article>"
  );
}

export function renderGrid(list, gridEl, emptyEl) {
  if (list.length === 0) {
    gridEl.innerHTML = "";
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;
  gridEl.innerHTML = list.map(dealCard).join("");
}

export function renderStats(allDeals, statsEl) {
  const total = allDeals.length;
  const best = allDeals.reduce((top, deal) => (discountPct(deal) > discountPct(top) ? deal : top), allDeals[0]);
  const avg = Math.round(allDeals.reduce((sum, deal) => sum + discountPct(deal), 0) / total);
  const newLows = allDeals.filter((deal) => deal.verdict === "New low").length;
  statsEl.innerHTML =
    "<div><strong>" +
    total +
    "</strong><span>verified deals</span></div>" +
    "<div><strong>" +
    avg +
    "%</strong><span>average discount</span></div>" +
    "<div><strong>" +
    newLows +
    "</strong><span>new lows</span></div>" +
    "<div><strong>−" +
    discountPct(best) +
    "%</strong><span>deepest cut: " +
    best.title +
    "</span></div>";
}
