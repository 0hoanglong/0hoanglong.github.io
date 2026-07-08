const root = document.getElementById('root');
const notificationHtml = window.contactNotification || '';

const layoutHtml = `
    <!-- Stars Background -->
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <header>
        <button id="nav-toggle" class="nav-toggle-btn">
            <i class="fas fa-bars"></i>
        </button>
        <div class="theme-switcher">
            <button id="theme-toggle-btn" class="theme-toggle-btn" aria-label="Change accent color">
                <i class="fas fa-palette"></i>
            </button>
            <div class="theme-switcher-menu">
                <button class="theme-option" data-theme-option="red" title="Đỏ" aria-label="Đỏ"></button>
                <button class="theme-option" data-theme-option="yellow" title="Vàng" aria-label="Vàng"></button>
                <button class="theme-option active-theme" data-theme-option="blue" title="Xanh lam"
                    aria-label="Xanh lam"></button>
                <button class="theme-option" data-theme-option="green" title="Xanh lục" aria-label="Xanh lục"></button>
                <button class="theme-option" data-theme-option="purple" title="Tím" aria-label="Tím"></button>
                <button class="theme-option" data-theme-option="pink" title="Tím hồng" aria-label="Tím hồng"></button>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="#about"><i class="fas fa-user"></i> <span>About</span></a></li>
                <li><a href="#skills"><i class="fas fa-code"></i> <span>Skills</span></a></li>
                <li><a href="#projects"><i class="fas fa-project-diagram"></i> <span>Projects</span></a></li>
                <li><a href="#contact"><i class="fas fa-envelope"></i> <span>Contact</span></a></li>
            </ul>
        </nav>
    </header>
    <main>
        <div id="about" class="portfolio-section">
            <div class="container-left about-left">
                <div class="profile-header">
                    <img src="https://0hoanglong.zone.id/portfolio-long-v20-spa-new/avt.jpg" draggable="false" alt="Profile Picture">
                    <div>
                        <p class="about-badge">Frontend Developer</p>
                        <h2>Trần Hoàng Long</h2>
                    </div>
                </div>
                <div class="about-text-block">
                    <span id="typing-effect"></span>
                    <p class="about-description">
                    Hello! I'm a student at Bach Khoa Sai Gon College. My passion for programming started in 7th grade and has grown steadily with each line of code I write.

I consider myself a person with sharp logical thinking skills and enjoy finding solutions to challenging problems. I may not be very eloquent or expressive, but I always put my heart and meticulous attention to detail into every product I create.
                        </p>
                </div>
                <div class="about-actions">
                    <a class="about-btn primary" href="#projects">View Projects</a>
                    <a class="about-btn secondary" href="#contact">Contact Me</a>
                    <a class="about-btn secondary" href="" target="_blank">My CV</a>
                </div>
                <div class="about-stats">
                    <div class="stat-card">
                        <strong>3+</strong>
                        <span>Years</span>
                    </div>
                    <div class="stat-card">
                        <strong>1</strong>
                        <span>Projects</span>
                    </div>
                    <div class="stat-card">
                        <strong>78,87%</strong>
                        <span>Dedication</span>
                    </div>
                </div>
            </div>
            <div class="container-right about-right">
                <div class="about-right-panel">
                    <div class="about-showcase-card">
                        <p class="about-showcase-label">Currently focusing on</p>
                        <div class="focus-tags">
                            <span>UI/UX</span>
                            <span>Frontend</span>
                            <span>Responsive</span>
                            <span>Animation</span>
                        </div>
                    </div>
                    <div id="music-box">
                        <!-- KHUNG TRÌNH PHÁT GIAO DIỆN ẢNH -->
                        <div class="radio-card is-paused" id="playerContainer">

                            <!-- Ảnh nền Lofi Girl -->
                            <img class="bg-gif" src="https://0hoanglong.zone.id/portfolio-long-v20-spa-new/img/lofibg.gif"
                                alt="Lofi Boy Working GIF" draggable="false">

                            <!-- Lớp phủ bóng tối ở đáy -->
                            <div class="overlay"></div>

                            <!-- Bảng điều khiển chứa nút bấm SVG trong suốt -->
                            <div class="control-panel">
                                <button class="btn-play" id="playBtn">
                                    <!-- Icon Play SVG -->
                                    <svg class="icon-play" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <!-- Icon Pause SVG -->
                                    <svg class="icon-pause" viewBox="0 0 24 24">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                </button>
                            </div>

                            <!-- Các thanh sóng âm nhấp nhô dưới đáy -->
                            <div class="wave-container">
                                <div class="wave-bar"></div>
                                <div class="wave-bar"></div>
                                <div class="wave-bar"></div>
                                <div class="wave-bar"></div>
                                <div class="wave-bar"></div>
                                <div class="wave-bar"></div>
                                <div class="wave-bar"></div>
                            </div>
                        </div>

                        <!-- Nơi nhúng Iframe YouTube ẩn ngầm -->
                        <div id="yt-hidden-player"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="skills" class="portfolio-section">
            <h2 class="section-title"><i class="fas fa-laptop-code"></i> My Skills</h2>
            <div id="skills-container" class="skills-list">
                <div class="skill" style="--percent: 45%;">
                    <div class="skill-icon"><i class="fab fa-html5" style="color: #e34c26;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">HTML5</span>
                            <span class="skill-percent">45%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 20%;">
                    <div class="skill-icon"><i class="fab fa-css3-alt" style="color: #264de4;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">CSS3</span>
                            <span class="skill-percent">20%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 10%;">
                    <div class="skill-icon"><i class="fab fa-js-square" style="color: #f7df1e;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">JavaScript</span>
                            <span class="skill-percent">10%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 2%;">
                    <div class="skill-icon"><i class="fab fa-react" style="color: #61dafb;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">React JS</span>
                            <span class="skill-percent">20%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 0%;">
                    <div class="skill-icon"><i class="fab fa-node-js" style="color: #3c873a;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">Node.js</span>
                            <span class="skill-percent">0%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 5%;">
                    <div class="skill-icon"><i class="fab fa-php" style="color: #777bb4;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">PHP</span>
                            <span class="skill-percent">5%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 10%;">
                    <div class="skill-icon"><i class="fab fa-python" style="color: #3776ab;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">Python</span>
                            <span class="skill-percent">10%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 7%;">
                    <div class="skill-icon"><i class="fas fa-database" style="color: #00758f;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">SQL Database</span>
                            <span class="skill-percent">7%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="skills-container" class="skills-list">
                <div class="skill" style="--percent: 40%;">
                    <div class="skill-icon"><i class="fas fa-comments" style="color: #38bdf8;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">Giao tiếp</span>
                            <span class="skill-percent">40%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 50%;">
                    <div class="skill-icon"><i class="fas fa-clock" style="color: #f59e0b;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">Quản lý thời gian</span>
                            <span class="skill-percent">50%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 65%;">
                    <div class="skill-icon"><i class="fas fa-users" style="color: #22c55e;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">Làm việc nhóm</span>
                            <span class="skill-percent">65%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 76%;">
                    <div class="skill-icon"><i class="fas fa-lightbulb" style="color: #a78bfa;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">Tư duy sáng tạo</span>
                            <span class="skill-percent">76%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
                <div class="skill" style="--percent: 75%;">
                    <div class="skill-icon"><i class="fas fa-hands-helping" style="color: #f97316;"></i></div>
                    <div class="skill-details">
                        <div class="skill-info">
                            <span class="skill-name">Hỗ trợ người khác</span>
                            <span class="skill-percent">75%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="projects" class="portfolio-section">
            <div class="projects-header">
                <h2 class="section-title"><i class="fas fa-project-diagram"></i> Featured Projects</h2>
            </div>
            <div class="projects-carousel">
                <div class="project-card">
                    <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLQRCKjof0jJrp2j8_jXOeRZR3XUKGSWR2ejzYQnv_kjKwLs7IG9lHah8Q4FdqhTxJULR3L4-daum5Gt9hyBx9DzGY709Y-L21nA8SY2hU3bkhrAejftMjRzJSostsJxeCbi8kr8rCetAo3nJI7F_mhiI0ssZOHgLhUrVL_8rKQHcWOkONsJi7F2vCqjo/s1366/ScreenShot_20260109195128.jpeg" draggable="false" alt="Project 1">
                    <div class="project-card-body">
                        <h3 class="project-title">Lớp 12a5, Trường THPT Phú Ngọc</h3>
                        <p class="project-description">Website lưu giữ kỷ niệm, hình ảnh hoạt động và thông tin thành viên của tập thể lớp 12A5. Nơi kết nối bạn bè và lưu lại những khoảnh khắc thanh xuân đáng nhớ.</p>
                        <a href="https://thptphungoc12a5.github.io/"  target="_blank" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div id="contact" class="portfolio-section">
            <h2 class="section-title"><i class="fas fa-envelope-open-text"></i> Contact Me</h2>
            <div class="contact-content">
                <div class="contact-info-block container-left">
                    <div>
                        <p class="contact-label">Let's talk</p>
                        <h3 class="contact-heading">Get in touch</h3>
                    </div>
                    <div class="contact-detail-list">
                        <div class="contact-info"><i class="fas fa-map-marker-alt"></i><span>Address: Dong Nai,
                                Vietnam</span></div>
                        <div class="contact-info"><i class="fas fa-phone"></i><span>Phone: +84 384 760 734</span></div>
                        <div class="contact-info"><i class="fas fa-envelope"></i><span>Email:
                                hoanglong.tech@gmail.com</span></div>
                    </div>
                    <div class="contact-cta-box">
                        <p>Available for freelance work and collaboration.</p>
                        <a href="#" class="contact-cta-btn">Book a call</a>
                    </div>
                    <div>
                        <p class="contact-social-text">Find me at:</p>
                        <div class="social-links">
                            <a href="http://facebook.com/hoanglongryu" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="http://github.com/0hoanglong/" aria-label="GitHub"><i class="fab fa-github"></i></a>
                            <a href="http://instagram.com/hoanglongryu" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div class="contact-form-block container-right">
                    <form class="contact-form" method="post" action="">
                        <div class="notificationHtml"></div>
                        <div class="contact-row">
                            <input type="text" name="name" placeholder="Your Name" required>
                        </div>
                        <div class="contact-row contact-row-two">
                            <input class="contact-half" type="tel" name="phone" placeholder="Your Phone">
                            <input class="contact-half" type="email" name="email" placeholder="Your Email">
                        </div>
                        <div class="contact-row">
                            <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                        </div>
                        <span class="form-error">Please enter the content.</span>
                        <span class="form-info" aria-live="polite">
                            You can only send one message every 3 minutes.
                            <strong id="countdown">00:00</strong>
                        </span>
                        <button type="submit">Send Message <i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
        </div>
    </main>
`;

if (root) {
    // Tạo một thẻ tạm để chứa chuỗi giao diện
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = layoutHtml.trim();

    // Biến đổi các thẻ con bên trong thành một mảng phần tử DOM thực tế
    const elements = Array.from(tempContainer.children);

    // Thay thế HOÀN TOÀN thẻ #root bằng các phần tử giao diện mới
    root.replaceWith(...elements);

    console.log("[SPA Core]: Đã xóa sổ hoàn toàn thẻ #root, đưa giao diện về con trực tiếp của body!");
}
