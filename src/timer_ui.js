import { Timer } from './timer.js';
import { Modal } from './modal.js';

class UiTimer {
  #sectionTimerEl;
  #timerTextEl;
  #btnFocusTimer;
  #btnShortBreak;
  #btnLongBreak;
  #btnStartPause;
  #selectedBtn;
  #lastBtnClicked;
  #progressBar;
  #mainEl;
  #color;
  #timer;
  #timerId;
  #modal;

  constructor(main, color) {
    this.#mainEl = main;
    this.#color = color;
    this.#timer = new Timer(25, 0, Timer.types.countDown);
    this.#createTimerElement();
  }

  #createTimerElement() {
    this.#sectionTimerEl = document.createElement('section');

    const timerTypesEl = document.createElement('div');
    timerTypesEl.className = 'timer-type';

    this.#btnFocusTimer = document.createElement('h2');
    this.#btnFocusTimer.id = 'focus-timer';
    this.#btnFocusTimer.textContent = 'Focus Time';
    this.#addTimerBtnEvents(this.#btnFocusTimer);
    this.#selectedBtn = this.#btnFocusTimer;
    this.#lastBtnClicked = this.#btnFocusTimer;

    this.#btnShortBreak = document.createElement('h2');
    this.#btnShortBreak.id = 'short-break';
    this.#btnShortBreak.textContent = 'Short Break';
    this.#addTimerBtnEvents(this.#btnShortBreak);

    this.#btnLongBreak = document.createElement('h2');
    this.#btnLongBreak.id = 'long-break';
    this.#btnLongBreak.textContent = 'Long Break';
    this.#addTimerBtnEvents(this.#btnLongBreak);

    this.#timerTextEl = document.createElement('p');
    this.#timerTextEl.className = 'countdown';

    this.#btnStartPause = document.createElement('button');
    this.#btnStartPause.className = 'btn';
    this.#btnStartPause.id = 'btn-start-pause';
    this.#btnStartPause.textContent = 'Start';
    this.#btnStartPause.addEventListener('click', this.#startHandler);

    this.#progressBar = document.createElement('progress-bar');

