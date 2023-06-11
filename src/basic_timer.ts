import Button from './components/button';
import { Timer, TimerType, TimerStatus } from './timer';

interface ColorTons {
  primaryColor: string;
  colorLight1: string;
  colorLight2: string;
}

class BasicTimer {
  protected timer: Timer;
  protected hostElement: HTMLElement;
  protected sectionTimerEl!: HTMLElement;
  protected timerTextEl!: HTMLParagraphElement;
  protected startPauseButton!: Button;
  protected restartEl!: HTMLSpanElement;
  protected boundFnStartHandler: () => void;
  protected boundFnPauseHandler: () => void;
  protected boundFnRestartHandler: () => void;
  private _colorTheme!: ColorTons;
  private _divForButtonsFunctionality!: HTMLDivElement;

  constructor(
    hostElementId: string,
    color: string | ColorTons,
    min: number,
    sec: number,
    timerType: TimerType
  ) {
    this.hostElement = document.getElementById(hostElementId) as HTMLElement;
    this.timer = new Timer(min, sec, timerType);
    this.timer.setCallbackOnTick(this.onTick.bind(this));
    this.colorTheme = color;
    this.boundFnStartHandler = this.startHandler.bind(this);
    this.boundFnPauseHandler = this.pauseHandler.bind(this);
    this.boundFnRestartHandler = this.restartHandler.bind(this);
    this.createElements();
    this.appendElements();
    this.customiseElements();
  }

  set colorTheme(primaryColor: string | ColorTons) {
    if (typeof primaryColor === 'string') {
      this._colorTheme = {
        primaryColor: primaryColor,
        colorLight1: primaryColor.replace(')', ', 0.77)'),
        colorLight2: primaryColor.replace(')', ', 0.21)'),
      };
    } else {
      this._colorTheme = primaryColor;
    }
  }

  get colorTheme(): ColorTons {
    return this._colorTheme;
  }

  startHandler(): void {
    this.timerTextEl.textContent = this.timer.displayTime;
    this.startPauseButton.removeEventListener(
      'click',
      this.boundFnStartHandler
    );
    this.startPauseButton.textContent = 'Pause';
    this.timer.start();
    this.startPauseButton.addEventListener('click', this.boundFnPauseHandler);
  }

  restartHandler(): void {
    this.timer.restart();
    this.timerTextEl.textContent = this.timer.displayTime;
    this.startPauseButton.textContent = 'Pause';
    this.startPauseButton.removeEventListener(
      'click',
      this.boundFnRestartHandler
    );
    this.startPauseButton.removeEventListener(
      'click',
      this.boundFnStartHandler
    );
    this.startPauseButton.addEventListener('click', this.boundFnPauseHandler);
  }

  pauseHandler(): void {
    this.startPauseButton.removeEventListener(
      'click',
      this.boundFnPauseHandler
    );
    this.timer.pause();
    this.startPauseButton.textContent = 'Resume';
    this.startPauseButton.addEventListener('click', this.boundFnStartHandler);
  }

  private createElements(): void {
    this.sectionTimerEl = document.createElement('section');
    this.timerTextEl = document.createElement('p');
    this.startPauseButton = document.createElement('zk-button') as Button;
    this._divForButtonsFunctionality = document.createElement('div');
    this.restartEl = document.createElement('span');
    this.restartEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><g transform="translate(16 0) scale(-1 1)"><path fill="white" fill-rule="evenodd" d="M12.75 8a4.5 4.5 0 0 1-8.61 1.834l-1.391.565A6.001 6.001 0 0 0 14.25 8A6 6 0 0 0 3.5 4.334V2.5H2v4l.75.75h3.5v-1.5H4.352A4.5 4.5 0 0 1 12.75 8z" clip-rule="evenodd"/></g></svg>`;
  }

  private appendElements(): void {
    this.hostElement.appendChild(this.sectionTimerEl);
    this._divForButtonsFunctionality.append(
      this.startPauseButton,
      this.restartEl
    );
    this.sectionTimerEl.append(
      this.timerTextEl,
      this._divForButtonsFunctionality
    );
  }

  private customiseElements(): void {
    this._divForButtonsFunctionality.className = 'timer-type';

    this.timerTextEl.textContent = this.timer.displayTime;
    this.timerTextEl.className = 'timer-text';

    this.sectionTimerEl.style.backgroundColor = this.colorTheme.colorLight1;
    this.sectionTimerEl.style.width = '40rem';

    this.startPauseButton.textContent = 'Start';
    this.startPauseButton.setAttribute(
      'background-color',
      this.colorTheme.primaryColor
    );
    this.startPauseButton.setAttribute('button-size', 'big-button');
    this.startPauseButton.addEventListener('click', this.boundFnStartHandler);

    this.restartEl.className = 'restart';
    this.restartEl.addEventListener('click', this.boundFnRestartHandler);
  }

  private onTick(): void {
    this.timerTextEl.textContent = this.timer.displayTime;
    if (this.timer.status === TimerStatus.Finished) {
      this.startPauseButton.textContent = 'Restart';
      this.startPauseButton.removeEventListener(
        'click',
        this.boundFnPauseHandler
      );
      this.startPauseButton.addEventListener(
        'click',
        this.boundFnRestartHandler
      );
    }
  }
}

export { ColorTons, BasicTimer };
