import * as effects from 'effector/effect';
import * as events from 'effector/event';
import { getValueLS } from 'utils/differentFunc';
import { guard, restore } from 'effector-logger';
import { localStorageInit } from 'effector/event';
import { $loadState } from './store';

export const initLocalStorage = (): void => {
  getValueLS('images', effects.fetchImagesFx);
  getValueLS('settingForKitsImages', events.fetchSettingsForImages);
};

guard({
  clock: $loadState,
  filter: (values: any) => {
    console.log('values111', values);
    return true;
  } /* 2 */,

  target: localStorageInit /* 4 */,
});
