import './../assets/sass/main.scss';
import { TimerType } from './timer';
import { DisplayTimerManager } from './display_timer_manager';
import { ProgressBar } from './progress_bar';
import { Modal } from './modal';
import { Button } from './button';

customElements.define('progress-bar', ProgressBar);
customElements.define('modal-container', Modal);
customElements.define('zk-button', Button);

new DisplayTimerManager('main', 'red', 25, 0, TimerType.Countdown);
