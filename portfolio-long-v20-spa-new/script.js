// Get all portfolio sections
const sections = document.querySelectorAll('.portfolio-section');
// Get navigation links
const navLinks = document.querySelectorAll('nav ul li a');
// Get main element
const main = document.querySelector('main');
// Get header element
const header = document.querySelector('header');
// Get navigation buttons
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Theme switcher controls
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeSwitcher = document.querySelector('.theme-switcher');
const themeOptions = document.querySelectorAll('.theme-option');

let currentSectionIndex = 0;
const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';

function isInteractiveTarget(target) {
    return !!target?.closest?.(interactiveSelector);
}

function openExternalLink(link, event) {
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

    const target = link.getAttribute('target') || '_blank';
    window.open(href, target, 'noopener,noreferrer');
    event?.preventDefault();
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);

    themeOptions.forEach(option => {
        option.classList.toggle('active-theme', option.dataset.themeOption === theme);
    });
}

function closeThemeMenu() {
    if (themeSwitcher) {
        themeSwitcher.classList.remove('open');
    }
}

// Typing effect variables
const typingEffectElement = document.getElementById('typing-effect');
const textsToType = [
    "A passionate developer.",
    "Building amazing web experiences.",
    "Coder",
    "Problem solver.",
    "Always learning new technologies.",
    "Freelance Programmer",
    "Dreamer",
    "A Simp",
    "A Good Boy"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // Milliseconds per character
let typingTimer; // Biến để lưu ID của setTimeout

function typeWriter() {
    if (!typingEffectElement) return; // Ensure the element exists

    const currentText = textsToType[textIndex];
    let displayedText = '';

    if (isDeleting) {
        displayedText = currentText.substring(0, charIndex - 1);
    } else {
        displayedText = currentText.substring(0, charIndex + 1);
    }

    typingEffectElement.textContent = displayedText;

    let speed = typingSpeed;
    if (isDeleting) speed /= 2; // Faster deleting

    if (!isDeleting && charIndex === currentText.length) {
        speed = 1500; // Pause at end of typing
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textsToType.length;
        speed = 500; // Pause before typing next text
    }

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingTimer = setTimeout(typeWriter, speed); // Lưu ID của setTimeout
}

// Function to show a specific section and hide others
function showSection(index) {
    const oldIndex = currentSectionIndex;

    // Ensure index is within bounds, looping if necessary
    if (index < 0) {
        currentSectionIndex = sections.length - 1; // Loop to last section
    } else if (index >= sections.length) {
        currentSectionIndex = 0; // Loop to first section
    } else {
        currentSectionIndex = index;
    }

    // Dừng hiệu ứng gõ chữ nếu nó đang chạy
    if (typingTimer) {
        clearTimeout(typingTimer);
        typingTimer = null; // Đặt lại ID timer
    }

    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active', 'slide-down');
    });

    // Show the current section
    sections[currentSectionIndex].classList.add('active');

    // Xác định hướng: nếu đi ngược về trang trước thì thêm class slide-down
    // index < oldIndex: người dùng nhấn vào mục phía trên menu hoặc nhấn "Last"
    // Trường hợp đặc biệt: từ trang đầu về trang cuối và ngược lại
    if (index < oldIndex && !(oldIndex === sections.length - 1 && index === 0)) {
        sections[currentSectionIndex].classList.add('slide-down');
    }

    // Update active state for nav links (optional, but good for UX)
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
    });
    // Find the nav link corresponding to the current active section
    const activeNavLink = document.querySelector(`nav ul li a[href="#${sections[currentSectionIndex].id}"]`);
    if (activeNavLink) {
        activeNavLink.classList.add('active-nav');
    }

    // Start typing effect if 'about' section is active
    if (sections[currentSectionIndex].id === 'about' && typingEffectElement) {
        // Reset typing effect state before starting
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typingEffectElement.textContent = ''; // Clear previous text
        typeWriter();
    } else {
        // Nếu không phải trang 'about', đảm bảo text typing-effect được xóa
        // và không có timer nào đang chạy
        if (typingEffectElement) typingEffectElement.textContent = '';
    }
}

