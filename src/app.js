import './../assets/sass/main.scss';
import { UiTimer } from './timer_ui.js';
import { ProgressBar } from './progress_bar.js';

customElements.define('progress-bar', ProgressBar);

const main = document.getElementById('main');

new UiTimer(main, 'red');
