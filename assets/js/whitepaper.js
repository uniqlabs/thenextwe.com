$(document).ready(function () {
    var formId = '#whitepaper-form';
    var $form = $(formId);
    var $inputs = $(formId + ' :input');
    var $selects = $(formId + ' select');
    var $email = $(formId + ' .email');
    var $btn = $(formId + ' .btn-submit');
    var $btnSpinner = $(formId + ' .btn-submit .spinner');
    var $btnText = $(formId + ' .btn-submit .text');
    var $errMsg = $(formId + ' .alert-danger');
    var $thanks = $(formId + ' .alert-success');

    function init() {
        $form.validator().on('submit', sendWhitepaperRequest);
    }

    function sendWhitepaperRequest(event) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();
        var url = r('uggcf://zl.fraqvaoyhr.pbz/hfref/fhofpevorrzorq/wf_vq/2ldcb/vq/4');
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
        var msg = $form.data('unknown-err');
        if (!data || !data.result || !data.result.result) {
            showError(msg);
            return;
        }
        var res = data.result.result;
        if (res === 'success') {
            switchOffEIM(7);
            trackEvent();
            showThanks();
            return;
        }
        if (res === 'emailExist')
            msg = $email.data('exists');
        showError(msg);
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
            'event': 'tnw_whitepaper_form',
            'status': 'submitted'
        });
    }

    function showThanks() {
        $thanks.show();
        $inputs.hide();
        $selects.hide();
        $btn.hide();
    }

    function showError(msg) {
        $errMsg.html(msg);
        $errMsg.slideDown();
    }

    function hideError() {
        $errMsg.slideUp();
    }
    function sendWhitepaperRequest(event) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();
        var url = r('uggcf://zl.fraqvaoyhr.pbz/hfref/fhofpevorrzorq/wf_vq/2ldcb/vq/4');
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
        var msg = $form.data('unknown-err');
        if (!data || !data.result || !data.result.result) {
            showError(msg);
            return;
        }
        var res = data.result.result;
        if (res === 'success') {
            switchOffEIM(7);
            trackEvent();
            showThanks();
            return;
        }
        if (res === 'emailExist')
            msg = $email.data('exists');
        showError(msg);
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
            'event': 'tnw_whitepaper_form',
            'status': 'submitted'
        });
    }

    function showThanks() {
        $thanks.show();
        $inputs.hide();
        $selects.hide();
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