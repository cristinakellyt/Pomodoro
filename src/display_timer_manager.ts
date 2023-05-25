import { TimerStatus, TimerType } from './timer';
import { CreateModal } from './create_modal';
import { DisplayTimerFunctionality } from './display_timer_funcionality';

class DisplayTimerManager extends DisplayTimerFunctionality {
  #selectedBtn!: any;
  #lastBtnClicked!: any;
  #hostElement: HTMLElement;
  #color: string;
  #modalEl;

  constructor(
    hostElementId: string,
    color: string,
    min: number,
    sec: number,
    timerType: TimerType
  ) {
    super(min, sec, timerType);
    this.#hostElement = document.getElementById(hostElementId)! as HTMLElement;
    this.#color = color;

    let modal = new CreateModal(
      'There is a timer running!',
      `The timer will stop if you continue. Are you sure you want to leave?`
    );

    this.#modalEl = modal.modalEl;
    console.log(this.#modalEl);
    this.#appendElements();
    this.#updateUiColor();
    this.#lastBtnClicked.dispatchEvent(new Event('mouseleave'));
    this.#setTimerText();

    this.#hostElement.addEventListener('confirm', this.#confirmModalHandler);
    this.#hostElement.addEventListener('cancel', this.#cancelModalHandler);
    // console.log(super.elementObj);
    // console.log(super.pauseHandler());
    // console.log(super.elementObj.btnLongBreak);
  }

  #appendElements() {
    this.element.sectionTimerEl.appendChild(this.element.timerTypesEl);
    this.element.sectionTimerEl.appendChild(this.element.timerTextEl);
    this.element.sectionTimerEl.appendChild(this.element.progressBar);
    this.#hostElement.appendChild(this.element.sectionTimerEl);
    this.#hostElement.appendChild(this.#modalEl);
    this.#selectedBtn = this.element.btnFocusTimer;
    this.#lastBtnClicked = this.element.btnFocusTimer;

    this.element.buttons.forEach((btn: any) => {
      if (btn === this.element.btnStartPause) {
        this.element.sectionTimerEl.appendChild(btn);
      } else {
        this.element.timerTypesEl.appendChild(btn);
      }
      this.#customiseTimerTypesButtons(btn);
    });
  }

  #customiseTimerTypesButtons(btn: HTMLElement) {
    if (btn === this.element.btnStartPause) {
      btn.setAttribute('button-size', 'big-button');
    } else {
      btn.addEventListener('mouseover', this.#mouseHoverColorHandler);
      btn.addEventListener('mouseleave', this.#mouseLeaveColorHandler);
      btn.addEventListener('click', this.#checkTimerStatusHandler);
      btn.setAttribute('background-color', 'transparent');
    }
  }

  #mouseHoverColorHandler = (event: any) => {
    event.target.setAttribute('background-color', `var(--${this.#color}-dark)`);
  };

  #mouseLeaveColorHandler = (event: any) => {
    event.target.setAttribute('background-color', 'transparent');
  };

  #checkTimerStatusHandler = (event: Event) => {
    if (this.#selectedBtn === event.target) return;
    this.#lastBtnClicked = event.target;

    if (this.timer.status === TimerStatus.Running) {
      this.pauseHandler();
      this.#showModal();
      return;
    } else if (this.timer.status === TimerStatus.Paused) {
      this.element.btnStartPause.removeEventListener(
        'click',
        this.pauseHandler
      );
      clearInterval(this.timerId);
      this.#showModal();
      return;
    }

    this.#selectedBtn = this.#lastBtnClicked;
    this.#setCurrentTimeAndColor();
    this.#updateUiColor();
  };

