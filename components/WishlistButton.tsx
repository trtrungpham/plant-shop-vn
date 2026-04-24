"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistProvider";

export default function WishlistButton({
  id,
  size = 18,
  className = "",
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const active = has(id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-label={active ? "Bỏ yêu thích" : "Yêu thích"}
      className={`inline-flex items-center justify-center transition-transform active:scale-90 ${className}`}
    >
      <Heart
        size={size}
        className={active ? "fill-tt-red text-tt-red" : "text-gray-500"}
      />
    </button>
  );
}
