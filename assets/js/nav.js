$(document).ready(function() {
    var $navbarToggler = $('button.nav-toggler');
    var $navClose = $('button.nav-close');
    var $mobileNav = $('.mobile-nav');
    var mobileNavVisible = false;

    function init() {
        $('a.nav-link').click(scrollToAnchor);
        $('a.btn').click(scrollToAnchor);
        $navbarToggler.click(function () {
          $mobileNav.fadeIn();
          mobileNavVisible = true;
        });
        $navClose.click(function () {
          $mobileNav.fadeOut();
          mobileNavVisible = false;
        });    
    }

    function scrollToAnchor(event) {
        var target = this.hash;
        var el = $(this.hash);
        if (!el.length) return;
        event.preventDefault();
        var navOffset = 0;
        if (mobileNavVisible) $mobileNav.fadeOut();
        return $('html, body').animate({
          scrollTop: el.offset().top - navOffset
        }, 300, function () {
          return window.history.pushState(null, null, target);
        });
      }

    init();
});