
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
    const cards = document.querySelectorAll('.About, .Skills, .Project, .Contact');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Xóa active ở tất cả menu và card
            navItems.forEach(nav => nav.classList.remove('active'));
            cards.forEach(card => card.classList.remove('active'));

            // Thêm active vào menu vừa bấm
            item.classList.add('active');

            // Lấy id mục tiêu từ data-target và hiển thị card tương ứng
            const targetId = item.getAttribute('data-target');
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
});
