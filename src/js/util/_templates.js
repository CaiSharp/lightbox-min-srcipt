const template = /*html*/ `
  <div 
  class="christmas--modal"  
  style="
  position: fixed; 
  height: 100%; 
  width: 100%;
  background-color: rgba(0,0,0,0.8);
  top: 0;
  left: 0;
  z-index: 99999;
  "
  >
    <canvas 
    id="christmas--canvas"
    style="
    pointer-event: none;
    "
    ></canvas>
    <div
    class="christmas--modal__container"
    style="
    position: absolute; 
    display: block; 
    transform: translate(-50%,-50%); 
    top: 50%; 
    left: 50%;
    "
    >
      <img 
      class="christmas--modal__image" 
      style="
      width: 100%;
      height: auto;
      "
      >
      <button 
      class="christmas--modal__close"
      style="
      position: absolute;
      top: -35px;
      right: 0;
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