const TIMER_COUNTDOWN = 0;
const TIMER_COUNTUP = 1;

class Timer {
  constructor(min, sec, type = TIMER_COUNTDOWN) {
    this.minutes = Number(min);
    this.seconds = Number(sec);
    this.timerTotal = this.minutes * 60 + this.seconds;
    this.timerId;
    this.type = type;
    this.setUiTime();
  }

  start() {
    this.timerId = setInterval(() => {
      this.type == TIMER_COUNTDOWN ? this.countDown() : this.countUp();
      console.log('callback', this.uiTime);
    }, 1000);
    console.log('start');
  }

  pause() {
    console.log('pause');
    clearInterval(this.timerId);
  }

  countUp() {
    console.log('not implemented');
  }

  countDown() {
    this.timerTotal--;
    if (this.timerTotal <= 0) {
      this.pause();
    }

    this.minutes = parseInt(this.timerTotal / 60);
    this.seconds = parseInt(this.timerTotal % 60);

    this.setUiTime();
  }

  getUiTime() {
    return this.uiTime;
  }

  setUiTime() {
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

    this.uiTime = `${this.minutes}:${this.seconds}`;
  }
}

export { Timer, TIMER_COUNTDOWN, TIMER_COUNTUP };
