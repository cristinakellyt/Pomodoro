class TimerParameterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimerParameterError';
  }
}

class InvocationMethodError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvocationMethodError';
  }
}

enum TimerStatus {
  Running,
  Paused,
  Stopped,
  Finished,
}

enum TimerType {
  Countdown,
  Countup,
}

class Timer {
  private _displayTime!: string;
  private _initialTime!: number;
  private _finalTime!: number;
  private _currentTime!: number;
  private _timerId!: ReturnType<typeof setInterval>;
  private _type: TimerType;
  private _status!: TimerStatus;
  private _callbackList: Function[];

  constructor(min: number, sec: number, type: TimerType = TimerType.Countdown) {
    this._type = type;
    this._callbackList = [];
    this.setMinSec(min, sec);
  }

  get displayTime() {
    return this._displayTime;
  }

  get minutes() {
    return parseInt((this._currentTime / 60).toString());
  }

  get seconds() {
    return parseInt((this._currentTime % 60).toString());
  }

  get status() {
    return this._status;
  }

  get totalTime() {
    let totalTime: number = 0;
    if (this._type === TimerType.Countup) {
      totalTime = this._finalTime;
    } else if (this._type === TimerType.Countdown) {
      totalTime = this._initialTime;
    }
    return totalTime;
  }

  get type() {
    return this._type;
  }

  start() {
    if (this._status === TimerStatus.Running) {
      throw new InvocationMethodError(`The timer is already running.`);
    }
    this._status = TimerStatus.Running;
    this._timerId = setInterval(() => {
      this.update();
      console.log('callback', this._displayTime);
    }, 1000);
    console.log('start');
  }

  restart() {
    console.log('restart timer');
    if (this._status !== TimerStatus.Stopped) {
      this.stop();
      this.start();
    } else {
      this.start();
    }
  }

  pause() {
    console.log('pause');
    if (this._status === TimerStatus.Paused) {
      throw new InvocationMethodError(`The timer is already paused.`);
    }
    clearInterval(this._timerId);
    this._status = TimerStatus.Paused;
  }

  stop() {
    console.log('stop');
    if (this._status === TimerStatus.Stopped) {
      throw new InvocationMethodError(`The timer is already stopped.`);
    }
    clearInterval(this._timerId);
    this._currentTime = this._initialTime;
    this.setDisplayTime();
    this._status = TimerStatus.Stopped;
  }

  setMinSec(min: number, sec: number) {
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

    switch (this._type) {
      case TimerType.Countup:
        this._initialTime = 0;
        this._finalTime = min * 60 + sec;
        this._currentTime = this._initialTime;
        break;
      case TimerType.Countdown:
        this._initialTime = min * 60 + sec;
        this._finalTime = 0;
        this._currentTime = this._initialTime;
        break;
    }

    this.setDisplayTime();
  }

  setCallbackOnTick(...callback: Function[]) {
    callback.forEach((cb) => {
      if (!this._callbackList.includes(cb)) {
        this._callbackList.push(cb);
      }
    });
  }

  private update() {
    if (this._status !== TimerStatus.Finished) {
      this._type === TimerType.Countdown
        ? this._currentTime--
        : this._currentTime++;

      if (this._currentTime === this._finalTime) {
        this.pause();
        this._status = TimerStatus.Finished;
      }
    }

    this.setDisplayTime();

    this._callbackList.forEach((callback) => {
      callback(this._status, this.totalTime, this._displayTime);
    });
  }

  private setDisplayTime() {
    let minutes = this.minutes;
    let seconds = this.seconds;
    let displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    let displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    this._displayTime = `${displayMinutes}:${displaySeconds}`;
  }
}

export { Timer, TimerStatus, TimerType };
