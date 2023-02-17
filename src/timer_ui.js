import { Timer } from './timer.js';
import { ProgressBar } from './progress_bar.js';
import { Modal } from './modal.js';

class UiTimer {
  #sectionTimerEl;
  #timerTypesEl;
  #timerTextEl;
  #btnFocusTimer;
  #btnShortBreak;
  #btnLongBreak;
  #btnStartPause;
  #currentBtn;
  #progressBarTimer;
  #boundFnToPauseTimer;
  #boundFnToStartTimer;
  #mainEl;
  #color;
  #timer;
  #timerId;
  #modal;

  constructor(main, color) {
    this.#mainEl = main;
    this.#color = color;

    this.#timer = new Timer(25, 0, Timer.types.countDown);
    this.#createUIElements();
  }

  render() {
    this.#timerTypesEl.appendChild(this.#btnFocusTimer);
    this.#timerTypesEl.appendChild(this.#btnShortBreak);
    this.#timerTypesEl.appendChild(this.#btnLongBreak);

    this.#mainEl.append(this.#sectionTimerEl);
    this.#sectionTimerEl.append(this.#timerTypesEl);
    this.#sectionTimerEl.append(this.#timerTextEl);
    this.#sectionTimerEl.append(this.#btnStartPause);
    this.#sectionTimerEl.append(this.#progressBarTimer.getElement());

    this.#updateUiColor();
    this.#setTimerText();
    this.#createModal();
  }

  #addTimerBtnEvents(btn) {
    btn.addEventListener('mouseover', this.#mouseHoverColorHandler.bind(this));
    btn.addEventListener('mouseleave', this.#mouseLeaveColorHandler.bind(this));
    btn.addEventListener('click', this.#checkTimerStatusHandler.bind(this));
  }

  #createUIElements() {
    this.#sectionTimerEl = document.createElement('section');

    this.#timerTypesEl = document.createElement('div');
    this.#timerTypesEl.className = 'timer-type';

    this.#btnFocusTimer = document.createElement('h2');
    this.#btnFocusTimer.id = 'focus-timer';
    this.#btnFocusTimer.textContent = 'Focus Time';
    this.#addTimerBtnEvents(this.#btnFocusTimer);
    this.#currentBtn = this.#btnFocusTimer;

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
    this.#boundFnToStartTimer = this.#start.bind(this);
    this.#btnStartPause.addEventListener('click', this.#boundFnToStartTimer);

    this.#progressBarTimer = new ProgressBar();
  }

  #createModal() {
    let modalContent = {
      title: 'There is a timer running!',
      subtitle:
        'The timer will stop if you continue. Are you sure you want to leave?',
      colorLight: `var(--${this.#color}-light)`,
      colorDark: `var(--${this.#color}-accent-light)`,
      confirmBtnText: 'Yes',
      cancelBtnText: 'No',
    };

    this.#modal = new Modal(modalContent);
    this.#modal.appendTo(this.#mainEl);
  }

  #mouseHoverColorHandler(event) {
    event.target.style.backgroundColor = `var(--${this.#color}-accent)`;
  }

  #mouseLeaveColorHandler(event) {
    event.target.style.backgroundColor = 'transparent';
  }

  #checkTimerStatusHandler(event) {
    if (this.#currentBtn === event.target) return;
    if (
      this.#timer.getStatus() === Timer.status.running ||
      this.#timer.getStatus() === Timer.status.paused
    ) {
      this.#modal.onConfirm(this.#confirmModalHandler.bind(this, event));
      this.#modal.onCancel(this.#cancelModalHandler.bind(this));
      this.#btnStartPause.removeEventListener(
        'click',
        this.#boundFnToPauseTimer
      );

      this.#modal.show();
      clearInterval(this.#timerId);
      this.#timer.pause();
      this.#modal.borderColor(`var(--${this.#color}-accent-light)`);
      this.#modal.confirmBtnBackgroundColor(`var(--${this.#color}-light)`);
      this.#modal.cancelBtnBackgroundColor(
        `var(--${this.#color}-accent-light)`
      );
      return;
    }

    this.#setCurrentTimeAndColor(event);
  }

  #updateUiColor(event) {
    this.#mainEl.style.backgroundColor = `var(--${this.#color}-light)`;
    this.#sectionTimerEl.style.backgroundColor = `var(--${
      this.#color
    }-accent-light)`;
    this.#btnStartPause.style.color = `var(--${this.#color}-accent)`;
    this.#progressBarTimer.setBackgroundColor(`var(--${this.#color}-accent)`);
    if (event) {
      event.target.style.backgroundColor = `var(--${this.#color}-accent)`;
    }
  }

  #setCurrentTimeAndColor(event) {
    this.#btnStartPause.removeEventListener('click', this.#boundFnToStartTimer);

    if (event.target === this.#btnFocusTimer) {
      this.#timer.setTimerMinSec(25, 0);
      this.#color = 'red';
    } else if (event.target === this.#btnShortBreak) {
      this.#timer.setTimerMinSec(5, 0);
      this.#color = 'teal';
    } else {
      this.#timer.setTimerMinSec(10, 0);
      this.#color = 'indigo';
    }

    this.#currentBtn = event.target;

    this.#updateUiColor(event);

    if (this.#btnStartPause.textContent === 'Pause') {
      this.#btnStartPause.textContent = 'Start';
    }

    this.#progressBarTimer.setProgress(0);

    this.#btnStartPause.addEventListener('click', this.#boundFnToStartTimer);
    this.#setTimerText();
  }

  #setTimerText() {
    console.log(this.#timer);
    this.#timerTextEl.textContent = this.#timer.getUiTime();
  }

  #confirmModalHandler(event) {
    this.#modal.hide();
    this.#stop();
    this.#setCurrentTimeAndColor(event);
    this.#mouseLeaveColorHandler(event);
  }

  #cancelModalHandler() {
    this.#modal.hide();
    this.#start();
  }

  #start() {
    console.log('start ui');

    this.#btnStartPause.removeEventListener('click', this.#boundFnToStartTimer);
    let totalDuration =
      this.#timer.getMinutes() * 60 + this.#timer.getSeconds();
    this.#timer.start();
    this.#btnStartPause.textContent = 'Pause';

    this.#timerId = setInterval(() => {
      if (this.#timer.getUiTime() === '00:00') {
        clearInterval(this.#timerId);
      }
      let currentTime =
        this.#timer.getMinutes() * 60 + this.#timer.getSeconds();
      let progressPercentage = (
        100 -
        (currentTime / totalDuration) * 100
      ).toFixed(2);
      this.#progressBarTimer.setProgress(progressPercentage);
      this.#timerTextEl.textContent = this.#timer.getUiTime();
    }, 1000);

    this.#boundFnToPauseTimer = this.#pause.bind(this);
    this.#btnStartPause.addEventListener('click', this.#boundFnToPauseTimer);
  }

  #pause() {
    console.log('pause ui');
    clearInterval(this.#timerId);
    this.#timer.pause();
    this.#btnStartPause.textContent = 'Start';
    this.#btnStartPause.removeEventListener('click', this.#boundFnToPauseTimer);
    this.#btnStartPause.addEventListener('click', this.#boundFnToStartTimer);
  }

  #stop() {
    console.log('stop ui');
    clearInterval(this.#timerId);
    this.#timer.stop();
    this.#progressBarTimer.setProgress(0);
    this.#setTimerText();
  }
}

export { UiTimer };
