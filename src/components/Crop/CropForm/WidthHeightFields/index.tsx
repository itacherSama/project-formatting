import React, { FC, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightFields:FC<any> = ({ crop, onSetHeight, onSetWidth }) => {

  

  if (!crop) return <div />;

  return (
    <>
      <TextField
        defaultValue={ crop.width }
        label='Width'
        onChange={ onSetWidth }
        type='number'
      />
      <TextField
        defaultValue={ crop.height }
        label='Height'
        onChange={ onSetHeight }
        type='number'
      />
    </>
  );
};

export default WidthHeightFields;
