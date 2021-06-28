import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../Crop.module.css';
import { setTypeCrop } from '../../../effector/event';
import WidthHeightFields from './WidthHeightFields';

import { ICropForm } from '../../../interfaces/components';

const CropForm: React.FC<ICropForm> = ({
  onSetCrop,
  crop,
  aspect,
  onSetAspect,
  typeCrop,
  typeCropWords,
  getCropImage,
}) => {
  const [formKey, setFormKey] = useState(0);

  const onChangeTypeCrop = (event: React.ChangeEvent<any>) => {
    const newTypeCrop = event.target.value;
    setTypeCrop(newTypeCrop);
  };

  const onChangeCropHeight = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    onSetCrop({ type: 'height', value });
  };

  const onChangeCropWidth = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    onSetCrop({ type: 'width', value });
  };

  const onChangeAspectWidth = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const width = value;
    onSetAspect((prevState: any) => {
      return {
        ...prevState,
        width,
      };
    });
  };

  const onChangeAspectHeight = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const height = value;
    onSetAspect((prevState: any) => {
      return {
        ...prevState,
        height,
      };
    });
  };

  useEffect(() => {
    setFormKey(Math.random());
  }, [typeCrop]);

  const generateFields = useCallback(
    (crop: any, setWidth: any, setHeight: any) => {
      return <WidthHeightFields key={formKey} crop={crop} onSetHeight={setHeight} onSetWidth={setWidth} />;
    },
    [typeCrop]
  );

  return (
    <form autoComplete="off" className={styles.cropForm} noValidate>
      {typeCrop !== typeCropWords[2]
        ? generateFields(crop, onChangeCropWidth, onChangeCropHeight)
        : generateFields(aspect, onChangeAspectWidth, onChangeAspectHeight)}
      <Select onChange={onChangeTypeCrop} value={typeCrop}>
        {typeCropWords.map((word: string, idx: number) => {
          return (
            <MenuItem key={`${word}_${idx}`} value={word}>
              {word}
            </MenuItem>
          );
        })}
      </Select>
      <Button color="primary" onClick={getCropImage}>
        Save
      </Button>
    </form>
  );
};

export default CropForm;
