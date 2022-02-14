import { createStore } from 'effector';
import * as events from '../event';

export const $stateCropPoint = createStore<boolean>(false).on(events.setActiveChangeSettings, (_, active) => active);
