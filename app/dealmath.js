// Deal maths: every number the site shows is computed here from the deal's
// own price and usual price, so a card can never show a discount that does
// not match its two prices.

export function discountPct(deal) {
  if (!deal.was || deal.was <= deal.price) return 0;
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function saved(deal) {
  return Math.max(0, deal.was - deal.price);
}

export function money(amount) {
  return "$" + amount.toFixed(2).replace(/\.00$/, "");
}

// Verdict bands, shared by the cards and the sort order. A "New low" is a
// cut of half or more; "Strong price" is 40% or more; "Good price" is 20%
// or more; anything smaller is a routine sale, said out loud.
export function verdictRank(verdict) {
  if (verdict === "New low") return 0;
  if (verdict === "Strong price") return 1;
  if (verdict === "Good price") return 2;
  return 3;
}

export function verdictClass(verdict) {
  if (verdict === "New low") return "verdict-new";
  if (verdict === "Strong price") return "verdict-strong";
  if (verdict === "Good price") return "verdict-good";
  return "verdict-routine";
}
