import Timer from './timer.js';

export class BasicTimer {
  timer;
  hostElement;
  timerContainerEl;
  #timerTextEl;
  #startPauseButton;
  restartEl;
  #colors;
  boundFnStartHandler;
  boundFnPauseHandler;
  boundFnrestartHandler;

  constructor(hostElementId, color, min, sec, timerType) {
    this.hostElement = document.getElementById(hostElementId);
    this.timer = new Timer(min, sec, timerType);
    this.timer.setCallbackOnTick(this.#onTick.bind(this));
    this.color = color;
    this.boundFnStartHandler = this.startHandler.bind(this);
    this.boundFnPauseHandler = this.pauseHandler.bind(this);
    this.boundFnrestartHandler = this.restartHandler.bind(this);
    this.#createElements();
    this.#appendElements();
    this.#customiseElements();
  }

  set color(primaryColor) {
    this.#colors = {
      primaryColor: primaryColor,
      colorLight1: primaryColor.replace(')', ', 0.77)'),
      colorLight2: primaryColor.replace(')', ', 0.21)'),
    };
  }

  get color() {
    return this.#colors;
  }

  #createElements() {
    this.timerContainerEl = document.createElement('section');
    this.#timerTextEl = document.createElement('p');
    this.#startPauseButton = document.createElement('zk-button');
    this.restartEl = document.createElement('span');
    this.restartEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><g transform="translate(16 0) scale(-1 1)"><path fill="white" fill-rule="evenodd" d="M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8A6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z" clip-rule="evenodd"/></g></svg>`;
  }

  #appendElements() {
    this.hostElement.appendChild(this.timerContainerEl);
    this.timerContainerEl.appendChild(this.#timerTextEl);
    this.timerContainerEl.appendChild(this.#startPauseButton);
    this.timerContainerEl.appendChild(this.restartEl);
  }

  #customiseElements() {
    this.#timerTextEl.textContent = this.timer.displayTime;
    this.#timerTextEl.className = 'timer-text';

    this.timerContainerEl.style.backgroundColor = this.color.colorLight1;
    this.timerContainerEl.style.width = '40rem';

    this.#startPauseButton.textContent = 'Start';
    this.#startPauseButton.setAttribute(
      'background-color',
      this.color.primaryColor
    );
    this.#startPauseButton.setAttribute('button-size', 'big-button');
    this.#startPauseButton.addEventListener('click', this.boundFnStartHandler);

    this.restartEl.className = 'restart';
    this.restartEl.addEventListener('click', this.boundFnrestartHandler);
  }

  startHandler() {
    this.#timerTextEl.textContent = this.timer.displayTime;
    this.#startPauseButton.removeEventListener(
      'click',
      this.boundFnStartHandler
    );
    this.#startPauseButton.textContent = 'Pause';
    this.timer.start();
    this.#startPauseButton.addEventListener('click', this.boundFnPauseHandler);
  }

  restartHandler() {
    this.timer.restart();
    this.#timerTextEl.textContent = this.timer.displayTime;
    this.#startPauseButton.textContent = 'Pause';
    this.#startPauseButton.removeEventListener(
      'click',
      this.boundFnRestartHandler
    );
    this.#startPauseButton.removeEventListener(
      'click',
      this.boundFnStartHandler
    );
    this.#startPauseButton.addEventListener('click', this.boundFnPauseHandler);
  }

  #onTick() {
    this.#timerTextEl.textContent = this.timer.displayTime;
    if (this.timer.status === Timer.status.finished) {
      this.#startPauseButton.textContent = 'Restart';
      this.#startPauseButton.removeEventListener(
        'click',
        this.boundFnPauseHandler
      );
      this.#startPauseButton.addEventListener(
        'click',
        this.boundFnrestartHandler
      );
    }
  }

  pauseHandler() {
    this.#startPauseButton.removeEventListener(
      'click',
      this.boundFnPauseHandler
    );
    this.timer.pause();
    this.#startPauseButton.textContent = 'Resume';
    this.#startPauseButton.addEventListener('click', this.boundFnStartHandler);
  }
}
