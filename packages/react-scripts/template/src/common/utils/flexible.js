// copy from amfe-flexible, and self-modified.

(function flexible(window, document) {
  var docEl = document.documentElement

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = '.12rem'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize()

  // set 1rem = viewWidth / 3.75 (3.75 is the **UI design width** divided by 100)
  function setRemUnit() {
    var rem = (docEl.clientWidth > 750 ? 750 : docEl.clientWidth) / 3.75
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // whether supported .5px
  if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
    var testEl = document.createElement('div');
    var fakeBody = document.createElement('body');
    testEl.style.border = '0.5px solid transparent';
    fakeBody.appendChild(testEl);
    docEl.appendChild(fakeBody);
    if (testEl.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }
})(window, document)
