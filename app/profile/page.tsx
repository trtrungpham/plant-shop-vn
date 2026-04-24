"use client";

import {
  Settings,
  Package,
  Heart,
  Coins,
  Tag,
  MessageCircle,
  ChevronRight,
  Truck,
  Star,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useWishlist } from "@/components/WishlistProvider";
import { useOrders } from "@/components/OrdersProvider";

const orderStatuses: { icon: typeof Package; label: string; status: string }[] = [
  { icon: Package, label: "Chờ xác nhận", status: "pending" },
  { icon: Truck, label: "Đang giao", status: "shipping" },
  { icon: RotateCcw, label: "Đã giao", status: "delivered" },
  { icon: Star, label: "Đánh giá", status: "review" },
];

export default function ProfilePage() {
  const { count: wishCount } = useWishlist();
  const { orders } = useOrders();

  const menu = [
    { icon: Heart, label: "Yêu thích", value: wishCount > 0 ? `${wishCount}` : "", href: "/wishlist" },
    { icon: Tag, label: "Voucher", value: "6 ưu đãi", href: "/vouchers" },
    { icon: Coins, label: "Xu của tôi", value: "0 xu", href: "#" },
    { icon: ShieldCheck, label: "Admin shop", value: "", href: "/admin" },
    { icon: MessageCircle, label: "Tin nhắn", value: "", href: "/messages" },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-brand-red to-[#ff6e47] px-4 pt-8 pb-6 text-white relative">
        <div className="absolute top-3 right-3 flex gap-3">
          <Link href="/admin" aria-label="Cài đặt">
            <Settings size={22} />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-2xl">
            🌱
          </div>
          <div>
            <div className="text-lg font-bold">Khách PlantShop</div>
            <div className="text-xs opacity-90">Đăng nhập để nhận voucher</div>
          </div>
        </div>
      </div>

      <section className="bg-white mx-3 -mt-4 rounded-xl p-3 shadow-sm relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold">Đơn hàng của tôi</h3>
          <Link href="/orders" className="text-[12px] text-gray-500 flex items-center">
            Xem tất cả ({orders.length}) <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 mt-3">
          {orderStatuses.map((o) => {
            const n = orders.filter((order) => order.status === o.status).length;
            return (
              <Link
                key={o.label}
                href={`/orders?tab=${o.status}`}
                className="flex flex-col items-center gap-1 text-gray-700 relative"
              >
                <div className="relative">
                  <o.icon size={22} className="text-brand-red" />
                  {n > 0 && (
                    <span className="absolute -top-1 -right-2 bg-brand-red text-white text-[9px] leading-none font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                      {n}
                    </span>
                  )}
                </div>
                <span className="text-[11px] leading-tight text-center">{o.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white mx-3 mt-3 rounded-xl overflow-hidden">
        {menu.map((m, i) => (
          <Link
            key={m.label}
            href={m.href}
            className={`w-full flex items-center gap-3 px-3 py-3 ${
              i < menu.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <m.icon size={18} className="text-gray-700" />
            <span className="flex-1 text-left text-[13px]">{m.label}</span>
            {m.value && <span className="text-[12px] text-gray-500">{m.value}</span>}
            <ChevronRight size={16} className="text-gray-400" />
          </Link>
        ))}
      </section>

      <div className="text-center text-[11px] text-gray-400 mt-6 mb-3">
        PlantShop v1.1 • Made with 🌿
      </div>
      <Footer />
    </div>
  );
}
