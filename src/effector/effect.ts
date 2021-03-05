import { createEffect } from 'effector';
import { convertBase64ItemsInFiles } from '../services/base64Service';
import { generateImagesBySettings } from '../services/imageService';
import { IobjImg, IImagesAndPoint } from '../interfaces/items';

export const fetchImagesFx = createEffect(async (data: any) => {
  const req = await convertBase64ItemsInFiles(data);
  return req;
});

export const fetchSettingsForImagesFx = createEffect((data: any) => data);

export const generateKitsImages = createEffect(async (data: any): Promise<IobjImg[][]>  => {
  const [images, settingsForKits] = data;
  const kitsImages = [];
  for (let idx = 0; idx < settingsForKits.length; idx++) {
    const imageKitsettings = settingsForKits[idx];
    const currentImg = images[idx];
    const kitImages = [];
    for (let idxEl = 0; idxEl < imageKitsettings.items.length; idxEl++) {
      const settings = imageKitsettings.items[idxEl];
      const blobImg: Blob = await generateImagesBySettings(currentImg, settings);
      const fileImg: IobjImg = new File([blobImg], `${idx + idxEl}.jpg`);
      fileImg.preview = URL.createObjectURL(fileImg);

      kitImages.push(fileImg);
    }
    kitsImages.push(kitImages);
  }

  return kitsImages;
  
});
