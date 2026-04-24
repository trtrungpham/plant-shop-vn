"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package } from "lucide-react";
import { useOrders, STATUS_LABEL, STATUS_COLOR, type OrderStatus } from "@/components/OrdersProvider";
import { formatVND } from "@/lib/format";
import Footer from "@/components/Footer";

const TABS: { key: OrderStatus | "all"; label: string }[] = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ xác nhận" },
  { key: "packing", label: "Đóng gói" },
  { key: "shipping", label: "Đang giao" },
  { key: "delivered", label: "Đã giao" },
  { key: "cancelled", label: "Đã huỷ" },
];

export default function OrdersPage() {
  const { orders, cancelOrder } = useOrders();
  const [tab, setTab] = useState<OrderStatus | "all">("all");
  const list = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <Link href="/profile" className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold">Đơn hàng của tôi</h1>
      </header>

      <section className="bg-white sticky top-[52px] z-20 flex overflow-x-auto no-scrollbar border-b border-gray-100">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 px-3 py-2.5 text-[12px] relative ${
              tab === t.key ? "text-brand-red font-semibold" : "text-gray-600"
            }`}
          >
            {t.label}
            {tab === t.key && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-brand-red rounded-full" />
            )}
          </button>
        ))}
      </section>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-6">
          <Package size={48} className="text-gray-300" />
          <p className="mt-3 text-[14px] font-medium">Chưa có đơn hàng nào</p>
          <p className="mt-1 text-[12px] text-gray-500">
            Các đơn bạn đặt sẽ xuất hiện ở đây
          </p>
          <Link
            href="/"
            className="mt-4 bg-brand-red text-white px-5 py-2 rounded-full text-sm font-medium"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="mt-2 space-y-2">
          {list.map((order) => (
            <div key={order.id} className="bg-white">
              <div className="px-3 py-2.5 flex items-center justify-between border-b border-gray-50">
                <span className="text-[11px] text-gray-500">
                  {order.items[0]?.shop ?? "PlantShop"} • {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[order.status]}`}>
                  {STATUS_LABEL[order.status]}
                </span>
              </div>
              <Link href={`/orders/${order.id}`} className="block px-3 py-3">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-2.5 mb-2 last:mb-0">
                    <div className="relative w-[64px] h-[64px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] line-clamp-2 leading-tight">{item.name}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="text-brand-red font-semibold text-[13px]">{formatVND(item.price)}</div>
                        <div className="text-[12px] text-gray-500">x{item.qty}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-[11px] text-gray-500">+ {order.items.length - 2} sản phẩm khác</div>
                )}
              </Link>
              <div className="px-3 py-2.5 border-t border-gray-50 flex items-center justify-between">
                <div className="text-[12px] text-gray-600">
                  {order.items.length} sản phẩm • Tổng:{" "}
                  <span className="text-brand-red font-semibold">{formatVND(order.total)}</span>
                </div>
                <div className="flex gap-1.5">
                  {(order.status === "pending" || order.status === "packing") && (
                    <button
                      onClick={() => {
                        if (confirm("Xác nhận huỷ đơn?")) cancelOrder(order.id);
                      }}
                      className="text-[11px] border border-gray-300 text-gray-700 px-3 py-1 rounded-full"
                    >
                      Huỷ
                    </button>
                  )}
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-[11px] bg-brand-red text-white font-semibold px-3 py-1 rounded-full"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
}
