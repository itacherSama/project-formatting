import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import styles from '../Crop.module.css';
import { setTypeCrop } from '../../../effector/event';
import WidthHeightFields from './WidthHeightFields';

import { ICropForm } from '../../../interfaces/components';

const CropForm: React.FC<ICropForm> = ({
  onSetCrop,
  cropPx,
  cropPercent,
  // aspect,
  // onSetAspect,
  typeCrop,
  typeCropWords,
  getCropImage,
}) => {
  const onChangeTypeCrop = (event: React.ChangeEvent<any>) => {
    const newTypeCrop = event.target.value;
    setTypeCrop(newTypeCrop);
  }; 
 
  const onSetValue = ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = target;
    onSetCrop({ [name]: parseInt(value, 10) }); 
  };

  // const onChangeAspectWidth = (event: ChangeEvent<HTMLTextAreaElement>): void => {
  //   const { value } = event.target;
  //   const width = value;
  //   onSetAspect((prevState: any) => ({
  //       ...prevState,
  //       width,
  //     }));
  // };

  // const onChangeAspectHeight = (event: ChangeEvent<HTMLTextAreaElement>): void => {
  //   const { value } = event.target;
  //   const height = value;
  //   onSetAspect((prevState: any) => ({
  //       ...prevState,
  //       height,
  //     }));
  // };

  return (
    <form autoComplete="off" className={styles.cropForm} noValidate>
      {/* typeCrop !== typeCropWords[2]
        ? */ 
        <WidthHeightFields crop={typeCrop === 'px' ? cropPx : cropPercent} setValue={onSetValue} />
       /*  : generateFields(aspect, onChangeAspectWidth, onChangeAspectHeight) */}
      <Select value={typeCrop} onChange={onChangeTypeCrop}>
        {typeCropWords.map((word: string) => (
          <MenuItem key={`${word}`} value={word}>
            {word}
          </MenuItem>
          ))}
      </Select>
      <Button color="primary" onClick={getCropImage}>
        Save
      </Button>
    </form>
  );
};

export default CropForm;
