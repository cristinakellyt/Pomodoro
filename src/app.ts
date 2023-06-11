import './../assets/sass/main.scss';
import ProgressBar from './components/progress_bar';
import Modal from './components/modal';
import Button from './components/button';
import { TimerType } from './timer';
import { BasicTimer } from './basic_timer';
import TimerWithProgressBar from './timer_with_progress_bar';
import Pomodoro from './pomodoro';

customElements.define('zk-progress-bar', ProgressBar);
customElements.define('zk-modal-container', Modal);
customElements.define('zk-button', Button);

const DEFAULT_COLORS = {
  red: 'rgb(198, 71, 71)',
  teal: 'rgb(0,150,136)',
  indigo: 'rgb(94,113,218)',
};

new BasicTimer('main', DEFAULT_COLORS.indigo, 0, 10, TimerType.Countdown);

new TimerWithProgressBar(
  'main',
  DEFAULT_COLORS.indigo,
  0,
  5,
  TimerType.Countdown
);

new Pomodoro('main', DEFAULT_COLORS.teal, 0, 15, TimerType.Countdown);

export { DEFAULT_COLORS };
