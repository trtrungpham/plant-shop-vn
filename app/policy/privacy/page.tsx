import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Chính sách bảo mật | PlantShop VN" };

export default function Page() {
  return (
    <InfoPage
      title="Chính sách bảo mật thông tin"
      intro="PlantShop cam kết bảo vệ quyền riêng tư của bạn. Tài liệu này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn."
      sections={[
        {
          heading: "Thông tin chúng tôi thu thập",
          body: [
            "Họ tên, số điện thoại, địa chỉ giao hàng khi đặt hàng",
            "Email khi đăng ký tài khoản",
            "Lịch sử mua hàng, giỏ hàng, danh sách yêu thích",
            "Dữ liệu thiết bị (IP, loại thiết bị, trình duyệt) qua cookie",
            "Hình ảnh/video bạn gửi khi yêu cầu bảo hành",
          ],
        },
        {
          heading: "Mục đích sử dụng",
          body: [
            "Xử lý đơn hàng và giao cây tới bạn",
            "Thông báo tình trạng đơn (SMS, email, push)",
            "Hỗ trợ khách hàng và giải quyết khiếu nại",
            "Cải thiện trải nghiệm mua sắm (cá nhân hoá gợi ý)",
            "Gửi khuyến mãi — BẠN ĐƯỢC CHỌN NHẬN HOẶC KHÔNG",
          ],
        },
        {
          heading: "Chia sẻ với bên thứ ba",
          body: "Chúng tôi KHÔNG bán, trao đổi, cho thuê thông tin của bạn cho bất kỳ bên thứ ba nào vì mục đích marketing. Chỉ chia sẻ tối thiểu cần thiết với: đơn vị vận chuyển (tên, SĐT, địa chỉ), cổng thanh toán (số thẻ được mã hoá), nhà cung cấp hoá đơn điện tử (khi bạn yêu cầu xuất hoá đơn VAT).",
        },
        {
          heading: "Quyền của bạn",
          body: [
            "Yêu cầu xem toàn bộ dữ liệu chúng tôi đang lưu về bạn",
            "Yêu cầu chỉnh sửa thông tin sai",
            "Yêu cầu xoá tài khoản + dữ liệu liên quan",
            "Từ chối nhận thông tin marketing bất kỳ lúc nào",
            "Gửi yêu cầu qua: privacy@plantshop.vn (xử lý trong 7 ngày)",
          ],
        },
        {
          heading: "Bảo mật dữ liệu",
          body: "Toàn bộ dữ liệu được mã hoá TLS 1.3 khi truyền. Dữ liệu thanh toán tuân thủ chuẩn PCI-DSS. Mật khẩu được hash bcrypt — nhân viên PlantShop không thể xem mật khẩu của bạn.",
        },
      ]}
    />
  );
}
