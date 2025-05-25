//loading
$(window).on('load', function () {
    setTimeout(function () {
        $('#loading').fadeOut('slow', function () {
            $(this).remove();
        });
    }, 1500);
});

//button click
function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

//adu
function playSound() {
    var sound = document.getElementById("mySound");
    sound.play();
}

//fps
var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;
function tick() {
    var time = Date.now();
    frame++;
    if (time - startTime > 1000) {
        fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
        startTime = time; frame = 0;
    } window.requestAnimationFrame(tick);
} tick();

//music
var audio = new Audio('audio/25.mp3');
var button = document.querySelector('button');
audio.loop = true;
function playAudioOnce() {
    if (audio.paused) {
        audio.play();
        button.textContent = 'Tắt nhạc';
        document.body.onclick = null;
    }
}
function toggleAudio(event) {
    event.stopPropagation();
    if (audio.paused) {
        audio.play();
        button.textContent = 'Tắt nhạc';
    } else {
        audio.pause();
        button.textContent = 'Bật nhạc';
    }
}

// text 7 color
$('.text').html(function (i, html) {
    var chars = $.trim(html).split("");

    return '<span>' + chars.join('</span><span>') + '</span>';
});

//thong bao
// $(document).ready(function() {
//     // process bar
//     setTimeout(function() {
//         firstQuestion();
//         $('.spinner').fadeOut();
//         $('#preloader').delay(350).fadeOut('slow');
//         $('body').delay(350).css({
//             'overflow': 'visible'
//         });
//     }, 600);
// })

//     const CONFIG = {
//     introTitle: 'Welcome',
//     introDesc: `Hãy truy cập bằng điện thoại di động(nếu có thể).`,
//     btnIntro: 'OK',
//     }

// function firstQuestion(){
//     $('.content').hide();
//     Swal.fire({
//         title: CONFIG.introTitle,
//         text: CONFIG.introDesc,
//         imageUrl: 'img/catcute.jpg',
//         imageWidth: 300,
//         imageHeight: 300,
//         background: '#fff url("img/252525.png")',
//         imageAlt: 'Custom image',
//         confirmButtonText: CONFIG.btnIntro,
//         customClass: {
//             confirmButton: 'confirm-button-class'
//         }
//     }).then(function(){
//         $('.content').show(200);
//     })
// }

//thong bao new
var modal = document.getElementById("myModal");
var btn = document.getElementsByClassName("close")[0];
modal.style.display = "block";
btn.onclick = function () {
    modal.children[0].style.animationName = "modalclose";
    modal.children[0].style.animationDuration = "0.25s";
    setTimeout(function () { modal.style.display = "none"; }, 250);
}

function dropHeart(e) {
    if (e.target == modal) {
        modal.children[0].style.animationName = "modalclose";
        modal.children[0].style.animationDuration = "0.25s";
        setTimeout(function () { modal.style.display = "none"; }, 250);
    }
}

window.addEventListener('click', dropHeart);
// kich co thong bao
window.addEventListener('resize', function () {
    var imgElements = document.getElementsByTagName('modal-content2');
    for (var i = 0; i < imgElements.length; i++) {
        if (window.innerHeight > window.innerWidth) {
            // Màn hình dọc
            imgElements[i].style.width = '75%';
        } else {
            // Màn hình ngang
            imgElements[i].style.width = '25%';
        }
    }
});
// button close
window.addEventListener('resize', function () {
    var imgElements = document.getElementsByTagName('close2');
    for (var i = 0; i < imgElements.length; i++) {
        if (window.innerHeight > window.innerWidth) {
            // Màn hình dọc
            imgElements[i].style.width = '40%';
        } else {
            // Màn hình ngang
            imgElements[i].style.width = '20%';
        }
    }
});

