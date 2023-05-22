class CreateModal {
  #modal;

  get modalEl() {
    return this.#modal;
  }

  constructor(titleText, subtitleText) {
    this.#modal = document.createElement('modal-container');

    const title = document.createElement('h2');
    title.textContent = titleText;
    title.setAttribute('slot', 'title');

    const subtitle = document.createElement('p');
    subtitle.textContent = subtitleText;
    subtitle.setAttribute('slot', 'subtitle');

    this.#appendElements(title, subtitle);
  }

  #appendElements(title, subtitle) {
    this.#modal.appendChild(title);
    this.#modal.appendChild(subtitle);
  }
}

export default CreateModal;
