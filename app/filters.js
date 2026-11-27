// Filtering and sorting: the search box, the category and store pickers,
// the minimum-discount picker and the sort order, applied to the deals.

import { discountPct, verdictRank } from "./dealmath.js";

export function emptyFilters() {
  return { query: "", category: "All", store: "All", minDiscount: 0, sort: "best" };
}

export function applyFilters(allDeals, filters) {
  const needle = filters.query.trim().toLowerCase();
  const kept = allDeals.filter((deal) => {
    if (filters.category !== "All" && deal.category !== filters.category) return false;
    if (filters.store !== "All" && deal.store !== filters.store) return false;
    if (discountPct(deal) < filters.minDiscount) return false;
    if (needle) {
      const haystack = (deal.title + " " + deal.store + " " + deal.category).toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });

  // "Best first" is the shopper's order: the strongest verdict, then the
  // deepest cut, then the lowest price. The other sorts are plain.
  if (filters.sort === "discount") {
    kept.sort((a, b) => discountPct(b) - discountPct(a) || a.price - b.price);
  } else if (filters.sort === "price-low") {
    kept.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "price-high") {
    kept.sort((a, b) => b.price - a.price);
  } else {
    kept.sort(
      (a, b) =>
        verdictRank(a.verdict) - verdictRank(b.verdict) ||
        discountPct(b) - discountPct(a) ||
        a.price - b.price,
    );
  }
  return kept;
}

export function distinctValues(allDeals, field) {
  return [...new Set(allDeals.map((deal) => deal[field]))].sort();
}
