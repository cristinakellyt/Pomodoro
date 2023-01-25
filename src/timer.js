class Timer {
  #initialMin;
  #initialSec;
  #minutes;
  #seconds;
  #uiTime;
  #timerTotal;
  #timerId;
  #timerType;
  #timerStatus;

  static status = Object.freeze({
    running: 'running',
    paused: 'paused',
    stopped: 'stopped',
  });

  static types = Object.freeze({
    countdown: 'countDown',
    countUp: 'countUp',
  });

  constructor(min, sec, type = Timer.types.countdown) {
    this.setTimerValues(min, sec);
    this.#timerType = type;
  }

  start() {
    this.#timerId = setInterval(() => {
      this.#timerType === Timer.types.countdown
        ? this.#countDown()
        : this.#countUp();
      console.log('callback', this.#uiTime);
    }, 1000);
    this.#timerStatus = Timer.status.running;
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
    this.#timerStatus = Timer.status.paused;
  }

  stop() {
    console.log('stop');
    clearInterval(this.#timerId);
    this.setTimerValues(this.#initialMin, this.#initialSec);
    this.#timerStatus = Timer.status.stopped;
  }

  setTimerValues(min, sec) {
    if (!(sec >= 0 && sec <= 59) || !Number.isInteger(sec)) {
      throw new Error(
        `Invalid parameter. Seconds should be a positive integer number between 0 and 59`
      );
    }

    if (!Number.isInteger(min) || !(min >= 0)) {
      throw new Error(
        `Invalid parameter. Minutes should be a positive integer number`
      );
    }

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

  getMinutes() {
    return this.#minutes;
  }

  getSeconds() {
    return this.#seconds;
  }

  getStatus() {
    return this.#timerStatus;
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

export { Timer };
