import * as effects from 'effector/effect';
import * as events from 'effector/event';
import { getValueLS } from 'utils/differentFunc';
import { guard } from 'effector-logger';
import { localStorageInit } from 'effector/event';
import { $loadState } from './store';
import { ILoadState } from '../interfaces/interfaces';

export const initLocalStorage = (): void => {
  getValueLS('images', effects.fetchImagesFx);
  getValueLS('settingForKitsImages', events.fetchSettingsForImages);
};

guard({
  clock: $loadState,
  filter: (values: ILoadState) => {
    return values.settings && values.images;
  },
  target: localStorageInit,
});
