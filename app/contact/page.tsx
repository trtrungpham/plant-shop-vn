import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Liên hệ | PlantShop VN" };

export default function ContactPage() {
  return (
    <InfoPage
      title="Liên hệ PlantShop"
      intro="Đội ngũ chăm sóc khách hàng của PlantShop sẵn sàng hỗ trợ 16/7 — từ 6:00 sáng đến 22:00 tối mỗi ngày, kể cả cuối tuần & lễ Tết."
      sections={[
        {
          heading: "Hotline",
          body: [
            "Tổng đài: 1900 1234 (1.000đ/phút)",
            "Hỗ trợ đặt hàng: 0909 123 456 (miễn phí, có Zalo)",
            "Khiếu nại: 0909 999 000",
          ],
        },
        {
          heading: "Email",
          body: [
            "Chăm sóc khách hàng: hello@plantshop.vn",
            "Hợp tác nhà vườn: partner@plantshop.vn",
            "Báo chí: press@plantshop.vn",
          ],
        },
        {
          heading: "Chi nhánh TP.HCM",
          body: "📍 123 Đường Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP.HCM\n🕒 8:00 - 22:00 (Thứ 2 - Chủ Nhật)\n🚗 Có chỗ đậu xe máy & ô tô miễn phí\n☕ Có không gian cafe, khách được thử cây trước khi mua",
        },
        {
          heading: "Chi nhánh Hà Nội",
          body: "📍 45 Láng Hạ, Quận Đống Đa, Hà Nội\n🕒 8:00 - 22:00 (Thứ 2 - Chủ Nhật)\n🌿 Vườn mẫu 200m² — check-in free",
        },
        {
          heading: "Mạng xã hội",
          body: [
            "Facebook: fb.com/plantshopvn",
            "Instagram: @plantshop.vn",
            "TikTok: @plantshopvn",
            "YouTube: PlantShop VN Official",
            "Zalo OA: PlantShop VN",
          ],
        },
      ]}
      cta={{ label: "Gọi hotline 1900 1234", href: "tel:19001234" }}
    />
  );
}
