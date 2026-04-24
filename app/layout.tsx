import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { CartProvider } from "@/components/CartProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import { OrdersProvider } from "@/components/OrdersProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "PlantShop — Cây cảnh giao nhanh",
  description: "Mua cây cảnh online — Flash Sale mỗi ngày, miễn phí vận chuyển",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <OrdersProvider>
          <WishlistProvider>
            <CartProvider>
              <div className="mx-auto w-full max-w-[480px] min-h-screen bg-[#f5f5f5] pb-[72px] relative">
                {children}
                <BottomNav />
              </div>
            </CartProvider>
          </WishlistProvider>
        </OrdersProvider>
      </body>
    </html>
  );
}
