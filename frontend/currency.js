export const DELIVERY_FEE = 49;

const LEGACY_USD_TO_INR = 83;

function parseAmount(value) {
  if (typeof value === 'string') {
    return Number.parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
  }
  return Number.parseFloat(value) || 0;
}

export function toRupees(value) {
  const amount = parseAmount(value);
  if (typeof value === 'string' && value.includes('₹')) return Math.round(amount);
  if (typeof value === 'string' && value.includes('$')) return Math.round(amount * LEGACY_USD_TO_INR);
  if (amount > 0 && amount < 25) return Math.round(amount * LEGACY_USD_TO_INR);
  return Math.round(amount);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(parseAmount(value));
}

export function normalizeStoredOrderAmount(value) {
  const amount = parseAmount(value);
  if (amount > 0 && amount < 100) return Math.round(amount * LEGACY_USD_TO_INR);
  return Math.round(amount);
}

export function formatDeliveryFee(value) {
  if (typeof value === 'string' && value.trim().toLowerCase() === 'free') return 'Free';
  if (typeof value === 'string' && value.includes('$')) return formatCurrency(toRupees(value));
  return formatCurrency(value || DELIVERY_FEE);
}
