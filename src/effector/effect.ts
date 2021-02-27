import { createEffect } from 'effector';
import { convertBase64ItemsInFiles, convertFilesInBase64Items } from '../services/base64Service';
import { generateImagesBySettings } from '../services/imageService';

export const fetchImagesFx = createEffect(async (data: any) => {

  const req = await convertBase64ItemsInFiles(data);
  // console.log(req);
  
  return req;
});

export const fetchSettingsForImagesFx = createEffect((data: any) => {
  console.log('fetchSettingsForImagesFx', data);
  return data;
});

export const generateKitsImages = createEffect(async (data: any) => {
  const [images, settingsForKits] = data;
  console.log('generate Kits');
  console.log(data);
  await settingsForKits.forEach(async (imageKitsettings: any, idx: number) => {
    const currentImg = images[idx];
    console.log('imageKitsettings', imageKitsettings);

    const newImages = await imageKitsettings.kitSettings.map(async (settings: any, idxEl: any) => {
      console.log('settings', settings);
      const firstFile = await generateImagesBySettings(currentImg, settings);

      return firstFile;
      
    });

    console.log(newImages);
    
  });

  
});