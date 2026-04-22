"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Image as ImageIcon, Smile } from "lucide-react";

type Msg = { id: number; from: "me" | "shop" | "bot"; text: string; time: number };

type Props = {
  open: boolean;
  onClose: () => void;
  shopName?: string;
  productName?: string;
  productImage?: string;
};

function matchReply(q: string): string {
  const s = q.toLowerCase().trim();

  if (/xin chào|chào shop|hello|hi|chao shop/.test(s))
    return "Dạ em chào anh/chị 💚 PlantShop hân hạnh được hỗ trợ ạ. Anh/chị cần tư vấn cây nào ạ?";

  if (/còn hàng|còn không|có sẵn|stock|còn ko|còn cây/.test(s))
    return "Dạ sản phẩm bên em hiện đang còn hàng ạ 🌿 Anh/chị đặt là shop chuẩn bị giao ngay trong 2-4h (nội thành) nhé!";

  if (/giá|bao nhiêu|gia|giam|giảm/.test(s))
    return "Dạ giá đã niêm yết trên sản phẩm là giá tốt nhất rồi ạ. Hôm nay còn Flash Sale -19% và voucher giảm thêm 15K nữa ạ 🎁";

  if (/ship|vận chuyển|giao hàng|bao lâu|khi nào nhận/.test(s))
    return "Dạ shipping:\n• Nội thành HCM/HN: 2-4 giờ qua GrabExpress 🚚\n• Các tỉnh: 1-3 ngày qua GHN/J&T\n• Freeship toàn quốc đơn từ 250K ạ";

  if (/bao sống|chết|héo|sống|hỏng/.test(s))
    return "Dạ shop cam kết bao sống 7 ngày đầu ạ. Nếu cây có vấn đề anh/chị quay video lúc mở hộp, bên em sẽ gửi cây mới 100% miễn phí 💚";

  if (/chăm|tưới|nước|ánh sáng|phân bón|cham soc/.test(s))
    return "Dạ cây bên em đã thuần dưỡng, rất dễ chăm:\n🌱 Tưới 2-3 lần/tuần (chỉ tưới khi đất khô)\n☀️ Đặt nơi ánh sáng gián tiếp\n🌡 Nhiệt độ 18-30°C\n🧪 Bón phân 1 lần/tháng\n\nShop tặng kèm hướng dẫn chi tiết ạ!";

  if (/mệnh|phong thủy|phong thuy|hợp mệnh|hop menh/.test(s))
    return "Dạ về phong thuỷ:\n🌳 Mệnh Mộc: trầu bà, kim tiền, phú lâu\n🔥 Mệnh Hoả: cây lá đỏ, kim ngân\n💧 Mệnh Thuỷ: lan ý, trầu bà cẩm thạch\n⛰ Mệnh Thổ: lưỡi hổ, xương rồng\n⚔️ Mệnh Kim: bạch mã, tuyết tùng\n\nAnh/chị cho em xin năm sinh để em tư vấn chính xác nhé 🌿";

  if (/quà|tang|tặng|valentine|sinh nhật|sinh nhat|khai trương/.test(s))
    return "Dạ quà tặng ý nghĩa gợi ý ạ 🎁:\n💚 Valentine/Tình yêu: Lô Lan lá trái tim\n🏢 Khai trương: Kim Ngân bện 3, Phú Lâu\n🎂 Sinh nhật: Sen đá, Xương rồng mini\n🏠 Tân gia: Lưỡi hổ, Trầu bà\n\nShop có gói quà miễn phí + thiệp ghi lời chúc nhé ạ!";

  if (/chậu|doi chau|đổi chậu|size|lớn|nhỏ/.test(s))
    return "Dạ bên em có nhiều size và chậu khác nhau ạ. Anh/chị cho em biết muốn đặt ở đâu (bàn, sàn, ban công) em tư vấn size phù hợp nhất ạ 🪴";

  if (/thanh toán|thanh toan|cod|trả sau|paylater|chuyển khoản/.test(s))
    return "Dạ bên em nhận:\n💵 COD (Ship Cod - nhận cây mới trả tiền)\n💳 Chuyển khoản, Momo, ZaloPay, VNPay\n🕒 PayLater: trả sau 0% trong 12 tháng (đơn trên 300K)\n\nAnh/chị chọn thoải mái ạ!";

  if (/cảm ơn|cam on|thanks|thank/.test(s))
    return "Dạ không có gì đâu ạ 💚 Cảm ơn anh/chị đã ghé shop. Chúc anh/chị một ngày thật xanh 🌿";

  if (/trả lời|bot|auto|tự động|tu dong/.test(s))
    return "Dạ em là trợ lý ảo PlantShop, có thể trả lời các câu hỏi thường gặp 24/7. Nếu cần gặp nhân viên thật, anh/chị nhắn 'gặp nhân viên' ạ 👩‍💼";

  if (/nhân viên|gặp nhân viên|người thật/.test(s))
    return "Dạ em chuyển cho nhân viên ngay ạ 📞 Anh/chị vui lòng chờ 2-3 phút nhé. Hoặc gọi trực tiếp 1900 1234 để được hỗ trợ nhanh nhất ạ!";

  return "Dạ em đã nhận tin của anh/chị ạ 💚 Em sẽ kiểm tra và phản hồi ngay. Anh/chị có thể hỏi nhanh về: 'còn hàng không', 'giá', 'giao bao lâu', 'cách chăm', 'cây hợp mệnh gì' để nhận trả lời tự động nhé!";
}

