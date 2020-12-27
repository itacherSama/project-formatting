import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { useStore } from 'effector-react';
import { $currentCropImage } from '../../effector';

const Crop = () => {
  const image = useStore($currentCropImage);

  const [crop, setCrop] = React.useState({
    unit: 'px',
  });

  return (
    <ReactCrop
      crop={ crop }
      onChange={ (newCrop) => setCrop(newCrop) }
      src={ image.preview }
    />);
};

export default Crop;
