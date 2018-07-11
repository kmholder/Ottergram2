var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var L_R_BUTTONS = '[data-image-role="button"]';

function setDetails(imageUrl, titleText){
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src',imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail){
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail){
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail){
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb){
  'use strict';
  thumb.addEventListener('click',function(event){
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray(){
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails(){
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails(){
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function(){
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler(){
  'use strict';
  document.body.addEventListener('keyup',function(event){
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY){
      hideDetails();
    }
  });
}

function leftRightButtons() {

  'use strict';

  //var currentTitleObj = document.querySelector(DETAIL_TITLE_SELECTOR);

  var buttons = document.querySelectorAll(L_R_BUTTONS);
  var buttonsArr = [].slice.call(buttons);
  var left = buttonsArr[0];
  var right = buttonsArr[1];

  var thumbnailArray = getThumbnailsArray();
  var currentImage;
  var currentTitle;
  //var currentArrayPosition = 0;
  var l = 0;
  var r = 0;

  left.addEventListener('click', function(event) {

    event.preventDefault();

    var currentTitleObj = document.querySelector(DETAIL_TITLE_SELECTOR);
    for (var i = 0; i < thumbnailArray.length; ++i){
      if (thumbnailArray[i].getAttribute("data-image-title") === currentTitleObj.textContent) {
        l = i;
      }
    }

    if (l === 0) {
      currentImage = imageFromThumb(thumbnailArray[thumbnailArray.length - 1]);
      currentTitle = titleFromThumb(thumbnailArray[thumbnailArray.length - 1]);
      setDetails(currentImage, currentTitle);
      l = thumbnailArray.length -1;
    }

    else{
      currentImage = imageFromThumb(thumbnailArray[l - 1]);
      currentTitle = titleFromThumb(thumbnailArray[l - 1]);
      setDetails(currentImage, currentTitle);
      l--;
    }
  });

  right.addEventListener('click', function(event) {

    event.preventDefault();

    var currentTitleObj = document.querySelector(DETAIL_TITLE_SELECTOR);
    for (var j = 0; j < thumbnailArray.length; ++j){
      if (thumbnailArray[j].getAttribute("data-image-title") === currentTitleObj.textContent) {
        r = j;
      }
    }

    if (r === thumbnailArray.length - 1) {
      currentImage = imageFromThumb(thumbnailArray[0]);
      currentTitle = titleFromThumb(thumbnailArray[0]);
      setDetails(currentImage, currentTitle);
      r = 0;
    }

    else {
      currentImage = imageFromThumb(thumbnailArray[r + 1]);
      currentTitle = titleFromThumb(thumbnailArray[r + 1]);
      setDetails(currentImage, currentTitle);
      r++;
    }
  });
}
function initializeEvents(){
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  leftRightButtons();
}

initializeEvents();
