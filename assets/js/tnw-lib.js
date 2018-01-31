function initExitIntentModal(doc, cb) {
    var suppressEIM = readCookie('suppressEIM');
    if (suppressEIM) return;
    $.exitIntent('enable');
    doc.bind('exitintent', cb);
}

function switchOffEIM(days) {
    var numDays = !isNaN(days) ? days : 1;
    var suppressEIM = readCookie('suppressEIM');
    if (!suppressEIM) {
        createCookie('suppressEIM', true, numDays);
        $.exitIntent('disable');
    }
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function r(s) {
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

function isScriptLoaded(url) {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++)
        if (scripts[i].src === url) return true;
    return false;
}

function createCaptcha() {
    var lang = $('html')[0].lang || 'en';
    var url = 'https://www.google.com/recaptcha/api.js?onload=renderCaptcha&render=explicit&hl=' + lang;
    if (isScriptLoaded(url)) return;
    var s = document.createElement('script');
    s.setAttribute('src', url);
    document.body.appendChild(s);
}

var renderCaptcha = function () {
    var $gcaptchas = $('.gcaptcha');
    if (!$gcaptchas.length) return;
    $gcaptchas.each(function () {
        grecaptcha.render(this, {
            'sitekey': r('6YrjIQ8HNNNNNXKVNiMS3IOLbtb41qtdfrFXU8tX'),
            'theme': $(this).hasClass('dark') ? 'dark' : 'light',
            'callback': onCaptchaSolved
        });
    })
};

var onCaptchaSolved = function () {
    $('.gcaptcha').data('valid', true);
    $('.with-errors.captcha').slideUp();
};