import Timer from './timer';
import CreateTimerElements from './create_display_timer_elements';

class DisplayTimerFunctionality {
  #timer;
  #timerId;
  #element;

  get timer() {
    return this.#timer;
  }

  get timerId() {
    return this.#timerId;
  }

  get element() {
    return this.#element;
  }

  constructor(min, sec, timerType) {
    this.#timer = new Timer(min, sec, timerType);
    this.#element = new CreateTimerElements();
    console.log(this.#timer);
    this.#element.btnStartPause.addEventListener('click', this.startHandler);
  }

  startHandler = () => {
    console.log('start ui');

    this.#element.btnStartPause.removeEventListener('click', this.startHandler);

    let totalDuration = this.#timer.totalTime;

    if (this.#element.btnStartPause.textContent === 'Restart') {
      this.#element.progressBar.setAttribute('progress', 0);
      this.#timer.restart();
      this.#element.timerTextEl.textContent = this.#timer.displayTime;
    } else {
      this.#timer.start();
    }
    this.#element.btnStartPause.textContent = 'Pause';

    this.#timerId = setInterval(() => {
      if (this.#timer.displayTime === '00:00') {
        clearInterval(this.#timerId);
        this.#setTimerText();
        this.#element.btnStartPause.removeEventListener(
          'click',
          this.pauseHandler
        );
        this.#element.btnStartPause.textContent = 'Restart';
        this.#element.btnStartPause.addEventListener(
          'click',
          this.startHandler
        );
        this.#element.progressBar.setAttribute('progress', 100);
        return;
      }
      this.#setTimerText();
      this.#updateProgressBar(totalDuration);
    }, 1000);

    this.#element.btnStartPause.addEventListener('click', this.pauseHandler);
  };

  pauseHandler = () => {
    console.log('pause ui');
    clearInterval(this.#timerId);
    this.#timer.pause();
    this.#element.btnStartPause.textContent = 'Resume';
    this.#element.btnStartPause.removeEventListener('click', this.pauseHandler);
    this.#element.btnStartPause.addEventListener('click', this.startHandler);
  };

  stop() {
    console.log('stop ui');
    clearInterval(this.#timerId);
    this.#timer.stop();
    this.#element.progressBar.setAttribute('progress', 0);
    this.#setTimerText();
  }

  #updateProgressBar(totalDuration) {
    let currentTime = this.#timer.minutes * 60 + this.#timer.seconds;
    let progressPercentage = (
      100 -
      (currentTime / totalDuration) * 100
    ).toFixed(2);
    this.#element.progressBar.setAttribute('progress', progressPercentage);
  }

  #setTimerText() {
    this.#element.timerTextEl.textContent = this.#timer.displayTime;
  }
}

export default DisplayTimerFunctionality;
