// Boot and wiring: fill the filter pickers from the deals, then re-render
// the grid on every keystroke or picker change. No network, no framework.

import { CHECKED_LABEL, deals } from "./data.js";
import { applyFilters, distinctValues, emptyFilters } from "./filters.js";
import { renderGrid, renderStats } from "./render.js";

const grid = document.getElementById("deals");
const empty = document.getElementById("no-results");
const count = document.getElementById("result-count");
const stats = document.getElementById("stats");
const search = document.getElementById("search");
const category = document.getElementById("category");
const store = document.getElementById("store");
const minDiscount = document.getElementById("min-discount");
const sort = document.getElementById("sort");
const checkedLine = document.getElementById("checked-line");

const filters = emptyFilters();

// A filtered view can be shared as a link: ?q=tv&category=TVs&store=Best+Buy
// &min=50&sort=discount. The pickers below show the preset, so the
// screenshot of a filtered view and the controls agree.
const params = new URLSearchParams(location.search);
if (params.get("q")) filters.query = params.get("q");
if (params.get("category")) filters.category = params.get("category");
if (params.get("store")) filters.store = params.get("store");
if (params.get("min")) filters.minDiscount = Number(params.get("min")) || 0;
if (params.get("sort")) filters.sort = params.get("sort");

function fillPicker(select, values) {
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
}

function refresh() {
  filters.query = search.value;
  filters.category = category.value;
  filters.store = store.value;
  filters.minDiscount = Number(minDiscount.value);
  filters.sort = sort.value;
  const shown = applyFilters(deals, filters);
  renderGrid(shown, grid, empty);
  count.textContent =
    shown.length === deals.length
      ? "Showing all " + deals.length + " deals"
      : "Showing " + shown.length + " of " + deals.length + " deals";
}

fillPicker(category, distinctValues(deals, "category"));
fillPicker(store, distinctValues(deals, "store"));
search.value = filters.query;
category.value = filters.category;
store.value = filters.store;
minDiscount.value = String(filters.minDiscount);
sort.value = filters.sort;
checkedLine.textContent = CHECKED_LABEL + " · Prices in US dollars · Deals run through Cyber Monday, 30 Nov 2026";
renderStats(deals, stats);

for (const control of [search, category, store, minDiscount, sort]) {
  control.addEventListener("input", refresh);
}
refresh();
