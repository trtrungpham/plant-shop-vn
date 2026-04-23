import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Hướng dẫn chăm cây | PlantShop VN" };

export default function Page() {
  return (
    <InfoPage
      title="Hướng dẫn chăm cây cơ bản"
      intro="Không biết chăm cây? Không sao. Đây là 5 nguyên tắc vàng áp dụng cho 90% cây cảnh — dễ nhớ, dễ làm, cây sống khoẻ."
      tocTitle="Nội dung"
      sections={[
        {
          heading: "1. Tưới nước đúng cách",
          body: [
            "Chỉ tưới khi đất mặt khô (cắm ngón tay sâu 2cm, thấy khô là tưới)",
            "Tưới đẫm cho nước chảy ra lỗ thoát — sau đó đổ nước đọng dưới đĩa",
            "Mùa hè tưới 2-3 lần/tuần, mùa đông 1 lần/tuần",
            "Sen đá / Xương rồng: 7-14 ngày/lần, rất ít nước",
            "Tuyệt đối KHÔNG tưới mỗi ngày — dễ úng gốc, chết",
          ],
        },
        {
          heading: "2. Ánh sáng phù hợp",
          body: [
            "Ánh sáng gián tiếp: gần cửa sổ, không nắng trực tiếp cháy lá",
            "Cây ưa sáng (sen đá, xương rồng, hoa hồng): 4-6h nắng/ngày",
            "Cây ưa bóng (trầu bà, lưỡi hổ, ZZ): ánh sáng tán xạ là đủ",
            "Quay chậu 1/4 vòng mỗi tuần để lá mọc đều",
            "Lá vàng mặt gần cửa = nắng gắt, cần dời xa",
          ],
        },
        {
          heading: "3. Bón phân",
          body: [
            "Xuân - Hè: bón 2 tuần/lần (mùa tăng trưởng)",
            "Thu - Đông: bón 1 tháng/lần hoặc ngừng (cây nghỉ)",
            "Phân trùn quế cho mọi cây (an toàn, không cháy rễ)",
            "Phân NPK 20-20-20 cho cây lá xanh",
            "Phân NPK 10-30-20 cho cây ra hoa / kết trái",
          ],
        },
        {
          heading: "4. Thay chậu",
          body: [
            "Thay chậu 1-2 năm/lần, tốt nhất vào mùa xuân",
            "Chọn chậu lớn hơn chậu cũ 2-3cm",
            "Luôn chọn chậu có lỗ thoát nước",
            "Trộn đất mới 60% + đất cũ 40% để cây quen dần",
            "Sau thay, tưới đẫm rồi để nơi mát 1 tuần",
          ],
        },
        {
          heading: "5. Phòng sâu bệnh",
          body: [
            "Lau lá khô mỗi 2 tuần bằng khăn ẩm (giúp lá quang hợp & phát hiện sâu sớm)",
            "Rệp sáp trắng: xịt cồn 70% loãng lên lá",
            "Nhện đỏ: tăng độ ẩm, xịt nước mặt dưới lá",
            "Nấm mốc: cắt phần nhiễm, phun chế phẩm sinh học trichoderma",
            "Sâu ăn lá: bắt tay hoặc dùng neem oil (dầu neem)",
          ],
        },
        {
          heading: "Cây đang có vấn đề? Chụp ảnh chat shop",
          body: "Đội ngũ nhà vườn PlantShop tư vấn MIỄN PHÍ 24/7. Bạn chỉ cần chụp rõ phần bị lỗi + chụp tổng thể cây + cho biết tưới bao lâu 1 lần. Shop sẽ chẩn đoán trong vòng 30 phút và gửi video hướng dẫn cứu cây.",
        },
      ]}
      cta={{ label: "Chat với nhà vườn ngay", href: "/messages" }}
    />
  );
}
