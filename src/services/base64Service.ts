import { IInfoImg } from '../interfaces/items';

export const convertFromBase64 = (el: any, idx: number) => fetch(el)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], `${idx.toString()}.jpg`, { type: 'image/jpg' });
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      return newFile;
    });

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertBase64ItemsInFiles = (items: string[]) => {
  const promiseArr = items.map((el: any, idx: number) => convertFromBase64(el, idx));

  const arrItems: any[] = [];

  return Promise.allSettled(promiseArr).then((results: any) => {
    // console.log('promise res', results);

    results.forEach((result: any) => {
      // console.log('promise item', result);

      arrItems.push(result.value);
    });

    return arrItems;
  });
};

export const convertFilesInBase64Items = (items: IInfoImg[]): Promise<string[]> => {
  const promiseArr = items.map((el: any) => toBase64(el));

  const arrItems: any[] = [];

  return Promise.allSettled(promiseArr).then((results: any) => {
    results.forEach((result: any) => {
      arrItems.push(result.value);
    });

    return Promise.resolve(arrItems);
  });
};
