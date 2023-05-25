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
  #displayTime!: string;
  #initialTime!: number;
  #finalTime!: number;
  #currentTime!: number;
  #timerId!: ReturnType<typeof setInterval>;
  #timerType: TimerType;
  #timerStatus!: TimerStatus;

  get displayTime(): string {
    return this.#displayTime;
  }

  get minutes(): number {
    return parseInt((this.#currentTime / 60).toString());
  }

  get seconds(): number {
    return parseInt((this.#currentTime % 60).toString());
  }

  get status(): TimerStatus {
    return this.#timerStatus;
  }

  get totalTime() {
    let totalTime;
    if (this.#timerType === TimerType.Countup) {
      totalTime = this.#finalTime;
    } else if (this.#timerType === TimerType.Countdown) {
      totalTime = this.#initialTime;
    }
    return totalTime;
  }

  set timerType(timerType) {
    this.#timerType = timerType;
  }

  get timerType(): TimerType {
    return this.#timerType;
  }

  constructor(min: number, sec: number, type: TimerType = TimerType.Countdown) {
    if (!Object.values(TimerType).includes(type)) {
      throw new TimerParameterError(
        `Invalid parameter. Type should be one of the available values in the Timer.types object.`
      );
    }
    this.#timerType = type;
    this.setMinSec(min, sec);
  }

  start(): void {
    if (this.#timerStatus === TimerStatus.Running) {
      throw new InvocationMethodError(`The timer is already running.`);
    }
    this.#timerStatus = TimerStatus.Running;
    this.#timerId = setInterval(() => {
      this.#update();
      if (this.#currentTime === this.#finalTime) {
        this.pause();
        this.#timerStatus = TimerStatus.Finished;
        return;
      }
      console.log('callback', this.#displayTime);
    }, 1000);
    console.log('start');
  }

  restart(): void {
    console.log('restart timer');
    this.stop();
    this.start();
  }

  pause(): void {
    console.log('pause');
    if (this.#timerStatus === TimerStatus.Paused) {
      throw new InvocationMethodError(`The timer is already paused.`);
    }
    clearInterval(this.#timerId);
    this.#timerStatus = TimerStatus.Paused;
  }

  stop(): void {
    console.log('stop');
    if (this.#timerStatus === TimerStatus.Stopped) {
      throw new InvocationMethodError(`The timer is already stopped.`);
    }
    clearInterval(this.#timerId);
    this.#currentTime = this.#initialTime;
    this.#setDisplayTime();
    this.#timerStatus = TimerStatus.Stopped;
  }

  setMinSec(min: number, sec: number): void {
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
      case TimerType.Countup:
        this.#initialTime = 0;
        this.#finalTime = min * 60 + sec;
        this.#currentTime = this.#initialTime;
        break;
      case TimerType.Countdown:
        this.#initialTime = min * 60 + sec;
        this.#finalTime = 0;
        this.#currentTime = this.#initialTime;
        break;
    }

    this.#setDisplayTime();
  }

  #update(): void {
    if (this.#timerType === TimerType.Countdown) {
      this.#currentTime--;
    } else {
      this.#currentTime++;
    }
    this.#setDisplayTime();
  }

  #setDisplayTime(): void {
    let minutes = this.minutes;
    let seconds = this.seconds;
    let displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    let displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    this.#displayTime = `${displayMinutes}:${displaySeconds}`;
  }
}

export { Timer, TimerStatus, TimerType };
