import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Chính sách đổi trả | PlantShop VN" };

export default function Page() {
  return (
    <InfoPage
      title="Chính sách đổi trả & hoàn tiền"
      intro="PlantShop cam kết mang lại trải nghiệm mua cây yên tâm nhất. Chính sách đổi trả minh bạch — không đánh đố khách hàng."
      sections={[
        {
          heading: "Trường hợp được đổi trả",
          body: [
            "Cây nhận được khác mô tả, khác ảnh chụp",
            "Cây héo, chết, gãy do vận chuyển (bao sống 7 ngày)",
            "Nhận sai sản phẩm, sai số lượng",
            "Chậu vỡ, phụ kiện thiếu",
            "Không đúng mệnh/màu bạn ghi chú (nếu có yêu cầu)",
          ],
        },
        {
          heading: "Trường hợp KHÔNG đổi trả",
          body: [
            "Cây đã trồng trên 7 ngày, lá vàng do chăm sai",
            "Cây bị sâu bệnh sau khi khách giữ > 7 ngày",
            "Chậu bể do khách làm rơi",
            "Đã qua sử dụng, không còn nguyên vẹn",
            "Sản phẩm trong chương trình Flash Sale cuối mùa (có ghi rõ)",
          ],
        },
        {
          heading: "Thời gian xử lý",
          body: [
            "Tiếp nhận khiếu nại: ngay lập tức qua chat/hotline",
            "Xác minh video/ảnh: trong 4 giờ làm việc",
            "Gửi cây đổi: trong 24 giờ sau khi xác minh xong",
            "Hoàn tiền (nếu chọn): 3-5 ngày vào tài khoản gốc",
          ],
        },
        {
          heading: "Hồ sơ cần chuẩn bị",
          body: [
            "Video quay lúc mở hộp (bắt buộc)",
            "Ảnh cây bị lỗi chụp rõ 4 góc",
            "Mã đơn hàng & số điện thoại đặt hàng",
          ],
        },
      ]}
    />
  );
}
