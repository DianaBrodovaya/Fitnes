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
