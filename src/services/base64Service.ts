import { PossibleStringType, IInfoImg } from '../interfaces/items';

export const convertFromBase64 = (el: string, idx: number): Promise<IInfoImg> => fetch(el)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], `${idx.toString()}.jpg`, { type: 'image/jpg' });

      return  {
        infoByFile: file,
        preview: URL.createObjectURL(file),
      };
    });

export const toBase64 = (file: IInfoImg): Promise<PossibleStringType> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.infoByFile);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
  });

export const convertBase64ItemsInFiles = (items: string[]): Promise<IInfoImg[]> => {
  const promiseArr = items.map((el: string, idx: number) => convertFromBase64(el, idx));

  const arrItems: IInfoImg[] = [];

  return Promise.allSettled(promiseArr).then((results: PromiseSettledResult<IInfoImg>[]) => {
    results.forEach((result: PromiseSettledResult<IInfoImg>) => {
      if (result.status === 'fulfilled') {
        arrItems.push(result.value);
      }
    });

    return arrItems;
  });
};

export const convertFilesInBase64Items = (items: IInfoImg[]): Promise<PossibleStringType[]> => {
  const promiseArr = items.map((el: IInfoImg) => toBase64(el));

  const arrItems: PossibleStringType[] = [];

  return Promise.allSettled(promiseArr).then((results: PromiseSettledResult<PossibleStringType>[]) => {
    results.forEach((result: PromiseSettledResult<PossibleStringType>) => {
      if (result.status === 'fulfilled') {
        arrItems.push(result.value);
      }
    });

    return Promise.resolve(arrItems);
  });
};
