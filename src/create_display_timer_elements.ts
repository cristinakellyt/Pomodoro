class CreateTimerElements {
  #sectionTimerEl;
  #timerTypesEl;
  #timerTextEl;
  #progressBar;
  #buttons!: HTMLElement[];
  #btnFocusTimer!: HTMLElement;
  #btnShortBreak!: HTMLElement;
  #btnLongBreak!: HTMLElement;
  #btnStartPause!: HTMLElement;

  get sectionTimerEl() {
    return this.#sectionTimerEl;
  }

  get timerTypesEl() {
    return this.#timerTypesEl;
  }

  get timerTextEl() {
    return this.#timerTextEl;
  }

  get buttons() {
    return this.#buttons;
  }

  get progressBar() {
    return this.#progressBar;
  }

  get btnFocusTimer() {
    return this.#btnFocusTimer;
  }

  get btnShortBreak() {
    return this.#btnShortBreak;
  }

  get btnLongBreak() {
    return this.#btnLongBreak;
  }

  get btnStartPause() {
    return this.#btnStartPause;
  }

  constructor() {
    this.#sectionTimerEl = document.createElement('section');

    this.#timerTypesEl = document.createElement('div');
    this.#timerTypesEl.className = 'timer-type';

    this.#timerTextEl = document.createElement('p');
    this.#timerTextEl.className = 'countdown';

    this.#progressBar = document.createElement('progress-bar');

    this.#createButtons();
  }

  #createButtons() {
    this.#buttons = [];
    this.#btnFocusTimer = document.createElement('zk-button');
    this.#btnFocusTimer.textContent = 'Focus Time';

    this.#btnShortBreak = document.createElement('zk-button');
    this.#btnShortBreak.textContent = 'Short Break';

    this.#btnLongBreak = document.createElement('zk-button');
    this.#btnLongBreak.textContent = 'Long Break';

    this.#btnStartPause = document.createElement('zk-button');
    this.#btnStartPause.textContent = 'Start';

    this.#buttons.push(
      this.#btnFocusTimer,
      this.#btnShortBreak,
      this.#btnLongBreak,
      this.#btnStartPause
    );
  }
}

export { CreateTimerElements };
