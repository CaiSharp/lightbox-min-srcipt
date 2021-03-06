import template from './util/_templates';
import styles from './util/_styles';
import API from './util/_api';
import animateSnow from './_snow';


//check if cookie is set && expiration date is reached
if (!document.cookie.split(';').filter(item => item.includes('christmas=')).length && checkExpirationDate()) {
  //create lightbox with background
  document.querySelector('body').insertAdjacentHTML('beforeend', template);

  const modal = document.querySelector('.christmas--modal');
  const modalImg = document.querySelector('.christmas--modal__image');
  const modalContainer = document.querySelector('.christmas--modal__container');

  modalController(modal, modalImg, modalContainer);
}

/*----------------------------------
--FUNCTIONS
----------------------------------*/
function setResponsiveImg(el, queries) {
  const width = document.documentElement.clientWidth;
  let breakpoint = 1024;
  
  //extract query
  const responsiveImg = queries.find(el => el.includes('responsive')).split('=')[1];

  if (queries.find(el => el.includes('bp'))) {
    breakpoint = queries.find(el => el.includes('bp')).split('=')[1];
  }

  if (width <= breakpoint) {
    el.src = `${API.images}/${responsiveImg}`;
  }
  if (width > breakpoint) {
    el.src = el.dataset.image;
  }
}

function modalController(modal,modalImg,modalContainer) {
  closeModalHandler(modal);

  const queries = getQueries(getScriptSrc());

  if (queries.length > 0) {
    mergeStyleObject(styles, queries);
  }

  const modalStyle = {
    background: styles.background,
    'z-index': (+styles['z-index'] + 1)
  }

  setStyleAttributes(modalContainer, styles, modalImg);
  setStyleAttributes(modal, modalStyle);
  animateSnow();

  if (queries.find(el => el.includes('responsive'))) {
    //set responsive image
    setResponsiveImg(modalImg, queries);
    //add resize event to window && load smaller image when <576px
    window.addEventListener('resize', () => {
      setResponsiveImg(modalImg, queries);
    })
  }
}

function closeModalHandler(modal) {
  modal.addEventListener('click', () => {
    modal.style.display = "none";
    setCookie(styles.cookielifetime);
  });
}

//sets inline styles for given Object
function setStyleAttributes(el,styleObj,elImage) {
  for (const prop in styleObj) {
    if (prop == 'image') {
      const image = selectRandomImage(styleObj[prop]);
      const srcUrl = `${API.images}/${image}`;

      if (elImage) {
        elImage.src = srcUrl;
        elImage.dataset.image = srcUrl;
      } else {
        el.src = srcUrl;
        el.dataset.image = srcUrl;
      }
    } else {
      el.style[prop] = styleObj[prop];
    }
  }
}

function selectRandomImage(imageString) {
  const imageArr = imageString.split(',');
  const imageCount = imageArr.length;
  
  return imageArr[Math.floor(Math.random() * imageCount)]
}

//get christmas script src
function getScriptSrc() {
  const scripts = Array.from(document.getElementsByTagName("script"));
  const queryScript = scripts.find(el => {
    return el.src.includes('christmas');
  });

  return queryScript.src;
}

function getQueries(scriptSrc) {
  let queries = scriptSrc.split('?')[1];
  queries = queries.split('&');

  return queries;
}

//merge query array in style object, replaces shorthand properties
function mergeStyleObject(styleObj, queries) {
  queries.forEach(el => {
    const [property, value] = el.split('=');

    if (property === 'bg') {
      return styleObj['background'] = `${value}`;
    }
    return styleObj[property] = value;
  });
  return styleObj;
}

function setCookie(lifetime = 86400) {
  const expirationDate = new Date(new Date().getTime() + (+lifetime * 1000));
  document.cookie = `christmas=true;expires=${expirationDate}`;
}

//checks for date query in script
function checkExpirationDate() {
  const queries = getQueries(getScriptSrc());
  //extract query
  let expirationDate = queries.find(el => el.includes('date')).split('=')[1];

  if (expirationDate) {
    //convert to numeric values for comparison
    const dateNow = new Date().getTime();
    expirationDate = Date.parse(new Date(expirationDate));
  
    if (dateNow <= expirationDate) {
      return true
    }
    return false
  }
  return true
}