        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Chỉ kích hoạt hiệu ứng hình ảnh nếu KHÔNG PHẢI mobile
        if (!isMobile) {
            // Xử lý quầng sáng theo chuột
            const glow = document.getElementById('mouseGlow');
            if (glow) {
                document.addEventListener('mousemove', (e) => {
                    const x = e.clientX;
                    const y = e.clientY;
                    requestAnimationFrame(() => {
                        glow.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
                    });
                });
            }

            // Khởi tạo Tilt 3D thủ công cho Card
            const card = document.querySelector('.card');
            if (card && typeof VanillaTilt !== 'undefined') {
                VanillaTilt.init(card, {
                    max: 10,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.2
                });
            }
        }

        // Logic xử lý chuyển hướng MoMo
        function handlePayment() {
            const momoLink = "momo://app?action=marketing&refId=TransferInputMoney&serviceCode=transfer_p2p&action=p2p&extra=%2522%257B%255C%2522dataExtract%255C%2522%253A%255C%2522eyJ1c2VySWQiOiIqKioqKioqKjczNCIsImFtb3VudCI6MC4wLCJ0cmFuc2ZlclNvdXJjZSI6InRyYW5zZmVyX3ZpYV9saW5rIiwiYWdlbnRJZCI6MTI0OTMzMzAwLCJyZWNlaXZlclR5cGUiOiIxNCIsImVuYWJsZUVkaXRBbW91bnQiOnRydWUsImF2YXRhclVybCI6Imh0dHBzOi8vYXZhdGFyLm1vbW9jZG4ubmV0L2F2YXRhci8zYmY4L2JkNjJiY2QyNDFjZDg4MWZkM2NlNDdhNDU2MDY5MWQyZGUxYmQ0NzM0NWI5NDBiNGY5YTY1ZTNkNjczZi5wbmciLCJtb25leVJlcXVlc3RJZCI6ImhvYW5nbG9uZ3J5dSJ9%255C%2522%257D%2522&deeplinkId=ICt5oWCrNkh";
            
            if (isMobile) {
                const now = new Date().valueOf();
                window.location = momoLink;
                
                setTimeout(function () {
                    if (new Date().valueOf() - now < 5000) {
                        window.location = 'https://momo.vn/download';
                    }
                }, 4000);
            } else {
                // Hiệu ứng phản hồi nhẹ khi click trên PC
                const card = document.querySelector(".card");
                card.style.borderColor = "var(--momo-pink)";
                setTimeout(() => card.style.borderColor = "rgba(255, 255, 255, 0.1)", 500);

                // Sử dụng SweetAlert2 để hiển thị thông báo
                Swal.fire({
                    title: 'Thông báo',
                    text: 'Vui lòng dùng điện thoại quét mã QR để thanh toán nhé!',
                    icon: 'info',
                    confirmButtonText: 'Đã hiểu',
                    confirmButtonColor: '#d82d8b',
                    background: '#1a1a1a',
                    color: '#ffffff'
                });
            }
        }