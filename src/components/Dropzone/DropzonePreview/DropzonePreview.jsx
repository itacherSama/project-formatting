import React from 'react';
import Thumb from '../../Thumb';
import styles from './DropzonePreview.module.css';

const DropzonePreview = ({ images }) => {
  const Thumbs = images.map((file, idx) => (
    <Thumb file={ file } key={ `${file.name}_${idx}` } />
  ));

  if (!images.length) {
    return (<p className={ styles.thumbText }>
      Drag &apos;n drop some files here, or click to select files
    </p>);
  }
  return (<aside className={ styles.thumbContainer }>
    {Thumbs}
  </aside>);
};

export default DropzonePreview;
