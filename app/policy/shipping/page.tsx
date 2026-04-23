import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Chính sách vận chuyển | PlantShop VN" };

export default function Page() {
  return (
    <InfoPage
      title="Chính sách vận chuyển"
      intro="PlantShop phối hợp với 5 đơn vị vận chuyển hàng đầu để đảm bảo cây đến tay bạn nhanh, an toàn và tươi xanh."
      sections={[
        {
          heading: "Thời gian giao hàng",
          body: [
            "Nội thành HCM & Hà Nội: 2-4 giờ (đặt trước 17h)",
            "Ngoại thành HCM/HN: trong ngày hoặc hôm sau",
            "Tỉnh miền Nam (Đông Nam Bộ, ĐBSCL): 1-2 ngày",
            "Tỉnh miền Trung: 2-3 ngày",
            "Tỉnh miền Bắc (trừ HN): 2-3 ngày",
            "Vùng sâu, đảo: 4-6 ngày — miễn phí với đơn > 500K",
          ],
        },
        {
          heading: "Phí vận chuyển",
          body: [
            "Đơn ≥ 250.000đ: MIỄN PHÍ toàn quốc",
            "Đơn < 250.000đ nội thành: 20.000đ",
            "Đơn < 250.000đ ngoại tỉnh: 35.000đ",
            "Phí vượt kg (cây > 5kg): 5.000đ/kg",
            "Giao hoả tốc 2 giờ (HCM/HN): 50.000đ thêm",
          ],
        },
        {
          heading: "Đối tác vận chuyển",
          body: [
            "GrabExpress / AhaMove — nội thành hoả tốc",
            "Giao Hàng Nhanh (GHN) — liên tỉnh phổ thông",
            "J&T Express — liên tỉnh phổ thông",
            "Viettel Post — vùng sâu, miền núi",
            "Đội giao hàng riêng PlantShop — cây size lớn (>1m)",
          ],
        },
        {
          heading: "Quy trình đóng gói",
          body: "Cây được tháo rời chậu (nếu cần), bọc rễ trong túi nylon giữ ẩm, thân lá bọc giấy mềm và nylon bơm hơi chống sốc. Đặt trong thùng carton chuyên dụng có lỗ thông khí. Cây dễ gãy được cố định thêm bằng băng keo 2 mặt.",
        },
        {
          heading: "Kiểm tra khi nhận hàng",
          body: "Bạn được quyền mở hộp kiểm tra trước khi trả tiền (COD). Nếu cây hư hỏng, quay video lúc mở hộp và từ chối nhận — không mất phí. PlantShop sẽ gửi cây mới trong 24h.",
        },
      ]}
    />
  );
}
