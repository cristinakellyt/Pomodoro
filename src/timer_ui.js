import { Timer } from './timer.js';
import { ProgressBar } from './progress_bar.js';
import { Modal } from './modal.js';

class UiTimer {
  #sectionTimerEl;
  #timerTextEl;
  #btnFocusTimer;
  #btnShortBreak;
  #btnLongBreak;
  #btnStartPause;
  #currentBtn;
  #progressBarTimer;
  #mainEl;
  #color;
  #timer;
  #timerId;
  #modal;
  #boundFnConfirmModalHandler;

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
    this.#btnStartPause.addEventListener('click', this.#startHandler);

    this.#progressBarTimer = new ProgressBar();

    timerTypesEl.appendChild(this.#btnFocusTimer);
    timerTypesEl.appendChild(this.#btnShortBreak);
    timerTypesEl.appendChild(this.#btnLongBreak);
    this.#sectionTimerEl.appendChild(timerTypesEl);
    this.#sectionTimerEl.appendChild(this.#timerTextEl);
    this.#sectionTimerEl.appendChild(this.#btnStartPause);
    this.#sectionTimerEl.appendChild(this.#progressBarTimer.getElement());
    this.#mainEl.appendChild(this.#sectionTimerEl);

    this.#updateUiColor();
    this.#setTimerText();
    this.#createModal();
  }

  #addTimerBtnEvents(btn) {
    btn.addEventListener('mouseover', this.#mouseHoverColorHandler);
    btn.addEventListener('mouseleave', this.#mouseLeaveColorHandler);
    btn.addEventListener('click', this.#checkTimerStatusHandler);
  }

  #createModal() {
    let modalContent = {
      title: 'There is a timer running!',
      subtitle:
        'The timer will stop if you continue. Are you sure you want to leave?',
      colorLight: `var(--${this.#color}-very-light)`,
      colorDark: `var(--${this.#color}-light)`,
      confirmBtnText: 'Yes',
      cancelBtnText: 'No',
    };

    this.#modal = new Modal(modalContent);
    this.#modal.appendTo(this.#mainEl);
  }

  #mouseHoverColorHandler = (event) => {
    event.target.style.backgroundColor = `var(--${this.#color}-dark)`;
  };

  #mouseLeaveColorHandler = (event) => {
    event.target.style.backgroundColor = 'transparent';
  };

  #checkTimerStatusHandler = (event) => {
    if (this.#currentBtn === event.target) return;
    if (
      this.#timer.getStatus() === Timer.status.running ||
      this.#timer.getStatus() === Timer.status.paused
    ) {
      this.#boundFnConfirmModalHandler = this.#confirmModalHandler.bind(
        this,
        event
      );
      this.#mainEl.addEventListener(
        'confirm',
        this.#boundFnConfirmModalHandler
      );

      this.#mainEl.addEventListener('cancel', this.#cancelModalHandler);
      this.#btnStartPause.removeEventListener('click', this.#pauseHandler);

      this.#modal.show();
      clearInterval(this.#timerId);
      this.#timer.pause();
      this.#modal.borderColor = `var(--${this.#color}-light)`;
      this.#modal.confirmBtnColor = `var(--${this.#color}-very-light)`;
      this.#modal.cancelBtnColor = `var(--${this.#color}-light)`;
      return;
    }

    this.#setCurrentTimeAndColor(event);
  };

  #updateUiColor(event) {
    this.#mainEl.style.backgroundColor = `var(--${this.#color}-very-light)`;
    this.#sectionTimerEl.style.backgroundColor = `var(--${this.#color}-light)`;
    this.#btnStartPause.style.color = `var(--${this.#color}-dark)`;
    this.#progressBarTimer.setBackgroundColor(`var(--${this.#color}-dark)`);
    if (event) {
      event.target.style.backgroundColor = `var(--${this.#color}-dark)`;
    }
  }

  #setCurrentTimeAndColor(event) {
    this.#btnStartPause.removeEventListener('click', this.#startHandler);

    if (event.target === this.#btnFocusTimer) {
      this.#timer.setTimerMinSec(25, 0);
      this.#color = 'red';
    } else if (event.target === this.#btnShortBreak) {
      this.#timer.setTimerMinSec(0, 5);
      this.#color = 'teal';
    } else {
      this.#timer.setTimerMinSec(10, 0);
      this.#color = 'indigo';
    }

    this.#currentBtn = event.target;

    this.#updateUiColor(event);

    if (this.#btnStartPause.textContent !== 'Start') {
      this.#btnStartPause.textContent = 'Start';
    }

    this.#progressBarTimer.setProgress(0);

    this.#btnStartPause.addEventListener('click', this.#startHandler);
    this.#setTimerText();
  }

  #setTimerText() {
    this.#timerTextEl.textContent = this.#timer.getUiTime();
  }

  #confirmModalHandler(event) {
    this.#mainEl.removeEventListener(
      'confirm',
      this.#boundFnConfirmModalHandler
    );
    this.#stop();
    this.#setCurrentTimeAndColor(event);
    this.#mouseLeaveColorHandler(event);
  }

  #cancelModalHandler = () => {
    this.#mainEl.removeEventListener(
      'confirm',
      this.#boundFnConfirmModalHandler
    );
    this.#mainEl.removeEventListener('cancel', this.#cancelModalHandler);
    this.#startHandler();
  };

  #startHandler = () => {
    console.log('start ui');

    this.#btnStartPause.removeEventListener('click', this.#startHandler);

    let totalDuration = this.#timer.getTotalTime();

    if (this.#btnStartPause.textContent === 'Restart') {
      this.#progressBarTimer.setProgress(0);
      this.#timer.restart();
      this.#setTimerText();
    } else {
      this.#timer.start();
    }
    this.#btnStartPause.textContent = 'Pause';

    this.#timerId = setInterval(() => {
      if (this.#timer.getUiTime() === '00:00') {
        clearInterval(this.#timerId);
        this.#setTimerText();
        this.#btnStartPause.removeEventListener('click', this.#pauseHandler);
        this.#btnStartPause.textContent = 'Restart';
        this.#btnStartPause.addEventListener('click', this.#startHandler);
        this.#progressBarTimer.setProgress(100);
        return;
      }
      this.#setTimerText();
      this.#updateProgressBar(totalDuration);
    }, 1000);

    this.#btnStartPause.addEventListener('click', this.#pauseHandler);
  };

  #updateProgressBar(totalDuration) {
    let currentTime = this.#timer.getMinutes() * 60 + this.#timer.getSeconds();
    let progressPercentage = (
      100 -
      (currentTime / totalDuration) * 100
    ).toFixed(2);
    this.#progressBarTimer.setProgress(progressPercentage);
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
    this.#progressBarTimer.setProgress(0);
    this.#setTimerText();
  }
}

export { UiTimer };
