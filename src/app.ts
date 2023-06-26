import './sass/main.scss';
import ProgressBar from './components/progress_bar';
import Modal from './components/modal';
import Button from './components/button';
import { TimerType } from './timer';
import Pomodoro from './pomodoro';
import SettingsModal from './components/settings';

customElements.define('zk-progress-bar', ProgressBar);
customElements.define('zk-modal-container', Modal);
customElements.define('zk-button', Button);
customElements.define('zk-settings-modal', SettingsModal);

const DEFAULT_COLORS = {
  red: 'rgb(198, 71, 71)',
  teal: 'rgb(0,150,136)',
  indigo: 'rgb(94,113,218)',
};

new Pomodoro('main', DEFAULT_COLORS.red, 25, 0, TimerType.Countdown);

export { DEFAULT_COLORS };
