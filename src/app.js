import { UiTimer } from './timer_ui.js';

const main = document.getElementById('main');

const pomodoro = new UiTimer(main, 'red');
pomodoro.render();