// Event listeners for navigation links
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor jump behavior
        showSection(index);
    });
});

// Support other section links (for example buttons inside the About section)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    const targetId = link.getAttribute('href')?.slice(1);
    const targetSection = targetId ? document.getElementById(targetId) : null;

    if (targetSection && targetSection.classList.contains('portfolio-section')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetIndex = Array.from(sections).indexOf(targetSection);
            if (targetIndex !== -1) {
                showSection(targetIndex);
            }
        });
    }
});

// Logic kéo chuột (drag) để trượt ngang các danh sách skills
const skillsContainers = document.querySelectorAll('.skills-list');

skillsContainers.forEach((skillsContainer) => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function setScrollPosition(position) {
        const maxScroll = Math.max(0, skillsContainer.scrollWidth - skillsContainer.clientWidth);
        if (maxScroll <= 0) return;
        skillsContainer.scrollLeft = clamp(position, 0, maxScroll);
    }

    function beginDrag(clientX) {
        isDown = true;
        startX = clientX;
        startScroll = skillsContainer.scrollLeft;
        skillsContainer.style.scrollBehavior = 'auto';
        skillsContainer.classList.add('active-drag');
    }

    skillsContainer.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (isInteractiveTarget(e.target)) return;
        beginDrag(e.clientX);
        skillsContainer.setPointerCapture?.(e.pointerId);
    });

    skillsContainer.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const walk = e.clientX - startX;
        setScrollPosition(startScroll - walk);
    });

    function endDrag() {
        if (!isDown) return;
        isDown = false;
        skillsContainer.classList.remove('active-drag');
        skillsContainer.style.scrollBehavior = 'smooth';
        setScrollPosition(skillsContainer.scrollLeft);
    }

    skillsContainer.addEventListener('pointerup', endDrag);
    skillsContainer.addEventListener('pointerleave', () => {
        if (!isDown) return;
        endDrag();
    });
    skillsContainer.addEventListener('pointercancel', endDrag);

    skillsContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            beginDrag(e.touches[0].clientX);
        }
    }, { passive: true });

    skillsContainer.addEventListener('touchmove', (e) => {
        if (!isDown || e.touches.length === 0) return;
        const walk = e.touches[0].clientX - startX;
        setScrollPosition(startScroll - walk);
    }, { passive: false });

    skillsContainer.addEventListener('touchend', endDrag);
    skillsContainer.addEventListener('touchcancel', endDrag);
});

// Logic kéo chuột (drag) cho carousel projects
const projectCarousel = document.querySelector('.projects-carousel');

if (projectCarousel) {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    const scrollbarZone = 18;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function setScrollPosition(position) {
        const maxScroll = Math.max(0, projectCarousel.scrollWidth - projectCarousel.clientWidth);
        if (maxScroll <= 0) return;
        projectCarousel.scrollLeft = clamp(position, 0, maxScroll);
    }

    function shouldIgnoreDrag(clientX, clientY) {
        const rect = projectCarousel.getBoundingClientRect();
        const nearBottom = clientY >= rect.bottom - scrollbarZone && clientY <= rect.bottom + 6;
        return nearBottom;
    }

    function beginDrag(clientX, clientY) {
        if (shouldIgnoreDrag(clientX, clientY)) return;
        isDown = true;
        startX = clientX;
        startScroll = projectCarousel.scrollLeft;
        projectCarousel.style.scrollBehavior = 'auto';
        projectCarousel.classList.add('active-drag');
    }

    projectCarousel.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (isInteractiveTarget(e.target)) return;
        beginDrag(e.clientX, e.clientY);
        if (isDown) {
            projectCarousel.setPointerCapture?.(e.pointerId);
        }
    });

    projectCarousel.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const walk = e.clientX - startX;
        setScrollPosition(startScroll - walk);
    });

    function endDrag() {
        if (!isDown) return;
        isDown = false;
        projectCarousel.classList.remove('active-drag');
        projectCarousel.style.scrollBehavior = 'smooth';
        setScrollPosition(projectCarousel.scrollLeft);
    }

    projectCarousel.addEventListener('pointerup', endDrag);
    projectCarousel.addEventListener('pointerleave', () => {
        if (!isDown) return;
        endDrag();
    });
    projectCarousel.addEventListener('pointercancel', endDrag);

    projectCarousel.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            beginDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    projectCarousel.addEventListener('touchmove', (e) => {
        if (!isDown || e.touches.length === 0) return;
        const walk = e.touches[0].clientX - startX;
        setScrollPosition(startScroll - walk);
    }, { passive: false });

    projectCarousel.addEventListener('touchend', endDrag);
    projectCarousel.addEventListener('touchcancel', endDrag);
}

