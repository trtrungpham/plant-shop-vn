export type Voucher = {
  code: string;
  title: string;
  description: string;
  type: "percent" | "amount" | "freeship";
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiresAt: number;
  category: "freeship" | "discount" | "gift";
  badge?: string;
};

const DAY = 24 * 3600 * 1000;
const now = Date.now();

export const VOUCHERS: Voucher[] = [
  {
    code: "FREESHIP250",
    title: "Freeship 40K",
    description: "Giảm 40.000đ phí vận chuyển cho đơn từ 250K. Áp dụng toàn quốc.",
    type: "freeship",
    value: 40000,
    minOrder: 250000,
    expiresAt: now + 30 * DAY,
    category: "freeship",
    badge: "Freeship",
  },
  {
    code: "WELCOME15",
    title: "Giảm 15K cho đơn đầu",
    description: "Giảm 15.000đ cho đơn hàng đầu tiên, không yêu cầu mức tối thiểu.",
    type: "amount",
    value: 15000,
    minOrder: 0,
    expiresAt: now + 7 * DAY,
    category: "discount",
    badge: "Mã mới",
  },
  {
    code: "SALE10",
    title: "Giảm 10% tối đa 50K",
    description: "Giảm 10% giá trị đơn hàng, tối đa 50K, áp dụng đơn từ 300K.",
    type: "percent",
    value: 10,
    minOrder: 300000,
    maxDiscount: 50000,
    expiresAt: now + 14 * DAY,
    category: "discount",
  },
  {
    code: "VIP100",
    title: "Giảm 100K cho đơn từ 1 triệu",
    description: "Ưu đãi VIP cho đơn hàng lớn — giảm ngay 100.000đ.",
    type: "amount",
    value: 100000,
    minOrder: 1000000,
    expiresAt: now + 20 * DAY,
    category: "discount",
    badge: "VIP",
  },
  {
    code: "PLANT20",
    title: "Giảm 20% tối đa 150K",
    description: "Flash sale tháng 4 — giảm 20%, tối đa 150K cho đơn từ 500K.",
    type: "percent",
    value: 20,
    minOrder: 500000,
    maxDiscount: 150000,
    expiresAt: now + 5 * DAY,
    category: "discount",
    badge: "HOT",
  },
  {
    code: "GIFTWRAP",
    title: "Miễn phí gói quà cao cấp",
    description: "Tặng gói quà thiết kế Valentine + thiệp handwritten cho đơn từ 200K.",
    type: "amount",
    value: 0,
    minOrder: 200000,
    expiresAt: now + 10 * DAY,
    category: "gift",
    badge: "Quà",
  },
];

export function getVoucher(code: string): Voucher | undefined {
  return VOUCHERS.find((v) => v.code.toLowerCase() === code.toLowerCase());
}

export function calculateVoucherDiscount(v: Voucher, subtotal: number): number {
  if (subtotal < v.minOrder) return 0;
  if (v.type === "freeship") return v.value;
  if (v.type === "amount") return v.value;
  if (v.type === "percent") {
    const raw = Math.floor(subtotal * (v.value / 100));
    return v.maxDiscount ? Math.min(raw, v.maxDiscount) : raw;
  }
  return 0;
}
