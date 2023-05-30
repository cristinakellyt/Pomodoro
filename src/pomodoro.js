import TimerWithProgressBar from './timer_with_progress_bar.js';
import Timer from './timer.js';
import { defaultColors } from './app.js';

class Pomodoro extends TimerWithProgressBar {
  #btnFocusTimer;
  #btnShortBreak;
  #btnLongBreak;
  #selectedBtn;
  #lastBtnClicked;
  #modal;

  constructor(hostElementId, color, min, sec, timerType) {
    super(hostElementId, color, min, sec, timerType);
    this.#createModal();
    this.#createButtons();
  }
  #createButtons() {
    const timerTypesDiv = document.createElement('div');
    timerTypesDiv.className = 'timer-type';
    this.timerContainerEl.insertAdjacentElement('afterbegin', timerTypesDiv);
    this.timerContainerEl.style.width = 'fit-content';

    let buttons = [];
    this.#btnFocusTimer = document.createElement('zk-button');
    this.#btnFocusTimer.textContent = 'Focus Time';
    this.#selectedBtn = this.#btnFocusTimer;
    this.#lastBtnClicked = this.#btnFocusTimer;

    this.#btnShortBreak = document.createElement('zk-button');
    this.#btnShortBreak.textContent = 'Short Break';

    this.#btnLongBreak = document.createElement('zk-button');
    this.#btnLongBreak.textContent = 'Long Break';
    buttons.push(this.#btnFocusTimer, this.#btnShortBreak, this.#btnLongBreak);

    buttons.forEach((btn) => {
      timerTypesDiv.appendChild(btn);
      this.#customiseButtons(btn);
    });
  }

  #customiseButtons(btn) {
    btn.addEventListener('mouseover', this.#mouseHoverColorHandler);
    btn.addEventListener('mouseleave', this.#mouseLeaveColorHandler);
    btn.addEventListener('click', this.#checkTimerStatusHandler);
    btn.setAttribute('background-color', 'transparent');
  }

  #mouseHoverColorHandler = (event) => {
    event.target.setAttribute('background-color', super.color.primaryColor);
  };

  #mouseLeaveColorHandler = (event) => {
    event.target.setAttribute('background-color', 'transparent');
  };

  #checkTimerStatusHandler = (event) => {
    if (this.#selectedBtn === event.target) return;
    this.#lastBtnClicked = event.target;

    if (this.timer.status === Timer.status.running) {
      super.pauseHandler();
      this.#showModal();
      return;
    } else if (this.timer.status === Timer.status.paused) {
      this.startPauseButton.removeEventListener(
        'click',
        this.boundFnPauseHandler
      );
      this.#showModal();
      return;
    }

    this.#selectedBtn = this.#lastBtnClicked;
    this.#setCurrentTimeAndColor();
    this.#updateUiColor();
    console.log(event);
  };

  #setCurrentTimeAndColor() {
    this.startPauseButton.removeEventListener(
      'click',
      this.boundFnStartHandler
    );

    if (this.#selectedBtn === this.#btnFocusTimer) {
      this.timer.setMinSec(25, 0);
      super.color = defaultColors.red;
    } else if (this.#selectedBtn === this.#btnShortBreak) {
      this.timer.setMinSec(0, 5);
      super.color = defaultColors.teal;
    } else if (this.#selectedBtn === this.#btnLongBreak) {
      this.timer.setMinSec(10, 0);
      super.color = defaultColors.indigo;
    }

    if (this.startPauseButton.textContent !== 'Start') {
      this.startPauseButton.textContent = 'Start';
    }

    this.progressBar.setAttribute('progress', 0);

    this.startPauseButton.addEventListener('click', this.boundFnStartHandler);
    this.timerTextEl.textContent = this.timer.displayTime;
  }

  #updateUiColor = () => {
    this.hostElement.style.backgroundColor = super.color.colorLight2;
    this.timerContainerEl.style.backgroundColor = super.color.colorLight1;
    this.startPauseButton.setAttribute(
      'background-color',
      super.color.primaryColor
    );
    this.progressBar.setAttribute('backdrop-color', super.color.primaryColor);
    this.#lastBtnClicked.setAttribute(
      'background-color',
      super.color.primaryColor
    );
  };

  #createModal() {
    this.#modal = document.createElement('modal-container');
    this.#modal.style.color = 'rgb(73, 26, 26)';

    const title = document.createElement('h2');
    title.textContent = 'There is a timer running!';

    title.setAttribute('slot', 'title');

    const subtitle = document.createElement('p');
    subtitle.textContent = `The timer will stop if you continue. Are you sure you want to leave?`;
    subtitle.setAttribute('slot', 'subtitle');

    this.#modal.appendChild(title);
    this.#modal.appendChild(subtitle);
    this.timerContainerEl.appendChild(this.#modal);

    this.#modal.addEventListener('confirm', this.#confirmModalHandler);
    this.#modal.addEventListener('cancel', this.#cancelModalHandler);
  }

  #showModal() {
    this.#modal.setAttribute('color-dark', super.color.colorLight1);
    this.#modal.setAttribute('color-light', super.color.colorLight2);
    this.#modal.show();
  }

  #confirmModalHandler = () => {
    this.#stop();
    this.#selectedBtn = this.#lastBtnClicked;
    this.#setCurrentTimeAndColor();
    this.#updateUiColor();
    this.#lastBtnClicked.dispatchEvent(new Event('mouseleave'));
  };

  #cancelModalHandler = () => {
    super.startHandler();
  };

  #stop() {
    console.log('stop ui');
    this.timer.stop();
    this.progressBar.setAttribute('progress', 0);
    this.timerTextEl.textContent = this.timer.displayTime;
  }
}

export default Pomodoro;
