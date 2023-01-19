const TIMER_COUNTDOWN = 0;
const TIMER_COUNTUP = 1;

class Timer {
  #initialMin;
  #initialSec;
  #minutes;
  #seconds;
  #timerTotal;
  #timerId;
  #type;
  #uiTime;

  constructor(min, sec, type = TIMER_COUNTDOWN) {
    this.#initialMin = Number(min);
    this.#initialSec = Number(sec);
    this.#minutes = Number(min);
    this.#seconds = Number(sec);
    this.#timerTotal = this.#minutes * 60 + this.#seconds;
    this.#timerId;
    this.#type = type;
    this.#setUiTime();
  }

  start() {
    this.#timerId = setInterval(() => {
      this.#type == TIMER_COUNTDOWN ? this.#countDown() : this.#countUp();
      console.log('callback', this.#uiTime);
    }, 1000);
    console.log('start');
  }

  restart() {
    console.log('restart timer');
    clearInterval(this.#timerId);
    this.setTimerValues(this.#initialMin, this.#initialSec);
    this.start();
  }

  pause() {
    console.log('pause');
    clearInterval(this.#timerId);
  }

  stop() {
    console.log('stop');
    clearInterval(this.#timerId);
    this.setTimerValues(this.#initialMin, this.#initialSec);
  }

  setTimerValues(min, sec) {
    this.#minutes = min;
    this.#seconds = sec;
    this.#initialMin = this.#minutes;
    this.#initialSec = this.#seconds;
    this.#timerTotal = this.#minutes * 60 + this.#seconds;
    this.#setUiTime();
  }

  getUiTime() {
    return this.#uiTime;
  }

  #countUp() {
    console.log('not implemented');
  }

  #countDown() {
    this.#timerTotal--;
    if (this.#timerTotal <= 0) {
      this.pause();
    }

    this.#minutes = parseInt(this.#timerTotal / 60);
    this.#seconds = parseInt(this.#timerTotal % 60);

    this.#setUiTime();
  }

  #setUiTime() {
    this.#minutes = this.#minutes < 10 ? '0' + this.#minutes : this.#minutes;
    this.#seconds = this.#seconds < 10 ? '0' + this.#seconds : this.#seconds;

    this.#uiTime = `${this.#minutes}:${this.#seconds}`;
  }
}

export { Timer, TIMER_COUNTDOWN, TIMER_COUNTUP };
