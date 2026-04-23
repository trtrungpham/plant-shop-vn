import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Chính sách thanh toán | PlantShop VN" };

export default function Page() {
  return (
    <InfoPage
      title="Phương thức thanh toán"
      intro="PlantShop hỗ trợ đa dạng hình thức thanh toán — từ COD truyền thống đến ví điện tử, thẻ quốc tế và trả sau 0%."
      sections={[
        {
          heading: "1. Thanh toán khi nhận hàng (COD)",
          body: "Hình thức phổ biến nhất — bạn nhận cây, kiểm tra rồi mới trả tiền mặt cho shipper. Áp dụng toàn quốc. Đơn > 3 triệu cần đặt cọc 10% qua chuyển khoản để xác nhận đơn.",
        },
        {
          heading: "2. Chuyển khoản ngân hàng",
          body: "Ngân hàng: Vietcombank\nChủ tài khoản: CONG TY TNHH PLANTSHOP VIETNAM\nSố tài khoản: 0123 456 789 012\nNội dung chuyển khoản: [Mã đơn] - [SĐT]\n\nƯu đãi: Giảm thêm 2% cho đơn > 1 triệu khi chuyển khoản trước.",
        },
        {
          heading: "3. Ví điện tử",
          body: [
            "Momo — quét QR tại bước thanh toán",
            "ZaloPay — nhập số điện thoại Zalo",
            "VNPay QR — mọi app ngân hàng đều quét được",
            "ShopeePay — liên kết tài khoản Shopee",
            "Apple Pay / Google Pay",
          ],
        },
        {
          heading: "4. Thẻ tín dụng / ghi nợ",
          body: "Chấp nhận Visa, Mastercard, JCB, American Express. Giao dịch xử lý qua cổng thanh toán OnePay/VNPay — đạt chuẩn PCI-DSS Level 1. PlantShop không lưu số thẻ của bạn.",
        },
        {
          heading: "5. PayLater — trả sau 0%",
          body: [
            "Đơn tối thiểu 300.000đ",
            "Trả đều trong 3, 6, 12 tháng — lãi suất 0%",
            "Duyệt trong 60 giây qua CMND/CCCD",
            "Không cần chứng minh thu nhập",
            "Liên kết với Kredivo, Home Credit, FE Credit",
          ],
        },
        {
          heading: "An toàn giao dịch",
          body: "Nếu giao dịch bị lỗi (trừ tiền nhưng đơn không được xác nhận), tiền sẽ được hoàn tự động trong 3-7 ngày làm việc. Liên hệ hotline 1900 1234 nếu cần hỗ trợ khẩn.",
        },
      ]}
    />
  );
}
