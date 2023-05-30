import { BasicTimer } from './basic_timer.js';

class TimerWithProgressBar extends BasicTimer {
  progressBar;

  constructor(hostElementId, color, min, sec, timerType) {
    super(hostElementId, color, min, sec, timerType);
    this.restartEl.removeEventListener('click', this.boundFnrestartHandler);
    this.restartEl.addEventListener('click', this.restartHandler.bind(this));
    this.timer.setCallbackOnTick(this.#updateProgressBar);
    this.#renderProgressBar();
  }

  restartHandler() {
    super.restartHandler();
    this.progressBar.setAttribute('progress', 0);
  }

  #renderProgressBar() {
    this.progressBar = document.createElement('progress-bar');
    this.timerContainerEl.appendChild(this.progressBar);
    this.progressBar.setAttribute('backdrop-color', this.color.primaryColor);
  }

  #updateProgressBar = (status, totalDuration, displayTime) => {
    let currentTime = this.timer.minutes * 60 + this.timer.seconds;
    let progressPercentage = (
      100 -
      (currentTime / totalDuration) * 100
    ).toFixed(2);
    this.progressBar.setAttribute('progress', progressPercentage);
  };
}

export default TimerWithProgressBar;
