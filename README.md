# Personal Portfolio - Trần Hoàng Long

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

**Live Demo:** [Xem trang web tại đây](https://0hoanglong.github.io/)

Chào mừng đến với mã nguồn trang Portfolio cá nhân của tôi. Đây là nơi tôi giới thiệu về bản thân, kỹ năng, các dự án đã thực hiện và thông tin liên hệ.

## 🌟 Tính năng nổi bật

- **Giao diện hiện đại (Dark Mode):** Thiết kế tối giản, tập trung vào nội dung với tông màu tối dễ chịu.
- **Responsive Design:** Tương thích hoàn toàn trên mọi thiết bị (Desktop, Tablet, Mobile).
- **Hiệu ứng mượt mà:**
  - Typing Effect (Hiệu ứng gõ chữ) cho phần giới thiệu nghề nghiệp.
  - Chuyển tab (About, Skills, Project, Contact) không cần tải lại trang.
  - Sticky Menu trên giao diện Mobile.
- **Form liên hệ thông minh:**
  - Tích hợp **Google Apps Script** để lưu dữ liệu trực tiếp vào Google Sheets (Serverless).
  - Validate dữ liệu đầu vào (Email, Số điện thoại VN) bằng Regex.
  - Hiệu ứng rung lắc và báo đỏ khi nhập sai thông tin.
  - Thông báo trạng thái (Toast Notification) sử dụng thư viện `FuiToast`.

## 🛠️ Công nghệ sử dụng

- **Frontend:** HTML5, CSS3 (Flexbox, Grid), JavaScript (Vanilla).
- **Libraries:**
  - FontAwesome (Icons).
  - Google Fonts (Font Poppins).
  - FuiToast (Thông báo).
- **Backend (Contact Form):** Google Apps Script & Google Sheets.

## 🚀 Cài đặt và Sử dụng

1. **Clone dự án về máy:**
   ```bash
   git clone https://github.com/0hoanglong/0hoanglong.github.io.git
   ```
2. **Mở file `index.html`** bằng trình duyệt bất kỳ để xem trang web.

## ⚙️ Cấu hình Form liên hệ (Google Sheets)

Dự án này sử dụng Google Sheets làm cơ sở dữ liệu. Để form hoạt động trên phiên bản của bạn:

1. Tạo một Google Sheet mới.
2. Vào **Tiện ích mở rộng (Extensions)** > **Apps Script**.
3. Mở file `Code.gs` trong dự án này, copy toàn bộ nội dung và dán vào trình soạn thảo Apps Script.
4. **Triển khai (Deploy)** dưới dạng **Web App**:
   - *Execute as:* Me.
   - *Who has access:* Anyone (Bất kỳ ai).
5. Copy URL của Web App vừa tạo.
6. Mở file `script.js` trong dự án, tìm dòng:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
   Thay thế bằng URL của bạn.

## 📂 Cấu trúc thư mục

```text
├── Code.gs             # Mã nguồn Google Apps Script (Backend)
├── index.html          # Trang chủ
├── privacypolicy.html  # Trang chính sách bảo mật
├── styles.css          # Định dạng giao diện
├── script.js           # Logic xử lý (Tabs, Form, Typing effect)
└── README.md           # Tài liệu dự án
```

## 📄 Giấy phép (License)

Dự án này được phân phối dưới giấy phép **MIT License**.

```text
MIT License

Copyright (c) 2026 Trần Hoàng Long

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
...
```

---

Made with ❤️ by **Trần Hoàng Long**