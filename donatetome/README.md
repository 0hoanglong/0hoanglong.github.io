# MoMo Payment Card - Portfolio Donate

Một giao diện thẻ thanh toán MoMo hiện đại với hiệu ứng 3D Tilt, quầng sáng theo chuột và hỗ trợ Deep Link giúp mở ứng dụng MoMo trực tiếp trên điện thoại.

## ✨ Tính năng nổi bật
- **Hiệu ứng 3D Glassmorphism:** Sử dụng thư viện `Vanilla-tilt.js` tạo chiều sâu khi di chuột.
- **Interactive Mouse Glow:** Quầng sáng hồng chạy theo con trỏ chuột tinh tế.
- **Deep Link Integration:** Nút bấm tự động mở ứng dụng MoMo trên iOS/Android.
- **Responsive Design:** Tối ưu hóa giao diện cho cả máy tính và điện thoại (tự động vô hiệu hóa hiệu ứng nặng trên mobile).
- **SweetAlert2:** Thông báo chuyên nghiệp thay thế cho alert mặc định.

## 🚀 Công nghệ sử dụng
- HTML5 & CSS3 (Custom Variables, Flexbox, Keyframes)
- JavaScript (ES6+)
- Vanilla Tilt
- SweetAlert2

## 📦 Cách sử dụng
1. Clone repository này về máy.
2. Thay thế ảnh `img/qrmomo.jpg` bằng mã QR của riêng bạn.
3. Cập nhật tên và link chuyển khoản trong `index.html` và `script.js`.
4. Mở file `index.html` trên trình duyệt để kiểm tra.

## 🛠 Cấu hình
Bạn có thể điều chỉnh màu sắc chủ đạo tại file `style.css`:
```css
:root {
    --momo-pink: #d82d8b;
    --momo-dark: #A50064;
}
```