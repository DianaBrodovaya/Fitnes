'use strict';

/*Плавная прокрутка до якоря*/
$(document).ready(function() {
  $(".anchor").on("click", function(e) {
    e.preventDefault();
    let id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 800);
  });
});

/*Табы*/
let jsTriggers = document.querySelectorAll('.js-tab-trigger');

for (let i = 0; i < jsTriggers.length; i++) {
  jsTriggers[i].addEventListener('click', function(e) {
    e.preventDefault();
    let id = this.getAttribute('data-tab'),
      content = document.querySelector('.js-tab-content[data-tab="' + id + '"]'),
      activeTrigger = document.querySelector('.js-tab-trigger.active'),
      activeContent = document.querySelector('.js-tab-content.active');

    activeTrigger.classList.remove('active');
    this.classList.add('active');

    activeContent.classList.remove('active');
    content.classList.add('active');
  });
}
