import './../assets/sass/main.scss';
import Timer from './timer.js';
import DisplayTimerManager from './display_timer_manager.js';
import { ProgressBar } from './progress_bar.js';
import { Modal } from './modal.js';
import { Button } from './button.js';

customElements.define('progress-bar', ProgressBar);
customElements.define('modal-container', Modal);
customElements.define('zk-button', Button);

new DisplayTimerManager('main', 'red', 25, 0, Timer.types.countdown);
