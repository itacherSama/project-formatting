import { IobjIdxKitImages, IobjImg } from '../interfaces/items';

export const findNewCurrentIdx = (state: IobjIdxKitImages, operation: string): IobjIdxKitImages => {
  const newIdx = operation === '-' ? state.idx - 1 : state.idx + 1;

  const hasIdx = (newIdx <= state.maxIdx) && newIdx > -1;
  if (!hasIdx) {
    return state;
  }

  return {
    ...state,
    idx: newIdx,
  };
};

export const convertFromBase64 = (el: any, idx: number) => {
  return fetch(el)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], idx.toString(), { type: 'image/png' });
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      return newFile;
    });
};

export const getLocalItems = (localName: string, setItems: (items: IobjImg[]) => void): void => {
  const items: any[] = JSON.parse(<string>localStorage.getItem(localName));
  if (!items) return;
  const promiseArr = items.map((el: any, idx: number) => {
    return convertFromBase64(el, idx);

  });

  const arrItems: any[] = [];
  Promise.allSettled(promiseArr).then((results: any) => {
    results.forEach((result: any) => {
      arrItems.push(result.value);
    });
    
    setItems(arrItems);
  });
};

export const toBase64 = (file: any) => new Promise((resolve, reject) => {  
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const executeFuncIfNotArray = (item: any, func: (el: any) => any): any => {
  if (Array.isArray(item)) {
    return item.map((el: any) => {
      return executeFuncIfNotArray(el, func);
    });
  } else {
    return func(item);
  }
};

export const saveDataInLocalStorage = (localName: string, data: any) => {
  const newData: any = [];

  const convertedDataToBase64 = executeFuncIfNotArray(data, toBase64);
  Promise.allSettled(convertedDataToBase64).then((results: any) => {
   

    const promisedRes =  results.map((result: any) => {
        // results[0].value[0].then((data: any) => console.log(data));
        return result.value;
    });

    const convertedBase64ToString = JSON.stringify(promisedRes);
    localStorage.setItem(localName, convertedBase64ToString);
  });

};

export const calcAspect = ( width: number, height: number): number | boolean => {
  if (height <= 0 || width <= 0) {
    return false;
  }
  const aspect = width / height;
  return aspect;
};