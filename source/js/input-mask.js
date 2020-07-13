'use strict';

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
    var i = 0;
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
  for (var i = 0; i < input.length; i++) {
    input[i].addEventListener('input', mask, false);
    input[i].addEventListener('focus', mask, false);
    input[i].addEventListener('blur', mask, false);
  }
});
