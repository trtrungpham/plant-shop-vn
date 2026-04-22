"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { formatVND } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [placed, setPlaced] = useState(false);

  const shipping = 0;
  const discount = Math.min(25000, Math.floor(total * 0.05));
  const finalTotal = total + shipping - discount;

  const placeOrder = () => {
    if (!name || !phone || !address) {
      alert("Vui lòng nhập đủ họ tên, SĐT và địa chỉ");
      return;
    }
    setPlaced(true);
    clear();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <CheckCircle2 size={64} className="text-green-500" />
        <h1 className="text-xl font-bold mt-3">Đặt hàng thành công!</h1>
        <p className="text-sm text-gray-500 mt-1">
          Cảm ơn bạn đã mua sắm tại PlantShop 🌿
        </p>
        <Link
          href="/"
          className="mt-6 bg-tt-red text-white font-semibold px-6 py-2.5 rounded-full text-sm"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Không có sản phẩm trong đơn
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-[80px]">
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </button>
        <h1 className="flex-1 text-base font-semibold">Thanh toán</h1>
      </header>

      {/* Address */}
      <section className="bg-white px-3 py-3 mt-2">
        <div className="flex items-start gap-2">
          <MapPin size={18} className="text-tt-red shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-[13px] font-semibold">Địa chỉ nhận hàng</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Họ tên"
              className="mt-2 w-full text-[13px] border-b border-gray-100 py-1.5 outline-none focus:border-tt-red"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              className="mt-1 w-full text-[13px] border-b border-gray-100 py-1.5 outline-none focus:border-tt-red"
              inputMode="tel"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Địa chỉ cụ thể (số nhà, phường, quận, tỉnh)"
              rows={2}
              className="mt-1 w-full text-[13px] border-b border-gray-100 py-1.5 outline-none focus:border-tt-red resize-none"
            />
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="bg-white mt-2">
        {items.map((item) => (
          <div key={item.id} className="px-3 py-3 flex gap-2.5 border-b border-gray-50 last:border-0">
            <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image src={item.image} alt={item.name} fill sizes="60px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-gray-500">{item.shop}</div>
              <h3 className="text-[13px] line-clamp-2 leading-tight">{item.name}</h3>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-tt-red font-semibold text-[13px]">
                  {formatVND(item.price)}
                </div>
                <div className="text-[12px] text-gray-500">x{item.qty}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Note */}
      <section className="bg-white mt-2 px-3 py-3">
        <label className="text-[13px] font-medium">Ghi chú cho shop</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="VD: Giao giờ hành chính, gói kỹ, tặng thiệp..."
          className="mt-1 w-full text-[13px] border-b border-gray-100 py-1.5 outline-none focus:border-tt-red"
        />
      </section>

      {/* Shipping */}
      <section className="bg-white mt-2 px-3 py-3 flex items-center justify-between text-[13px]">
        <span className="text-gray-600">Đơn vị vận chuyển</span>
        <span className="flex items-center gap-1">
          Nhanh (Miễn phí) <ChevronRight size={14} className="text-gray-400" />
        </span>
      </section>

      {/* Payment method */}
      <section className="bg-white mt-2 px-3 py-3 flex items-center justify-between text-[13px]">
        <span className="text-gray-600">Phương thức thanh toán</span>
        <span className="flex items-center gap-1">
          COD <ChevronRight size={14} className="text-gray-400" />
        </span>
      </section>

      {/* Summary */}
      <section className="bg-white mt-2 px-3 py-3 text-[13px] space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tiền hàng</span>
          <span>{formatVND(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="text-green-600">Miễn phí</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Voucher giảm</span>
          <span className="text-tt-red">-{formatVND(discount)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-100 font-semibold">
          <span>Tổng thanh toán</span>
          <span className="text-tt-red text-base">{formatVND(finalTotal)}</span>
        </div>
      </section>

      {/* Place order bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-3 py-3 flex items-center gap-3 z-30">
        <div className="flex-1">
          <div className="text-[11px] text-gray-500">Tổng</div>
          <div className="text-tt-red font-bold text-xl">{formatVND(finalTotal)}</div>
        </div>
        <button
          onClick={placeOrder}
          className="bg-gradient-to-r from-tt-red to-[#ff3d5b] text-white font-bold px-6 py-3 rounded-full text-sm"
        >
          Đặt hàng
        </button>
      </div>
    </div>
  );
}