// Anti right click anh Block ctrl+u
document.oncontextmenu = new Function("return false");
document.onkeydown = function (e) {
    if (e.ctrlKey &&
        (e.keyCode === 85)) {// Ctrl+U
        return false;
    }
};
//title
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        document.title = "Quay lại đi mà 😭";
    } else {
        document.title = "Yee,bạn đã quay lại 😁";
        setTimeout(function () {
            document.title = "Bio của Long";
        }, 1200);
    }
});

//time
function dongho() {
    var today = new Date();
    var gio = today.getHours();
    var phut = today.getMinutes();
    var giay = today.getSeconds();

    if (gio < 10) {
        gio = "0" + gio;
    }
    if (phut < 10) {
        phut = "0" + phut;
    }
    if (giay < 10) {
        giay = "0" + giay;
    }
    document.getElementById("time").innerHTML = gio + ":" + phut + ":" + giay;
    setTimeout("dongho()", 1000);
}
dongho();
// click tha tim
! function (e, t, a) {
    function n() {
        c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
    }
    function r() {
        for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }
    function o() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function (e) {
            t && t(), i(e)
        }
    }
    function i(e) {
        var a = t.createElement("div");
        a.className = "heart", d.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: s()
        }), t.body.appendChild(a)
    }
    function c(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }
    function s() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
    var d = [];
    e.requestAnimationFrame = function () {
        return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
            setTimeout(e, 1e3 / 60)
        }
    }(), n()
}(window, document);
/* Kết thúc thả tim */
/* message */
var messageBox = document.querySelector('.js-message');
var btn = document.querySelector('.js-message-btn');
var card = document.querySelector('.js-profile-card');
var closeBtn = document.querySelectorAll('.js-message-close');
btn.addEventListener('click', function (e) {
    e.preventDefault();
    card.classList.add('active');
});
closeBtn.forEach(function (element, index) {
    console.log(element);
    element.addEventListener('click', function (e) {
        e.preventDefault();
        card.classList.remove('active');
    });
});
/* end message */
/* chạy số animate */
function animateNumber(finalNumber, duration = 5000, startNumber = 0, callback) {
    let currentNumber = startNumber
    const interval = window.setInterval(updateNumber, 17)
    function updateNumber() {
        if (currentNumber >= finalNumber) {
            clearInterval(interval)
        } else {
            let inc = Math.ceil(finalNumber / (duration / 17))
            if (currentNumber + inc > finalNumber) {
                currentNumber = finalNumber
                clearInterval(interval)
            } else {
                currentNumber += inc
            }
            callback(currentNumber)
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    animateNumber(1236889, 5000, 0, function (number) {
        const formattedNumber = number.toLocaleString()
        document.getElementById('count-followers').innerText = formattedNumber
    })
    animateNumber(1, 5000, 0, function (number) {
        const formattedNumber = number.toLocaleString()
        document.getElementById('count-following').innerText = formattedNumber
    })
    animateNumber(68, 5000, 0, function (number) {
        const formattedNumber = number.toLocaleString()
        document.getElementById('count-posts').innerText = formattedNumber
    })
    animateNumber(3, 5000, 0, function (number) {
        const formattedNumber = number.toLocaleString()
        document.getElementById('count-works').innerText = formattedNumber
    })
})
/* kết thúc chạy số animate */


console.log('Vietnamese')
console.log('%cÊY NÀY', 'color:green; background-color:black; font-size:98px; text-align:center;')
console.log('%cBạn đang cố tình sao chép các mã nguồn ư ?', 'color:yellow;')
console.log('%cThật may cho bạn, tôi cũng thế !', 'color:yellow;')
console.log('%c:3', 'font-size:200px; text-align:center;')
console.log('English')
console.log('%cHEY THIS', 'color:green; background-color:black; font-size:98px; text-align:center;')
console.log('%cAre you intentionally copying the source code?', 'color:yellow;')
console.log('%cLucky for you, me too!', 'color:yellow;')
console.log('%c:3', 'font-size:200px; text-align:center;')
