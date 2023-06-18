import { MutableRefObject } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { calcPxFromPercent, getPositionByPoint, transformPxAndPercent, transformSettingInPx } from './imageService';
import { ICropNewData, IPointOnImg, ISettingImgWithNulable } from '../interfaces/interfaces';
import { TypeCrop } from '../messages';

class CropService {
  constructor(
    public cropRef: MutableRefObject<ReactCropperElement | null>,
    public typeCropRef: MutableRefObject<string>,
    public changeActiveRef: MutableRefObject<boolean>
  ) {}

  getCropper = () => {
    const imageElement = this.cropRef?.current;
    if (!imageElement) {
      return imageElement;
    }
    const { cropper } = imageElement;
    return cropper;
  };

  transformDataByPointCrop = (point: IPointOnImg) => {
    if (point?.pointWidth) {
      const cropper = this.getCropper()!;
      const imgSettings = cropper.getImageData();
      const cropperData = cropper.getData(true);

      if (point?.pointWidth) {
        try {
          const getData = getPositionByPoint(cropperData, point, imgSettings, this.typeCropRef.current!);
          cropper.crop();
          cropper.setData({ ...getData } as any);
        } catch (e) {
          console.log('error getPositionByPoint');
        }
      }
    }
  };

  onCrop = (point: IPointOnImg, currentCropDataPx: any) => {
    if (this.changeActiveRef.current) {
      this.changeActiveRef.current = false;
      return;
    }

    const cropper = this.getCropper()!;
    let newData = cropper.getData(true);
    const imgSettings = cropper.getImageData();
    let error = false;

    if (point?.pointWidth) {
      try {
        newData = getPositionByPoint(newData, point, imgSettings, this.typeCropRef.current!) as any;
      } catch (e) {
        console.log('error getPositionByPoint');
        error = true;
      }
    }
    this.changeActiveRef.current = true;
    if (!error) {
      cropper.setData(newData);
      return newData;
    }
    cropper.setData({ ...currentCropDataPx } as any);
  };

  getCropImage = (addCropedImg: any) => {
    const cropper = this.getCropper()!;
    const cropperData = cropper.getData(true);
    const imgSettings = cropper.getImageData();

    const dataByImg: ISettingImgWithNulable = {
      x: cropperData.x,
      y: cropperData.y,
      width: cropperData.width,
      height: cropperData.height,
    };

    const base64Img = cropper.getCroppedCanvas().toDataURL();
    addCropedImg(base64Img, dataByImg, imgSettings);
  };

  onSetCrop = (point: any, newValue: ICropNewData, cropDataPx: any) => {
    const cropper = this.getCropper()!;
    const currenValues = cropper.getData(true);
    const imgSettings = cropper.getImageData();
    let error = false;
    let newValuesCrop = null;
    let valueByPoint = null;

    if (this.typeCropRef.current === TypeCrop.percent) {
      const transformNewValue = transformPxAndPercent(this.cropRef.current!, newValue, calcPxFromPercent);
      newValuesCrop = { ...currenValues, ...transformNewValue };
    } else {
      newValuesCrop = { ...currenValues, ...newValue };
    }

    if (point?.pointWidth) {
      try {
        valueByPoint = getPositionByPoint(newValuesCrop, point, imgSettings, this.typeCropRef.current!);
      } catch (e) {
        console.log('error getPositionByPoint');
        error = true;
      }
    }

    if (!error) {
      cropper.setData((valueByPoint as any) || newValuesCrop);
    } else {
      cropper.setData({ cropDataPx } as any);
    }
  };

  onTypeCrop = (newType: TypeCrop, cropDataPx: any) => {
    if (this.typeCropRef.current === TypeCrop.aspect && newType !== TypeCrop.aspect) {
      const cropper: any = this.getCropper();
      cropper.setAspectRatio(NaN).setData({ ...cropDataPx });
    }
  };

  onChangeSettings = (setting: any) => {
    const cropper = this.getCropper();
    const imgSettings = cropper!.getImageData();
    const transformed = transformSettingInPx(setting, imgSettings);
    console.log('transformed', transformed);
    cropper!.setData(transformed as any);
    return transformed;
  };
}

export default CropService;
