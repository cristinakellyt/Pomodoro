import { uiTimer } from './timer_ui.js';

const main = document.getElementById('main');

let pomodoro = new uiTimer(main, 'red');
pomodoro.render();
