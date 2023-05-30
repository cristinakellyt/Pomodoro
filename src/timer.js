class TimerParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimerParameterError';
  }
}

class InvocationMethodError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvocationMethodError';
  }
}

class Timer {
  #displayTime;
  #initialTime;
  #finalTime;
  #currentTime;
  #timerId;
  #timerType;
  #timerStatus;
  #callbackList;

  static status = Object.freeze({
    running: 'running',
    paused: 'paused',
    stopped: 'stopped',
    finished: 'finished',
  });

  static types = Object.freeze({
    countdown: 'countdown',
    countup: 'countup',
  });

  get displayTime() {
    return this.#displayTime;
  }

  get minutes() {
    return parseInt(this.#currentTime / 60);
  }

  get seconds() {
    return parseInt(this.#currentTime % 60);
  }

  get status() {
    return this.#timerStatus;
  }

  get totalTime() {
    let totalTime;
    if (this.#timerType === Timer.types.countup) {
      totalTime = this.#finalTime;
    } else if (this.#timerType === Timer.types.countdown) {
      totalTime = this.#initialTime;
    }
    return totalTime;
  }

  get timerType() {
    return this.#timerType;
  }

  constructor(min, sec, type = Timer.types.countdown) {
    if (!Object.values(Timer.types).includes(type)) {
      throw new TimerParameterError(
        `Invalid parameter. Type should be one of the available values in the Timer.types object.`
      );
    }
    this.#timerType = type;
    this.#callbackList = [];
    this.setMinSec(min, sec);
  }

  start() {
    if (this.#timerStatus === Timer.status.running) {
      throw new InvocationMethodError(`The timer is already running.`);
    }
    this.#timerStatus = Timer.status.running;
    this.#timerId = setInterval(() => {
      this.#update();
      console.log('callback', this.#displayTime);
    }, 1000);
    console.log('start');
  }

  restart() {
    console.log('restart timer');
    if (this.#timerStatus !== Timer.status.stopped) {
      this.stop();
      this.start();
    } else {
      this.start();
    }
  }

  pause() {
    console.log('pause');
    if (this.#timerStatus === Timer.status.paused) {
      throw new InvocationMethodError(`The timer is already paused.`);
    }
    clearInterval(this.#timerId);
    this.#timerStatus = Timer.status.paused;
  }

  stop() {
    console.log('stop');
    if (this.#timerStatus === Timer.status.stopped) {
      throw new InvocationMethodError(`The timer is already stopped.`);
    }
    clearInterval(this.#timerId);
    this.#currentTime = this.#initialTime;
    this.#setDisplayTime();
    this.#timerStatus = Timer.status.stopped;
  }

  setMinSec(min, sec) {
    if (sec < 0 || sec >= 60 || !Number.isInteger(sec)) {
      throw new TimerParameterError(
        `Invalid parameter. Seconds should be a positive integer number between 0 and 59`
      );
    }

    if (min < 0 || !Number.isInteger(min)) {
      throw new TimerParameterError(
        `Invalid parameter. Minutes should be a positive integer number`
      );
    }

    switch (this.#timerType) {
      case Timer.types.countup:
        this.#initialTime = 0;
        this.#finalTime = min * 60 + sec;
        this.#currentTime = this.#initialTime;
        break;
      case Timer.types.countdown:
        this.#initialTime = min * 60 + sec;
        this.#finalTime = 0;
        this.#currentTime = this.#initialTime;
        break;
    }

    this.#setDisplayTime();
  }

  setCallbackOnTick(...callback) {
    callback.forEach((callback) => {
      if (!this.#callbackList.includes(callback)) {
        this.#callbackList.push(callback);
      }
    });
  }

  #update() {
    if (this.#timerStatus !== Timer.status.finished) {
      this.#timerType === Timer.types.countdown
        ? this.#currentTime--
        : this.#currentTime++;

      if (this.#currentTime === this.#finalTime) {
        this.pause();
        this.#timerStatus = Timer.status.finished;
      }
    }

    this.#setDisplayTime();

    this.#callbackList.forEach((callback) => {
      callback(this.status, this.totalTime, this.displayTime);
    });
  }

  #setDisplayTime() {
    let minutes = this.minutes;
    let seconds = this.seconds;
    let displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    let displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    this.#displayTime = `${displayMinutes}:${displaySeconds}`;
  }
}

export default Timer;
