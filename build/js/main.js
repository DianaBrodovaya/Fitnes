'use strict';

/* Плавная прокрутка до якоря */
$(document).ready(function () {
  $('.anchor').on('click', function (e) {
    e.preventDefault();
    var id = $(e.currentTarget).attr('href');
    var top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 800);
  });
});

/* Видео */
$('.video-container').on('click', function () {
  $('.video-container .video').fadeIn();
});

/* Табы */
var jsTriggers = document.querySelectorAll('.js-tab-trigger');

for (var i = 0; i < jsTriggers.length; i++) {
  jsTriggers[i].addEventListener('click', function (e) {
    e.preventDefault();
    var id = e.currentTarget.getAttribute('data-tab');
    var content = document.querySelector('.js-tab-content[data-tab="' + id + '"]');
    var activeTrigger = document.querySelector('.js-tab-trigger.active');
    var activeContent = document.querySelector('.js-tab-content.active');

    activeTrigger.classList.remove('active');
    e.currentTarget.classList.add('active');

    activeContent.classList.remove('active');
    content.classList.add('active');
  });
}

/* Обрезка текста */
function shorten(text, maxLength) {
  var ret = text;
  if (ret.length > maxLength) {
    ret = ret.substr(0, maxLength) + '...';
  }
  return ret;
}

var el = document.querySelectorAll('.crop-block');

for (i = 0; i < el.length; i++) {
  el[i].innerText = shorten(el[i].innerText, 170);
}

/* Слайдеры */
var swiper1 = new Swiper('.swiper-container.trainers-slider', {
  slidesPerView: 4,
  spaceBetween: 40,
  slidesPerGroup: 4,
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    767: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    1199: {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2
    },
  }
});

var swiper2 = new Swiper('.swiper-container.reviews-slider', {
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

/* Одинаковая высота слайдов */
var slider = swiper2;
var wrapper = swiper2.wrapperEl;

[].forEach.call(slider.slides, function (slide) {
  slide.style.height = '';
});

setTimeout(function () {
  [].forEach.call(slider.slides, function (slide) {
    slide.style.height = wrapper.clientHeight + 'px';
  });
}, 300);

/* Маска для телефона */
window.addEventListener('DOMContentLoaded', function () {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(e) {
    var matrix = '+7 (___) ___ ____';
    i = 0;
    var def = matrix.replace(/\D/g, '');
    var val = e.currentTarget.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    e.currentTarget.value = matrix.replace(/./g, function (a) {
      if (i >= val.length) {
        if (/[_\d]/.test(a) && i < val.length) {
          return val.charAt(i++);
        } else {
          return '';
        }
      } else {
        if (/[_\d]/.test(a) && i < val.length) {
          return val.charAt(i++);
        } else {
          return a;
        }
      }
    });
    if (event.type === 'blur') {
      if (e.currentTarget.value.length === 2) {
        e.currentTarget.value = '';
      } else {
        setCursorPosition(e.currentTarget.value.length, e.currentTarget);
      }
    }
  }

  var input = document.querySelectorAll('input[type="tel"]');
  for (i = 0; i < input.length; i++) {
    input[i].addEventListener('input', mask, false);
    input[i].addEventListener('focus', mask, false);
    input[i].addEventListener('blur', mask, false);
  }
});
