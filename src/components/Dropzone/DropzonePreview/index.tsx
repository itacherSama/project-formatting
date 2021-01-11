import React from 'react';
import Thumb from '../../Thumb';
import styles from './DropzonePreview.module.css';
import { IDropzonePreview } from '../../../interfaces/components';

const DropzonePreview: React.FC<IDropzonePreview> = ({ images }) => {
  const Thumbs = images.map((file: any, idx: number) => (
    <Thumb
      key={ `${file.name}_${idx}` }
      file={ file }
    />
  ));

  if (images.length === 0) {
    return (
      <p className={ styles.thumbText }>
        Drag &apos;n drop some files here, or click to select files
      </p>
    );
  }
  return (
    <aside className={ styles.thumbContainer }>
      { Thumbs }
    </aside>
  );
};

export default DropzonePreview;
