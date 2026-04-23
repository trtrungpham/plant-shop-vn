import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Giới thiệu | PlantShop VN" };

export default function AboutPage() {
  return (
    <InfoPage
      title="Giới thiệu PlantShop VN"
      intro="PlantShop VN là hệ sinh thái cây cảnh online ra đời năm 2024 — đưa cây xanh đến gần hơn với người Việt qua trải nghiệm mua hàng di động nhanh, tin cậy và đầy cảm hứng."
      sections={[
        {
          heading: "Câu chuyện của chúng tôi",
          body: "Bắt đầu từ một nhà vườn nhỏ ở Đà Lạt, chúng tôi nhận ra rất nhiều khách hàng ở thành phố muốn có cây xanh nhưng ngại vì khó chăm, khó chọn, khó giao. PlantShop ra đời để giải quyết cả 3 vấn đề đó: cây đã thuần dưỡng, có gợi ý theo mệnh/mục đích, và giao nhanh 2 giờ nội thành.",
        },
        {
          heading: "Sứ mệnh",
          body: [
            "Mang cây xanh vào mọi gia đình, văn phòng, quán cafe Việt",
            "Biến việc chăm cây trở nên đơn giản — ai cũng có thể chăm được",
            "Kết nối hàng trăm nhà vườn uy tín với khách hàng cuối",
            "Cam kết 100% cây thật, đúng mô tả, bao sống 7 ngày",
          ],
        },
        {
          heading: "Con số ấn tượng",
          body: [
            "🌱 200,000+ đơn hàng đã giao thành công",
            "🏪 500+ nhà vườn đối tác trên toàn quốc",
            "⭐ Điểm hài lòng trung bình 4.8/5",
            "🚚 Phủ sóng 63/63 tỉnh thành",
            "💚 98% khách quay lại mua lần 2",
          ],
        },
        {
          heading: "Giá trị cốt lõi",
          body: [
            "Chân thật: Ảnh thật, cây thật, review thật",
            "Tận tâm: Tư vấn miễn phí đến khi bạn tìm được cây phù hợp",
            "Trách nhiệm: Bao sống 7 ngày, lỗi 1 đổi 1 không điều kiện",
            "Bền vững: Bao bì phân huỷ sinh học, hạn chế nhựa",
          ],
        },
      ]}
      cta={{ label: "Khám phá sản phẩm ngay", href: "/" }}
    />
  );
}
