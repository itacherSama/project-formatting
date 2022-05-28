import { IInfoImg, PossibleStringType } from 'interfaces/interfaces';
import { convertFilesInBase64Items } from './base64Service';

export const saveDataInLocalStorage = <T>(localName: string, data: Array<T>) => {
  if (data.length) {
    const convertedDataToString = JSON.stringify(data);
    localStorage.setItem(localName, convertedDataToString);
  }
};

export const convertAndSaveDataInLocalStorage = (localName: string, data: Array<IInfoImg>): void => {
  const convertedDataToBase64 = convertFilesInBase64Items(data);
  convertedDataToBase64.then((results: PossibleStringType[]) => {
    saveDataInLocalStorage<PossibleStringType>(localName, results);
  });
};
