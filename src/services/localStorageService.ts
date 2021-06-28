import { convertFilesInBase64Items } from './base64Service';

export const saveDataInLocalStorage = (localName: string, data: any, type = "string"): void => {
  if (type === 'files') {
    const convertedDataToBase64 = convertFilesInBase64Items(data);
    convertedDataToBase64.then((results: string[]) => {
      console.log('results', results);
      saveData(localName, results);
    }
    );
  } else {
    saveData(localName, data);

  }

};

const saveData = (localName: string, data: any) => {
  const convertedDataToString = JSON.stringify(data);
  localStorage.setItem(localName, convertedDataToString);
};
