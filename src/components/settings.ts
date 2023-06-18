class SettingsModal extends HTMLElement {
  private _formEl!: HTMLFormElement;
  private _backButton!: HTMLButtonElement;
  private _longBreakMinInput!: HTMLInputElement;
  private _shortBreakMinInput!: HTMLInputElement;
  private _focusTimeMinInput!: HTMLInputElement;
  private _userMinutes!: { [prop: string]: number };
  private _boundFnEmitCancelEvent!: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = ` 
    <style>
    #backdrop-setting { 
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

    :host([opened]) #backdrop-setting,
    :host([opened]) .setting{
      opacity: 1;
      pointer-events: all
      }

    .setting{ 
      position: fixed; 
      background-color: #fff; 
      padding: 3rem 3rem 1rem 3rem; 
      border-radius: 5px; 
      border:   1px solid rgb(73, 26, 26); 
      box-shadow: 0px -1px 7px 0px #00000021;
      max-width: 35rem; 
      width: 35rem;
      display: flex; 
      flex-direction: column;
      align-items:center;
      gap: 2rem;
      top: 10vh; 
      left: 50%; 
      transform: translateX(-50%);
      pointer-events: none;
      z-index: 100; 
      opacity:0; 
      transition: all 0.2s ease-out;
    }

   .setting-form{ 
      display: flex; 
      flex-direction: column; 
      gap: 2rem;
    }

   .setting-form div{ 
      display: flex; 
      flex-direction: column; }
    
   .setting-buttons{ 
      display: flex; 
      gap: 2rem; 
      justify-content: end;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .setting-form input{
      display:block;
      font: inherit;
      padding: 0.5rem;
      border-radius: 6px;
      border: 1px solid #ccc;
      width: 20rem;
      max-width: 100%;
      margin-top:0.5rem;
    }

    .setting-form input:focus{
     outline: 1px solid rgb(73, 26, 26)
    }

    .btn {
      font-size: 1.6rem;
      font-weight: 600;
      padding: 0.8rem 3rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: inset 0px -1px 7px 0px #00000021;
      transition: all 0.2s;
      color: rgb(73, 26, 26);
    }
    
    .btn:hover {
      transform: translateY(-3px) scale(1.05);
    }
    
    .btn:active {
      transform: translateY(0px) scale(1);
    }
  </style>

      <div id='backdrop-setting'></div>
      <div class='setting'>
        <h2>Set time(minutes)</h2>
        <form id='form-setting'>
          <div class='setting-form'>
            <div>
            <label for='focus-time-minutes'>
              Focus Time
              </label>
                <input type='number' step='1' min='1' max='60' id='focus-time-minutes' required/>
            </div>
            <div>
              <label for='short-break-minutes'>
                Short Break
              </label>
              <input type='number' step='1' min='1' max='60' id='short-break-minutes' required />
            </div>
            <div>
              <label for='long-break-minutes'>
                Long Break
              </label>
              <input type='number' step='1' min='1' max='60' id='long-break-minutes' required/>
            </div>
          </div>

          <div class='setting-buttons'>
            <input type='button' value='Back' id='back-button' class='btn'/>
            <input type='submit' value='Apply' id='apply-button' class='btn'/>
          </div>
        </form>
      </div>`;

    this._backButton = this.shadowRoot!.getElementById(
      'back-button'
    ) as HTMLButtonElement;

    this._longBreakMinInput = this.shadowRoot!.getElementById(
      'long-break-minutes'
    ) as HTMLInputElement;
    this._shortBreakMinInput = this.shadowRoot!.getElementById(
      'short-break-minutes'
    ) as HTMLInputElement;
    this._focusTimeMinInput = this.shadowRoot!.getElementById(
      'focus-time-minutes'
    ) as HTMLInputElement;

    this._formEl = this.shadowRoot!.getElementById(
      'form-setting'
    ) as HTMLFormElement;

    this.setAttribute('focus-time', '25');
    this.setAttribute('short-break', '5');
    this.setAttribute('long-break', '15');

    this._boundFnEmitCancelEvent = this.emitEvent.bind(this, 'cancel');

    this._backButton.addEventListener('click', this._boundFnEmitCancelEvent);
    this._formEl.addEventListener('submit', this.submitHandler);
  }

  static get observedAttributes() {
    return ['focus-time', 'short-break', 'long-break'];
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'focus-time') {
      this._focusTimeMinInput.setAttribute('placeholder', newValue);
    }

    if (name === 'short-break') {
      this._shortBreakMinInput.setAttribute('placeholder', newValue);
    }

    if (name === 'long-break') {
      this._longBreakMinInput.setAttribute('placeholder', newValue);
    }
  }

  disconnectedCallback() {
    this._backButton.removeEventListener('click', this._boundFnEmitCancelEvent);
    this._formEl.removeEventListener('submit', this.submitHandler);
  }

  show = () => {
    this.setAttribute('opened', '');
  };

  private emitEvent = (eventName: string, event?: MouseEvent) => {
    this.hide();
    this._formEl.reset();

    const newEvent = new Event(eventName, {
      bubbles: true,
      composed: true,
    });

    if (event) {
      event.target!.dispatchEvent(newEvent);
    } else {
      this._formEl.dispatchEvent(newEvent);
    }
  };

  private hide = () => {
    this.removeAttribute('opened');
  };

  private submitHandler = (event: Event) => {
    event.preventDefault();
    const focusValue = this._focusTimeMinInput.value.trim();
    const longBreakValue = this._longBreakMinInput.value.trim();
    const shortBreakValue = this._shortBreakMinInput.value.trim();

    this._userMinutes = {
      focusTimeMin: +focusValue,
      longBreakMin: +longBreakValue,
      shortBreakMin: +shortBreakValue,
    };

    this.emitEvent('confirmSettings');
  };

  get userMinutes() {
    return this._userMinutes;
  }
}

export default SettingsModal;