document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

    if (link.getAttribute('target') === '_blank' || /^https?:\/\//i.test(href)) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            openExternalLink(link, e);
        });
    }
});

// Logic toggle cho thanh điều hướng (Sidebar)
const navToggleBtn = document.getElementById('nav-toggle');
if (navToggleBtn && header) {
    const toggleIcon = navToggleBtn.querySelector('i');
    navToggleBtn.addEventListener('click', () => {
        header.classList.toggle('expanded');
        closeThemeMenu();

        // Chuyển đổi icon giữa 'bars' (danh sách) và 'chevron-left' (<)
        if (header.classList.contains('expanded')) {
            toggleIcon.classList.replace('fa-bars', 'fa-chevron-left');
        } else {
            toggleIcon.classList.replace('fa-chevron-left', 'fa-bars');
        }
    });
}

if (themeToggleBtn && themeSwitcher) {
    themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeSwitcher.classList.toggle('open');
    });
}

themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedTheme = option.dataset.themeOption;
        applyTheme(selectedTheme);
        closeThemeMenu();
    });
});

document.addEventListener('click', (e) => {
    if (themeSwitcher && !themeSwitcher.contains(e.target)) {
        closeThemeMenu();
    }
});

// Logic cho form contact: ô Phone/Email chia nhau và có thể giãn ra khi nhập
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const contactFields = contactForm.querySelectorAll('.contact-half');
    const nameField = contactForm.querySelector('input[type="text"]');
    const emailField = contactForm.querySelector('input[type="email"]');
    const phoneField = contactForm.querySelector('input[type="tel"]');
    const messageField = contactForm.querySelector('textarea');
    const errorMessage = contactForm.querySelector('.form-error');
    const infoMessage = contactForm.querySelector('.form-info');
    const countdownEl = contactForm.querySelector('#countdown');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const draftKey = 'contact-form-draft';
    const lastSentKey = 'contact-form-last-sent';
    const cooldownSeconds = 180;
    let countdownTimer = null;

    function setFieldError(field, hasError) {
        if (!field) return;
        field.classList.toggle('is-invalid', hasError);
        if (hasError) {
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.removeAttribute('aria-invalid');
        }
    }

    function showFormError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.add('visible');
        }
        contactForm.classList.remove('shake');
        void contactForm.offsetWidth;
        contactForm.classList.add('shake');
    }

    function hideFormError() {
        if (errorMessage) {
            errorMessage.classList.remove('visible');
        }
        contactForm.classList.remove('shake');
    }

    function clearValidationState() {
        [nameField, emailField, phoneField, messageField].forEach(field => {
            setFieldError(field, false);
        });
        hideFormError();
    }

    function updateContactLayout(activeField) {
        const row = contactForm.querySelector('.contact-row-two');
        if (!row) return;

        const hasPhoneFocus = activeField === phoneField && (activeField === document.activeElement || activeField.value.trim().length > 0);
        const hasEmailFocus = activeField === emailField && (activeField === document.activeElement || activeField.value.trim().length > 0);

        row.classList.toggle('phone-focused', hasPhoneFocus);
        row.classList.toggle('email-focused', hasEmailFocus);

        if (!phoneField?.value.trim() && !emailField?.value.trim() && document.activeElement !== phoneField && document.activeElement !== emailField) {
            row.classList.remove('phone-focused', 'email-focused');
        }
    }

    function saveDraft() {
        const draftData = [
            nameField?.value || '',
            phoneField?.value || '',
            emailField?.value || '',
            messageField?.value || ''
        ];
        localStorage.setItem(draftKey, JSON.stringify(draftData));
    }

    function loadDraft() {
        const savedDraft = localStorage.getItem(draftKey);
        if (!savedDraft) return;

        try {
            const draftData = JSON.parse(savedDraft);
            if (Array.isArray(draftData)) {
                if (nameField) nameField.value = draftData[0] || '';
                if (phoneField) phoneField.value = draftData[1] || '';
                if (emailField) emailField.value = draftData[2] || '';
                if (messageField) messageField.value = draftData[3] || '';
            }
        } catch (e) {
            localStorage.removeItem(draftKey);
        }
    }

    function clearDraft() {
        localStorage.removeItem(draftKey);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function showInfoMessage() {
        if (infoMessage) {
            infoMessage.classList.add('visible');
        }
    }

    function hideInfoMessage() {
        if (infoMessage) {
            infoMessage.classList.remove('visible');
        }
    }

    function updateCooldownUI() {
        const lastSentAt = Number(localStorage.getItem(lastSentKey) || 0);
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((lastSentAt + cooldownSeconds * 1000 - now) / 1000));

        if (remaining > 0) {
            if (countdownEl) {
                countdownEl.textContent = formatTime(remaining);
            }
            showInfoMessage();
            if (submitButton) {
                submitButton.disabled = true;
            }
            if (!countdownTimer) {
                countdownTimer = setInterval(() => {
                    updateCooldownUI();
                }, 1000);
            }
        } else {
            if (countdownTimer) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }
            if (countdownEl) {
                countdownEl.textContent = formatTime(0);
            }
            hideInfoMessage();
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    }

    const contactRow = contactForm.querySelector('.contact-row-two');

    if (contactRow) {
        contactRow.addEventListener('focusin', (e) => {
            if (e.target instanceof HTMLElement && e.target.matches('.contact-half')) {
                updateContactLayout(e.target);
            }
        });

        contactRow.addEventListener('focusout', (e) => {
            if (!contactRow.contains(e.relatedTarget)) {
                updateContactLayout(null);
            }
        });
    }

    contactFields.forEach(field => {
        field.addEventListener('input', () => {
            updateContactLayout(field);
            saveDraft();
        });
    });

    if (nameField) {
        nameField.addEventListener('input', saveDraft);
    }

    if (messageField) {
        messageField.addEventListener('input', saveDraft);
    }

    loadDraft();
    updateCooldownUI();

    function validateForm() {
        let hasError = false;
        let errorText = '';

        if (!nameField || !nameField.value.trim()) {
            setFieldError(nameField, true);
            errorText = 'Please enter your name.';
            hasError = true;
        } else {
            setFieldError(nameField, false);
        }

        const hasEmail = !!(emailField && emailField.value.trim());
        const hasPhone = !!(phoneField && phoneField.value.trim());

        if (!hasEmail && !hasPhone) {
            setFieldError(emailField, true);
            setFieldError(phoneField, true);
            if (!errorText) {
                errorText = 'Please enter at least one contact method: email or phone number.';
            }
            hasError = true;
        } else {
            setFieldError(emailField, false);
            setFieldError(phoneField, false);
        }

        if (!messageField || !messageField.value.trim()) {
            setFieldError(messageField, true);
            if (!errorText) {
                errorText = 'Please enter your message.';
            }
            hasError = true;
        } else {
            setFieldError(messageField, false);
        }

        if (hasError) {
            showFormError(errorText);
            return false;
        }

        return true;
    }

    ['input', 'focus', 'blur'].forEach(eventType => {
        [nameField, emailField, phoneField, messageField].forEach(field => {
            if (!field) return;
            field.addEventListener(eventType, () => {
                if (field.value.trim()) {
                    setFieldError(field, false);
                }
                if (!contactForm.querySelector('.is-invalid')) {
                    hideFormError();
                }
            });
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearValidationState();

        if (!validateForm()) {
            return;
        }

        const lastSentAt = Number(localStorage.getItem(lastSentKey) || 0);
        const now = Date.now();

        if (lastSentAt && now - lastSentAt < cooldownSeconds * 1000) {
            updateCooldownUI();
            return;
        }

        localStorage.setItem(lastSentKey, String(now));
        clearDraft();
        contactForm.reset();
        updateCooldownUI();
    });
}

// Initialize by showing the first section when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'blue';
    applyTheme(savedTheme);

    if (sections.length > 0) {
        showSection(0);
    }
});

