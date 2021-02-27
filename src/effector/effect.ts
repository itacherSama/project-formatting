import { createEffect } from 'effector';
import { convertBase64ItemsInFiles, convertFilesInBase64Items } from '../services/base64Service';
import { generateImagesBySettings } from '../services/imageService';
import { IobjImg, IImagesAndPoint, ISettingImg } from '../interfaces/items';

export const fetchImagesFx = createEffect(async (data: any) => {
  const req = await convertBase64ItemsInFiles(data);
  return req;
});

export const fetchSettingsForImagesFx = createEffect((data: any) => data);

export const generateKitsImages = createEffect(async (data: any): Promise<IImagesAndPoint[]>  => {
  const [images, settingsForKits] = data;
  await settingsForKits.forEach(async (imageKitsettings: IImagesAndPoint, idx: number) => {
    const currentImg = images[idx];
    imageKitsettings.images = [];
    
    await imageKitsettings.kitSettings!.forEach(async (settings: ISettingImg, idxEl: number) => {
      const blobImg: Blob = await generateImagesBySettings(currentImg, settings);
      const fileImg: IobjImg = new File([blobImg], `${idx + idxEl}.jpg`);
      fileImg.settingImg = settings;
      fileImg.preview = URL.createObjectURL(fileImg);

      imageKitsettings.images.push(fileImg);
    });
  });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(settingsForKits);
    }, 300);
    
  });
  
});