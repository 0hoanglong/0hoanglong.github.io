
    // Kiểm tra xem ĐÂY CÓ PHẢI là thiết bị di động hay không
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallWidth = window.innerWidth <= 768;

    // NGƯỢC LẠI: Nếu KHÔNG PHẢI mobile VÀ màn hình LỚN HƠN 768px (tức là PC)
    if (!isMobileDevice && !isSmallWidth) {
        // Chuyển hướng sang link web mới dành cho PC
        window.location.href = "https://tenmiendemoi-pc.com";
    }

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tính tuổi tự động
    const birthYear = 2007; // Giả định năm sinh dựa trên thông tin lớp 12
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    
    const ageElement = document.querySelector('.age');
    if (ageElement) {
        ageElement.textContent = age;
    }

    // 2. Cập nhật năm bản quyền ở Footer
    const yearCopyrightElement = document.querySelector('.year-copyright');
    if (yearCopyrightElement) {
        yearCopyrightElement.textContent = currentYear;
    }

    // 3. Hiệu ứng đơn giản cho nút Send (Optional)
    const sendBtn = document.querySelector('.Contact button');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const nameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('your-phone');
            const messageInput = document.getElementById('message');

            // Reset lỗi cũ
            [nameInput, emailInput, phoneInput, messageInput].forEach(input => input.classList.remove('input-error'));

            const fullName = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = phoneInput.value.trim();
            const message = messageInput.value.trim();

            // Kiểm tra định dạng (Validation)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^0\d{9}$/; // Số điện thoại VN: 10 số, bắt đầu bằng 0

            const isEmailValid = !email || emailRegex.test(email);
            const isPhoneValid = !phone || phoneRegex.test(phone);

            if (!isEmailValid || !isPhoneValid) {
                if (!isEmailValid) emailInput.classList.add('input-error');
                if (!isPhoneValid) phoneInput.classList.add('input-error');
                
                FuiToast.warning("Thông tin không hợp lệ !", {
                    className: 'dark-mode'
                });
                return;
            }

            const hasName = fullName;
            const hasContact = email || phone;
            const hasMessage = message;

            if (hasName && hasContact && hasMessage) {
                // Hiệu ứng nút đang gửi
                const originalText = sendBtn.innerText;
                sendBtn.innerText = "Sending...";
                sendBtn.disabled = true;

                // URL Google Script của bạn (Thay thế link của bạn vào đây)
                const scriptURL = 'https://script.google.com/macros/s/AKfycbzItFgJc05-lCLhubPLDq0d6tRRRgrHAW6loTInTptDDLDZAsr5871pEqAH49CJOSut/exec';

                fetch(scriptURL, {
                    method: 'POST',
                    body: JSON.stringify({ fullName, email, phone, message }),
                    mode: 'no-cors', // Quan trọng để tránh lỗi CORS khi gửi đến Google
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                .then(() => {
                    FuiToast.success('Đã gửi thành công.',{
                        className: 'dark-mode'
                    });
                    // Reset form sau khi gửi
                    document.getElementById('full-name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('your-phone').value = '';
                    document.getElementById('message').value = '';
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    FuiToast.error("Gửi Không thành công !", {
                        className: 'dark-mode'
                    });
                })
                .finally(() => {
                    sendBtn.innerText = originalText;
                    sendBtn.disabled = false;
                });

            } else if (hasName && hasContact && !hasMessage) {
                // Thiếu nội dung -> Báo đỏ ô message
                messageInput.classList.add('input-error');
                // Xóa báo đỏ các ô khác
                [nameInput, emailInput, phoneInput].forEach(input => input.classList.remove('input-error'));

                FuiToast.warning("Không có nội dung để gửi.",{
                    className: 'dark-mode'
                });
            } else {
                // Xử lý báo đỏ từng ô
                if (!hasName) nameInput.classList.add('input-error');
                else nameInput.classList.remove('input-error');

                if (!hasContact) { emailInput.classList.add('input-error'); phoneInput.classList.add('input-error'); }
                
                // Trường hợp chưa nhập tên, hoặc thiếu thông tin liên hệ
                FuiToast.error("Bạn chưa nhập thông tin !",{
                    className: 'dark-mode'
                });
            }
        });
    }

    // Xóa class lỗi khi người dùng bắt đầu nhập lại
    const inputs = document.querySelectorAll('.Contact input, .Contact textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
        });
    });

    // 4. Chuyển đổi Tab (Card)
    const navItems = document.querySelectorAll('.nav-tabs li');
    const cards = document.querySelectorAll('.About, .Skills, .Project, .Contact, .Donate');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');

            // KIỂM TRA: Nếu là PC (rộng > 870px) và bấm vào Donate -> Chuyển sang trang riêng
            if (targetId === 'donate' && window.innerWidth > 870) {
                window.location.href = 'donatetome';
                return;
            }

            // Logic chuyển tab bình thường (cho mobile hoặc các tab khác)
            navItems.forEach(nav => nav.classList.remove('active'));
            cards.forEach(card => card.classList.remove('active'));

            // Thêm active vào menu vừa bấm
            item.classList.add('active');

            // Lấy id mục tiêu từ data-target và hiển thị card tương ứng
            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });

    // 5. Hiệu ứng gõ chữ (Typing Effect) cho phần Profession
    const professionElement = document.querySelector('.profession');
    if (professionElement) {
        const words = ["Student", "Web Developer", "Coder", "Freelance Programmer", "Dreamer", "Good Boy", "Simp"]; // Các từ muốn hiển thị
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                professionElement.textContent = currentWord.substring(0, charIndex--);
            } else {
                professionElement.textContent = currentWord.substring(0, charIndex++);
            }

            let typeSpeed = isDeleting ? 100 : 200; // Tốc độ xóa nhanh hơn gõ

            if (!isDeleting && charIndex === currentWord.length + 1) {
                isDeleting = true;
                typeSpeed = 2000; // Dừng lại 2 giây khi gõ xong 1 từ
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Chuyển sang từ tiếp theo
            }

            setTimeout(typeEffect, typeSpeed);
        }
        
        typeEffect();
    }

    // 6. Responsive Menu Mover (Di chuyển menu xuống dưới trên mobile)
    const nav = document.querySelector('nav');
    const navList = document.querySelector('.nav-tabs');
    const main = document.querySelector('main');
    const section = document.querySelector('section');

    function moveNav() {
        if (window.innerWidth <= 870) {
            // Mobile: Chuyển menu vào bên trong section, đặt lên đầu
            if (navList.parentElement !== section) {
                section.insertBefore(navList, section.firstChild);
            }
        } else {
            // Desktop: Trả menu về nav
            if (navList.parentElement !== nav) {
                nav.appendChild(navList);
            }
        }
    }

    // Lắng nghe sự kiện resize và chạy lần đầu
    window.addEventListener('resize', moveNav);
    moveNav();

    // 7. Custom Right-Click Context Menu
    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
        const contextSource = document.getElementById('context-source');
        const contextReload = document.getElementById('context-reload');
        const contextScrollTop = document.getElementById('context-scroll-top');

        // Hàm điều chỉnh vị trí để menu không bị tràn ra ngoài màn hình
        const normalizePosition = (mouseX, mouseY) => {
            const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
            const menuWidth = contextMenu.offsetWidth;
            const menuHeight = contextMenu.offsetHeight;

            let normalizedX = mouseX;
            let normalizedY = mouseY;

            if (mouseX + menuWidth > windowWidth) {
                normalizedX = windowWidth - menuWidth - 5;
            }

            if (mouseY + menuHeight > windowHeight) {
                normalizedY = windowHeight - menuHeight - 5;
            }

            return { normalizedX, normalizedY };
        };

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            // Vô hiệu hóa nút "Cuộn lên đầu" nếu đang ở trên cùng
            const isAtTop = window.scrollY === 0;
            isAtTop ? contextScrollTop.classList.add('disabled') : contextScrollTop.classList.remove('disabled');

            const { clientX: mouseX, clientY: mouseY } = e;
            
            const { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY);

            // Đặt vị trí và tâm hiệu ứng trước khi hiển thị
            contextMenu.style.top = `${normalizedY}px`;
            contextMenu.style.left = `${normalizedX}px`;
            // Đặt tâm hiệu ứng ngay tại vị trí con trỏ chuột để menu phóng to ra từ đó
            contextMenu.style.transformOrigin = `${mouseX - normalizedX}px ${mouseY - normalizedY}px`;

            contextMenu.classList.add('visible'); // Thêm class để hiển thị với hiệu ứng
        });

        // Ẩn menu khi click chuột trái
        document.addEventListener('click', () => {
            contextMenu.classList.remove('visible');
        });

        contextSource.addEventListener('click', () => {
            // Giao thức 'view-source:' không đáng tin cậy và bị nhiều trình duyệt chặn.
            // Thay đổi để mở trực tiếp file mã nguồn trên GitHub.
            window.open('https://github.com/0hoanglong/0hoanglong.github.io/blob/main/index.html', '_blank');
        });

        contextReload.addEventListener('click', () => {
            // Tải lại trang
            window.location.reload();
        });

        contextScrollTop.addEventListener('click', () => {
            // Cuộn lên đầu trang với hiệu ứng mượt
            if (!contextScrollTop.classList.contains('disabled')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});
