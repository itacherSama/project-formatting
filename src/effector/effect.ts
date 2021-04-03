import { createEffect } from 'effector';
import { convertBase64ItemsInFiles } from '../services/base64Service';
import { getImgFromPreviewFile, generateKitImages } from '../services/imageService';
import { IobjImg } from '../interfaces/items';

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
    const imgElement = await getImgFromPreviewFile(currentImg.preview);
    const kitImages = await generateKitImages(imgElement, imageKitsettings);

    kitsImages.push(kitImages);
  }

  return kitsImages;
  
});

export const generateKitImagesByPoint = createEffect(async (data: any): Promise<any> => {
  const { fileImage, kitImagesSetting, pointOnImg, idx } = data;
  
  const imgElement = await getImgFromPreviewFile(fileImage.preview);
  const kitImages = await generateKitImages(imgElement, kitImagesSetting, pointOnImg);

  return { kitImages, idx };
});

