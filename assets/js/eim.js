$(document).ready(function () {
    var $document = $(document);
    var $eim = $('.eim-modal');
    var formId = '#eim-form';
    var $form = $(formId);
    var $inputs = $(formId + ' :input');
    var $selects = $(formId + ' select');
    var $email = $(formId + ' .email');
    var $btn = $(formId + ' .btn-submit');
    var $btnSpinner = $(formId + ' .btn-submit .spinner');
    var $btnText = $(formId + ' .btn-submit .text');
    var $errMsg = $(formId + ' .alert-danger');
    var $thanks = $(formId + ' .alert-success');
    var modalCreated = false;

    function init() {
        initEIM();
    }

    function initEIM() {
        initExitIntentModal($document, showEIM);
        $eim.on('hidden.bs.modal', switchOffEIM);
    }

    function showEIM() {
        if (modalCreated) return;
        $eim.modal({ backdrop: true, show: true });
        $form.validator().on('submit', sendWhitepaperRequest);
        modalCreated = true;
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