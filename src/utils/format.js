export function formatCurrency(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

export function starString(rating) {
  const r = Math.max(0, Math.min(5, Number(rating) || 0));
  return '★'.repeat(r) + '☆'.repeat(5 - r);
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
