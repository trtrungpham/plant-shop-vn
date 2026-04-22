import { Settings, Package, Heart, Coins, Tag, MessageCircle, ChevronRight, Truck, Star, RotateCcw } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const orderStatuses = [
  { icon: Package, label: "Chờ xác nhận" },
  { icon: Truck, label: "Chờ lấy hàng" },
  { icon: RotateCcw, label: "Đang giao" },
  { icon: Star, label: "Đánh giá" },
];

const menu = [
  { icon: Heart, label: "Yêu thích" },
  { icon: Coins, label: "Xu của tôi", value: "0 xu" },
  { icon: Tag, label: "Voucher", value: "12 ưu đãi" },
  { icon: MessageCircle, label: "Trợ giúp" },
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-tt-red to-[#ff6e47] px-4 pt-8 pb-6 text-white relative">
        <div className="absolute top-3 right-3 flex gap-3">
          <Link href="/cart"><Settings size={22} /></Link>
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

      {/* Orders */}
      <section className="bg-white mx-3 -mt-4 rounded-xl p-3 shadow-sm relative z-10">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold">Đơn hàng của tôi</h3>
          <Link href="/orders" className="text-[12px] text-gray-500 flex items-center">
            Xem tất cả <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 mt-3">
          {orderStatuses.map((o) => (
            <button key={o.label} className="flex flex-col items-center gap-1 text-gray-700">
              <o.icon size={22} className="text-tt-red" />
              <span className="text-[11px] leading-tight text-center">{o.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="bg-white mx-3 mt-3 rounded-xl overflow-hidden">
        {menu.map((m, i) => (
          <button
            key={m.label}
            className={`w-full flex items-center gap-3 px-3 py-3 ${
              i < menu.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <m.icon size={18} className="text-gray-700" />
            <span className="flex-1 text-left text-[13px]">{m.label}</span>
            {m.value && <span className="text-[12px] text-gray-500">{m.value}</span>}
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </section>

      <div className="text-center text-[11px] text-gray-400 mt-6 mb-3">
        PlantShop v1.0 • Made with 🌿
      </div>
      <Footer />
    </div>
  );
}
