"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House as Home, LayoutGrid, Video, ShoppingCart, User } from "lucide-react";
import { useCart } from "./CartProvider";
import clsx from "clsx";

const tabs = [
  { href: "/", label: "Trang chủ", Icon: Home },
  { href: "/category", label: "Danh mục", Icon: LayoutGrid },
  { href: "/live", label: "LIVE", Icon: Video, live: true },
  { href: "/cart", label: "Giỏ hàng", Icon: ShoppingCart, badge: true },
  { href: "/profile", label: "Tôi", Icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { count } = useCart();

  // Hide on checkout & product detail for clean UI
  if (pathname.startsWith("/checkout") || pathname.startsWith("/product/")) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 z-40">
      <ul className="flex items-center justify-around px-2 pt-1.5 pb-2">
        {tabs.map(({ href, label, Icon, live, badge }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={clsx(
                  "flex flex-col items-center gap-0.5 py-1 relative",
                  active ? "text-tt-red" : "text-gray-600"
                )}
              >
                <div className="relative">
                  {live ? (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tt-red to-[#ff6e47] flex items-center justify-center text-white">
                      <Video size={16} strokeWidth={2.5} />
                    </div>
                  ) : (
                    <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                  )}
                  {badge && count > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-tt-red text-white text-[10px] leading-none font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </div>
                <span
                  className={clsx(
                    "text-[10px] leading-tight font-medium",
                    live && "text-tt-red"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
