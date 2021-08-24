/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { useStore } from 'effector-react';
import { setCropDataPx, setAspect, setCropperRef, setTypeCrop } from 'effector/event';
import { ICropNewData, IImgSettingsNaturalSize, IPointOnImg, ISettingImg } from 'interfaces/items';
import CropForm from './CropForm';
import { $aspect, $cropDataPercent, $cropDataPx, $typeCrop } from '../../effector/store';
import { getPositionByPoint, calcPxFromPercent, transformPxAndPercent } from '../../services/imageService';

const Crop: FC<{
  src: string;
  point: IPointOnImg;
  addCropedImg: (base64Img: string, settingImg: ISettingImg, dataByNaturalSize: IImgSettingsNaturalSize ) => void;
  onCloseModal: () => void;
}> = ({ addCropedImg, src, onCloseModal, point }) => {
  const typeCrop = useStore($typeCrop);
  const cropperRef = useRef<HTMLImageElement>(null);
  const cropDataPx = useStore($cropDataPx);
  const cropDataPercent = useStore($cropDataPercent);
  const aspect = useStore($aspect);

  const [savedPxData, setSavedPxData] = useState(cropDataPx);
  let changeActive = false;
  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    return cropper;
  };

  useEffect(() => {
    setCropperRef(cropperRef);
  }, [cropperRef]);

  const onCrop = () => {
    if (changeActive) {
      changeActive = false;
      return;
    }
    const cropper: any = getCropper();
    let newData = cropper.getData({ rounded: true });
    const imgSettings = cropper.getImageData();

    if (point.pointWidth) {
      newData = getPositionByPoint(newData, point, imgSettings);
    }
    changeActive = true;

    cropper.setData(newData);
    setCropDataPx(newData);
  };

  const onSetCrop = (newValue: ICropNewData) => {
    const cropper: any = getCropper();
    const currenValues = cropper.getData({ rounded: true });
    const imgSettings = cropper.getImageData();

    let newValuesCrop = null;
    let valueByPoint = null;

    if (typeCrop === '%') {
      const transformNewValue = transformPxAndPercent(cropperRef.current!, newValue, calcPxFromPercent);
      newValuesCrop = { ...currenValues, ...transformNewValue };
    } else {
      newValuesCrop = { ...currenValues, ...newValue };
    }

    if (point.pointWidth) {
      valueByPoint = getPositionByPoint(newValuesCrop, point, imgSettings);
    }

    cropper.setData(valueByPoint || newValuesCrop);
  };

  const transformDataByPointCrop = () => {
    if (point) {
      const cropper: any = getCropper();
      const imgSettings = cropper.getImageData();
      const cropperData = cropper.getData({ rounded: true });
      const getData = getPositionByPoint(cropperData, point, imgSettings);

      cropper.crop();
      cropper.setData({ ...getData });
    }
  };

  const getCropImage = () => {
    const cropper: any = getCropper();
    const cropperData = cropper.getData({ rounded: true });
    const imgSettings = cropper.getImageData();

    const dataByImg = {
      x: cropperData.x,
      y: cropperData.y,
      width: cropperData.width,
      height: cropperData.height,
    };

    const base64Img = cropper.getCroppedCanvas().toDataURL();

    addCropedImg(base64Img, dataByImg, imgSettings);
    onCloseModal();
  };

  useEffect(() => {
    const cropper: any = getCropper();
    if (typeCrop === 'aspect') {
      cropper.setAspectRatio(aspect.value);
    }
  }, [aspect, typeCrop]);

  useEffect(() => {
    setTypeCrop('px');
  }, []);

  const onTypeCrop = (newType: string): void => {
    if (typeCrop === 'aspect' && newType !== 'aspect') {
      const cropper: any = getCropper();
      cropper.setAspectRatio(NaN).setData({ ...cropDataPx });
    }

    setTypeCrop(newType);
  };

  return (
    <>
      <Cropper
        ref={cropperRef}
        autoCrop={false}
        autoCropArea={1}
        background={false}
        crop={onCrop}
        guides={false}
        ready={() => {
          transformDataByPointCrop();
        }}
        src={src}
        viewMode={1}
        zoomable={false}
        responsive
      />
      <CropForm
        aspect={aspect.sides}
        cropPercent={cropDataPercent}
        cropPx={cropDataPx}
        getCropImage={getCropImage}
        setTypeCrop={onTypeCrop}
        typeCrop={typeCrop}
        onSetAspect={setAspect}
        onSetCrop={onSetCrop}
      />
    </>
  );
};

export default Crop;
