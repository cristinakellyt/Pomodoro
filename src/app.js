import './../assets/sass/main.scss';
import { UiTimer } from './timer_ui.js';
import { ProgressBar } from './progress_bar.js';
import { Modal } from './modal.js';

customElements.define('progress-bar', ProgressBar);
customElements.define('modal-container', Modal);

const main = document.getElementById('main');

new UiTimer(main, 'red');
