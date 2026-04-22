export function formatVND(n: number): string {
  return n.toLocaleString("vi-VN") + "đ";
}

export function formatCompact(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k";
  return String(n);
}

export function percentOff(original: number, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
