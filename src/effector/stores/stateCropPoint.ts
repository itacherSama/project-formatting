import { createStore } from 'effector-logger';
import * as events from '../event';

export const $stateCropPoint = createStore<boolean>(false).on(events.setActiveChangeSettings, (_, active) => active);
