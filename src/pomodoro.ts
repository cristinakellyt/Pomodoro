import TimerWithProgressBar from './timer_with_progress_bar';
import { TimerType, TimerStatus } from './timer';
import { DEFAULT_COLORS } from './app';
import { ColorTons } from './basic_timer';
import ModalComponent from './components/modal';
import ButtonComponent from './components/button';
import SettingsModal from './components/settings';
import iconSetting from './../assets/images/settings-icon.svg';

class Pomodoro extends TimerWithProgressBar {
  private _btnFocusTimer!: ButtonComponent;
  private _btnShortBreak!: ButtonComponent;
  private _btnLongBreak!: ButtonComponent;
  private _selectedBtn!: ButtonComponent;
  private _lastBtnClicked!: ButtonComponent;
  private _modal!: ModalComponent;
  private _settingsModalEl!: SettingsModal;
  private _enteredFocusMin!: number;
  private _enteredShortBreakMin!: number;
  private _enteredLongBreakMin!: number;
  private _isSettingClicked!: boolean;

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
    this.createModalSettings();

    const _settingIconContainer = document.createElement(
      'span'
    ) as HTMLSpanElement;
    _settingIconContainer.className = 'setting-icon';

    const settingImg = document.createElement('img') as HTMLImageElement;
    settingImg.setAttribute('src', iconSetting);
    settingImg.setAttribute('alt', 'settings');
    _settingIconContainer.appendChild(settingImg);

    this.sectionTimerEl.append(_settingIconContainer);
    _settingIconContainer.addEventListener('click', this.settingsHandler);
  }

  private createButtons() {
    const timerTypesDiv = document.createElement('div') as HTMLDivElement;
    timerTypesDiv.className = 'utilitie__flex-wrap-3gap';
    this.sectionTimerEl.insertAdjacentElement('afterbegin', timerTypesDiv);
    this.sectionTimerEl.style.width = 'fit-content';

    let buttons = [];
    this._btnFocusTimer = document.createElement(
      'zk-button'
    ) as ButtonComponent;
    this._btnFocusTimer.textContent = 'Focus Time';
    this._selectedBtn = this._btnFocusTimer;
    this._lastBtnClicked = this._btnFocusTimer;

    this._btnShortBreak = document.createElement(
      'zk-button'
    ) as ButtonComponent;
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
    btn.addEventListener('click', this.manageTimerStatusHandler);
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

  private manageTimerStatusHandler = (event: Event) => {
    if (this._selectedBtn === event.target) return;
    this._lastBtnClicked = event.target as ButtonComponent;

    if (
      this.timer.status === TimerStatus.Running ||
      this.timer.status === TimerStatus.Paused
    ) {
      this.checkStatus();
      return;
    }

    this._selectedBtn = this._lastBtnClicked;
    this.setCurrentTimeAndColor();
    this.updateUiColor();
  };

  private checkStatus = () => {
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
  };

  private setCurrentTimeAndColor() {
    this.startPauseButton.removeEventListener(
      'click',
      this.boundFnStartHandler
    );

    if (this._selectedBtn === this._btnFocusTimer) {
      this.timer.setMinSec(this._enteredFocusMin ?? 25, 0);
      this.colorTheme = DEFAULT_COLORS.red;
    } else if (this._selectedBtn === this._btnShortBreak) {
      this.timer.setMinSec(this._enteredShortBreakMin ?? 5, 0);
      this.colorTheme = DEFAULT_COLORS.teal;
    } else if (this._selectedBtn === this._btnLongBreak) {
      this.timer.setMinSec(this._enteredLongBreakMin ?? 10, 0);
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
    this._modal = document.createElement(
      'zk-modal-container'
    ) as ModalComponent;
    this._modal.style.color = 'rgb(73, 26, 26)';

    const title = document.createElement('h2') as HTMLHeadingElement;
    title.textContent = 'There is a timer running!';

    title.setAttribute('slot', 'title');

    const subtitle = document.createElement('p') as HTMLParagraphElement;
    subtitle.textContent = `The timer will reset if you continue. Are you sure you want to leave?`;
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
    if (this._isSettingClicked) {
      this.showSettingModal();
    }
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

  private createModalSettings = () => {
    this._settingsModalEl = document.createElement(
      'zk-settings-modal'
    ) as SettingsModal;
    this._settingsModalEl.addEventListener(
      'confirmSettings',
      this.updateUserSettingHandler
    );
    this.hostElement.append(this._settingsModalEl);
  };

  private updateUserSettingHandler = () => {
    const values = this._settingsModalEl.userMinutes;

    this._enteredFocusMin = values.focusTimeMin;
    this._enteredShortBreakMin = values.shortBreakMin;
    this._enteredLongBreakMin = values.longBreakMin;

    this._settingsModalEl.setAttribute(
      'focus-time',
      `${this._enteredFocusMin}` ?? '25'
    );
    this._settingsModalEl.setAttribute(
      'short-break',
      `${this._enteredShortBreakMin}` ?? '5'
    );
    this._settingsModalEl.setAttribute(
      'long-break',
      `${this._enteredLongBreakMin}` ?? '10'
    );

    this.setCurrentTimeAndColor();
  };

  private settingsHandler = () => {
    this._isSettingClicked = true;
    if (
      this.timer.status !== TimerStatus.Running &&
      this.timer.status !== TimerStatus.Paused
    ) {
      this.showSettingModal();
      return;
    }
    this.checkStatus();
  };

  private showSettingModal = () => {
    this._isSettingClicked = false;
    this._settingsModalEl.show();
  };
}

export default Pomodoro;
