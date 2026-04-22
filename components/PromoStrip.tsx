export default function PromoStrip() {
  const items = [
    { icon: "🚚", title: "XTRA Freeship", sub: "Tối đa 140K" },
    { icon: "💰", title: "PayLater", sub: "Trả sau 0%" },
    { icon: "🎁", title: "Hoàn Tiền", sub: "Đến 14%" },
    { icon: "⚡", title: "Giao Nhanh", sub: "2 giờ nội thành" },
  ];
  return (
    <section className="bg-white mx-3 mt-3 rounded-xl p-3">
      <div className="grid grid-cols-4 gap-2">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-center text-center">
            <div className="text-xl">{it.icon}</div>
            <div className="text-[11px] font-semibold text-gray-800 mt-1 leading-tight">
              {it.title}
            </div>
            <div className="text-[10px] text-gray-500 leading-tight">{it.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
