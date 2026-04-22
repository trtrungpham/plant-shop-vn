# 🌿 PlantShop — Mobile E-commerce (TikTok Shop VN Clone)

Website bán **cây cảnh** với giao diện mobile-first mô phỏng 1:1 phong cách của TikTok Shop VN.

- **Framework**: Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- **State**: React Context + localStorage (giỏ hàng)
- **Backend sẵn sàng**: Supabase (Postgres + Auth + Storage)
- **Deploy**: Vercel

## ✨ Tính năng

- Trang chủ với banner carousel, flash sale countdown, danh mục, grid sản phẩm
- Trang chi tiết sản phẩm giống TikTok Shop: gallery, tabs (Tổng quan / Đánh giá / Mô tả / Đề xuất), voucher, PayLater, video nhà sáng tạo, sticky Buy Now bar
- Giỏ hàng (persist localStorage) + Checkout flow
- Tìm kiếm với gợi ý thịnh hành
- Trang danh mục, LIVE, Profile
- Bottom Navigation 5 tab
- Responsive cho khung iPhone (tối ưu 375–430px)

## 🚀 Chạy local

```bash
npm install
cp .env.example .env.local   # (tuỳ chọn — chỉ cần nếu muốn kết nối Supabase)
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) và bật **Device Toolbar** trong DevTools → chọn iPhone 14 Pro.

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
3. Thêm 2 env vars ở bước Configure
4. Click **Deploy**

## 📁 Cấu trúc

```
app/
  page.tsx              # Home feed
  product/[id]/         # Product detail page
  category/             # Danh mục
  cart/                 # Giỏ hàng
  checkout/             # Thanh toán
  search/               # Tìm kiếm
  profile/              # Tài khoản
  live/                 # LIVE stream
components/
  BottomNav.tsx         # Bottom tab bar
  CartProvider.tsx      # Cart context
  MobileHeader.tsx      # Header biến thể (home/search/product/simple)
  ProductCard.tsx       # Card sản phẩm
  FlashSaleBar.tsx      # Banner Flash Sale
  HomeBanner.tsx        # Hero carousel
  CategoryGrid.tsx      # Lưới danh mục
  PromoStrip.tsx        # Ưu đãi ngang
lib/
  products.ts           # Seed 20+ cây cảnh
  supabase.ts           # Supabase client
  format.ts             # formatVND, percentOff
supabase/
  schema.sql            # SQL setup
```

## 🎨 Color tokens

| Token | Hex | Dùng cho |
|---|---|---|
| `tt-red` | `#FE2C55` | Primary CTA, giá |
| `tt-cyan` | `#25F4EE` | Voucher freeship |
| `tt-orange` | `#FF6E47` | Flash sale gradient |
| `tt-yellow` | `#FFC300` | Rating star, bonus |

## 📝 License

MIT — dùng cho mục đích học tập. Không sao chép thương hiệu, chỉ mô phỏng layout/UX pattern.