// Logic chuyển trang bằng cách cuộn chuột
let canScroll = true;
const scrollDelay = 800; // Thời gian chờ giữa các lần chuyển trang (milliseconds)
let scrollTimeout;

if (main) {
    main.addEventListener('wheel', (e) => {
        if (!canScroll) {
            e.preventDefault(); // Vẫn ngăn cuộn mặc định ngay cả khi đang chờ
            return;
        }

        e.preventDefault(); // Ngăn chặn hành vi cuộn mặc định của trình duyệt

        canScroll = false;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            canScroll = true;
        }, scrollDelay);

        const deltaY = e.deltaY;
        let newIndex = currentSectionIndex;

        if (deltaY > 0) { // Cuộn xuống
            if (currentSectionIndex < sections.length - 1) {
                newIndex++;
            }
        } else if (deltaY < 0) { // Cuộn lên
            if (currentSectionIndex > 0) {
                newIndex--;
            }
        }

        if (newIndex !== currentSectionIndex) {
            showSection(newIndex);
        }
    });
}
// audio
        let player;
        const playerContainer = document.getElementById('playerContainer');
        const playBtn = document.getElementById('playBtn');

        // ID video YouTube muốn phát (Ví dụ bài hát Lofi Chill)
        const YOUTUBE_VIDEO_ID = 'JCKBaJDRMw4'; 

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('yt-hidden-player', {
                height: '100',
                width: '100',
                videoId: YOUTUBE_VIDEO_ID,
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'disablekb': 1,
                    'fs': 0,
                    'rel': 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            player.setPlaybackQuality('tiny');
            
            playBtn.addEventListener('click', function() {
                const state = player.getPlayerState();
                if (state === YT.PlayerState.PLAYING) {
                    player.pauseVideo();
                } else {
                    player.playVideo();
                    player.setPlaybackQuality('tiny'); 
                }
            });
        }

        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                playerContainer.classList.remove('is-paused');
                playerContainer.classList.add('is-playing');
            } else {
                playerContainer.classList.remove('is-playing');
                playerContainer.classList.add('is-paused');
            }
        }

                // Hàm tự động kích hoạt trang đầu tiên (About) một cách an toàn
function bootstrapPortfolio() {
    // Quét lại các phần tử một lần nữa để chắc chắn DOM đã lên màn hình
    const sections = document.querySelectorAll('.portfolio-section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const main = document.querySelector('main');

    if (sections.length > 0) {
        // Cách 1: Ép class active thẳng vào main và section 0
        if (main) main.classList.add('active');
        
        // Cách 2: "Tự động bấm" giả lập bằng code (Giống ý tưởng của bạn)
        // Tìm thẻ a của mục #about và giả lập một cú click chuột
        const firstNavLink = document.querySelector('nav ul li a[href="#about"]');
        if (firstNavLink) {
            firstNavLink.click(); // Trình duyệt tự hiểu là người dùng bấm vào nút About
            console.log("[SPA] Đã tự động kích hoạt trang mục đầu tiên!");
        }
    } else {
        // Nếu trình duyệt quá chậm chưa parse xong DOM, đợi 50ms rồi thử lại
        setTimeout(bootstrapPortfolio, 50);
    }
}

// Chạy hàm khởi động ngay lập tức
bootstrapPortfolio();