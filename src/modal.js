class Modal {
  #mainDiv;
  #contentBox;
  #confirmBtnEl;
  #cancelBtnEl;
  #cancelCallback;

  constructor({
    title = 'Title',
    subtitle = 'Subtitle',
    colorDark = 'black',
    colorLight = 'pink',
    confirmBtnText = 'Yes',
    cancelBtnText = 'No',
  }) {
    this.#mainDiv = document.createElement('div');
    this.#mainDiv.className = 'modal';

    this.#contentBox = document.createElement('div');
    this.#contentBox.className = 'modal-box';
    this.#contentBox.style.borderColor = colorDark;

    const titleEl = document.createElement('h2');
    titleEl.textContent = title;

    const subtitleEl = document.createElement('p');
    subtitleEl.textContent = subtitle;

    this.#confirmBtnEl = document.createElement('button');
    this.#confirmBtnEl.className = 'btn';
    this.#confirmBtnEl.textContent = confirmBtnText;
    this.#confirmBtnEl.style.backgroundColor = colorLight;
    this.#confirmBtnEl.addEventListener('click', this.confirm.bind(this));

    this.#cancelBtnEl = document.createElement('button');
    this.#cancelBtnEl.className = 'btn';
    this.#cancelBtnEl.textContent = cancelBtnText;
    this.#cancelBtnEl.style.backgroundColor = colorDark;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'modal-box__btns';
    buttonsDiv.appendChild(this.#cancelBtnEl);
    buttonsDiv.appendChild(this.#confirmBtnEl);

    this.#contentBox.appendChild(titleEl);
    this.#contentBox.appendChild(subtitleEl);
    this.#contentBox.appendChild(buttonsDiv);
    this.#mainDiv.appendChild(this.#contentBox);
  }

  confirm(event) {
    this.#hide();
    const confirmEvent = new Event('confirm', {
      bubbles: true,
      composed: true,
    });
    event.target.dispatchEvent(confirmEvent);
  }

  onCancel(callback) {
    if (typeof callback !== 'function')
      throw new TypeError('callback is not a function');

    this.#cancelBtnEl.removeEventListener('click', this.#cancelCallback);
    this.#cancelCallback = callback;
    this.#cancelBtnEl.addEventListener('click', this.#cancelCallback);
  }

  appendTo(element) {
    if (!(element instanceof HTMLElement))
      throw new TypeError('element is not an instance of HTMLElement');

    element.appendChild(this.#mainDiv);
  }

  show() {
    this.#mainDiv.classList.add('show-modal');
  }

  #hide() {
    this.#mainDiv.classList.remove('show-modal');
  }

  set borderColor(color) {
    this.#contentBox.style.borderColor = color;
  }

  set confirmBtnColor(color) {
    this.#confirmBtnEl.style.backgroundColor = color;
  }

  set cancelBtnColor(color) {
    this.#cancelBtnEl.style.backgroundColor = color;
  }
}

export { Modal };
