import { IobjImg, IImageAndPoint } from '../interfaces/items';
import { convertBase64ItemsInFiles, convertFilesInBase64Items } from './base64Service';
import { generateImagesBySettings } from './imageService';

const nameItems = ['images', 'settingForKitsImages'];

export const getLocalItems = (localName: string, setItems: any): void => {
  const items: any[] = JSON.parse(<string>localStorage.getItem(localName));
  if (!items) return;
  if (Array.isArray(items) && items.length === 0) return;
  if (localName === nameItems[0]) {
    // convertBase64ItemsInFiles(items, setItems);
  } else if (localName === nameItems[1]) {
    console.log(items);
    
    setItems(items);
  }
};

export const saveDataInLocalStorage = (localName: string, data: any, saveFunc: any): void => {
  if (localName === nameItems[0]) {
    const convertedDataToBase64 = convertFilesInBase64Items(data);
    convertedDataToBase64.then((results: string[]) => {
      saveFunc(results);
    }
    );
  } else if (localName === nameItems[1]) {
    const changedData = data.map((kit: IImageAndPoint) => {
      const kitSettings = kit.images.map((el: IobjImg) => {
        return el.settingImg;
      });
      return {
        point: kit.point,
        kitSettings
      };
    });
    saveFunc(changedData);

  } else {
    saveFunc(data);

  }

};

const saveData = (localName: string, data: any) => {
  const convertedDataToString = JSON.stringify(data);
  localStorage.setItem(localName, convertedDataToString);
};