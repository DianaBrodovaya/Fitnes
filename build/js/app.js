'use strict';

/*Плавная прокрутка до якоря*/
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href').substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

/*Прячем элемент на маленьких экранах*/
let hiddenElement = document.querySelector('.js-mobile-hidden');

function windowResize () {
  if (document.body.clientWidth < 1200) {
    hiddenElement.style.display="none";
  } else if (document.body.clientWidth >= 1200) {
    hiddenElement.style.display="block";
  }
}

window.addEventListener('resize', windowResize);

windowResize();

