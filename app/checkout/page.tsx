"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, ChevronRight, CircleCheck as CheckCircle2, Ticket, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useOrders } from "@/components/OrdersProvider";
import { formatVND } from "@/lib/format";
import { VOUCHERS, getVoucher, calculateVoucherDiscount, type Voucher } from "@/lib/vouchers";

const PAYMENT_METHODS = [
  { key: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: "💵" },
  { key: "bank", label: "Chuyển khoản ngân hàng", icon: "🏦" },
  { key: "momo", label: "Ví Momo", icon: "📱" },
  { key: "zalopay", label: "ZaloPay", icon: "💳" },
  { key: "vnpay", label: "VNPay QR", icon: "📷" },
  { key: "paylater", label: "PayLater (trả sau 0%)", icon: "🕒" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total: subtotal, clear } = useCart();
  const { addOrder } = useOrders();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState(PAYMENT_METHODS[0]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [voucherOpen, setVoucherOpen] = useState(false);
  const [voucherInput, setVoucherInput] = useState("");
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const discount = useMemo(() => (voucher ? calculateVoucherDiscount(voucher, subtotal) : 0), [voucher, subtotal]);
  const shippingFee = subtotal >= 250000 ? 0 : 20000;
  const shippingPaid = voucher?.type === "freeship" ? Math.max(0, shippingFee - voucher.value) : shippingFee;
  const effectiveDiscount = voucher?.type === "freeship" ? 0 : discount;
  const freeshipSaved = voucher?.type === "freeship" ? Math.min(voucher.value, shippingFee) : 0;
  const finalTotal = subtotal + shippingPaid - effectiveDiscount;

  const applyVoucherCode = () => {
    const v = getVoucher(voucherInput.trim());
    if (!v) return alert("Mã voucher không hợp lệ");
    if (subtotal < v.minOrder) return alert(`Đơn tối thiểu ${formatVND(v.minOrder)} để dùng mã này`);
    setVoucher(v);
    setVoucherOpen(false);
  };

  const placeOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Vui lòng nhập đủ họ tên, SĐT và địa chỉ");
      return;
    }
    const order = addOrder({
      items,
      subtotal,
      discount: effectiveDiscount + freeshipSaved,
      shipping: shippingPaid,
      total: finalTotal,
      customerName: name,
      customerPhone: phone,
      shippingAddress: address,
      note,
      paymentMethod: payment.label,
      voucherCode: voucher?.code,
    });
    setPlacedOrderId(order.id);
    clear();
  };

  if (placedOrderId) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <CheckCircle2 size={64} className="text-green-500" />
        <h1 className="text-xl font-bold mt-3">Đặt hàng thành công!</h1>
        <p className="text-sm text-gray-500 mt-1">
          Mã đơn: <span className="font-mono font-semibold text-gray-800">{placedOrderId}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">Cảm ơn bạn đã mua sắm tại PlantShop 🌿</p>
        <div className="flex gap-2 mt-6">
          <Link
            href={`/orders/${placedOrderId}`}
            className="bg-white border border-tt-red text-tt-red font-semibold px-5 py-2.5 rounded-full text-sm"
          >
            Xem đơn hàng
          </Link>
          <Link
            href="/"
            className="bg-tt-red text-white font-semibold px-5 py-2.5 rounded-full text-sm"
          >
            Tiếp tục mua
          </Link>
        </div>
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

  const eligibleVouchers = VOUCHERS.filter((v) => subtotal >= v.minOrder);

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-[80px]">
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <button onClick={() => router.back()} className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </button>
        <h1 className="flex-1 text-base font-semibold">Thanh toán</h1>
      </header>

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
                <div className="text-tt-red font-semibold text-[13px]">{formatVND(item.price)}</div>
                <div className="text-[12px] text-gray-500">x{item.qty}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white mt-2 px-3 py-3">
        <label className="text-[13px] font-medium">Ghi chú cho shop</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="VD: Giao giờ hành chính, gói kỹ, tặng thiệp..."
          className="mt-1 w-full text-[13px] border-b border-gray-100 py-1.5 outline-none focus:border-tt-red"
        />
      </section>

      {/* Voucher selector */}
      <button
        onClick={() => setVoucherOpen(true)}
        className="bg-white mt-2 px-3 py-3 w-full flex items-center gap-2 text-[13px] text-left"
      >
        <Ticket size={18} className="text-tt-red" />
        <span className="flex-1">
          {voucher ? (
            <span className="text-tt-red font-semibold">
              {voucher.title}
              {voucher.type !== "freeship" && discount > 0 && (
                <span className="text-gray-500 font-normal"> — giảm {formatVND(discount)}</span>
              )}
            </span>
          ) : (
            <span className="text-gray-700">Chọn hoặc nhập mã voucher</span>
          )}
        </span>
        <ChevronRight size={14} className="text-gray-400" />
      </button>

      {/* Shipping */}
      <section className="bg-white mt-2 px-3 py-3 flex items-center justify-between text-[13px]">
        <span className="text-gray-600">Đơn vị vận chuyển</span>
        <span className="flex items-center gap-1">
          Nhanh {shippingFee === 0 ? "(Miễn phí)" : `(${formatVND(shippingFee)})`}
          <ChevronRight size={14} className="text-gray-400" />
        </span>
      </section>

      {/* Payment method */}
      <button
        onClick={() => setPaymentOpen(true)}
        className="bg-white mt-2 px-3 py-3 w-full flex items-center justify-between text-[13px]"
      >
        <span className="text-gray-600">Phương thức thanh toán</span>
        <span className="flex items-center gap-1">
          <span className="mr-1">{payment.icon}</span>
          {payment.label.split(" (")[0]}
          <ChevronRight size={14} className="text-gray-400" />
        </span>
      </button>

      {/* Summary */}
      <section className="bg-white mt-2 px-3 py-3 text-[13px] space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Tổng tiền hàng</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className={shippingPaid === 0 ? "text-green-600" : ""}>
            {shippingPaid === 0 ? "Miễn phí" : formatVND(shippingPaid)}
          </span>
        </div>
        {freeshipSaved > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Voucher freeship</span>
            <span className="text-tt-red">-{formatVND(freeshipSaved)}</span>
          </div>
        )}
        {effectiveDiscount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Voucher giảm</span>
            <span className="text-tt-red">-{formatVND(effectiveDiscount)}</span>
          </div>
        )}
        <div className="flex justify-between pt-2 border-t border-gray-100 font-semibold">
          <span>Tổng thanh toán</span>
          <span className="text-tt-red text-base">{formatVND(finalTotal)}</span>
        </div>
      </section>

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

      {/* Voucher bottom sheet */}
      {voucherOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={() => setVoucherOpen(false)}>
          <div
            className="w-full max-w-[480px] bg-white rounded-t-2xl max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="px-3 py-3 flex items-center justify-between border-b border-gray-100">
              <h3 className="font-semibold">Chọn voucher</h3>
              <button onClick={() => setVoucherOpen(false)}>
                <X size={20} />
              </button>
            </header>
            <div className="px-3 py-2 flex gap-2 border-b border-gray-100">
              <input
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
                placeholder="Nhập mã voucher"
                className="flex-1 h-9 px-3 bg-gray-100 rounded-full text-[13px] outline-none uppercase"
              />
              <button
                onClick={applyVoucherCode}
                className="bg-tt-red text-white text-sm font-semibold px-4 rounded-full"
              >
                Áp dụng
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {eligibleVouchers.length === 0 && (
                <p className="text-center text-sm text-gray-500 py-6">
                  Chưa có voucher nào phù hợp với đơn của bạn.
                </p>
              )}
              {eligibleVouchers.map((v) => {
                const isSelected = voucher?.code === v.code;
                return (
                  <button
                    key={v.code}
                    onClick={() => {
                      setVoucher(isSelected ? null : v);
                      setVoucherOpen(false);
                    }}
                    className={`w-full text-left flex items-center gap-3 border rounded-xl p-3 ${
                      isSelected ? "border-tt-red bg-tt-red/5" : "border-gray-200"
                    }`}
                  >
                    <div className="w-12 h-12 rounded bg-tt-red/10 flex items-center justify-center text-tt-red text-xl">
                      🎟
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold">{v.title}</div>
                      <div className="text-[11px] text-gray-500 line-clamp-1">{v.description}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5 font-mono">{v.code}</div>
                    </div>
                    {isSelected && <CheckCircle2 size={18} className="text-tt-red" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Payment bottom sheet */}
      {paymentOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={() => setPaymentOpen(false)}>
          <div
            className="w-full max-w-[480px] bg-white rounded-t-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="px-3 py-3 flex items-center justify-between border-b border-gray-100">
              <h3 className="font-semibold">Phương thức thanh toán</h3>
              <button onClick={() => setPaymentOpen(false)}>
                <X size={20} />
              </button>
            </header>
            <div className="p-3 space-y-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.key}
                  onClick={() => {
                    setPayment(m);
                    setPaymentOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left ${
                    payment.key === m.key ? "border-tt-red bg-tt-red/5" : "border-gray-200"
                  }`}
                >
                  <span className="text-xl">{m.icon}</span>
                  <span className="flex-1 text-[13px]">{m.label}</span>
                  {payment.key === m.key && <CheckCircle2 size={18} className="text-tt-red" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
