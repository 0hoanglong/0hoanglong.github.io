// Bước 1: Gọi index.js để dựng toàn bộ HTML vào #root trước
import 'https://0hoanglong.zone.id/portfolio-long-v20-spa-new/index.js'; 

// Bước 2: Sau khi có HTML, tiến hành nạp CSS để trình duyệt render giao diện
const linkCss = document.createElement('link');
linkCss.rel = 'stylesheet';
linkCss.href = 'https://0hoanglong.zone.id/portfolio-long-v20-spa-new/style.css'; // Đường dẫn file CSS của bạn
document.head.appendChild(linkCss);

// Bước 3: Nạp file xử lý hiệu ứng tính năng chính (script.js)
const scriptMain = document.createElement('script');
scriptMain.src = 'https://0hoanglong.zone.id/portfolio-long-v20-spa-new/script.js';
scriptMain.defer = true;
document.body.appendChild(scriptMain);

// Bước 4: Cuối cùng, nạp API YouTube (Đảm bảo an toàn không chặn render)
const scriptYoutube = document.createElement('script');
scriptYoutube.src = 'https://www.youtube.com/iframe_api';
document.body.appendChild(scriptYoutube);
