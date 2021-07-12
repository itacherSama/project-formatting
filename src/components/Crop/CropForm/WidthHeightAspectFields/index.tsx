import React from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightAspectFields: React.FC<any> = ({ onSetAspect, aspect }) => {
  const onChangeAspectWidth = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const width = value;
    onSetAspect((prevState: any) => ({
        ...prevState,
        width,
      }));
  };

  const onChangeAspectHeight = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const height = value;
    onSetAspect((prevState: any) => ({
        ...prevState,
        height,
      }));
  };

  return (
    <>
      <TextField label="Width" type="number" value={aspect.width} onChange={onChangeAspectWidth} />
      <TextField label="Height" type="number" value={aspect.height} onChange={onChangeAspectHeight} />
    </>
  );
};

export default WidthHeightAspectFields;
