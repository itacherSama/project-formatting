import React, { FC, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightFields: FC<any> = ({ crop, onSetHeight, onSetWidth }) => {
  if (!crop) return <div />;

  return (
    <>
      <TextField defaultValue={crop.width} label="Width" type="number" onChange={onSetWidth} />
      <TextField defaultValue={crop.height} label="Height" type="number" onChange={onSetHeight} />
    </>
  );
};

export default WidthHeightFields;
