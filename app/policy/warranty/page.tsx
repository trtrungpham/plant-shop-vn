import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Bảo hành cây sống | PlantShop VN" };

export default function Page() {
  return (
    <InfoPage
      title="Bảo hành cây sống 7 ngày"
      intro="Mua cây online vẫn yên tâm như mua tại vườn. Cam kết Bao Sống 7 Ngày — áp dụng cho 100% cây tươi bán tại PlantShop."
      sections={[
        {
          heading: "Bao sống 7 ngày là gì?",
          body: "Trong vòng 7 ngày kể từ lúc bạn nhận cây, nếu cây héo úa / chết không rõ nguyên nhân, PlantShop gửi cây mới 100% miễn phí. Bạn không cần trả cây cũ, không cần chứng minh gì ngoài video mở hộp và ảnh cây hiện tại.",
        },
        {
          heading: "Điều kiện áp dụng",
          body: [
            "Cây còn trong 7 ngày tính từ ngày nhận",
            "Có video lúc mở hộp (chụp rõ cây ban đầu)",
            "Cây chết không do: đổ, gãy, sâu bệnh sau khi nhận, tưới quá nhiều/ít",
            "Đặt hàng qua kênh chính thức của PlantShop",
          ],
        },
        {
          heading: "Bảo hành mở rộng 30 ngày",
          body: "Với một số cây cao cấp (bonsai > 1 triệu, lan hồ điệp, cây cảnh giá trị), PlantShop áp dụng bảo hành 30 ngày — bao gồm hỗ trợ tư vấn chăm sóc liên tục qua chat. Điều kiện và danh sách cây được ghi rõ trên trang sản phẩm.",
        },
        {
          heading: "Quy trình yêu cầu bảo hành",
          body: [
            "Bước 1: Chat shop, gửi mã đơn + ảnh/video cây hiện tại",
            "Bước 2: Shop tư vấn cách cứu trước (đôi khi chỉ là vàng lá nhẹ)",
            "Bước 3: Nếu không cứu được, shop gửi cây mới trong 24h",
            "Bước 4: Bạn không phải gửi trả cây cũ",
          ],
        },
      ]}
    />
  );
}
