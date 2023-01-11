import { Timer, TIMER_COUNTDOWN, TIMER_COUNTUP } from './timer.js';

class uiTimer {
  constructor(main, color) {
    this.main = main;
    this.color = color;
    this.sectionTimerEl;
    this.timerTypesEl;
    this.timerTextEl;
    this.btnFocusTimer;
    this.btnShortBreak;
    this.btnLongBreak;
    this.start_pauseBtn;
    this.timeFocus = new Timer(25, 0, TIMER_COUNTDOWN);
    this.timeShortBreak = new Timer(5, 0, TIMER_COUNTDOWN);
    this.timeLongBreak = new Timer(10, 0, TIMER_COUNTDOWN);
    this.currentTime = this.timeFocus;
    this.createTimerElements();
  }

  render() {
    this.timerTypesEl.appendChild(this.btnFocusTimer);
    this.timerTypesEl.appendChild(this.btnShortBreak);
    this.timerTypesEl.appendChild(this.btnLongBreak);

    this.main.append(this.sectionTimerEl);
    this.sectionTimerEl.append(this.timerTypesEl);
    this.sectionTimerEl.append(this.timerTextEl);
    this.sectionTimerEl.append(this.start_pauseBtn);

    this.btnFocusTimer.addEventListener(
      'click',
      this.changeTargetColor.bind(this, 'red')
    );
    this.btnFocusTimer.addEventListener(
      'mouseover',
      this.mouseHoverColor.bind(this)
    );
    this.btnFocusTimer.addEventListener(
      'mouseleave',
      this.mouseLeaveColor.bind(this)
    );
    this.btnFocusTimer.addEventListener(
      'click',
      this.changeTargetTimer.bind(this)
    );

    this.btnShortBreak.addEventListener(
      'click',
      this.changeTargetColor.bind(this, 'teal')
    );
    this.btnShortBreak.addEventListener(
      'mouseover',
      this.mouseHoverColor.bind(this)
    );
    this.btnShortBreak.addEventListener(
      'mouseleave',
      this.mouseLeaveColor.bind(this)
    );
    this.btnShortBreak.addEventListener(
      'click',
      this.changeTargetTimer.bind(this)
    );

    this.btnLongBreak.addEventListener(
      'click',
      this.changeTargetColor.bind(this, 'indigo')
    );
    this.btnLongBreak.addEventListener(
      'mouseover',
      this.mouseHoverColor.bind(this)
    );
    this.btnLongBreak.addEventListener(
      'mouseleave',
      this.mouseLeaveColor.bind(this)
    );
    this.btnLongBreak.addEventListener(
      'click',
      this.changeTargetTimer.bind(this)
    );

    this.boundFnToStartTimer = this.btnStartTimer.bind(this);
    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);

    this.changeUiColor();
    this.renderTimer();
  }

  createTimerElements() {
    this.sectionTimerEl = document.createElement('section');

    this.timerTypesEl = document.createElement('div');
    this.timerTypesEl.className = 'timer-type';

    this.btnFocusTimer = document.createElement('h2');
    this.btnFocusTimer.id = 'focus-timer';
    this.btnFocusTimer.textContent = 'Focus Time';

    this.btnShortBreak = document.createElement('h2');
    this.btnShortBreak.id = 'short-break';
    this.btnShortBreak.textContent = 'Short Break';

    this.btnLongBreak = document.createElement('h2');
    this.btnLongBreak.id = 'long-break';
    this.btnLongBreak.textContent = 'Long Break';

    this.timerTextEl = document.createElement('p');
    this.timerTextEl.className = 'countdown';

    this.start_pauseBtn = document.createElement('button');
    this.start_pauseBtn.className = 'btn';
    this.start_pauseBtn.id = 'btn-start';
    this.start_pauseBtn.textContent = 'Start';
  }

  renderTimer() {
    console.log(this.currentTime);
    this.timerTextEl.textContent = this.currentTime.getUiTime();
  }

  changeUiColor() {
    this.main.style.backgroundColor = `var(--${this.color}-light)`;
    this.sectionTimerEl.style.backgroundColor = `var(--${this.color}-accent-light)`;
    this.start_pauseBtn.style.backgroundColor = `var(--${this.color}-accent)`;
  }

  changeTargetColor(color, event) {
    this.color = color;
    event.target.style.backgroundColor = `var(--${color}-accent)`;
    console.log(event);
    this.changeUiColor();
  }

  mouseHoverColor(event) {
    console.log(event);
    console.log('hi');
    event.target.style.backgroundColor = `var(--${this.color}-accent)`;
  }

  mouseLeaveColor(event) {
    event.target.style.backgroundColor = 'transparent';
  }

  changeTargetTimer(event) {
    console.log('in');
    this.start_pauseBtn.removeEventListener('click', this.boundFnToStartTimer);

    if (event.target.id === 'focus-timer') {
      this.currentTime = this.timeFocus;
    } else if (event.target.id === 'short-break') {
      this.currentTime = this.timeShortBreak;
    } else if (event.target.id === 'long-break') {
      this.currentTime = this.timeLongBreak;
    }
    this.boundFnToStartTimer = this.btnStartTimer.bind(this);
    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);
    this.renderTimer();
  }

  btnStartTimer() {
    console.log('start ui');
    this.start_pauseBtn.removeEventListener('click', this.boundFnToStartTimer);
    this.currentTime.start();

    this.start_pauseBtn.textContent = 'Pause';

    let timerId = setInterval(() => {
      if (this.currentTime.getUiTime() === '00:00') {
        clearInterval(timerId);
      }
      this.timerTextEl.textContent = this.currentTime.getUiTime();
    }, 1000);

    this.boundFnToPauseTimer = this.btnPauseTimer.bind(this, timerId);
    this.start_pauseBtn.addEventListener('click', this.boundFnToPauseTimer);
  }

  btnPauseTimer(timerId) {
    console.log('pause ui');
    clearInterval(timerId);
    this.currentTime.pause();
    this.start_pauseBtn.textContent = 'Start';
    this.start_pauseBtn.removeEventListener('click', this.boundFnToPauseTimer);
    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);
  }
}

export { uiTimer };
