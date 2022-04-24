import * as effects from '@effector/effect';
import * as events from '@effector/event';
import { getValueLS } from '@utils/differentFunc';

export const initLocalStorage = () => {
  getValueLS('images', effects.fetchImagesFx);
  getValueLS('settingForKitsImages', events.fetchSettingsForImages);
  // events.localStorageInit();
};
