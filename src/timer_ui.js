import Timer from './timer.js';

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
  #modal;

  constructor(main, color) {
    this.#mainEl = main;
    this.#color = color;
    this.#timer = new Timer(25, 0, Timer.types.countdown);
    this.#timer.setCallbackOnTick(this.#updateProgressBar, this.#onTick);
    this.#createTimerElement();
  }

  #createTimerElement() {
    this.#sectionTimerEl = document.createElement('section');

    const timerTypesEl = document.createElement('div');
    timerTypesEl.className = 'timer-type';

    this.#timerTextEl = document.createElement('p');
    this.#timerTextEl.className = 'countdown';

    this.#progressBar = document.createElement('progress-bar');

    const buttons = this.#createButtons();

    this.#sectionTimerEl.appendChild(timerTypesEl);
    this.#sectionTimerEl.appendChild(this.#timerTextEl);
    this.#sectionTimerEl.appendChild(this.#progressBar);
    this.#mainEl.appendChild(this.#sectionTimerEl);

    buttons.forEach((btn) => {
      if (btn === this.#btnStartPause) {
        this.#sectionTimerEl.appendChild(btn);
      } else {
        timerTypesEl.appendChild(btn);
      }
      this.#customiseTimerTypesButtons(btn);
    });

    this.#updateUiColor();
    this.#lastBtnClicked.dispatchEvent(new Event('mouseleave'));
    this.#setTimerText();
    this.#createModal();
  }

  #customiseTimerTypesButtons(btn) {
    if (btn === this.#btnStartPause) {
      btn.addEventListener('click', this.#startHandler);
      btn.setAttribute('button-size', 'big-button');
    } else {
      btn.addEventListener('mouseover', this.#mouseHoverColorHandler);
      btn.addEventListener('mouseleave', this.#mouseLeaveColorHandler);
      btn.addEventListener('click', this.#checkTimerStatusHandler);
      btn.setAttribute('background-color', 'transparent');
    }
  }

  #createButtons() {
    let buttons = [];
    this.#btnFocusTimer = document.createElement('zk-button');
    this.#btnFocusTimer.textContent = 'Focus Time';
    this.#selectedBtn = this.#btnFocusTimer;
    this.#lastBtnClicked = this.#btnFocusTimer;

    this.#btnShortBreak = document.createElement('zk-button');
    this.#btnShortBreak.textContent = 'Short Break';

    this.#btnLongBreak = document.createElement('zk-button');
    this.#btnLongBreak.textContent = 'Long Break';

    this.#btnStartPause = document.createElement('zk-button');
    this.#btnStartPause.textContent = 'Start';

    buttons.push(
      this.#btnFocusTimer,
      this.#btnShortBreak,
      this.#btnLongBreak,
      this.#btnStartPause
    );
    return buttons;
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

    this.#modal.addEventListener('confirm', this.#confirmModalHandler);
    this.#modal.addEventListener('cancel', this.#cancelModalHandler);
  }

  #mouseHoverColorHandler = (event) => {
    event.target.setAttribute('background-color', `var(--${this.#color}-dark)`);
  };

  #mouseLeaveColorHandler = (event) => {
    event.target.setAttribute('background-color', 'transparent');
  };

  #checkTimerStatusHandler = (event) => {
    if (this.#selectedBtn === event.target) return;
    this.#lastBtnClicked = event.target;

    if (this.#timer.status === Timer.status.running) {
      this.#pauseHandler();
      this.#showModal();
      return;
    } else if (this.#timer.status === Timer.status.paused) {
      this.#btnStartPause.removeEventListener('click', this.#pauseHandler);
      this.#showModal();
      return;
    }

    this.#selectedBtn = this.#lastBtnClicked;
    this.#setCurrentTimeAndColor();
    this.#updateUiColor();
  };

  #showModal() {
    this.#modal.setAttribute('color-dark', `var(--${this.#color}-light)`);
    this.#modal.setAttribute('color-light', `var(--${this.#color}-very-light)`);
    this.#modal.show();
  }

  #updateUiColor = () => {
    this.#mainEl.style.backgroundColor = `var(--${this.#color}-very-light)`;
    this.#sectionTimerEl.style.backgroundColor = `var(--${this.#color}-light)`;
    this.#btnStartPause.setAttribute(
      'background-color',
      `var(--${this.#color}-dark)`
    );
    this.#progressBar.setAttribute(
      'backdrop-color',
      `var(--${this.#color}-dark)`
    );
    this.#lastBtnClicked.setAttribute(
      'background-color',
      `var(--${this.#color}-dark)`
    );
  };

  #setCurrentTimeAndColor() {
    this.#btnStartPause.removeEventListener('click', this.#startHandler);

    if (this.#selectedBtn === this.#btnFocusTimer) {
      this.#timer.setMinSec(25, 0);
      this.#color = 'red';
    } else if (this.#selectedBtn === this.#btnShortBreak) {
      this.#timer.setMinSec(0, 5);
      this.#color = 'teal';
    } else if (this.#selectedBtn === this.#btnLongBreak) {
      this.#timer.setMinSec(10, 0);
      this.#color = 'indigo';
    }

    if (this.#btnStartPause.textContent !== 'Start') {
      this.#btnStartPause.textContent = 'Start';
    }

    this.#progressBar.setAttribute('progress', 0);

    this.#btnStartPause.addEventListener('click', this.#startHandler);
    this.#setTimerText();
  }

  #setTimerText = () => {
    this.#timerTextEl.textContent = this.#timer.displayTime;
  };

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

    if (this.#timer.status === Timer.status.finished) {
      this.#restart();
    } else {
      this.#timer.start();
    }
    this.#btnStartPause.textContent = 'Pause';

    this.#btnStartPause.addEventListener('click', this.#pauseHandler);
  };

  #onTick = (status, totalTime, displayTime) => {
    this.#setTimerText();
    if (status === Timer.status.finished) {
      this.#btnStartPause.textContent = 'Restart';
      this.#btnStartPause.removeEventListener('click', this.#pauseHandler);
      this.#btnStartPause.addEventListener('click', this.#startHandler);
      return;
    }
  };

  #restart() {
    this.#progressBar.setAttribute('progress', 0);
    console.log(this.#timer.status);
    this.#timer.restart();
    this.#setTimerText();
  }

  #updateProgressBar = (status, totalDuration, displayTime) => {
    let currentTime = this.#timer.minutes * 60 + this.#timer.seconds;
    let progressPercentage = (
      100 -
      (currentTime / totalDuration) * 100
    ).toFixed(2);
    this.#progressBar.setAttribute('progress', progressPercentage);
  };

  #pauseHandler = () => {
    console.log('pause ui');
    this.#timer.pause();
    this.#btnStartPause.textContent = 'Resume';
    this.#btnStartPause.removeEventListener('click', this.#pauseHandler);
    this.#btnStartPause.addEventListener('click', this.#startHandler);
  };

  #stop() {
    console.log('stop ui');
    this.#timer.stop();
    this.#progressBar.setAttribute('progress', 0);
    this.#setTimerText();
  }
}

export { UiTimer };
