export class Button extends HTMLElement {
  #button;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
   <style>
   *,
   *::after,
   *::before {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     }

   :host {
    border-radius: 5px;
   }

   .button{
    border: none;
    border-radius: 5px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    transition: all 0.2s;
   }

   .small-button {
    font-size: 1.8rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
   }    

   .big-button {
    font-size: 2rem;
    font-weight: 600;
    padding: 0.8rem 4rem;
    background-color: var(--white);
    box-shadow: var(--box-shadow-black);
   }

   .big-button:hover {
    transform: translateY(-3px) scale(1.05);
  }
  
  .big-button:active {
    transform: translateY(0px) scale(1);
  }

   </style>

  <button id="btn" class="button"> 
    <slot>Heading Secondary</slot> 
  </button>
    `;

    this.#button = this.shadowRoot.getElementById('btn');
    this.setAttribute('background-color', '');
    this.setAttribute('button-size', 'small-button');
  }

  static get observedAttributes() {
    return ['background-color', 'button-size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'background-color') {
      this.#button.style.backgroundColor = newValue;
      console.log(newValue);
    }

    if (name === 'button-size') {
      this.#button.classList.remove(oldValue);
      this.#button.classList.add(newValue);
    }
  }

  get element() {
    return this.#button;
  }
}
