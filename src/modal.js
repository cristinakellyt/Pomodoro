class Modal {
  #mainDiv;
  #contentBox;
  #titleEl;
  #subtitleEl;
  #buttonsDiv;
  #confirmBtnEl;
  #cancelBtnEl;
  #cancelCallback;
  #confirmCallback;

  constructor(modalContent) {
    this.#createElements(modalContent);
  }

  #createElements(modalContent) {
    this.#mainDiv = document.createElement('div');
    this.#mainDiv.className = 'modal';

    this.#contentBox = document.createElement('div');
    this.#contentBox.className = 'modal-box';
    this.#contentBox.style.borderColor = `${modalContent.colorDark}`;

    this.#titleEl = document.createElement('h2');
    this.#titleEl.textContent = modalContent.title;

    this.#subtitleEl = document.createElement('p');
    this.#subtitleEl.textContent = modalContent.subtitle;

    this.#buttonsDiv = document.createElement('div');
    this.#buttonsDiv.className = 'modal-box__btns';

    this.#confirmBtnEl = document.createElement('button');
    this.#confirmBtnEl.className = 'btn';
    this.#confirmBtnEl.textContent = modalContent.confirmBtnText;
    this.#confirmBtnEl.style.backgroundColor = modalContent.colorLight;

    this.#cancelBtnEl = document.createElement('button');
    this.#cancelBtnEl.className = 'btn';
    this.#cancelBtnEl.textContent = modalContent.cancelBtnText;
    this.#cancelBtnEl.style.backgroundColor = modalContent.colorDark;

    this.#contentBox.appendChild(this.#titleEl);
    this.#contentBox.appendChild(this.#subtitleEl);
    this.#contentBox.appendChild(this.#buttonsDiv);
    this.#buttonsDiv.appendChild(this.#cancelBtnEl);
    this.#buttonsDiv.appendChild(this.#confirmBtnEl);
    this.#mainDiv.appendChild(this.#contentBox);
  }

  onConfirm(callback) {
    this.#confirmBtnEl.removeEventListener('click', this.#confirmCallback);
    this.#confirmCallback = callback;
    this.#confirmBtnEl.addEventListener('click', this.#confirmCallback);
  }

  onCancel(callback) {
    this.#cancelBtnEl.removeEventListener('click', this.#cancelCallback);
    this.#cancelCallback = callback;
    this.#cancelBtnEl.addEventListener('click', this.#cancelCallback);
  }

  appendTo(element) {
    element.appendChild(this.#mainDiv);
  }

  show() {
    this.#mainDiv.classList.add('show-modal');
  }

  hide() {
    this.#mainDiv.classList.remove('show-modal');
  }

  borderColor(color) {
    this.#contentBox.style.borderColor = color;
  }

  confirmBtnBackgroundColor(color) {
    this.#confirmBtnEl.style.backgroundColor = color;
  }

  cancelBtnBackgroundColor(color) {
    this.#cancelBtnEl.style.backgroundColor = color;
  }
}

export { Modal };
