/** INR — single source of truth for storefront money display (en-IN grouping). */
const INR_LOCALE = "en-IN";

export function formatInr(amount: number): string {
  const n = Number.isFinite(amount) ? amount : 0;
  return `₹${Math.round(n).toLocaleString(INR_LOCALE)}`;
}

/** Matches footer “free shipping over ₹15,000” messaging. */
export const FREE_SHIPPING_THRESHOLD_INR = 15_000;

export const SHIPPING_STANDARD_INR = 499;
export const SHIPPING_EXPRESS_INR = 1_499;
