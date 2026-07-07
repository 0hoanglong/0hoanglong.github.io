// Bước 1: Gọi index.js để dựng toàn bộ HTML vào #root trước
import './index.js'; 

// Bước 2: Sau khi có HTML, tiến hành nạp CSS để trình duyệt render giao diện
const linkCss = document.createElement('link');
linkCss.rel = 'stylesheet';
linkCss.href = './style.css'; // Đường dẫn file CSS của bạn
document.head.appendChild(linkCss);

// Bước 3: Nạp file xử lý hiệu ứng tính năng chính (script.js)
const scriptMain = document.createElement('script');
scriptMain.src = './script.js';
scriptMain.defer = true;
document.body.appendChild(scriptMain);

// Bước 4: Cuối cùng, nạp API YouTube (Đảm bảo an toàn không chặn render)
const scriptYoutube = document.createElement('script');
scriptYoutube.src = 'https://www.youtube.com/iframe_api';
document.body.appendChild(scriptYoutube);