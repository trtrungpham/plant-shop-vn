"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Truck, Store, Copy, Phone } from "lucide-react";
import { useOrders, STATUS_LABEL, STATUS_COLOR } from "@/components/OrdersProvider";
import { formatVND } from "@/lib/format";
import { shopSlug } from "@/lib/products";
import Footer from "@/components/Footer";

export default function OrderDetailPage(props: PageProps<"/orders/[id]">) {
  const { id } = use(props.params);
  const { getOrder, cancelOrder } = useOrders();
  const order = getOrder(id);

  if (!order) {
    return (
      <>
        <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
          <Link href="/orders" className="w-8 h-8 flex items-center justify-center -ml-1">
            <ArrowLeft size={22} />
          </Link>
          <h1 className="flex-1 text-base font-semibold">Đơn hàng</h1>
        </header>
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <p className="text-[14px]">Không tìm thấy đơn hàng</p>
          <Link href="/orders" className="mt-4 text-tt-red text-[13px]">
            ← Quay lại danh sách đơn
          </Link>
        </div>
      </>
    );
  }

  const dateStr = new Date(order.createdAt).toLocaleString("vi-VN");

  return (
    <>
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <Link href="/orders" className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold">Chi tiết đơn hàng</h1>
      </header>

      {/* Status banner */}
      <section className="bg-gradient-to-r from-tt-red to-[#ff6e47] text-white px-4 py-4">
        <div className="flex items-center gap-3">
          <Truck size={28} />
          <div className="flex-1">
            <div className="font-semibold">{STATUS_LABEL[order.status]}</div>
            <div className="text-[11px] opacity-90 mt-0.5">
              {order.status === "pending" && "Shop sẽ xác nhận đơn trong 10 phút"}
              {order.status === "packing" && "Shop đang chuẩn bị hàng cho bạn"}
              {order.status === "shipping" && "Shipper đang trên đường đến"}
              {order.status === "delivered" && "Đơn đã được giao thành công"}
              {order.status === "review" && "Hãy để lại đánh giá giúp shop nhé!"}
              {order.status === "cancelled" && "Đơn đã bị huỷ"}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery address */}
      <section className="bg-white mt-2 px-3 py-3">
        <div className="flex items-start gap-2">
          <MapPin size={18} className="text-tt-red shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-[13px] font-semibold">Địa chỉ nhận hàng</div>
            <div className="text-[13px] mt-1">{order.customerName} — {order.customerPhone}</div>
            <div className="text-[12px] text-gray-600 mt-0.5">{order.shippingAddress}</div>
            {order.note && (
              <div className="text-[11px] text-gray-500 mt-1">Ghi chú: {order.note}</div>
            )}
          </div>
        </div>
      </section>

      {/* Shop + Items */}
      <section className="bg-white mt-2">
        <div className="px-3 py-2.5 flex items-center justify-between border-b border-gray-50">
          <Link
            href={`/shop/${shopSlug(order.items[0]?.shop || "PlantShop")}`}
            className="flex items-center gap-1.5 text-[13px] font-semibold"
          >
            <Store size={14} />
            {order.items[0]?.shop ?? "PlantShop"}
          </Link>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[order.status]}`}>
            {STATUS_LABEL[order.status]}
          </span>
        </div>
        {order.items.map((item) => (
          <Link
            href={`/product/${item.id}`}
            key={item.id}
            className="px-3 py-3 flex gap-2.5 border-b border-gray-50 last:border-0"
          >
            <div className="relative w-[64px] h-[64px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] line-clamp-2 leading-tight">{item.name}</h3>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-tt-red font-semibold text-[13px]">{formatVND(item.price)}</div>
                <div className="text-[12px] text-gray-500">x{item.qty}</div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Summary */}
      <section className="bg-white mt-2 px-3 py-3 text-[13px] space-y-1.5">
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tiền hàng</span>
          <span>{formatVND(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className={order.shipping === 0 ? "text-green-600" : ""}>
            {order.shipping === 0 ? "Miễn phí" : formatVND(order.shipping)}
          </span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Giảm giá</span>
            <span className="text-tt-red">-{formatVND(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-gray-100 font-semibold">
          <span>Thành tiền</span>
          <span className="text-tt-red text-base">{formatVND(order.total)}</span>
        </div>
      </section>

      {/* Meta */}
      <section className="bg-white mt-2 px-3 py-3 text-[12px] space-y-2">
        <Row label="Mã đơn" value={<CopyValue value={order.id} />} />
        <Row label="Thời gian đặt" value={dateStr} />
        <Row label="Thanh toán" value={order.paymentMethod} />
        {order.voucherCode && <Row label="Voucher" value={<code>{order.voucherCode}</code>} />}
      </section>

      {/* Actions */}
      <section className="mt-2 px-3 py-3 flex gap-2">
        <a
          href="tel:19001234"
          className="flex-1 flex items-center justify-center gap-1.5 border border-gray-300 text-gray-700 py-2.5 rounded-full text-[13px]"
        >
          <Phone size={14} /> Gọi hỗ trợ
        </a>
        {(order.status === "pending" || order.status === "packing") && (
          <button
            onClick={() => {
              if (confirm("Xác nhận huỷ đơn?")) cancelOrder(order.id);
            }}
            className="flex-1 border border-tt-red text-tt-red py-2.5 rounded-full text-[13px]"
          >
            Huỷ đơn
          </button>
        )}
        {order.status === "delivered" && (
          <button className="flex-1 bg-tt-red text-white py-2.5 rounded-full text-[13px] font-semibold">
            Đánh giá
          </button>
        )}
      </section>

      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function CopyValue({ value }: { value: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(value);
      }}
      className="font-mono flex items-center gap-1"
    >
      {value}
      <Copy size={12} className="text-gray-400" />
    </button>
  );
}
