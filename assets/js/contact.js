$(document).ready(function () {
    var $form = $('#contact-form');
    var $inputs = $('#contact-form :input');
    var $selects = $('select');
    var $topic = $('#TOPIC');
    var $topicErr = $('.with-errors.topic');
    var $captcha = $('#gcaptcha');
    var $captchaErr = $('.with-errors.captcha');
    var $btn = $('#btn-submit');
    var $btnSpinner = $('#btn-submit .spinner');
    var $btnText = $('#btn-submit .text');
    var $errMsg = $('.alert-danger');
    var $thanks = $('.alert-success');

    function init() {
        $form.validator().on('submit', sendContactRequest);
        $topic.on('change', validateTopic);
    }

    function sendContactRequest(event) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();
        if (!validateTopic()) return;
        if (!validateCaptcha()) return;
        var url = r('uggcf://zl.fraqvaoyhr.pbz/hfref/fhofpevorrzorq/wf_vq/2ldcb/vq/3');
        var data = $form.serialize();
        hideError();
        setBusy(true);
        var req = {
            url: url,
            data: data,
            dataType: 'json',
            type: 'POST',
            success: onReqSuccess
        };
        $.ajax(req);
    }

    function onReqSuccess(data) {
        setBusy(false);
        var msg = 'Unbekannter Fehler';
        if (!data || !data.result || !data.result.result) {
            showError(msg);
            return;
        }
        var res = data.result.result;
        if (res === 'success') {
            trackEvent();
            showThanks();
            return;
        }
        if (res === 'emailExist')
            msg = 'Für diese E-Mail wurde bereits eine Anfrage gesendet.';
        else if (res === 'invalidCaptcha')
            msg = 'Das Captcha ist ungültig.<br>Bitte laden Sie die Seite neu und versuchen Sie es erneut.';
        showError(msg);
    }

    function validateTopic() {
        var topic = $('#TOPIC').val();
        if (topic == 0) {
            $topicErr.slideDown();
            return false;
        } else {
            $topicErr.slideUp();
            return true;
        }
    }

    function validateCaptcha() {
        var res = grecaptcha.getResponse();
        if (!res.length) {
            $captchaErr.slideDown();
            return false;
        }
        return true;
    }

    function setBusy(b) {
        $inputs.attr('disabled', b);
        $selects.attr('disabled', b);
        if (b) {
            $btnSpinner.fadeIn();
            $btnText.fadeOut();
        } else {
            $btnSpinner.fadeOut();
            $btnText.fadeIn();
        }
    }

    function trackEvent() {
        dataLayer.push({
            'formular': 'erfolgreich_verschickt',
            'event': 'TheNextWe_form'
        });
    }

    function showThanks() {
        $thanks.show();
        $inputs.hide();
        $selects.hide();
        $captcha.hide();
        $btn.hide();
    }

    function showError(msg) {
        $errMsg.html(msg);
        $errMsg.slideDown();
    }

    function hideError() {
        $errMsg.slideUp();
    }

    init();
});

function r(s) {
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

var renderCaptcha = function () {
    if (!$('div#gcaptcha').length) return;
    grecaptcha.render('gcaptcha', {
        'sitekey': r('6YrjIQ8HNNNNNXKVNiMS3IOLbtb41qtdfrFXU8tX'),
        'theme': 'dark',
        'callback': onCaptchaSolved
    });
};

var onCaptchaSolved = function () {
    $('div#gcaptcha').data('valid', true);
    $('.with-errors.captcha').slideUp();
};