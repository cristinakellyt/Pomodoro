import { Timer, TimerType } from './timer';
import { CreateTimerElements } from './create_display_timer_elements';

class DisplayTimerFunctionality {
  #timer: Timer;
  #timerId!: ReturnType<typeof setInterval>;
  protected element: CreateTimerElements;

  get timer() {
    return this.#timer;
  }

  get timerId() {
    return this.#timerId;
  }

  elementObj = () => {
    return this.element;
  };

  constructor(min: number, sec: number, timerType: TimerType) {
    this.#timer = new Timer(min, sec, timerType);
    this.element = new CreateTimerElements();
    console.log(this.#timer);
    this.element.btnStartPause.addEventListener('click', this.startHandler);
  }

  startHandler = () => {
    console.log('start ui');

    this.element.btnStartPause.removeEventListener('click', this.startHandler);

    let totalDuration = Number(this.#timer.totalTime);
    console.log(this.#timer);

    if (this.element.btnStartPause.textContent === 'Restart') {
      this.element.progressBar.setAttribute('progress', '0');
      this.#timer.restart();
      this.element.timerTextEl.textContent = this.#timer.displayTime;
    } else {
      this.#timer.start();
    }
    this.element.btnStartPause.textContent = 'Pause';

    this.#timerId = setInterval(() => {
      if (this.#timer.displayTime === '00:00') {
        clearInterval(this.#timerId);
        this.#setTimerText();
        this.element.btnStartPause.removeEventListener(
          'click',
          this.pauseHandler
        );
        this.element.btnStartPause.textContent = 'Restart';
        this.element.btnStartPause.addEventListener('click', this.startHandler);
        this.element.progressBar.setAttribute('progress', '100');
        return;
      }
      this.#setTimerText();
      this.#updateProgressBar(totalDuration);
    }, 1000);

    this.element.btnStartPause.addEventListener('click', this.pauseHandler);
  };

  pauseHandler = () => {
    console.log('pause ui');
    clearInterval(this.#timerId);
    this.#timer.pause();
    this.element.btnStartPause.textContent = 'Resume';
    this.element.btnStartPause.removeEventListener('click', this.pauseHandler);
    this.element.btnStartPause.addEventListener('click', this.startHandler);
  };

  stop() {
    console.log('stop ui');
    clearInterval(this.#timerId);
    this.#timer.stop();
    this.element.progressBar.setAttribute('progress', '0');
    this.#setTimerText();
  }

  #updateProgressBar(totalDuration: number) {
    let currentTime: number = this.#timer.minutes * 60 + this.#timer.seconds;
    let progressPercentage: string = (
      100 -
      (currentTime / totalDuration) * 100
    ).toFixed(2);
    this.element.progressBar.setAttribute('progress', progressPercentage);
  }

  #setTimerText() {
    this.element.timerTextEl.textContent = this.#timer.displayTime;
  }
}

// class CountUp extends DisplayTimerFunctionality {
//   hostElemenet;

//   constructor(hostElemenetID: string) {
//     super(1, 0, TimerType.Countup);

//     this.hostElemenet = document.getElementById(hostElemenetID)! as HTMLElement;
//     // this.element.btnFocusTimer.setAttribute('button-size', 'transparent');
//     console.log(this.element.timerTypesEl);
//     this.appendElements();
//     this.customiseElements();
//   }

//   appendElements() {
//     this.hostElemenet.appendChild(this.element.timerTypesEl);
//     this.element.timerTypesEl.appendChild(this.element.btnFocusTimer);
//     this.hostElemenet.appendChild(this.element.timerTextEl);
//     this.hostElemenet.appendChild(this.element.btnStartPause);
//     this.element.timerTextEl.textContent = this.timer.displayTime;
//   }

//   customiseElements() {
//     this.element.btnFocusTimer.textContent = 'Cronometro';
//     this.element.btnFocusTimer.addEventListener(
//       'click',
//       this.changeFunctionality
//     );
//   }

//   changeFunctionality = () => {
//     if (
//       this.timer.status === TimerStatus.Running ||
//       this.timer.status === TimerStatus.Paused
//     ) {
//       this.stop();
//       this.element.btnStartPause.removeEventListener(
//         'click',
//         this.pauseHandler
//       );
//       this.element.btnStartPause.addEventListener('click', this.startHandler);
//       this.element.btnStartPause.textContent = 'Start';
//     }

//     if (this.timer.timerType === TimerType.Countup) {
//       this.element.btnFocusTimer.textContent = 'Timer';
//       this.timer.timerType = TimerType.Countdown;
//       this.timer.setMinSec(1, 0);
//       this.element.timerTextEl.textContent = this.timer.displayTime;
//     } else if (this.timer.timerType === TimerType.Countdown) {
//       this.element.btnFocusTimer.textContent = 'Cronometro';
//       this.timer.timerType = TimerType.Countup;
//       this.timer.setMinSec(1, 0);
//       this.element.timerTextEl.textContent = this.timer.displayTime;
//     }
//   };
// }

// new CountUp('countup-watch');
// testingWatch.startHandler();

const test = new DisplayTimerFunctionality(3, 0, TimerType.Countdown);
console.log(test);

export { DisplayTimerFunctionality };
