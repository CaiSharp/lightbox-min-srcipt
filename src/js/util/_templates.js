const template = /*html*/ `
  <div class="modal" 
  style="
  position: fixed; 
  height: 100%; 
  width: 100%;
  background-color: rgba(0,0,0,0.8);
  top: 0;
  left: 0;
  "
  >
    <img class="modal__image" 
    style="
    position: absolute; 
    display: block; 
    transform: translate(-50%,-50%); 
    top: 50%; 
    left: 50%;
    ">
    
    <button 
    class="modal__close"
    style="
    position: absolute;
    top: 15px;
    left: 20px;
    background: none;
    border: none;
    font-size: 24px;
    font-weight: bold;
    color: white;
    ">x</button>
    </div>
  </div>
`

export default template;