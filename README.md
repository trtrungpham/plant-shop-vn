# 🌿 PlantShop VN — Mobile E-commerce

Website bán **cây cảnh** với giao diện mobile-first hiện đại — tối ưu cho màn hình điện thoại.

- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- **State**: React Context + localStorage (giỏ hàng, yêu thích, đơn hàng)
- **Backend sẵn sàng**: Supabase (Postgres + Auth + Storage)
- **Deploy**: Vercel

## ✨ Tính năng

### Khách hàng
- Trang chủ: banner carousel, flash sale countdown, danh mục, grid sản phẩm
- Trang chi tiết sản phẩm: gallery vuốt, tabs (Tổng quan / Đánh giá / Mô tả / Đề xuất), voucher, PayLater, video nhà sáng tạo, sticky Buy Now
- Giỏ hàng (persist localStorage) + Checkout flow với voucher + 6 phương thức thanh toán
- Yêu thích / Wishlist với nút ❤️ trên mọi card
- Lịch sử đơn hàng + chi tiết đơn + huỷ đơn
- Flash Sale với countdown theo khung giờ
- Kho voucher — 6 loại (freeship / percent / amount)
- Chat với shop, auto-reply 12 chủ đề
- Tìm kiếm theo hashtag, mệnh, mùa
- Trang shop: banner, stats, filter tabs, grid sản phẩm
- LIVE, Profile, Blog chăm cây, FAQ

### Shop owner
- Admin dashboard (`/admin`, mật khẩu `plantshop2026`)
- Overview: doanh thu, số đơn, số sản phẩm
- Quản lý đơn hàng: đổi trạng thái bằng dropdown
- Danh sách sản phẩm, danh sách shop

### SEO & Marketing
- 32 hashtag global (#CayTheoMenh #CayQuangHopNguoc #CayTinhYeu...)
- Per-product hashtags + mệnh/mùa badges
- Dynamic metadata (title, description, keywords, OpenGraph) từng sản phẩm
- 14 landing page (about, contact, faq, blog, careers, affiliate, 6 chính sách)

## 🚀 Chạy local

```bash
npm install
cp .env.example .env.local   # (tuỳ chọn — chỉ cần nếu kết nối Supabase)
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) và bật **Device Toolbar** trong DevTools → chọn iPhone 14 Pro để xem đúng khung mobile.

## 🗄 Kết nối Supabase (tuỳ chọn)

1. Tạo project mới tại [supabase.com](https://supabase.com)
2. Vào **SQL Editor** → paste nội dung `supabase/schema.sql` → Run
3. Copy `Project URL` và `anon public key` từ **Settings → API**
4. Tạo file `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

App hoạt động cả khi **chưa kết nối Supabase** (dùng data mock trong `lib/products.ts`).

## ☁️ Deploy lên Vercel

1. Push repo lên GitHub
2. Vào [vercel.com/new](https://vercel.com/new) → Import repo
3. Thêm 2 env vars ở bước Configure (nếu có Supabase)
4. Click **Deploy**

## 📁 Cấu trúc

```
app/
  page.tsx              # Home feed
  product/[id]/         # Product detail
  shop/[slug]/          # Shop page
  category/             # Danh mục
  cart/ checkout/       # Giỏ hàng + Thanh toán
  search/               # Tìm kiếm
  wishlist/             # Yêu thích
  orders/ orders/[id]/  # Đơn hàng
  vouchers/             # Kho voucher
  flash-sale/           # Flash Sale
  admin/                # Admin dashboard
  profile/ live/        # Tài khoản + LIVE
  messages/             # Tin nhắn
  blog/ faq/ about/...  # Landing pages
  policy/ (6 trang)     # Chính sách
components/
  BottomNav.tsx         # Bottom tab bar
  CartProvider.tsx      # Cart context
  WishlistProvider.tsx  # Wishlist context
  OrdersProvider.tsx    # Orders context
  MobileHeader.tsx      # Header biến thể
  ProductCard.tsx       # Card sản phẩm
  ProductGallery.tsx    # Gallery vuốt
  ChatDrawer.tsx        # Chat bottom-sheet auto-reply
  FlashSaleBar.tsx      # Banner Flash Sale
  HomeBanner.tsx        # Hero carousel
  CategoryGrid.tsx      # Lưới danh mục
  PromoStrip.tsx        # Ưu đãi ngang
  Footer.tsx            # Footer toàn site
  InfoPage.tsx          # Template landing page
lib/
  products.ts           # Seed 30+ sản phẩm + utils
  vouchers.ts           # 6 voucher demo
  supabase.ts           # Supabase client
  format.ts             # formatVND, percentOff
supabase/
  schema.sql            # SQL setup
```

## 🎨 Color tokens

| Token | Hex | Dùng cho |
|---|---|---|
| `brand-red` | `#FE2C55` | Primary CTA, giá |
| `brand-cyan` | `#25F4EE` | Voucher freeship |
| `brand-orange` | `#FF6E47` | Flash sale gradient |
| `brand-yellow` | `#FFC300` | Rating star, bonus |

## 📝 License

MIT — dùng cho mục đích học tập và thương mại cá nhân.
