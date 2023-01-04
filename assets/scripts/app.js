import { Timer } from './timer.js';

// const focusTimer = document.getElementById('focus-timer');
// const shortBreak = document.getElementById('short-break');
// const longBreak = document.getElementById('long-break');
// const allTimerTypes = document.querySelectorAll('.timer-type h2');
const countdown = document.querySelector('.countdown');
// const btnStart = document.getElementById('btn-start');
// let minutes = 25;
// let seconds = 0;

function setCountdown() {
  let uiTime = new Timer(0, 10);
  uiTime.start();
  // minutes = min < 10 ? '0' + min : min;
  // seconds = sec < 10 ? '0' + sec : sec;
  setInterval(() => (countdown.textContent = uiTime.getTime())), 1000;

  // console.log(uiTime);
}

setCountdown();

// function changeColorHandler(color, allTimerTypes, min, sec, event) {
//   const main = document.getElementById('main');
//   const sectionTimer = document.getElementById('section-timer');

//   main.style.backgroundColor = `var(--${color}-light)`;
//   sectionTimer.style.backgroundColor = `var(--${color}-accent-light)`;
//   btnStart.style.backgroundColor = `var(--${color}-accent)`;
//   event.target.style.backgroundColor = `var(--${color}-primary)`;

//   setCountdown(min, sec);

//   allTimerTypes.forEach((element) => {
//     element.addEventListener(
//       'mouseover',
//       () => (element.style.backgroundColor = `var(--${color}-primary`)
//     );

//     element.addEventListener(
//       'mouseleave',
//       () => (element.style.backgroundColor = 'transparent')
//     );
//   });
// }

// shortBreak.addEventListener(
//   'click',
//   changeColorHandler.bind(this, 'teal', allTimerTypes, 0, 10)
// );

// longBreak.addEventListener(
//   'click',
//   changeColorHandler.bind(this, 'indigo', allTimerTypes, 15, 00)
// );

// focusTimer.addEventListener(
//   'click',
//   changeColorHandler.bind(this, 'red', allTimerTypes, 25, 00)
// );