  #showModal() {
    this.#modalEl.setAttribute('color-dark', `var(--${this.#color}-light)`);
    this.#modalEl.setAttribute(
      'color-light',
      `var(--${this.#color}-very-light)`
    );
    // this.#modalEl.show();
  }

  #updateUiColor = () => {
    this.#hostElement.style.backgroundColor = `var(--${
      this.#color
    }-very-light)`;
    this.element.sectionTimerEl.style.backgroundColor = `var(--${
      this.#color
    }-light)`;
    this.element.btnStartPause.setAttribute(
      'background-color',
      `var(--${this.#color}-dark)`
    );
    this.element.progressBar.setAttribute(
      'backdrop-color',
      `var(--${this.#color}-dark)`
    );
    this.#lastBtnClicked.setAttribute(
      'background-color',
      `var(--${this.#color}-dark)`
    );
  };

  #setCurrentTimeAndColor() {
    this.element.btnStartPause.removeEventListener('click', this.startHandler);

    if (this.#selectedBtn === this.element.btnFocusTimer) {
      this.timer.setMinSec(25, 0);
      this.#color = 'red';
    } else if (this.#selectedBtn === this.element.btnShortBreak) {
      this.timer.setMinSec(0, 5);
      this.#color = 'teal';
    } else if (this.#selectedBtn === this.element.btnLongBreak) {
      this.timer.setMinSec(10, 0);
      this.#color = 'indigo';
    }

    if (this.element.btnStartPause.textContent !== 'Start') {
      this.element.btnStartPause.textContent = 'Start';
    }

    this.element.progressBar.setAttribute('progress', '0');

    this.element.btnStartPause.addEventListener('click', this.startHandler);
    this.#setTimerText();
  }

  #setTimerText() {
    this.element.timerTextEl.textContent = this.timer.displayTime;
  }

  #confirmModalHandler = () => {
    this.stop();
    this.#selectedBtn = this.#lastBtnClicked;
    this.#setCurrentTimeAndColor();
    this.#updateUiColor();
    this.#lastBtnClicked.dispatchEvent(new Event('mouseleave'));
  };

  #cancelModalHandler = () => {
    this.startHandler();
  };
}

// class CountUp extends DisplayTimerFunctionality {
//   hostElemenet;

//   constructor(hostElemenetID: string) {
//     super(1, 0, TimerType.Countup);
//     this.hostElemenet = document.getElementById(hostElemenetID)! as HTMLElement;
//     // super.element.btnFocusTimer.setAttribute('button-size', 'transparent');
//     this.appendElements();
//     this.customiseElements();
//   }

//   appendElements() {
//     this.hostElemenet.appendChild(super.element.timerTypesEl);
//     super.element.timerTypesEl.appendChild(super.element.btnFocusTimer);
//     this.hostElemenet.appendChild(super.element.timerTextEl);
//     this.hostElemenet.appendChild(super.element.btnStartPause);
//     super.element.timerTextEl.textContent = this.timer.displayTime;
//   }

//   customiseElements() {
//     super.element.btnFocusTimer.textContent = 'Cronometro';
//     super.element.btnFocusTimer.addEventListener(
//       'click',
//       this.changeFunctionality
//     );
//   }

//   changeFunctionality = () => {
//     if (
//       super.timer.status === TimerStatus.Running ||
//       super.timer.status === TimerStatus.Paused
//     ) {
//       this.stop();
//       super.element.btnStartPause.removeEventListener(
//         'click',
//         this.pauseHandler
//       );
//       super.element.btnStartPause.addEventListener('click', this.startHandler);
//       super.element.btnStartPause.textContent = 'Start';
//     }

//     if (super.timer.timerType === TimerType.Countup) {
//       super.element.btnFocusTimer.textContent = 'Timer';
//       super.timer.timerType = TimerType.Countdown;
//       super.timer.setMinSec(1, 0);
//       super.element.timerTextEl.textContent = this.timer.displayTime;
//     } else if (super.timer.timerType === TimerType.Countdown) {
//       super.element.btnFocusTimer.textContent = 'Cronometro';
//       super.timer.timerType = TimerType.Countup;
//       super.timer.setMinSec(1, 0);
//       super.element.timerTextEl.textContent = this.timer.displayTime;
//     }
//   };
// }

// new CountUp('countup-watch');

export { DisplayTimerManager };
