import * as effects from '@effector/effect';
import * as events from '@effector/event';
import { getValueLS } from '@utils/differentFunc';

export const initLocalStorage = () => {
  console.log('start init');
  getValueLS('images', effects.fetchImagesFx);
  getValueLS('settingForKitsImages', effects.fetchSettingsForImagesFx);
  events.setLocalStorageInit();
};
