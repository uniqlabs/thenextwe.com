$(document).ready(function () {
    var formId = '#contact-form';
    var $form = $(formId);
    var $inputs = $(formId + ' :input');
    var $selects = $(formId + ' select');
    var $email = $(formId + ' .email');
    var $topic = $(formId + ' .topic-selector');
    var $topicErr = $(formId + ' .with-errors.topic');
    var $captcha = $(formId + ' .gcaptcha');
    var $captchaErr = $(formId + ' .with-errors.captcha');
    var $btn = $(formId + ' .btn-submit');
    var $btnSpinner = $(formId + ' .btn-submit .spinner');
    var $btnText = $(formId + ' .btn-submit .text');
    var $errMsg = $(formId + ' .alert-danger');
    var $thanks = $(formId + ' .alert-success');

    function init() {
        $form.validator().on('submit', sendContactRequest);
        $topic.on('change', validateTopic);
        createCaptcha();
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
            msg = $email.data('exists');
        else if (res === 'invalidCaptcha')
            msg = $captcha.data('invalid');
        showError(msg);
    }

    function validateTopic() {
        var topic = $topic.val();
        if (topic == 0) {
            $topicErr.slideDown();
            return false;
        } else {
            $topicErr.slideUp();
            return true;
        }
    }

    function validateCaptcha() {
        var res = grecaptcha.getResponse($captcha.data('captchaId'));
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
            'event': 'tnw_contact_form',
            'status': 'submitted'
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