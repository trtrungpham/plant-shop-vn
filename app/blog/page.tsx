import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata = { title: "Blog chăm cây | PlantShop VN" };

const posts = [
  {
    slug: "10-cay-canh-de-cham-cho-nguoi-moi",
    title: "10 cây cảnh dễ chăm nhất dành cho người mới bắt đầu",
    excerpt: "Bạn sợ cây chết vì không biết chăm? Đây là 10 cây siêu dễ, quên tưới cả tuần vẫn sống khoẻ.",
    cover: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80",
    date: "20/04/2026",
    readMin: 5,
    category: "Chăm cây",
  },
  {
    slug: "cay-quang-hop-nguoc-la-gi",
    title: "Cây quang hợp ngược là gì? Top 8 cây nhả oxy ban đêm",
    excerpt: "Lưỡi hổ, lan ý, trầu bà... thực sự có thể đặt trong phòng ngủ không? Giải thích khoa học.",
    cover: "https://images.unsplash.com/photo-1599598425947-5ec6c8a51a07?w=800&q=80",
    date: "18/04/2026",
    readMin: 7,
    category: "Khoa học",
  },
  {
    slug: "cay-hop-menh-moc",
    title: "Cây hợp mệnh Mộc — hút tài lộc, công danh thăng tiến",
    excerpt: "Người mệnh Mộc (sinh 1972, 1980, 1988, 1989, 1996, 1997) nên đặt cây gì ở bàn làm việc?",
    cover: "https://images.unsplash.com/photo-1632321285820-85c7f2a5f5c8?w=800&q=80",
    date: "15/04/2026",
    readMin: 6,
    category: "Phong thuỷ",
  },
  {
    slug: "cach-cham-monstera",
    title: "Cách chăm Trầu Bà Monstera để lá xẻ đẹp như Instagram",
    excerpt: "Monstera lá xẻ là biểu tượng của plant-parent. Nhưng làm sao để lá xẻ, bóng, lớn nhanh?",
    cover: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80",
    date: "12/04/2026",
    readMin: 8,
    category: "Chăm cây",
  },
  {
    slug: "cay-qua-tang-valentine",
    title: "Tặng cây Valentine thay hoa — 5 lựa chọn ý nghĩa hơn hoa hồng",
    excerpt: "Hoa hồng tàn sau 3 ngày. Cây tình yêu sống 10 năm. Bạn chọn món quà nào cho nửa kia?",
    cover: "https://images.unsplash.com/photo-1617516202907-ff28ed9b22e1?w=800&q=80",
    date: "10/02/2026",
    readMin: 4,
    category: "Quà tặng",
  },
  {
    slug: "cach-do-am-dat-cay",
    title: "3 cách nhận biết khi nào cây cần tưới — không cần máy đo",
    excerpt: "Tưới nhiều chết úng, tưới ít chết khô. Đây là mẹo nhà vườn 20 năm kinh nghiệm.",
    cover: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    date: "05/04/2026",
    readMin: 3,
    category: "Chăm cây",
  },
];

const categories = ["Tất cả", "Chăm cây", "Phong thuỷ", "Khoa học", "Quà tặng"];

export default function BlogPage() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-white px-3 py-3 flex items-center gap-2 border-b border-gray-100">
        <Link href="/" className="w-8 h-8 flex items-center justify-center -ml-1">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="flex-1 text-base font-semibold">Blog chăm cây</h1>
      </header>

      <section className="bg-white px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
        {categories.map((c, i) => (
          <button
            key={c}
            className={`shrink-0 text-[12px] px-3 py-1.5 rounded-full ${
              i === 0 ? "bg-brand-red text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </section>

      <div className="p-3 space-y-3">
        {posts.map((p) => (
          <article key={p.slug} className="bg-white rounded-xl overflow-hidden">
            <div className="relative aspect-[16/9] bg-gray-100">
              <Image src={p.cover} alt={p.title} fill sizes="480px" className="object-cover" />
              <span className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {p.category}
              </span>
            </div>
            <div className="p-3">
              <h2 className="text-[14px] font-bold leading-tight line-clamp-2">{p.title}</h2>
              <p className="mt-1 text-[12px] text-gray-600 line-clamp-2">{p.excerpt}</p>
              <div className="mt-2 text-[11px] text-gray-500 flex items-center gap-2">
                <span>{p.date}</span>
                <span>•</span>
                <span>{p.readMin} phút đọc</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Footer />
    </>
  );
}
