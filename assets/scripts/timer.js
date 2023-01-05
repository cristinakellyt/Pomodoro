const TIMER_COUNTDOWN = 0;
const TIMER_COUNTUP = 1;

class Timer {
  constructor(min, sec, type = TIMER_COUNTDOWN) {
    this.minutes = Number(min);
    this.seconds = Number(sec);
    this.timerId;
    this.type = type;
    this.uiTime;
    this.timerTotal = this.minutes * 60 + this.seconds;
  }

  start() {
    this.timerId = setInterval(() => {
      this.type == TIMER_COUNTDOWN ? this.countDown() : this.countUp();
    }, 1000);
    console.log('start');
  }

  stop() {
    console.log('stop');
    clearInterval(this.timerId);
  }

  countUp() {
    console.log('not implemented');
  }

  countDown() {
    this.timerTotal--;
    if (this.timerTotal <= 0) {
      this.stop();
    }

    this.minutes = parseInt(this.timerTotal / 60);
    this.seconds = parseInt(this.timerTotal % 60);

    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

    console.log(`${this.minutes}:${this.seconds}`);
    this.uiTime = `${this.minutes}:${this.seconds}`;
  }

  getTime() {
    return this.uiTime;
  }
}

export { Timer };
