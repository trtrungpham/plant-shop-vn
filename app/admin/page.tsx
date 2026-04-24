"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, ShoppingBag, DollarSign, TrendingUp, Users, Eye, EyeOff, Store, Ticket, BarChart3 } from "lucide-react";
import { useOrders, STATUS_LABEL, STATUS_COLOR, type OrderStatus } from "@/components/OrdersProvider";
import { products, getShops } from "@/lib/products";
import { formatVND } from "@/lib/format";

const ADMIN_KEY = "plantshop_admin_v1";
const ADMIN_PASS = "plantshop2026"; // demo password

export default function AdminDashboard() {
  const { orders, setStatus } = useOrders();
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState<"overview" | "orders" | "products" | "shops">("overview");

  useEffect(() => {
    setAuthed(localStorage.getItem(ADMIN_KEY) === "1");
  }, []);

  const login = () => {
    if (pass === ADMIN_PASS) {
      localStorage.setItem(ADMIN_KEY, "1");
      setAuthed(true);
    } else {
      alert("Sai mật khẩu. Gợi ý: plantshop2026 (demo)");
    }
  };
  const logout = () => {
    localStorage.removeItem(ADMIN_KEY);
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-brand-red/40 flex flex-col items-center justify-center px-6">
        <div className="w-full bg-white rounded-2xl p-6">
          <div className="text-center">
            <div className="text-4xl mb-2">🌿</div>
            <h1 className="text-lg font-bold">PlantShop Admin</h1>
            <p className="text-[12px] text-gray-500 mt-1">Đăng nhập để quản lý shop</p>
          </div>
          <div className="relative mt-4">
            <input
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Mật khẩu admin"
              className="w-full h-11 border border-gray-200 rounded-lg px-3 pr-10 text-[13px] outline-none focus:border-brand-red"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button
            onClick={login}
            className="mt-3 w-full bg-brand-red text-white font-semibold py-2.5 rounded-lg text-sm"
          >
            Đăng nhập
          </button>
          <p className="text-[10px] text-gray-400 mt-3 text-center">
            Demo password: <code>plantshop2026</code>
          </p>
        </div>
        <Link href="/" className="text-white/80 text-[12px] mt-4">← Về trang chủ</Link>
      </div>
    );
  }

  // Stats
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const shippingCount = orders.filter((o) => o.status === "shipping").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const shops = getShops();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-30 bg-gray-900 text-white px-3 py-3 flex items-center gap-2">
        <Link href="/" className="w-8 h-8 flex items-center justify-center">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 font-semibold">PlantShop Admin</h1>
        <button onClick={logout} className="text-[12px] text-white/70">Đăng xuất</button>
      </header>

      {/* Tabs */}
      <nav className="sticky top-[52px] z-20 bg-white border-b border-gray-100 flex overflow-x-auto no-scrollbar">
        {[
          { key: "overview", label: "Tổng quan", Icon: BarChart3 },
          { key: "orders", label: "Đơn hàng", Icon: ShoppingBag },
          { key: "products", label: "Sản phẩm", Icon: Package },
          { key: "shops", label: "Shop", Icon: Store },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`shrink-0 px-3 py-2.5 text-[12px] flex items-center gap-1 relative ${
              tab === t.key ? "text-brand-red font-semibold" : "text-gray-600"
            }`}
          >
            <t.Icon size={14} />
            {t.label}
            {tab === t.key && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-brand-red rounded-full" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-3">
        {tab === "overview" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <StatCard
                label="Doanh thu"
                value={formatVND(totalRevenue)}
                icon={DollarSign}
                color="bg-green-100 text-green-700"
              />
              <StatCard
                label="Đơn hàng"
                value={orders.length.toString()}
                icon={ShoppingBag}
                color="bg-blue-100 text-blue-700"
              />
              <StatCard
                label="Sản phẩm"
                value={products.length.toString()}
                icon={Package}
                color="bg-amber-100 text-amber-700"
              />
              <StatCard
                label="Số shop"
                value={shops.length.toString()}
                icon={Users}
                color="bg-purple-100 text-purple-700"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <MiniStat label="Chờ xác nhận" value={pendingCount} highlight={pendingCount > 0} />
              <MiniStat label="Đang giao" value={shippingCount} />
              <MiniStat label="Hoàn thành" value={deliveredCount} />
            </div>

            <div className="bg-white rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[13px] font-semibold">Đơn gần đây</h3>
                <button onClick={() => setTab("orders")} className="text-[11px] text-brand-red">
                  Xem tất cả →
                </button>
              </div>
              {orders.length === 0 ? (
                <p className="text-[12px] text-gray-500 text-center py-4">
                  Chưa có đơn hàng nào. Hãy đặt thử một đơn ở trang chủ.
                </p>
              ) : (
                <div className="space-y-2">
                  {orders.slice(0, 5).map((o) => (
                    <Link
                      key={o.id}
                      href={`/orders/${o.id}`}
                      className="flex items-center gap-2 text-[12px]"
                    >
                      <div className="font-mono text-gray-500 text-[11px]">{o.id}</div>
                      <div className="flex-1 truncate">{o.customerName}</div>
                      <div className="text-brand-red font-semibold">{formatVND(o.total)}</div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded ${STATUS_COLOR[o.status]}`}>
                        {STATUS_LABEL[o.status]}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link href="/vouchers" className="bg-white rounded-xl p-3 flex flex-col items-center text-center">
                <Ticket size={24} className="text-brand-red" />
                <span className="text-[13px] font-semibold mt-1">Voucher</span>
                <span className="text-[11px] text-gray-500">Quản lý khuyến mãi</span>
              </Link>
              <Link href="/flash-sale" className="bg-white rounded-xl p-3 flex flex-col items-center text-center">
                <TrendingUp size={24} className="text-brand-orange" />
                <span className="text-[13px] font-semibold mt-1">Flash Sale</span>
                <span className="text-[11px] text-gray-500">Xem khung giờ vàng</span>
              </Link>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="bg-white rounded-xl overflow-hidden">
            {orders.length === 0 ? (
              <p className="text-[12px] text-gray-500 text-center py-10">Chưa có đơn hàng.</p>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="px-3 py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between">
                    <Link href={`/orders/${o.id}`} className="font-mono text-[12px] text-brand-red">
                      {o.id}
                    </Link>
                    <StatusSelect
                      value={o.status}
                      onChange={(next) => setStatus(o.id, next)}
                    />
                  </div>
                  <div className="text-[12px] mt-1">
                    {o.customerName} — {o.customerPhone}
                  </div>
                  <div className="text-[11px] text-gray-500">{o.shippingAddress}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">
                      {o.items.length} SP • {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="text-brand-red font-semibold text-[13px]">
                      {formatVND(o.total)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "products" && (
          <div className="bg-white rounded-xl overflow-hidden">
            {products.map((p) => (
              <Link
                href={`/product/${p.id}`}
                key={p.id}
                className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-50 last:border-0"
              >
                <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden shrink-0">
                  <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] line-clamp-1">{p.name}</div>
                  <div className="text-[10px] text-gray-500">
                    {p.shop} • Kho: 100 • Đã bán: {p.sold}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-brand-red font-semibold text-[12px]">{formatVND(p.price)}</div>
                  {p.flashSale && (
                    <div className="text-[9px] bg-brand-red text-white px-1 rounded">SALE</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {tab === "shops" && (
          <div className="bg-white rounded-xl overflow-hidden">
            {shops.map((s) => (
              <Link
                href={`/shop/${s.slug}`}
                key={s.slug}
                className="flex items-center gap-3 px-3 py-3 border-b border-gray-50 last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-200 to-green-500 flex items-center justify-center text-white font-bold shrink-0">
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold truncate">{s.name}</div>
                  <div className="text-[11px] text-gray-500">{s.count} sản phẩm</div>
                </div>
                <span className="text-brand-red text-[11px]">Xem →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: typeof Package;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-3">
      <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center`}>
        <Icon size={16} />
      </div>
      <div className="mt-2 text-[11px] text-gray-500">{label}</div>
      <div className="font-bold text-sm mt-0.5">{value}</div>
    </div>
  );
}

function MiniStat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-2.5 text-center ${highlight ? "bg-brand-red text-white" : "bg-white"}`}>
      <div className="text-lg font-bold">{value}</div>
      <div className={`text-[10px] ${highlight ? "opacity-90" : "text-gray-500"}`}>{label}</div>
    </div>
  );
}

function StatusSelect({
  value,
  onChange,
}: {
  value: OrderStatus;
  onChange: (v: OrderStatus) => void;
}) {
  const options: OrderStatus[] = ["pending", "packing", "shipping", "delivered", "review", "cancelled"];
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as OrderStatus)}
      className={`text-[10px] px-2 py-1 rounded-full border-0 ${STATUS_COLOR[value]}`}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {STATUS_LABEL[o]}
        </option>
      ))}
    </select>
  );
}
