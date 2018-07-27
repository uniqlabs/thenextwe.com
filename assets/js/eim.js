$(document).ready(function () {
    var $document = $(document);
    var $eim = $('.eim-modal');
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
        modalCreated = true;
    }

    init();
});