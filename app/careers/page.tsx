import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Tuyển dụng | PlantShop VN" };

export default function CareersPage() {
  return (
    <InfoPage
      title="Gia nhập đội PlantShop"
      intro="Chúng tôi đang trên hành trình đưa cây xanh đến mọi nhà Việt. Nếu bạn yêu cây, thích thử thách và muốn làm trong môi trường trẻ, PlantShop có chỗ cho bạn."
      sections={[
        {
          heading: "Vị trí đang tuyển (T4/2026)",
          body: [
            "🌱 Nhân viên nhà vườn — HCM, HN (8 người)",
            "📦 Nhân viên đóng gói & QC — HCM (4 người)",
            "📞 CSKH / Tư vấn bán hàng online — Remote (6 người)",
            "📸 Content Creator TikTok — HCM (2 người)",
            "💻 Full-stack Developer (Next.js) — Remote (1 người)",
            "📈 Performance Marketing — HCM (2 người)",
            "🚚 Nhân viên giao hàng nội thành — HCM, HN (10 người)",
          ],
        },
        {
          heading: "Quyền lợi",
          body: [
            "Lương cạnh tranh + thưởng hiệu suất theo quý",
            "BHXH đầy đủ theo luật",
            "13 tháng lương + thưởng Tết",
            "Discount 40% khi mua cây ở PlantShop",
            "Team building 2 lần/năm (Đà Lạt, Phú Quốc)",
            "Môi trường xanh — văn phòng có 200+ cây cảnh",
          ],
        },
        {
          heading: "Cách ứng tuyển",
          body: "Gửi CV về email: careers@plantshop.vn\nTiêu đề: [Ứng tuyển] — Vị trí — Họ tên\n\nHoặc nộp trực tiếp tại:\n• HCM: 123 Nguyễn Văn Linh, Q.7 (gặp chị Lan - HR)\n• HN: 45 Láng Hạ, Q. Đống Đa (gặp anh Tuấn - HR)\n\nThời gian phản hồi: 3-5 ngày làm việc.",
        },
      ]}
      cta={{ label: "Gửi CV qua email", href: "mailto:careers@plantshop.vn" }}
    />
  );
}
