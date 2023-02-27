class Timer {
  #uiTime;
  #initialTime;
  #finalTime;
  #counter;
  #timerId;
  #timerType;
  #timerStatus;

  static status = Object.freeze({
    running: 'running',
    paused: 'paused',
    stopped: 'stopped',
    finished: 'finished',
  });

  static types = Object.freeze({
    countDown: 'countDown',
    countUp: 'countUp',
  });

  constructor(min, sec, type = Timer.types.countDown) {
    if (type !== Timer.types.countUp && type !== Timer.types.countDown) {
      throw new Error(
        `Invalid parameter. Type should be one of the available values in enum type object in Timer class`
      );
    }
    this.#timerType = type;
    this.setTimerMinSec(min, sec);
  }

  start() {
    this.#timerId = setInterval(() => {
      this.#timerStatus = Timer.status.running;
      this.#update();
      if (this.#counter === this.#finalTime) {
        this.pause();
        this.#timerStatus = Timer.status.finished;
        return;
      }
      console.log('callback', this.#uiTime);
    }, 1000);
    console.log('start');
  }

  restart() {
    console.log('restart timer');
    this.stop();
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
    this.#counter = this.#initialTime;
    this.#setUiTime();
    this.#timerStatus = Timer.status.stopped;
  }

  setTimerMinSec(min, sec) {
    if (sec < 0 || sec >= 60 || !Number.isInteger(sec)) {
      throw new Error(
        `Invalid parameter. Seconds should be a positive integer number between 0 and 59`
      );
    }

    if (min < 0 || !Number.isInteger(min)) {
      throw new Error(
        `Invalid parameter. Minutes should be a positive integer number`
      );
    }

    switch (this.#timerType) {
      case Timer.types.countUp:
        this.#initialTime = 0;
        this.#finalTime = min * 60 + sec;
        this.#counter = this.#initialTime;
        break;
      case Timer.types.countDown:
        this.#initialTime = min * 60 + sec;
        this.#finalTime = 0;
        this.#counter = this.#initialTime;
        break;
    }

    this.#setUiTime();
  }

  getUiTime() {
    return this.#uiTime;
  }

  getMinutes() {
    return parseInt(this.#counter / 60);
  }

  getSeconds() {
    return parseInt(this.#counter % 60);
  }

  getStatus() {
    return this.#timerStatus;
  }

  getTotalTime() {
    if (this.#timerType === Timer.types.countUp) {
      return this.#finalTime;
    } else if (this.#timerType === Timer.types.countDown) {
      return this.#initialTime;
    }
  }

  #update() {
    if (this.#timerType === Timer.types.countDown) {
      this.#counter--;
    } else {
      this.#counter++;
    }
    this.#setUiTime();
  }

  #setUiTime() {
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();
    let uiMinutes = minutes < 10 ? '0' + minutes : minutes;
    let uiSeconds = seconds < 10 ? '0' + seconds : seconds;

    this.#uiTime = `${uiMinutes}:${uiSeconds}`;
  }
}

export { Timer };
