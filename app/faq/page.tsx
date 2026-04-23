import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Câu hỏi thường gặp | PlantShop VN" };

export default function FAQPage() {
  return (
    <InfoPage
      title="Câu hỏi thường gặp (FAQ)"
      intro="Tổng hợp những thắc mắc phổ biến nhất của khách hàng PlantShop. Nếu không tìm được câu trả lời, hãy chat trực tiếp với shop qua nút Chat ở sản phẩm."
      tocTitle="Mục lục"
      sections={[
        {
          heading: "1. Cây có được bao sống không?",
          body: "Tất cả cây ở PlantShop đều được bao sống 7 ngày đầu. Nếu trong vòng 7 ngày kể từ lúc nhận, cây bị héo/chết do vận chuyển hoặc chất lượng, bạn chỉ cần quay video lúc mở hộp, shop sẽ gửi cây mới 100% miễn phí, không cần trả lại cây cũ.",
        },
        {
          heading: "2. Giao hàng bao lâu?",
          body: [
            "Nội thành HCM/Hà Nội: 2-4 giờ qua GrabExpress/AhaMove",
            "Các tỉnh miền Nam: 1-2 ngày qua GHN/J&T",
            "Các tỉnh miền Bắc/Trung: 2-3 ngày qua GHN/Viettel Post",
            "Miễn phí vận chuyển cho đơn từ 250.000đ",
          ],
        },
        {
          heading: "3. Cây được đóng gói thế nào khi giao xa?",
          body: "Cây được bọc trong nylon bơm hơi chống sốc, thân cây cố định bằng giấy mềm, chậu được cuốn xốp. Mỗi thùng có lỗ thông khí. Đơn đi xa 2+ ngày được xử lý đặc biệt với đá giữ ẩm gốc.",
        },
        {
          heading: "4. Tôi không biết chăm cây, có chăm được không?",
          body: "Được! Mỗi cây đều có thẻ hướng dẫn chăm sóc đi kèm (tưới bao nhiêu, ánh sáng thế nào, bón phân khi nào). Shop cũng có chat 24/7, bạn chụp ảnh cây gửi vào là shop tư vấn ngay. Các cây siêu dễ chăm cho người mới: ZZ, Lưỡi Hổ, Sen Đá, Xương Rồng.",
        },
        {
          heading: "5. Làm sao chọn cây hợp mệnh?",
          body: "Bạn cung cấp năm sinh, shop sẽ tư vấn chính xác. Gợi ý chung:\n• Mộc (Xanh): Trầu bà, Kim tiền, Phú lâu\n• Hoả (Đỏ/Tím): Cây lá đỏ, Kim ngân\n• Thuỷ (Đen/Xanh dương): Lan ý, Trầu bà cẩm thạch\n• Thổ (Vàng/Nâu): Lưỡi hổ, Xương rồng\n• Kim (Trắng/Xám): Bạch mã, Tuyết tùng",
        },
        {
          heading: "6. Có xuất hoá đơn VAT không?",
          body: "Có. Với đơn >500.000đ bạn yêu cầu xuất hoá đơn VAT trong phần ghi chú khi đặt hàng. Hoá đơn điện tử sẽ được gửi qua email trong 24h.",
        },
        {
          heading: "7. Tôi đặt xong có được đổi chậu/size không?",
          body: "Trong vòng 30 phút sau khi đặt, bạn chat shop để đổi chậu/size. Sau 30 phút, đơn đã vào quy trình đóng gói, rất khó đổi. Nếu đã giao, phí đổi = phí vận chuyển khứ hồi.",
        },
        {
          heading: "8. Thanh toán bằng cách nào?",
          body: [
            "COD (ship cod - nhận cây mới trả tiền) — phổ biến nhất",
            "Chuyển khoản ngân hàng (giảm 2% cho đơn > 1 triệu)",
            "Momo, ZaloPay, VNPay, Apple Pay",
            "PayLater: trả sau 0% trong 12 tháng (đơn > 300K)",
            "Thẻ Visa/Mastercard",
          ],
        },
        {
          heading: "9. Có gói quà tặng không?",
          body: "Có! Miễn phí gói quà cho mọi đơn — bao gồm hộp quà giấy kraft, nơ lụa, thiệp handwritten với lời nhắn của bạn. Ghi chú yêu cầu ở bước đặt hàng.",
        },
        {
          heading: "10. Tôi muốn làm cộng tác viên?",
          body: "PlantShop có chương trình CTV hoa hồng 9-15%/đơn. Đăng ký ở mục Cộng tác viên trong Footer — shop duyệt trong 24h.",
        },
      ]}
    />
  );
}
