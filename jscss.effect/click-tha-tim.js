    /* Thả tim */
    ! function(e, t, a) {
        function n() {
            c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"), o(), r()
        }
        function r() {
            for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--, d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y + "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale + ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
            requestAnimationFrame(r)
        }
        function o() {
            var t = "function" == typeof e.onclick && e.onclick;
            e.onclick = function(e) {
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
        e.requestAnimationFrame = function() {
            return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(e) {
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
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        card.classList.add('active');
    });
    closeBtn.forEach(function(element, index) {
        console.log(element);
        element.addEventListener('click', function(e) {
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
    document.addEventListener('DOMContentLoaded', function() {
        animateNumber(1236889, 5000, 0, function(number) {
            const formattedNumber = number.toLocaleString()
            document.getElementById('count-followers').innerText = formattedNumber
        })
        animateNumber(1, 5000, 0, function(number) {
            const formattedNumber = number.toLocaleString()
            document.getElementById('count-following').innerText = formattedNumber
        })
        animateNumber(68, 5000, 0, function(number) {
            const formattedNumber = number.toLocaleString()
            document.getElementById('count-posts').innerText = formattedNumber
        })
        animateNumber(3, 5000, 0, function(number) {
            const formattedNumber = number.toLocaleString()
            document.getElementById('count-works').innerText = formattedNumber
        })
    })
    /* kết thúc chạy số animate */