    timerTypesEl.appendChild(this.#btnFocusTimer);
    timerTypesEl.appendChild(this.#btnShortBreak);
    timerTypesEl.appendChild(this.#btnLongBreak);
    this.#sectionTimerEl.appendChild(timerTypesEl);
    this.#sectionTimerEl.appendChild(this.#timerTextEl);
    this.#sectionTimerEl.appendChild(this.#btnStartPause);
    this.#sectionTimerEl.appendChild(this.#progressBar);
    this.#mainEl.appendChild(this.#sectionTimerEl);

    this.#updateUiColor();
    this.#lastBtnClicked.dispatchEvent(new Event('mouseleave'));
    this.#setTimerText();
    this.#createModal();
  }

  #addTimerBtnEvents(btn) {
    btn.addEventListener('mouseover', this.#mouseHoverColorHandler);
    btn.addEventListener('mouseleave', this.#mouseLeaveColorHandler);
    btn.addEventListener('click', this.#checkTimerStatusHandler);
  }

  #createModal() {
    this.#modal = document.createElement('modal-container');

    const title = document.createElement('h2');
    title.textContent = 'There is a timer running!';
    title.setAttribute('slot', 'title');

    const subtitle = document.createElement('p');
    subtitle.textContent = `The timer will stop if you continue. Are you sure you want to leave?`;
    subtitle.setAttribute('slot', 'subtitle');

    this.#modal.appendChild(title);
    this.#modal.appendChild(subtitle);
    this.#mainEl.appendChild(this.#modal);

    this.#mainEl.addEventListener('confirm', this.#confirmModalHandler);
    this.#mainEl.addEventListener('cancel', this.#cancelModalHandler);
  }

  #mouseHoverColorHandler = (event) => {
    event.target.style.backgroundColor = `var(--${this.#color}-dark)`;
  };

  #mouseLeaveColorHandler = (event) => {
    event.target.style.backgroundColor = 'transparent';
  };

  #checkTimerStatusHandler = (event) => {
    if (this.#selectedBtn === event.target) return;
    this.#lastBtnClicked = event.target;

    if (
      this.#timer.status === Timer.status.running ||
      this.#timer.status === Timer.status.paused
    ) {
      this.#btnStartPause.removeEventListener('click', this.#pauseHandler);
      clearInterval(this.#timerId);
      this.#timer.pause();
      this.#modal.setAttribute('color-dark', `var(--${this.#color}-light)`);
      this.#modal.setAttribute(
        'color-light',
        `var(--${this.#color}-very-light)`
      );
      this.#modal.show();
      return;
    }

    this.#selectedBtn = this.#lastBtnClicked;
    this.#setCurrentTimeAndColor();
    this.#updateUiColor();
  };

  #updateUiColor = () => {
    this.#mainEl.style.backgroundColor = `var(--${this.#color}-very-light)`;
    this.#sectionTimerEl.style.backgroundColor = `var(--${this.#color}-light)`;
    this.#btnStartPause.style.color = `var(--${this.#color}-dark)`;
    this.#progressBar.setAttribute(
      'backdrop-color',
      `var(--${this.#color}-dark)`
    );
    this.#lastBtnClicked.style.backgroundColor = `var(--${this.#color}-dark)`;
  };

  #setCurrentTimeAndColor() {
    this.#btnStartPause.removeEventListener('click', this.#startHandler);

    if (this.#selectedBtn === this.#btnFocusTimer) {
      this.#timer.setTimerMinSec(25, 0);
      this.#color = 'red';
    } else if (this.#selectedBtn === this.#btnShortBreak) {
      this.#timer.setTimerMinSec(0, 5);
      this.#color = 'teal';
    } else if (this.#selectedBtn === this.#btnLongBreak) {
      this.#timer.setTimerMinSec(10, 0);
      this.#color = 'indigo';
    }

    if (this.#btnStartPause.textContent !== 'Start') {
      this.#btnStartPause.textContent = 'Start';
    }

    this.#progressBar.setAttribute('progress', 0);

    this.#btnStartPause.addEventListener('click', this.#startHandler);
    this.#setTimerText();
  }

  #setTimerText() {
    this.#timerTextEl.textContent = this.#timer.uiTime;
  }

  #confirmModalHandler = () => {
    this.#stop();
    this.#selectedBtn = this.#lastBtnClicked;
    this.#setCurrentTimeAndColor();
    this.#updateUiColor();
    this.#lastBtnClicked.dispatchEvent(new Event('mouseleave'));
  };

  #cancelModalHandler = () => {
    this.#startHandler();
  };

  #startHandler = () => {
    console.log('start ui');

    this.#btnStartPause.removeEventListener('click', this.#startHandler);

    let totalDuration = this.#timer.totalTime;

    if (this.#btnStartPause.textContent === 'Restart') {
      this.#progressBar.setAttribute('progress', 0);
      this.#timer.restart();
      this.#setTimerText();
    } else {
      this.#timer.start();
    }
    this.#btnStartPause.textContent = 'Pause';

    this.#timerId = setInterval(() => {
      if (this.#timer.uiTime === '00:00') {
        clearInterval(this.#timerId);
        this.#setTimerText();
        this.#btnStartPause.removeEventListener('click', this.#pauseHandler);
        this.#btnStartPause.textContent = 'Restart';
        this.#btnStartPause.addEventListener('click', this.#startHandler);
        this.#progressBar.setAttribute('progress', 100);
        return;
      }
      this.#setTimerText();
      this.#updateProgressBar(totalDuration);
    }, 1000);

    this.#btnStartPause.addEventListener('click', this.#pauseHandler);
  };

  #updateProgressBar(totalDuration) {
    let currentTime = this.#timer.minutes * 60 + this.#timer.seconds;
    let progressPercentage = (
      100 -
      (currentTime / totalDuration) * 100
    ).toFixed(2);
    this.#progressBar.setAttribute('progress', progressPercentage);
  }

  #pauseHandler = () => {
    console.log('pause ui');
    clearInterval(this.#timerId);
    this.#timer.pause();
    this.#btnStartPause.textContent = 'Resume';
    this.#btnStartPause.removeEventListener('click', this.#pauseHandler);
    this.#btnStartPause.addEventListener('click', this.#startHandler);
  };

  #stop() {
    console.log('stop ui');
    clearInterval(this.#timerId);
    this.#timer.stop();
    this.#progressBar.setAttribute('progress', 0);
    this.#setTimerText();
  }
}

export { UiTimer };
