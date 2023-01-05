const main = document.getElementById('main');

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
    this.timerText.textContent = '00:00';

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
