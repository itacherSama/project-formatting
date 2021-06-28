/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { useStore } from 'effector-react';
import CropForm from './CropForm';
import { $typeCrop } from '../../effector/store';
import { ICrop } from '../../interfaces/components';
import { ICropFormData, IImgCropValue } from '../../interfaces/items';
import { getPxFromPercent, getPercentFromPx, getPositionByPoint, calcAspect } from '../../services/imageService';

const typeCropWords = ['px', '%', 'aspect'];

const Crop: FC<ICrop> = ({ addCropedImg, src, onCloseModal, point }) => {
  const typeCrop = useStore($typeCrop);
  const cropperRef = useRef<HTMLImageElement>(null);
  const [cropData, setCropData] = useState<any>(null);
  const [aspectState, setAspectState] = useState<ICropFormData>({
    width: 4,
    height: 3,
  });
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const newAspect = calcAspect(aspectState.width as number, aspectState.height as number);
    if (newAspect && typeCrop.current === typeCropWords[2]) {
      setMyAspect(newAspect as number);
      transformDataByPointCrop();
    } else if (typeCrop.last === typeCropWords[2]) {
      cancelMyAspect();
    }
  }, [aspectState, typeCrop]);

  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    return cropper;
  };

  const getPercentCropData = () => {
    if (cropperRef.current && cropData.height && cropData.width) {
      return getPercentFromPx(cropperRef.current!, { ...cropData });
    }
    return cropData;
  };

  const valueCrop = typeCrop.current === typeCropWords[1] ? getPercentCropData() : cropData;

  const onCrop = () => {
    const cropper: any = getCropper();
    const newData = cropper.getData({ rounded: true });

    setCropData(newData);
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
    const dataByImg = {
      x: cropperData.x,
      y: cropperData.y,
      width: cropperData.width,
      height: cropperData.height,
    };
    const base64Img = cropper.getCroppedCanvas().toDataURL();

    addCropedImg(base64Img, dataByImg);
    onCloseModal();
  };

  const setMyDataCrop = (objValue: IImgCropValue): void => {
    const cropper: any = getCropper();
    const imgSettings = cropper.getImageData();
    const typeValue = objValue.type;
    const newValue = objValue.value;

    if (newValue === '') {
      setCropData({ ...cropData, [typeValue]: newValue });
      return;
    }

    let newData: any = {
      [typeValue]: parseInt(newValue),
    };

    if (typeCrop.current === typeCropWords[1]) {
      newData = getPxFromPercent(cropperRef.current!, newData);
    }

    newData = {
      ...cropData,
      [typeValue]: newData[typeValue],
    };

    if (point.pointWidth) {
      newData = getPositionByPoint(newData, point, imgSettings);
    }

    cropper.setData({ ...newData });
  };

  const setMyAspect = (data: number): void => {
    const cropper: any = getCropper();
    cropper.setAspectRatio(data);
  };

  const cancelMyAspect = (): void => {
    const cropper: any = getCropper();
    cropper.setAspectRatio(NaN);
  };

  const updateFields = () => {
    setFormKey(Math.random());
  };

  return (
    <>
      <Cropper
        ref={cropperRef}
        autoCrop={false}
        background={false}
        crop={onCrop}
        guides={false}
        ready={() => {
          transformDataByPointCrop();
          updateFields();
        }}
        responsive
        src={src}
        viewMode={1}
        zoomable={false}
      />
      <CropForm
        key={formKey}
        aspect={aspectState}
        crop={valueCrop}
        getCropImage={getCropImage}
        onSetAspect={setAspectState}
        onSetCrop={setMyDataCrop}
        typeCrop={typeCrop.current}
        typeCropWords={typeCropWords}
      />
    </>
  );
};

export default Crop;
