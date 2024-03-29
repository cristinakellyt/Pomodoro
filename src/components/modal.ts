class Modal extends HTMLElement {
  private _contentBox!: HTMLElement;
  private _confirmBtnEl!: HTMLButtonElement;
  private _cancelBtnEl!: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
    <style>
    #backdrop {
      position: fixed;
      top: 0;
      left: 0;
      min-height: 100vh;
      width: 100%;
      pointer-events: none;
      backdrop-filter: blur(2px);
      z-index: 10;
      opacity: 0;
      
    }

    #modal-box {
      position: fixed;
      top: 10vh;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
      width: 50rem;
      background-color: rgb(255, 255, 255);
      border-radius: 5px;
      border: 2px solid;
      pointer-events: none;
      z-index: 100;
      opacity:0;
      transition: all 0.2s ease-out;
    }

    :host([opened]) #backdrop,
    :host([opened]) #modal-box{
      opacity: 1;
      pointer-events: all
    }

    :host([opened]) .modal-box{
      top: 15vh;
    }
    
    #modal-box__btns {
      display: flex;
      gap: 10rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .btn {
      font-size: 2rem;
      font-weight: 600;
      padding: 0.8rem 4rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 3px 12px 5px #00000021;
      transition: all 0.2s;
      color: rgb(73, 26, 26);
      ;
    }
    
    .btn:hover {
      transform: translateY(-3px) scale(1.05);
    }
    
    .btn:active {
      transform: translateY(0px) scale(1);
    }
    </style>

    <div id="backdrop"></div>
      <div id="modal-box">
      <slot name="title">Title</slot>
      <slot name="subtitle">Subtitle</slot>

        <div id="modal-box__btns">
        <button class="btn cancel-button"> <slot name="cancel-button"> No </slot> </button>
        <button class="btn confirm-button"> <slot name="confirm-button"> Yes </slot> </button>
        </div>
      </div>
    
    `;

    this._contentBox = this.shadowRoot!.getElementById(
      'modal-box'
    ) as HTMLElement;
    this._confirmBtnEl = this.shadowRoot!.querySelector(
      '.confirm-button'
    ) as HTMLButtonElement;
    this._cancelBtnEl = this.shadowRoot!.querySelector(
      '.cancel-button'
    ) as HTMLButtonElement;

    this.setAttribute('color-dark', 'rgb(198, 71, 71, 0.77)');
    this.setAttribute('color-light', 'rgba(198, 71, 71, 0.21)');

    this._cancelBtnEl.addEventListener('click', this.cancel);
    this._confirmBtnEl.addEventListener('click', this.confirm);
  }

  static get observedAttributes() {
    return ['color-light', 'color-dark'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === 'color-light') {
      this._cancelBtnEl.style.backgroundColor = `${newValue}`;
      return;
    }

    if (name === 'color-dark') {
      this._confirmBtnEl.style.backgroundColor = `${newValue}`;
      this._contentBox.style.borderColor = `${newValue}`;
      return;
    }
  }

  disconnectedCallback() {
    this._cancelBtnEl.removeEventListener('click', this.cancel);
    this._confirmBtnEl.removeEventListener('click', this.confirm);
  }

  show() {
    this.setAttribute('opened', '');
  }

  private confirm = (event: Event) => {
    if (event.target) {
      this.hide();
      const confirmEvent = new Event('confirm', {
        bubbles: true,
        composed: true,
      });
      event.target.dispatchEvent(confirmEvent);
    }
  };

  private cancel = (event: Event) => {
    if (event.target) {
      this.hide();
      const cancelEvent = new Event('cancel', {
        bubbles: true,
        composed: true,
      });
      event.target.dispatchEvent(cancelEvent);
    }
  };

  private hide() {
    this.removeAttribute('opened');
  }
}

export default Modal;
