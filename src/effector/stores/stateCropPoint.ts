import { createStore } from 'effector-logger';
import * as events from '../event';

export const $stateCropPoint = createStore<boolean>(false, {
  name: '$stateCropPoint',
}).on(events.setActiveChangeSettings, (_, active) => {
  console.log('active', active);
  return active;
});
