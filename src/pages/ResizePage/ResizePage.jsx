import React from 'react';
import { useStore } from 'effector-react';
import { $images } from '../../effector';

const ResizePage = () => {
  const images = useStore($images);
  return (

    <div>
      ResizePage
    </div>
  );
};

export default ResizePage;
