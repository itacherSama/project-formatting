import { convertFilesInBase64Items } from './base64Service';

const nameItems = ['images', 'settingForKitsImages'];

export const saveDataInLocalStorage = (localName: string, data: any, saveFunc: any): void => {
  if (localName === nameItems[0]) {
    const convertedDataToBase64 = convertFilesInBase64Items(data);
    convertedDataToBase64.then((results: string[]) => {
      saveFunc(results);
    }
    );
  } else {
    saveFunc(data);

  }

};

const saveData = (localName: string, data: any) => {
  const convertedDataToString = JSON.stringify(data);
  localStorage.setItem(localName, convertedDataToString);
};