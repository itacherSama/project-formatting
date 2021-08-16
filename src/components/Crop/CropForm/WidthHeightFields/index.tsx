import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightFields: FC<any> = ({ crop, setValue }) => {
  if (!crop) return <div />;

  return (
    <>
      <TextField label="Width" name="width" type="number" value={crop.width} onChange={setValue} />
      <TextField label="Height" name="height" type="number" value={crop.height} onChange={setValue} />
    </>
  );
};

export default WidthHeightFields;
