$(document).ready(function () {
  var $window = $(window);
  var $navbar = $('nav.navbar');
  var $navbarToggler = $('button.nav-toggler');
  var $navClose = $('button.nav-close');
  var $mobileNav = $('.mobile-nav');
  var navbarOn = 0;
  var navbarOff = 0;
  var navbarTransparent = true;
  var mobileNavVisible = false;

  function init() {
    initFadeNav();
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

  function initFadeNav() {
    var fadeNav = $navbar.data('fade') || false;
    if (fadeNav) {
      updateDimensions();
      $window.scroll(handleScroll);
      handleScroll();
    } else {
      $navbar.removeClass('transparent');
      $navbarToggler.removeClass('white');
    }
  }

  function updateDimensions() {
    var claimTop = $('.sec-welcome .claim').position().top;
    navbarOn = claimTop - 20;//$navbar.height() * 2 + 10;
    navbarOff = claimTop - 40; $navbar.height() * 2 - 10;
    scrollTop = $window.scrollTop();
  }

  function handleScroll() {
    scrollTop = $window.scrollTop();
    if (scrollTop >= navbarOn && navbarTransparent) {
      $navbar.removeClass('transparent');
      $navbarToggler.removeClass('white');
      navbarTransparent = false;
    } else if (scrollTop <= navbarOff && !navbarTransparent) {
      $navbar.addClass('transparent');
      $navbarToggler.addClass('white');
      navbarTransparent = true;
    }
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