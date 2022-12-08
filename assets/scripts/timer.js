const focusTimer = document.getElementById('focus-timer');
const shortBreak = document.getElementById('short-break');
const longBreak = document.getElementById('long-break');
const allTimerTypes = document.querySelectorAll('.timer-type h2');
const allTimerType = document.querySelector('.timer-type');
const countdown = document.querySelector('.countdown');
const btnStart = document.getElementById('btn-start');
let minutes = 25;
let seconds = 0;

function setCountdown(min, sec) {
  minutes = min < 10 ? '0' + min : min;
  seconds = sec < 10 ? '0' + sec : sec;
  countdown.textContent = `${minutes}:${seconds}`;
}

setCountdown(minutes, seconds);

function changeColorHandler(color, allTimerTypes, min, sec, event) {
  const main = document.getElementById('main');
  const sectionTimer = document.getElementById('section-timer');

  main.style.backgroundColor = `var(--${color}-light)`;
  sectionTimer.style.backgroundColor = `var(--${color}-accent-light)`;
  btnStart.style.backgroundColor = `var(--${color}-accent)`;
  event.target.style.backgroundColor = `var(--${color}-primary)`;

  setCountdown(min, sec);

  allTimerTypes.forEach((element) => {
    element.addEventListener(
      'mouseover',
      () => (element.style.backgroundColor = `var(--${color}-primary`)
    );

    element.addEventListener(
      'mouseleave',
      () => (element.style.backgroundColor = 'transparent')
    );
  });
}

function startTimer() {
  minutes = Number(minutes);
  seconds = Number(seconds);

  let timerTotal = minutes * 60 + seconds;

  let timer = setInterval(() => {
    timerTotal--;
    if (timerTotal <= 0) {
      clearInterval(timer);
    }
    minutes = parseInt(timerTotal / 60);
    seconds = parseInt(timerTotal % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdown.textContent = minutes + ':' + seconds;
  }, 1000);
}

shortBreak.addEventListener(
  'click',
  changeColorHandler.bind(this, 'teal', allTimerTypes, 0, 10)
);

longBreak.addEventListener(
  'click',
  changeColorHandler.bind(this, 'indigo', allTimerTypes, 15, 00)
);

focusTimer.addEventListener(
  'click',
  changeColorHandler.bind(this, 'red', allTimerTypes, 25, 00)
);
btnStart.addEventListener('click', startTimer);
