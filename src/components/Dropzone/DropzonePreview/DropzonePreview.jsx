import React from 'react';
import BlockImg from '../../BlockImg';

const DropzonePreview = ({ images }) => {
  const blockImgs = images.map((file, idx) => (
    <BlockImg file={ file } key={ `${file.name}_${idx}` } />
  ));

  if (!images.length) {
    return (<p className={ 'blockImgText' }>Drag &apos;n drop some files here, or click to select files</p>);
  }
  return (<aside className={ 'blockImgContainer' }>
    {blockImgs}
  </aside>);
};

export default DropzonePreview;
