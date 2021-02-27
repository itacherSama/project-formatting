import React from 'react';
import TextField from '@material-ui/core/TextField';
import { calcAspect } from '../../../../services/imageService';
import { IAspectState } from '../../../../interfaces/items';

const WidthHeightAspectFields:React.FC<any> = ({ onSetAspect }) => {
  const [aspectState, setAspectState] = React.useState<IAspectState>({
    width: 4,
    height: 3,
  });

  React.useEffect(() => {
    const newAspect = calcAspect(aspectState.width as number, aspectState.height as number);
    if (newAspect) onSetAspect(newAspect);
    
  }, [aspectState]);

  const onChangeAspectWidth =  (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const width = value;
    setAspectState(((prevState: IAspectState): IAspectState => {
      return {
        ...prevState,
        width
      };
    }));

  };

  const onChangeAspectHeight = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const height = value;
    setAspectState(((prevState: IAspectState): IAspectState => {
      return {
        ...prevState,
        height
      };
    }));

  };

  return (
    <>
      <TextField
        label='Width'
        onChange={ onChangeAspectWidth }
        type='number'
        value={ aspectState.width }
      />
      <TextField
        label='Height'
        onChange={ onChangeAspectHeight }
        type='number'
        value={ aspectState.height }
      />
    
    </>
  );
};

export default WidthHeightAspectFields;
