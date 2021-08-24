import { createEffect } from 'effector';
import { convertBase64ItemsInFiles } from '../services/base64Service';
import {
  getImgFromPreviewFile,
  generateKitImages,
  generateNewSettingsForKitImages,
  transformSettingsInPx, transformSettingsInPercent,
} from '../services/imageService';
import { IInfoImg, ISettingsImage } from '../interfaces/items';

export const fetchImagesFx = createEffect(async (data: any) => {
  const req = await convertBase64ItemsInFiles(data);
  return req;
});

export const fetchSettingsForImagesFx = createEffect((data: any) => data);

export const generateKitsImages = createEffect(async (data: any): Promise<IInfoImg[][]> => {
  const [images, settingsForKits] = data;
  const kitsImages = [];
  for (let idx = 0; idx < settingsForKits.length; idx++) {
    const imageKitsettings = settingsForKits[idx];
    const currentImg = images[idx];
    const kitImages = await handleGenerateKitItemsBySettings(currentImg, imageKitsettings);
    kitsImages.push(kitImages);
  }

  return kitsImages;
});

export const getNewSettingsForKitImages = createEffect(async (data: any): Promise<{ transformedSettings: ISettingsImage, idx: number }> => {
  const { fileImage, kitImagesSetting, pointOnImg, idx } = data;

  const imgElement = await getImgFromPreviewFile(fileImage.preview);
  const newSettingsForKitImages = generateNewSettingsForKitImages(imgElement, kitImagesSetting.items, pointOnImg);
  const transformedSettings = transformSettingsInPercent(newSettingsForKitImages, imgElement);
  return { transformedSettings, idx };
});

export const generateKitImagesBySettings = createEffect(async (data: any): Promise<{ kitImages: IInfoImg[], idx: number }> => {
  const { fileImage, kitImagesSetting, idx } = data;
  const kitImages = await handleGenerateKitItemsBySettings(fileImage, kitImagesSetting);

  return { kitImages, idx };
});

const handleGenerateKitItemsBySettings = async (fileImage: IInfoImg, kitImagesSetting: ISettingsImage): Promise<IInfoImg[]> => {
  const imgElement = await getImgFromPreviewFile(fileImage.preview!);
  const pxSettings = transformSettingsInPx(kitImagesSetting, imgElement);
  const kitImages = await generateKitImages(imgElement, pxSettings);
  return kitImages;
};
