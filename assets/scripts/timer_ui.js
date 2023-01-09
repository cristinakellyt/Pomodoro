const main = document.getElementById('main');

import { Timer, TIMER_COUNTDOWN, TIMER_COUNTUP } from './timer.js';

class uiTimer {
  constructor(main, color) {
    this.main = main;
    this.color = color;
    this.sectionTimer;
    this.timerTypes;
    this.focusTimer;
    this.shortBreak;
    this.longBreak;
    this.start_pauseBtn;
    this.timerText;
    this.defaultTimeCountdown = new Timer(9, 3, TIMER_COUNTDOWN);
    this.createTimerElements();
  }

  render() {
    this.timerTypes.appendChild(this.focusTimer);
    this.timerTypes.appendChild(this.shortBreak);
    this.timerTypes.appendChild(this.longBreak);

    this.main.append(this.sectionTimer);
    this.sectionTimer.append(this.timerTypes);
    this.sectionTimer.append(this.timerText);
    this.sectionTimer.append(this.start_pauseBtn);

    this.changeUiColor();
    this.renderTimer();

    this.focusTimer.addEventListener(
      'click',
      this.changeTargetColor.bind(this, 'red')
    );
    this.focusTimer.addEventListener(
      'mouseover',
      this.mouseHoverColor.bind(this)
    );
    this.focusTimer.addEventListener(
      'mouseleave',
      this.mouseLeaveColor.bind(this)
    );

    this.shortBreak.addEventListener(
      'click',
      this.changeTargetColor.bind(this, 'teal')
    );
    this.shortBreak.addEventListener(
      'mouseover',
      this.mouseHoverColor.bind(this)
    );
    this.shortBreak.addEventListener(
      'mouseleave',
      this.mouseLeaveColor.bind(this)
    );

    this.longBreak.addEventListener(
      'click',
      this.changeTargetColor.bind(this, 'indigo')
    );
    this.longBreak.addEventListener(
      'mouseover',
      this.mouseHoverColor.bind(this)
    );
    this.longBreak.addEventListener(
      'mouseleave',
      this.mouseLeaveColor.bind(this)
    );
  }

  renderTimer() {
    this.timerText.textContent = this.defaultTimeCountdown.getUiTime();

    this.boundFnToStartTimer = this.btnStartTimer.bind(this);

    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);
  }

  btnStartTimer() {
    console.log('start ui');
    this.start_pauseBtn.removeEventListener('click', this.boundFnToStartTimer);
    this.defaultTimeCountdown.start();

    this.start_pauseBtn.textContent = 'Pause';

    let timerId = setInterval(() => {
      if (this.defaultTimeCountdown.getUiTime() === '00:00') {
        clearInterval(timerId);
      }
      this.timerText.textContent = this.defaultTimeCountdown.getUiTime();
    }, 1000);

    this.boundFnToPauseTimer = this.btnPauseTimer.bind(this, timerId);
    this.start_pauseBtn.addEventListener('click', this.boundFnToPauseTimer);
  }

  btnPauseTimer(timerId) {
    console.log('pause ui');
    clearInterval(timerId);
    this.defaultTimeCountdown.pause();
    this.start_pauseBtn.textContent = 'Start';
    this.start_pauseBtn.removeEventListener('click', this.boundFnToPauseTimer);
    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);
  }

  createTimerElements() {
    this.sectionTimer = document.createElement('section');

    this.timerTypes = document.createElement('div');
    this.timerTypes.className = 'timer-type';

    this.focusTimer = document.createElement('h2');
    this.focusTimer.id = 'focus-timer';
    this.focusTimer.textContent = 'Focus Time';

    this.shortBreak = document.createElement('h2');
    this.shortBreak.id = 'short-break';
    this.shortBreak.textContent = 'Short Break';

    this.longBreak = document.createElement('h2');
    this.longBreak.id = 'long-break';
    this.longBreak.textContent = 'Long Break';

    this.timerText = document.createElement('p');
    this.timerText.className = 'countdown';

    this.start_pauseBtn = document.createElement('button');
    this.start_pauseBtn.className = 'btn';
    this.start_pauseBtn.id = 'btn-start';
    this.start_pauseBtn.textContent = 'Start';
  }

  changeUiColor() {
    this.main.style.backgroundColor = `var(--${this.color}-light)`;
    this.sectionTimer.style.backgroundColor = `var(--${this.color}-accent-light)`;
    this.start_pauseBtn.style.backgroundColor = `var(--${this.color}-accent)`;
  }

  changeTargetColor(color, event) {
    this.color = color;
    event.target.style.backgroundColor = `var(--${color}-accent)`;
    this.changeUiColor();
  }

  mouseHoverColor(event) {
    console.log(event);
    console.log('hi');
    console.log(this.color);
    event.target.style.backgroundColor = `var(--${this.color}-accent)`;
  }

  mouseLeaveColor(event) {
    event.target.style.backgroundColor = 'transparent';
  }
}

export { uiTimer };
