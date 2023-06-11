import TimerWithProgressBar from './timer_with_progress_bar';
import { TimerType, TimerStatus } from './timer';
import { DEFAULT_COLORS } from './app';
import { ColorTons } from './basic_timer';
import ModalComponent from './components/modal';
import ButtonComponent from './components/button';

class Pomodoro extends TimerWithProgressBar {
  private _btnFocusTimer!: ButtonComponent;
  private _btnShortBreak!: ButtonComponent;
  private _btnLongBreak!: ButtonComponent;
  private _selectedBtn!: ButtonComponent;
  private _lastBtnClicked!: ButtonComponent;
  private _modal!: ModalComponent;

  constructor(
    hostElementId: string,
    color: string | ColorTons,
    min: number,
    sec: number,
    timerType: TimerType
  ) {
    super(hostElementId, color, min, sec, timerType);
    this.hostElement.style.backgroundColor = this.colorTheme.colorLight2;
    this.createModal();
    this.createButtons();
  }

  private createButtons() {
    const timerTypesDiv = document.createElement('div') as HTMLDivElement;
    timerTypesDiv.className = 'timer-type';
    this.sectionTimerEl.insertAdjacentElement('afterbegin', timerTypesDiv);
    this.sectionTimerEl.style.width = 'fit-content';

    let buttons = [];
    this._btnFocusTimer = document.createElement('zk-button') as ButtonComponent;
    this._btnFocusTimer.textContent = 'Focus Time';
    this._selectedBtn = this._btnFocusTimer;
    this._lastBtnClicked = this._btnFocusTimer;

    this._btnShortBreak = document.createElement('zk-button') as ButtonComponent;
    this._btnShortBreak.textContent = 'Short Break';

    this._btnLongBreak = document.createElement('zk-button') as ButtonComponent;
    this._btnLongBreak.textContent = 'Long Break';
    buttons.push(this._btnFocusTimer, this._btnShortBreak, this._btnLongBreak);

    buttons.forEach((btn) => {
      timerTypesDiv.appendChild(btn);
      this.customiseButtons(btn);
    });
  }

  private customiseButtons(btn: ButtonComponent) {
    btn.addEventListener('mouseover', this.mouseHoverColorHandler);
    btn.addEventListener('mouseleave', this.mouseLeaveColorHandler);
    btn.addEventListener('click', this.checkTimerStatusHandler);
    btn.setAttribute('background-color', 'transparent');
  }

  private mouseHoverColorHandler = (event: MouseEvent) => {
    if (event) {
      (event.target as HTMLElement).setAttribute(
        'background-color',
        this.colorTheme.primaryColor
      );
    }
  };

  private mouseLeaveColorHandler = (event: MouseEvent) => {
    if (event) {
      (event.target as HTMLElement).setAttribute(
        'background-color',
        'transparent'
      );
    }
  };

  private checkTimerStatusHandler = (event: Event) => {
    if (this._selectedBtn === event.target) return;
    this._lastBtnClicked = event.target as ButtonComponent;

    if (this.timer.status === TimerStatus.Running) {
      super.pauseHandler();
      this.showModal();
      return;
    } else if (this.timer.status === TimerStatus.Paused) {
      this.startPauseButton.removeEventListener(
        'click',
        this.boundFnPauseHandler
      );
      this.showModal();
      return;
    }

    this._selectedBtn = this._lastBtnClicked;
    this.setCurrentTimeAndColor();
    this.updateUiColor();
  };

  private setCurrentTimeAndColor() {
    this.startPauseButton.removeEventListener(
      'click',
      this.boundFnStartHandler
    );

    if (this._selectedBtn === this._btnFocusTimer) {
      this.timer.setMinSec(25, 0);
      this.colorTheme = DEFAULT_COLORS.red;
    } else if (this._selectedBtn === this._btnShortBreak) {
      this.timer.setMinSec(0, 5);
      this.colorTheme = DEFAULT_COLORS.teal;
    } else if (this._selectedBtn === this._btnLongBreak) {
      this.timer.setMinSec(10, 0);
      this.colorTheme = DEFAULT_COLORS.indigo;
    }

    if (this.startPauseButton.textContent !== 'Start') {
      this.startPauseButton.textContent = 'Start';
    }

    this.progressBar.setAttribute('progress', '0');

    this.startPauseButton.addEventListener('click', this.boundFnStartHandler);
    this.timerTextEl.textContent = this.timer.displayTime;
  }

  private updateUiColor = () => {
    this.hostElement.style.backgroundColor = this.colorTheme.colorLight2;
    this.sectionTimerEl.style.backgroundColor = this.colorTheme.colorLight1;
    this.startPauseButton.setAttribute(
      'background-color',
      this.colorTheme.primaryColor
    );
    this.progressBar.setAttribute(
      'backdrop-color',
      this.colorTheme.primaryColor
    );
    this._lastBtnClicked.setAttribute(
      'background-color',
      this.colorTheme.primaryColor
    );
  };

  private createModal() {
    this._modal = document.createElement('zk-modal-container') as ModalComponent;
    this._modal.style.color = 'rgb(73, 26, 26)';

    const title = document.createElement('h2') as HTMLHeadingElement;
    title.textContent = 'There is a timer running!';

    title.setAttribute('slot', 'title');

    const subtitle = document.createElement('p') as HTMLParagraphElement;
    subtitle.textContent = `The timer will stop if you continue. Are you sure you want to leave?`;
    subtitle.setAttribute('slot', 'subtitle');

    this._modal.append(title, subtitle);
    this.sectionTimerEl.appendChild(this._modal);

    this._modal.addEventListener('confirm', this.confirmModalHandler);
    this._modal.addEventListener('cancel', this.cancelModalHandler);
  }

  private showModal() {
    this._modal.setAttribute('color-dark', this.colorTheme.colorLight1);
    this._modal.setAttribute('color-light', this.colorTheme.colorLight2);
    this._modal.show();
  }

  private confirmModalHandler = () => {
    this.stop();
    this._selectedBtn = this._lastBtnClicked;
    this.setCurrentTimeAndColor();
    this.updateUiColor();
    this._lastBtnClicked.dispatchEvent(new Event('mouseleave'));
  };

  private cancelModalHandler = () => {
    super.startHandler();
  };

  private stop() {
    console.log('stop ui');
    this.timer.stop();
    this.progressBar.setAttribute('progress', '0');
    this.timerTextEl.textContent = this.timer.displayTime;
  }
}

export default Pomodoro;
