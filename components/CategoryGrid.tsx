import Link from "next/link";
import { categories } from "@/lib/products";

export default function CategoryGrid() {
  return (
    <section className="bg-white mx-3 mt-3 rounded-xl p-3">
      <div className="grid grid-cols-4 gap-y-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-2xl">
              {c.icon}
            </div>
            <span className="text-[11px] text-gray-800 text-center leading-tight">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
