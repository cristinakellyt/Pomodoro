import './../assets/sass/main.scss';
import { ProgressBar } from './components/progress_bar.js';
import { Modal } from './components/modal.js';
import { Button } from './components/button.js';
import { BasicTimer } from './basic_timer';
import { UiTimer } from './timer_ui.js';
import Timer from './timer.js';

customElements.define('progress-bar', ProgressBar);
customElements.define('modal-container', Modal);
customElements.define('zk-button', Button);

const defaultColors = {
  red: 'rgb(198, 71, 71)',
  teal: 'rgb(0,150,136)',
  indigo: 'rgb(94,113,218)',
};

const main = document.getElementById('main');

new UiTimer(main, 'red');

new BasicTimer('main', defaultColors.indigo, 0, 5, Timer.types.countdown);
