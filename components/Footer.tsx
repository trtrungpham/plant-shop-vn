import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";
import { GLOBAL_HASHTAGS } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-6 bg-white border-t border-gray-100">
      {/* Trust badges */}
      <section className="px-3 py-4 grid grid-cols-4 gap-2 border-b border-gray-50">
        {[
          { Icon: ShieldCheck, label: "Bao sống", sub: "7 ngày" },
          { Icon: Truck, label: "Freeship", sub: "Từ 250K" },
          { Icon: RotateCcw, label: "Đổi trả", sub: "Lỗi 1 đổi 1" },
          { Icon: CreditCard, label: "PayLater", sub: "Trả sau 0%" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center text-center">
            <b.Icon size={20} className="text-tt-red" />
            <div className="text-[11px] font-semibold mt-1">{b.label}</div>
            <div className="text-[10px] text-gray-500">{b.sub}</div>
          </div>
        ))}
      </section>

      {/* Shop info */}
      <section className="px-3 py-4 border-b border-gray-50">
        <h3 className="text-[13px] font-bold">🌿 PlantShop VN</h3>
        <p className="text-[12px] text-gray-600 mt-1 leading-relaxed">
          Chuyên cung cấp cây cảnh, cây phong thuỷ, cây trong nhà, cây văn phòng & quà tặng ý nghĩa. Cam kết cây khoẻ, giao nhanh, bao sống.
        </p>
        <ul className="mt-3 space-y-2 text-[12px] text-gray-700">
          <li className="flex items-start gap-2">
            <MapPin size={14} className="text-tt-red shrink-0 mt-0.5" />
            <span>123 Đường Nguyễn Văn Linh, P. Tân Phong, Q.7, TP.HCM</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin size={14} className="text-tt-red shrink-0 mt-0.5" />
            <span>CN Hà Nội: 45 Láng Hạ, Q. Đống Đa, Hà Nội</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone size={14} className="text-tt-red shrink-0" />
            <a href="tel:19001234" className="hover:text-tt-red">1900 1234 (8h-22h)</a>
          </li>
          <li className="flex items-center gap-2">
            <Mail size={14} className="text-tt-red shrink-0" />
            <a href="mailto:hello@plantshop.vn" className="hover:text-tt-red">hello@plantshop.vn</a>
          </li>
          <li className="flex items-center gap-2">
            <Clock size={14} className="text-tt-red shrink-0" />
            <span>Mở cửa: 8:00 - 22:00 (T2 - CN)</span>
          </li>
        </ul>
      </section>

      {/* Policies */}
      <section className="px-3 py-4 border-b border-gray-50">
        <h3 className="text-[13px] font-bold mb-2">Chính sách</h3>
        <div className="grid grid-cols-2 gap-y-2 text-[12px] text-gray-700">
          <Link href="/policy/shipping" className="hover:text-tt-red">🚚 Vận chuyển</Link>
          <Link href="/policy/return" className="hover:text-tt-red">↩️ Đổi trả & hoàn tiền</Link>
          <Link href="/policy/warranty" className="hover:text-tt-red">🛡 Bảo hành cây sống</Link>
          <Link href="/policy/privacy" className="hover:text-tt-red">🔒 Bảo mật thông tin</Link>
          <Link href="/policy/payment" className="hover:text-tt-red">💳 Thanh toán</Link>
          <Link href="/policy/care" className="hover:text-tt-red">🌱 Hướng dẫn chăm cây</Link>
        </div>
      </section>

      {/* About */}
      <section className="px-3 py-4 border-b border-gray-50">
        <h3 className="text-[13px] font-bold mb-2">Về chúng tôi</h3>
        <div className="grid grid-cols-2 gap-y-2 text-[12px] text-gray-700">
          <Link href="/about" className="hover:text-tt-red">Giới thiệu</Link>
          <Link href="/blog" className="hover:text-tt-red">Blog chăm cây</Link>
          <Link href="/careers" className="hover:text-tt-red">Tuyển dụng</Link>
          <Link href="/affiliate" className="hover:text-tt-red">Cộng tác viên</Link>
          <Link href="/contact" className="hover:text-tt-red">Liên hệ</Link>
          <Link href="/faq" className="hover:text-tt-red">Câu hỏi thường gặp</Link>
        </div>
      </section>

      {/* Shortcut */}
      <section className="px-3 py-4 border-b border-gray-50">
        <h3 className="text-[13px] font-bold mb-2">Tiện ích</h3>
        <div className="grid grid-cols-2 gap-y-2 text-[12px] text-gray-700">
          <Link href="/flash-sale" className="hover:text-tt-red">⚡ Flash Sale</Link>
          <Link href="/vouchers" className="hover:text-tt-red">🎟 Kho voucher</Link>
          <Link href="/wishlist" className="hover:text-tt-red">💗 Yêu thích</Link>
          <Link href="/orders" className="hover:text-tt-red">📦 Đơn hàng</Link>
          <Link href="/messages" className="hover:text-tt-red">💬 Tin nhắn</Link>
          <Link href="/admin" className="hover:text-tt-red">🛡 Admin shop</Link>
        </div>
      </section>

      {/* Social */}
      <section className="px-3 py-4 border-b border-gray-50">
        <h3 className="text-[13px] font-bold mb-2">Kết nối với PlantShop</h3>
        <div className="flex items-center gap-2">
          <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-xs font-bold">
            f
          </a>
          <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white flex items-center justify-center text-xs font-bold">
            IG
          </a>
          <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center text-[10px] font-bold">
            YT
          </a>
          <a href="#" aria-label="TikTok" className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
            TT
          </a>
          <a href="#" aria-label="Zalo" className="w-8 h-8 rounded-full bg-[#0068ff] text-white flex items-center justify-center text-[10px] font-bold">
            Zalo
          </a>
        </div>
      </section>

      {/* SEO hashtags */}
      <section className="px-3 py-4 border-b border-gray-50">
        <h3 className="text-[13px] font-bold mb-2">🏷 Chủ đề nổi bật</h3>
        <div className="flex flex-wrap gap-1">
          {GLOBAL_HASHTAGS.map((h) => (
            <Link
              key={h}
              href={`/search?q=${encodeURIComponent(h.replace("#", ""))}`}
              className="text-[11px] text-tt-red bg-tt-red/5 px-2 py-1 rounded-full hover:bg-tt-red/15"
            >
              {h}
            </Link>
          ))}
        </div>
      </section>

      {/* Payment / ship partners */}
      <section className="px-3 py-4 border-b border-gray-50">
        <h3 className="text-[13px] font-bold mb-2">Thanh toán & Vận chuyển</h3>
        <div className="flex flex-wrap gap-2 text-[10px] text-gray-700">
          {["COD", "Momo", "ZaloPay", "VNPay", "PayLater", "Visa", "Mastercard"].map((p) => (
            <span key={p} className="border border-gray-200 rounded px-2 py-0.5 bg-gray-50">{p}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] text-gray-700 mt-2">
          {["Giao Hàng Nhanh", "J&T Express", "Viettel Post", "Grab Express", "AhaMove"].map((p) => (
            <span key={p} className="border border-gray-200 rounded px-2 py-0.5 bg-gray-50">{p}</span>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="px-3 py-4 flex items-center gap-3 border-b border-gray-50">
        <div className="w-12 h-12 rounded bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-[9px] font-bold text-center leading-tight">ĐÃ<br/>ĐĂNG KÝ</div>
        <div className="w-12 h-12 rounded bg-blue-600 flex items-center justify-center text-white text-[9px] font-bold text-center leading-tight">BỘ<br/>CÔNG THƯƠNG</div>
        <div className="text-[10px] text-gray-500 leading-tight flex-1">
          Đã thông báo với Bộ Công Thương<br />
          Giấy phép kinh doanh: 0312345678
        </div>
      </section>

      {/* Copyright */}
      <section className="px-3 py-4 text-center">
        <div className="text-[11px] text-gray-500">
          © 2026 PlantShop VN. Mọi quyền được bảo lưu.
        </div>
        <div className="text-[10px] text-gray-400 mt-1">
          Địa chỉ ĐKKD: 123 Nguyễn Văn Linh, Q.7, TP.HCM — MST: 0312345678
        </div>
        <div className="text-[10px] text-gray-400 mt-1">Made with 🌿 by PlantShop Team</div>
      </section>
    </footer>
  );
}
