import React from 'react';
import BlockImg from '../../BlockImg';
import styles from './DropzonePreview.module.css';

const DropzonePreview = ({ images }) => {
  const blockImgs = images.map((file, idx) => (
    <BlockImg file={ file } key={ `${file.name}_${idx}` } />
  ));

  if (!images.length) {
    return (<p className={ styles.blockImgText }>
      Drag &apos;n drop some files here, or click to select files
    </p>);
  }
  return (<aside className={ styles.blockImgContainer }>
    {blockImgs}
  </aside>);
};

export default DropzonePreview;
