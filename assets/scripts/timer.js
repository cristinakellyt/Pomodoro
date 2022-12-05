const focusTimer = document.getElementById('focus-timer');
const shortBreak = document.getElementById('short-break');
const longBreak = document.getElementById('long-break');
const allTimerTypes = document.querySelectorAll('.timer-type h2');

function changeColorHandler(color, allTimerTypes, time, event) {
  const main = document.getElementById('main');
  const sectionTimer = document.getElementById('section-timer');
  const btnStart = document.getElementById('btn');
  const countdown = document.querySelector('.countdown');

  main.style.backgroundColor = `var(--${color}-light)`;
  sectionTimer.style.backgroundColor = `var(--${color}-accent-light)`;
  btnStart.style.backgroundColor = `var(--${color}-accent)`;
  countdown.textContent = time;
  event.target.style.backgroundColor = `var(--${color}-primary)`;
  console.log(event);

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

shortBreak.addEventListener(
  'click',
  changeColorHandler.bind(this, 'teal', allTimerTypes, '5:00')
);

longBreak.addEventListener(
  'click',
  changeColorHandler.bind(this, 'indigo', allTimerTypes, '15:00')
);

focusTimer.addEventListener(
  'click',
  changeColorHandler.bind(this, 'red', allTimerTypes, '25:00')
);
