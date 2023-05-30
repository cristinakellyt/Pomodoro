import { BasicTimer, ColorTons } from './basic_timer';
import ProgressBarComponent from './components/progress_bar';
import { TimerStatus, TimerType } from './timer';

class TimerWithProgressBar extends BasicTimer {
  protected progressBar!: ProgressBarComponent;

  constructor(
    hostElementId: string,
    color: string | ColorTons,
    min: number,
    sec: number,
    timerType: TimerType
  ) {
    super(hostElementId, color, min, sec, timerType);
    this.restartEl.removeEventListener('click', this.boundFnRestartHandler);
    this.restartEl.addEventListener('click', this.restartHandler.bind(this));
    this.timer.setCallbackOnTick(this.updateProgressBar);
    this.renderProgressBar();
  }

  restartHandler() {
    super.restartHandler();
    this.progressBar.setAttribute('progress', '0');
  }

  private renderProgressBar() {
    this.progressBar = document.createElement(
      'zk-progress-bar'
    ) as ProgressBarComponent;
    this.sectionTimerEl.appendChild(this.progressBar);
    this.progressBar.setAttribute(
      'backdrop-color',
      `${this.colorTheme.primaryColor}`
    );
  }

  private updateProgressBar = (
    _status: TimerStatus,
    totalDuration: number,
    _displayTime: string
  ) => {
    let currentTime = this.timer.minutes * 60 + this.timer.seconds;
    let progressPercentage = (
      100 -
      (currentTime / totalDuration) * 100
    ).toFixed(2);
    this.progressBar.setAttribute('progress', progressPercentage);
  };
}

export default TimerWithProgressBar;
