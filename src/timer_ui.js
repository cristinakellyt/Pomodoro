import { Timer } from './timer.js';

class UiTimer {
  constructor(main, color) {
    this.main = main;
    this.color = color;
    this.sectionTimerEl;
    this.timerTypesEl;
    this.timerTextEl;
    this.btnFocusTimer;
    this.btnShortBreak;
    this.btnLongBreak;
    this.btnStartPause;
    this.timer = new Timer(25, 0, Timer.types.countdown);
    this.#createUIElements();
  }

  render() {
    this.timerTypesEl.appendChild(this.btnFocusTimer);
    this.timerTypesEl.appendChild(this.btnShortBreak);
    this.timerTypesEl.appendChild(this.btnLongBreak);

    this.main.append(this.sectionTimerEl);
    this.sectionTimerEl.append(this.timerTypesEl);
    this.sectionTimerEl.append(this.timerTextEl);
    this.sectionTimerEl.append(this.btnStartPause);

    this.#updateUiColor('red');
    this.#setTimerText();
  }

  #addTimerBtnEvents(btn, color) {
    btn.addEventListener('click', this.#updateUiColor.bind(this, color));
    btn.addEventListener('mouseover', this.#mouseHoverColor.bind(this));
    btn.addEventListener('mouseleave', this.#mouseLeaveColor.bind(this));
    btn.addEventListener('click', this.#setCurrentTimer.bind(this));
  }

  #createUIElements() {
    this.sectionTimerEl = document.createElement('section');

    this.timerTypesEl = document.createElement('div');
    this.timerTypesEl.className = 'timer-type';

    this.btnFocusTimer = document.createElement('h2');
    this.btnFocusTimer.id = 'focus-timer';
    this.btnFocusTimer.textContent = 'Focus Time';
    this.#addTimerBtnEvents(this.btnFocusTimer, 'red');

    this.btnShortBreak = document.createElement('h2');
    this.btnShortBreak.id = 'short-break';
    this.btnShortBreak.textContent = 'Short Break';
    this.#addTimerBtnEvents(this.btnShortBreak, 'teal');

    this.btnLongBreak = document.createElement('h2');
    this.btnLongBreak.id = 'long-break';
    this.btnLongBreak.textContent = 'Long Break';
    this.#addTimerBtnEvents(this.btnLongBreak, 'indigo');

    this.timerTextEl = document.createElement('p');
    this.timerTextEl.className = 'countdown';

    this.btnStartPause = document.createElement('button');
    this.btnStartPause.className = 'btn';
    this.btnStartPause.id = 'btn-start';
    this.btnStartPause.textContent = 'Start';
    this.boundFnToStartTimer = this.#startTimerUi.bind(this);
    this.btnStartPause.addEventListener('click', this.boundFnToStartTimer);
  }

  #setTimerText() {
    console.log(this.timer);
    this.timerTextEl.textContent = this.timer.getUiTime();
  }

  #updateUiColor(color, event) {
    this.color = color;
    this.main.style.backgroundColor = `var(--${this.color}-light)`;
    this.sectionTimerEl.style.backgroundColor = `var(--${this.color}-accent-light)`;
    this.btnStartPause.style.backgroundColor = `var(--${this.color}-accent)`;
    if (event) {
      event.target.style.backgroundColor = `var(--${color}-accent)`;
    }
  }

  #mouseHoverColor(event) {
    event.target.style.backgroundColor = `var(--${this.color}-accent)`;
  }

  #mouseLeaveColor(event) {
    event.target.style.backgroundColor = 'transparent';
  }

  #setCurrentTimer(event) {
    this.btnStartPause.removeEventListener('click', this.boundFnToStartTimer);

    this.#stopTimerUi();

    if (event.target === this.btnFocusTimer) {
      this.timer.setTimerValues(25, 0);
    } else if (event.target === this.btnShortBreak) {
      this.timer.setTimerValues(5, 0);
    } else {
      this.timer.setTimerValues(10, 0);
    }

    if (this.btnStartPause.textContent === 'Pause') {
      this.btnStartPause.textContent = 'Start';
    }

    this.btnStartPause.addEventListener('click', this.boundFnToStartTimer);
    this.#setTimerText();
  }

  #startTimerUi() {
    console.log('start ui');

    this.btnStartPause.removeEventListener('click', this.boundFnToStartTimer);

    this.timer.start();
    this.btnStartPause.textContent = 'Pause';

    this.timerId = setInterval(() => {
      if (this.timer.getUiTime() === '00:00') {
        clearInterval(this.timerId);
      }
      this.timerTextEl.textContent = this.timer.getUiTime();
    }, 1000);

    this.boundFnToPauseTimer = this.#pauseTimer.bind(this);
    this.btnStartPause.addEventListener('click', this.boundFnToPauseTimer);
  }

  #pauseTimer() {
    console.log('pause ui');
    clearInterval(this.timerId);
    this.timer.pause();
    this.btnStartPause.textContent = 'Start';
    this.btnStartPause.removeEventListener('click', this.boundFnToPauseTimer);
    this.btnStartPause.addEventListener('click', this.boundFnToStartTimer);
  }

  #stopTimerUi() {
    console.log('stop ui');
    clearInterval(this.timerId);
    this.timer.stop();
    this.#setTimerText();
  }
}

export { UiTimer };
