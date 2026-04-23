import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Cộng tác viên | PlantShop VN" };

export default function AffiliatePage() {
  return (
    <InfoPage
      title="Chương trình Cộng Tác Viên"
      intro="Kiếm thêm thu nhập thụ động bằng việc chia sẻ những sản phẩm bạn yêu thích. Hoa hồng lên đến 15%/đơn, không giới hạn thu nhập."
      sections={[
        {
          heading: "Hoa hồng theo cấp",
          body: [
            "Starter (tháng đầu): 9% mỗi đơn thành công",
            "Bronze (> 10 đơn/tháng): 11%",
            "Silver (> 50 đơn/tháng): 13%",
            "Gold (> 200 đơn/tháng): 15% + thưởng top 10",
          ],
        },
        {
          heading: "Cách hoạt động",
          body: [
            "Đăng ký tài khoản CTV miễn phí (duyệt trong 24h)",
            "Chọn sản phẩm, lấy link rút gọn có mã của bạn",
            "Chia sẻ link qua Facebook, TikTok, Zalo, blog...",
            "Khách click link mua — bạn nhận hoa hồng tự động",
            "Rút tiền qua ngân hàng / Momo, tối thiểu 200K, 2 lần/tháng",
          ],
        },
        {
          heading: "Công cụ hỗ trợ",
          body: [
            "Dashboard realtime — theo dõi click, đơn, hoa hồng theo ngày",
            "Thư viện ảnh/video sản phẩm (2000+ file) tải free",
            "Caption mẫu theo xu hướng TikTok/Facebook",
            "Voucher độc quyền chỉ CTV có",
            "Nhóm Zalo hỗ trợ 24/7 với team marketing PlantShop",
          ],
        },
        {
          heading: "Quy định",
          body: [
            "Không chạy quảng cáo mạo danh PlantShop",
            "Không spam link trong nhóm khi chưa được phép",
            "Không giảm giá sai lệch giá niêm yết",
            "Vi phạm: khoá tài khoản, thu hồi hoa hồng chưa trả",
          ],
        },
      ]}
      cta={{ label: "Đăng ký CTV miễn phí", href: "/affiliate/register" }}
    />
  );
}