const QUICK = [
  "Còn hàng không shop?",
  "Giao hàng bao lâu?",
  "Cách chăm cây?",
  "Cây hợp mệnh gì?",
  "Tặng quà Valentine",
  "Bao sống bao lâu?",
];

export default function ChatDrawer({
  open,
  onClose,
  shopName = "Golden Life Garden",
  productName,
  productImage,
}: Props) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([
        {
          id: 1,
          from: "shop",
          text: `Dạ em chào anh/chị ạ 💚\nCảm ơn anh/chị đã quan tâm đến shop ${shopName}. Em có thể hỗ trợ gì cho mình ạ?`,
          time: Date.now(),
        },
      ]);
    }
  }, [open, shopName, msgs.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [msgs]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Msg = { id: Date.now(), from: "me", text: trimmed, time: Date.now() };
    setMsgs((m) => [...m, userMsg]);
    setInput("");

    // typing indicator then auto-reply
    const typingMsg: Msg = { id: Date.now() + 1, from: "bot", text: "__typing__", time: Date.now() };
    setTimeout(() => setMsgs((m) => [...m, typingMsg]), 300);
    setTimeout(() => {
      setMsgs((m) => {
        const without = m.filter((x) => x.text !== "__typing__");
        return [
          ...without,
          { id: Date.now() + 2, from: "shop", text: matchReply(trimmed), time: Date.now() },
        ];
      });
    }, 1100);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-[480px] bg-white rounded-t-2xl h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-tt-red to-[#ff6e47] text-white px-3 py-2.5 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center font-bold">
            {shopName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold truncate flex items-center gap-1">
              {shopName} <span className="text-[9px] bg-white/25 px-1 rounded">Mall</span>
            </div>
            <div className="text-[11px] opacity-90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-300 rounded-full" /> Đang hoạt động • Trả lời trong vài phút
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center">
            <X size={20} />
          </button>
        </header>

        {/* Product context */}
        {productName && productImage && (
          <div className="bg-gray-50 px-3 py-2 flex items-center gap-2 border-b border-gray-100">
            <div className="w-10 h-10 rounded bg-gray-200 bg-cover bg-center" style={{ backgroundImage: `url(${productImage})` }} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-gray-500">Đang xem sản phẩm</div>
              <div className="text-[12px] line-clamp-1">{productName}</div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#f5f5f5]">
          {msgs.map((m) => (
            <MsgBubble key={m.id} msg={m} />
          ))}
        </div>

        {/* Quick replies */}
        <div className="px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-gray-100 bg-white">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="shrink-0 text-[11px] border border-tt-red/40 text-tt-red px-2.5 py-1 rounded-full"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="px-3 py-2 flex items-center gap-2 bg-white border-t border-gray-100"
        >
          <button type="button" className="w-8 h-8 flex items-center justify-center text-gray-500">
            <Smile size={20} />
          </button>
          <button type="button" className="w-8 h-8 flex items-center justify-center text-gray-500">
            <ImageIcon size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 h-9 bg-gray-100 rounded-full px-3 text-[13px] outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-tt-red text-white flex items-center justify-center disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

function MsgBubble({ msg }: { msg: Msg }) {
  if (msg.text === "__typing__") {
    return (
      <div className="flex">
        <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-md">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  const mine = msg.from === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : ""}`}>
      <div
        className={`max-w-[78%] px-3 py-2 text-[13px] whitespace-pre-wrap leading-relaxed ${
          mine
            ? "bg-tt-red text-white rounded-2xl rounded-tr-md"
            : "bg-white text-gray-900 rounded-2xl rounded-tl-md"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
