import { createEffect } from 'effector-logger';
import { convertBase64ItemsInFiles } from 'services/base64Service';
import {
  getImgFromPreviewFile,
  generateKitImages,
  generateNewSettingsForKitImages,
  transformSettingsInPx,
  transformSettingsInPercent,
} from 'services/imageService';
import { IInfoImg, INewSettingsForKitImages, ISettingsImage } from 'interfaces/interfaces';

export const fetchImagesFx = createEffect({
  name: 'fetchImagesFx',
  handler: async (data: Array<string> | null) => {
    if (data) {
      const req = await convertBase64ItemsInFiles(data);
      return req;
    }
    return [];
  },
});

export const generateKitsImages = createEffect({
  name: 'generateKitsImages',
  handler: async (data: [IInfoImg[], ISettingsImage[]]): Promise<IInfoImg[][]> => {
    const [images, settingsForKits] = data;

    const promises = settingsForKits.map(async (imageKitSettings: ISettingsImage, idx: number): Promise<IInfoImg[]> => {
      const currentImg = images[idx];
      const value = await handleGenerateKitItemsBySettings(currentImg, imageKitSettings);
      return value;
    });

    return Promise.all(promises);
  },
});

export const getNewSettingsForKitImages = createEffect({
  name: 'getNewSettingsForKitImages',
  handler: async (data: any): Promise<INewSettingsForKitImages> => {
    const { fileImage, kitImagesSetting, pointOnImg, idx } = data;
    const imgElement = await getImgFromPreviewFile(fileImage.preview);
    const newSettingsForKitImages = generateNewSettingsForKitImages(imgElement, kitImagesSetting.items, pointOnImg);
    const transformedSettings = transformSettingsInPercent(newSettingsForKitImages, imgElement);
    return { transformedSettings, idx };
  },
});

export const generateKitImagesBySettings = createEffect({
  name: 'generateKitImagesBySettings',
  handler: async (data: any): Promise<{ kitImages: IInfoImg[]; idx: number }> => {
    const { fileImage, kitImagesSetting, idx } = data;
    console.log('------------');
    const kitImages = await handleGenerateKitItemsBySettings(fileImage, kitImagesSetting);

    return { kitImages, idx };
  },
});

const handleGenerateKitItemsBySettings = async (
  fileImage: IInfoImg,
  kitImagesSetting: ISettingsImage
): Promise<IInfoImg[]> => {
  const imgElement = await getImgFromPreviewFile(fileImage.preview!);
  const pxSettings = transformSettingsInPx(kitImagesSetting, imgElement);
  const kitImages = await generateKitImages(imgElement, pxSettings);

  return kitImages;
};
