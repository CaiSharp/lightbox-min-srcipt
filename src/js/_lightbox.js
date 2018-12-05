import template from './util/_templates';
import styles from './util/_styles';
import API from './util/_api';
import animateSnow from './_snow';

//check if cookie is set
if (!document.cookie.split(';').filter(item => item.includes('christmas=')).length) {
  //create lightbox with background
  document.querySelector('body').insertAdjacentHTML('beforeend', template);

  const modal = document.querySelector('.modal');
  const modalImg = document.querySelector('.modal__image');

  modalController(modal, modalImg);
}

/*----------------------------------
------------------------------------
----------------------------------*/

function modalController(modal,modalImg) {
  //setStyleAttributes(modalImg, styles);
  closeModalHandler(modal);

  const queries = getQueries(getScriptSrc());

  if (queries.length > 0) {
    mergeStyleObject(styles, queries);
  }

  const modalStyle = {
    background: styles.background
  }

  setStyleAttributes(modalImg, styles);
  setStyleAttributes(modal, modalStyle);
  animateSnow();
}

function closeModalHandler(modal) {
  modal.addEventListener('click', () => {
    modal.style.display = "none";
    setCookie(styles.cookielifetime);
  });
}

//sets inline styles for given Object
function setStyleAttributes(el,styleObj) {
  for (const prop in styleObj) {
    if (prop == 'image') {
      const image = selectRandomImage(styleObj[prop]);
      el.src = `${API.images}/${image}`;
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