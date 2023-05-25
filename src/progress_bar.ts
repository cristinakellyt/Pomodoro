class ProgressBar extends HTMLElement {
  #progressBar!: HTMLElement;
  #progressBarFilling!: HTMLElement;

  get progress() {
    return this.getAttribute('progress');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
    <style>
    :host {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
    }
    
    .progress-bar__filling {
      border-radius: 1px;
      height: 100%;
    }
    </style>

    <div class="progress-bar">
      <div class="progress-bar__filling"></div>
    </div>
    `;
    this.#progressBar = this.shadowRoot!.querySelector(
      '.progress-bar'
    ) as HTMLElement;
    this.#progressBarFilling = this.shadowRoot!.querySelector(
      '.progress-bar__filling'
    ) as HTMLElement;

    this.setAttribute('progress', '0');
    this.setAttribute('backdrop-color', 'rgb(198, 71, 71)');
    this.setAttribute('fill-color', 'rgb(255, 255, 255)');
  }

  static get observedAttributes() {
    return ['progress', 'backdrop-color', 'fill-color'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    if (name === 'progress') {
      let progressNumber = Number(newValue);
      if (progressNumber < 0 || progressNumber > 100) {
        throw new Error(
          `Invalid parameter. Progress must be a number between 0 and 100`
        );
      }
      this.#progressBarFilling.style.width = `${newValue}%`;
      return;
    }

    if (name === 'backdrop-color') {
      this.#progressBar.style.backgroundColor = `${newValue}`;
      return;
    }

    if (name === 'fill-color') {
      this.#progressBarFilling.style.backgroundColor = `${newValue}`;
      return;
    }
  }
}

export { ProgressBar };
